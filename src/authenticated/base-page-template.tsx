import React, {useState, useEffect} from 'react'
import {useAuth} from '../auth/AuthContext'
import AppBar from '@material-ui/core/AppBar'
import Toolbar from '@material-ui/core/Toolbar'
import Drawer from "@material-ui/core/Drawer"
import ListItem from '@material-ui/core/ListItem'
import ListItemText from '@material-ui/core/ListItemText'
import ListItemAvatar from '@material-ui/core/ListItemAvatar'
import Divider from '@material-ui/core/Divider'
import List from '@material-ui/core/List'
import Typography from '@material-ui/core/Typography'
import IconButton from '@material-ui/core/IconButton'
import MenuIcon from '@material-ui/icons/Menu'
import Button from '@material-ui/core/Button'
import Avatar from '@material-ui/core/Avatar'
import MenuItem from '@material-ui/core/MenuItem'
import Menu from '@material-ui/core/Menu'
import axios from 'axios'
import ReactLogo from '../logo.svg'
import {UserProfile} from './user-profile'
import { createStyles, makeStyles, Theme } from '@material-ui/core/styles'
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link
} from "react-router-dom"

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
      cursor: 'default'
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

export function BasePageTemplate() {
  const {signOut, user} = useAuth()
  const [isDrawerDisplayed, setIsDrawerDisplayed] = useState(false)
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const isUserMenuOpen = Boolean(anchorEl);
  const classes = useStyles()

  function clickedSignOut() {
    signOut()
  }

  function toggleDrawer(isOpen: boolean) {
    setIsDrawerDisplayed(isOpen)
  }

  function handleMenu(event: React.MouseEvent<HTMLElement>) {
    setAnchorEl(event.currentTarget);
  }

  function handleClose() {
    setAnchorEl(null);
  }
  
  return (
    <Router>
      <div className="md:flex w-full items-center flex-col">
        <AppBar position="static">
            <Toolbar>
              <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu" onClick={() => setIsDrawerDisplayed(true)}>
                <MenuIcon />
              </IconButton>
              <Typography variant="h6" className={classes.title}>
                EMS
              </Typography>
              <div>
                <IconButton
                  aria-label="account of current user"
                  aria-controls="menu-appbar"
                  aria-haspopup="true"
                  onClick={handleMenu}
                  color="inherit"
                >
                  <Avatar alt="Profile" src={user?.photoURL ? user?.photoURL : ""}/>
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={isUserMenuOpen}
                  onClose={handleClose}
                >
                  <MenuItem><Link className={classes.link} to="/profile" onClick={handleClose}>Profile</Link></MenuItem>
                  <MenuItem><Link className={classes.link} to="/" onClick={clickedSignOut}>Sign out</Link></MenuItem>
                </Menu>
              </div>
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
                    {/* {['Login','Register'].map((text) => (
                      <ListItem button key={text}>
                        <Link to={text}>
                          <ListItemText primary={text} onClick={() => toggleDrawer(false)} />
                          
                        </Link>
                      </ListItem>
                    ))} */}
                  </List>
                </Drawer>
              </React.Fragment>
            </div>
        </AppBar>
        <Switch>
          <Route path="/profile">
            <UserProfile />
          </Route>
        </Switch>
      </div>
    </Router>
  )
}