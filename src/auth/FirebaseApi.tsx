import firebase from "firebase/app";
import "firebase/auth";
import "firebase/storage";
import * as firebaseui from 'firebaseui'
import {firebaseConfig} from './FirebaseConfig'

class FirebaseApi {
  private static _app: firebase.app.App
  private static _auth: firebase.auth.Auth
  private static _storage: firebase.storage.Storage

  public static _initialize(): void {
    FirebaseApi._app = firebase.initializeApp(firebaseConfig)
    FirebaseApi._auth = FirebaseApi._app.auth()
    FirebaseApi._storage = FirebaseApi._app.storage()
  }

  public static async signIn(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return FirebaseApi._auth.signInWithEmailAndPassword(email, password)
  }

  public static async signUp(email: string, password: string): Promise<firebase.auth.UserCredential> {
    return FirebaseApi._auth.createUserWithEmailAndPassword(email, password)
  }

  public static async signOut(): Promise<void> {
    return FirebaseApi._auth.signOut()
  }

  public static getCurrentUser(): firebase.User | null {
    const user = FirebaseApi._auth.currentUser
    return {...user, photoURL: user?.photoURL ? `${user.photoURL}&${Date.now()}` : null} as firebase.User
  }

  public static onAuthStateChanged(onStateChange: (user: firebase.User | null) => void, onAuthError: (err: firebase.auth.Error) => void): firebase.Unsubscribe {
    return FirebaseApi._auth.onAuthStateChanged(onStateChange, onAuthError)
  }

  public static addImage(image: File): firebase.storage.UploadTask {
    return FirebaseApi._storage.ref(`images/${FirebaseApi._auth.currentUser?.uid}`).put(image)
  }

  public static updateUserProfile(profile: {displayName?: string, photoURL?: string}) {
    return FirebaseApi._auth.currentUser?.updateProfile(profile)
  }
}

FirebaseApi._initialize()

export const api = {
  signIn: FirebaseApi.signIn,
  signUp: FirebaseApi.signUp,
  signOut: FirebaseApi.signOut,
  getCurrentUser: FirebaseApi.getCurrentUser,
  onAuthStateChanged: FirebaseApi.onAuthStateChanged,
  addImage: FirebaseApi.addImage,
  updateUserProfile: FirebaseApi.updateUserProfile
}