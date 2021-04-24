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
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import { LoginForm, LoginFormOptions } from './login-form'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Typography from '@material-ui/core/Typography'
import Button from '@material-ui/core/Button'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import { UserBaseDetails } from '../models/user-base-details'
import ReactLogo from '../logo.svg'
import axios from 'axios'
import {AuthProvider} from '../auth/AuthContext'
import {AuthUser} from '../models/auth-user'

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
  
  const [user, setUser] = useState({email: "", userId: "", isAuthenticated: false})

  function toggleDrawer(isOpen: boolean) {
    setIsDrawerDisplayed(isOpen)
  }

  async function login(loginData: UserBaseDetails) { 
    try {
      // eslint-disable-next-line
      const response = await axios.post('http://localhost:9000/api/users/login', loginData)

      setErrorMessage("")
    } catch (err) {
      // err.status.data
      // err.status.status
      setErrorMessage(err.response.data)
      console.error({...err})
    }
  }

  // eslint-disable-next-line
  async function register(loginData: UserBaseDetails) { 
    try {
      // eslint-disable-next-line
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
      <div className="md:flex items-center flex-col">
        <AppBar position="static">
          <Toolbar>
            <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => setIsDrawerDisplayed(true)}>
              <MenuIcon />
            </IconButton>
            <Typography variant="h6" className={classes.title}>
              <Link className={classes.link} to="/">EMS</Link>
            </Typography>
            <Link className={classes.link} to="/login"><Button variant="outlined">Login</Button></Link>
            <Link className={classes.link} to="/register"><Button variant="outlined">Register</Button></Link>
          </Toolbar>
          <div className="flex w-1/6">
            <React.Fragment key="drawer">
              <Drawer
                anchor="left"
                open={isDrawerDisplayed}
                onClose={() => toggleDrawer(false)}
              >
                <List className="w-full">
                  <ListItem key='avatar'>
                    <ListItemAvatar children={(<img src={ReactLogo} alt="React Logo" />)}></ListItemAvatar>
                  </ListItem>
                  <Divider />
                  {['Login','Register'].map((text) => (
                    <ListItem button key={text}>
                      <Link to={text}>
                        <ListItemText primary={text} onClick={() => toggleDrawer(false)} />
                        
                      </Link>
                    </ListItem>
                  ))}
                </List>
              </Drawer>
            </React.Fragment>
          </div>
        </AppBar>
        <AuthProvider value={user}>
          <Switch>
            <Route path="/login">
              <div className="h-full w-full p-2"><LoginForm onSubmit={login} errorMessage={errorMessage} /></div>
            </Route>
            <Route path="/register">
              <div className="h-full w-full p-2"><LoginForm onSubmit={() => {}} option={LoginFormOptions.register} errorMessage={errorMessage} /></div>
            </Route>
            <Route path="/">
              {/* <img className="w-16 md:w-32 lg:w-48" src={ReactLogo} alt="React Logo"/> */}
            </Route>
          </Switch>
        </AuthProvider>
      </div>
    </Router>
  )
}