import {environment} from '../../../environments/environment';

const firebaseConfig = {
    apiKey : environment.REACT_APP_FIREBASE_API_KEY,
    authDomain : environment.REACT_APP_FIREBASE_AUTH_DOMAIN,
    databaseUrl : environment.REACT_APP_FIREBASE_DATABASE_URL,
    projectId : environment.REACT_APP_FIREBASE_PROJECT_ID,
    storageBucket : environment.REACT_APP_FIREBASE_STORAGE_BUCKET,
    messagingSenderID : environment.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
    appId : environment.REACT_APP_FIREBASE_APP_ID,    
}

export { firebaseConfig };