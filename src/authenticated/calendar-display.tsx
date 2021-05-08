import React, {useState, useEffect} from 'react'
import Calendar from 'react-calendar'
import 'react-calendar/dist/Calendar.css';
import {AppointmentDetails} from '../models/appointment-details'
import Button from '@material-ui/core/Button';

export function CalendarDisplay() {
  const [date, setDate] = useState(new Date())
  const [workDay, setWorkDay] = useState([] as AppointmentDetails[])

  useEffect(() => {
    const apnts: AppointmentDetails[] = [{
      date: new Date(2021, 5, 8, 13, 0)
    },{
      date: new Date(2021, 5, 8, 13, 30)
    },{
      date: new Date(2021, 5, 8, 14, 0)
    },{
      date: new Date(2021, 5, 8, 14, 30)
    },{
      date: new Date(2021, 5, 8, 15, 0)
    },{
      date: new Date(2021, 5, 8, 15, 30)
    }]

    setWorkDay(apnts)
  }, [])

  function onChange(newDate: Date | Date[]) {
    if (Array.isArray(newDate)) {
      setDate(newDate[0])
    } else {
      setDate(newDate)
    }
  }

  function chooseUser(date: Date) {

  }

  function getAppointmentDisplay(apnt: AppointmentDetails) {
    return (
      <div className="p-4">
        {apnt.uid ?? 'EMPTY '}
        {apnt.date.toLocaleTimeString()}
        <Button variant="contained" onClick={() => chooseUser(apnt.date)}>Set</Button>
      </div>
    )
  }

  return (
    <div>
      <Calendar onChange={onChange} value={date} calendarType="Hebrew" />
      {workDay.map(apnt => getAppointmentDisplay(apnt))}
    </div>
  )
}