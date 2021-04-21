import React, {useState} from 'react'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"
import Drawer from "@material-ui/core/Drawer"
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import List from '@material-ui/core/List'
import { LoginForm, LoginFormOptions } from './login-form'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import ReactLogo from '../logo.svg'
import { UserBaseDetails } from '../models/user-base-details'
import axios from 'axios'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    menuButton: {
      marginRight: theme.spacing(2),
    },
    title: {
      flexGrow: 1,
    },
    link: {
      textDecoration: 'none',
      padding: '1px'
    },
    list: {
      width: '250px',
    },
  }),
)

export function WelcomePage() {
  const [isDrawerDisplayed, setIsDrawerDisplayed] = useState(false)
  const [errorMessage, setErrorMessage] = useState("")
  const classes = useStyles()

  function toggleDrawer(isOpen: boolean) {
    setIsDrawerDisplayed(isOpen)
  }

  async function login(loginData: UserBaseDetails) { 
    try {
      const response = await axios.post('http://localhost:9000/api/users/login', loginData)
      setErrorMessage("")
    } catch (err) {
      // err.status.data
      // err.status.status
      setErrorMessage(err.response.data)
      console.error({...err})
    }    
  }

  async function register(loginData: UserBaseDetails) { 
    try {
      const response = await axios.post('http://localhost:9000/api/users/register', loginData)
      setErrorMessage("")
    } catch (err) {
      // err.status.data
      // err.status.status
      setErrorMessage(err.response.data)
      console.error({...err})
    }    
  }

  return (
    <Router>
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => setIsDrawerDisplayed(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              <Link className={classes.link} to="/">EMS</Link>
            </Typography>
            <Link className={classes.link} to="/login"><Button variant="outlined" color="secondary">Login</Button></Link>
            <Link className={classes.link} to="/register"><Button variant="outlined" color="secondary">Register</Button></Link>
          </Toolbar>
          <div className={classes.list}>
            <React.Fragment key="drawer">
              <Drawer
                anchor="left"
                open={isDrawerDisplayed}
                onClose={() => toggleDrawer(false)}
              >
                <List>
                  {['Login','Register'].map((text) => (
                    <ListItem button key={text}>
                      <Link to={text}><ListItemText primary={text} onClick={() => toggleDrawer(false)} /></Link>
                    </ListItem>
                  ))}
                </List>
              </Drawer>
            </React.Fragment>
          </div>
          <Switch>
            <Route path="/login">
              <LoginForm onSubmit={login} errorMessage={errorMessage} />
            </Route>
            <Route path="/register">
              <LoginForm onSubmit={() => {}} option={LoginFormOptions.register} errorMessage={errorMessage} />
            </Route>
            <Route path="/">
              <img src={ReactLogo} alt="React Logo"/>
            </Route>
          </Switch>
        </AppBar>
      </div>
    </Router>
  )
}