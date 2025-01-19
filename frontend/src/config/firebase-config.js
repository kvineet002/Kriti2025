import {getApp, getApps, initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth,  OAuthProvider,GoogleAuthProvider,signInWithPopup } from "firebase/auth";
import { firebaseApi } from "../../constants";

const firebaseConfig = firebaseApi;

const app = getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const GoogleProvider = new GoogleAuthProvider();
const OutlookProvider = new OAuthProvider("microsoft.com");


export {auth, GoogleProvider, OutlookProvider, signInWithPopup};