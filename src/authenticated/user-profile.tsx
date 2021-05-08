import React, {useState, createRef} from 'react'
import { useAuth } from '../auth/AuthContext'
import {api} from '../auth/FirebaseApi'
import { makeStyles, createStyles, Theme } from '@material-ui/core/styles'
import Loader from 'react-loader-spinner'
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Avatar from '@material-ui/core/Avatar'
import FolderIcon from '@material-ui/icons/Folder'

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      '& > *': {
        margin: theme.spacing(1),
      },
    },
    folderIcon: {
      width: theme.spacing(10),
      height: theme.spacing(10),
      cursor: 'pointer',
      position: 'fixed',
      alignSelf: 'center',
      'margin-left': '6%'
    },
    large: {
      width: theme.spacing(30),
      height: theme.spacing(30),
    },
  }),
);


export function UserProfile() {
  const {user, reloadUser} = useAuth()
  const {addImage, updateUserProfile} = api
  const [isDisplayFileUploader, setIsDisplayFileUploader] = useState(false)
  const [isLoaderDisplay, setIsLoaderDisplay] = useState(false)
  const classes = useStyles()
  const imageRef = createRef<HTMLInputElement>()

  function uploadImage(e: any) {
    let image = e.target.files[0]
    setIsLoaderDisplay(true)
    addImage(image)
      .then(async (res) => {
        const url = await res.ref.getDownloadURL()
        return updateUserProfile({
          displayName: "sfaasdffasd",
          photoURL: url
        })
      })
      .then(res => {
        reloadUser()
      })
      .catch(err => {
        console.error({...err});
      })
      .finally(() => {
        setIsLoaderDisplay(false)
      })
  }

  function chooseImage() {
    imageRef.current?.click()
    setIsDisplayFileUploader(false)
  }

  function fileUploaderDisplay(e: any) {
    if (e.relatedTarget.id !== 'folderIcon') {
      setIsDisplayFileUploader(false)
    }    
  }

  function displayLoader() {
    return (
      <div style={{position: 'fixed', margin:'5%'}}>
        <Loader type="BallTriangle"
                color="#00BFFF"
                height={100}
                width={100}
        />
      </div>
    )
  }

  return (
    <>
      <div className={classes.root}>
        <Avatar alt="user" src={user?.photoURL ?? ""} className={classes.large} onMouseEnter={() => setIsDisplayFileUploader(true)} onMouseLeave={fileUploaderDisplay} />
        {isLoaderDisplay ? displayLoader() : (
          <>
            {isDisplayFileUploader && <FolderIcon className={classes.folderIcon} onClick={chooseImage} id="folderIcon" />}
          </>
        )}
      </div>
      <input type="file" multiple={false} ref={imageRef} accept="image/*" id="imageUploader" hidden onChange={uploadImage} />
    </>
  )
}
