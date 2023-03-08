import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { firebaseConfig } from './firebase-config';

firebase.initializeApp(firebaseConfig);
export default firebase;

// import { errorMessages } from '../common/error-message.utils';

// import { getFirestore } from "firebase/firestore";
// import { firebaseConfig } from './firebase-config';

// const app = firebase.initializeApp(firebaseConfig);
// const db = getFirestore(app);

// const auth = firebase.auth();
// auth.languageCode = 'en';

// const captchaVerifier = () => {
//     return new RecaptchaVerifier('capthca-verifier', {
//         'size': 'invisible',
//         'callback': (response: any) => {
//             return response;
//         }
//     }, auth);    
// }

// const authPhone = async (phoneNumber: string) => { 
//     console.log('authPhone start');
//     const verifier = captchaVerifier();

//     return signInWithPhoneNumber(auth, phoneNumber, verifier)
//     .then((confirmationResult) => {
//         // SMS sent. Prompt user to type the code from the message, then sign the
//         // user in with confirmationResult.confirm(code).
//         //verifier.clear();
//         console.log('confirmationResult', confirmationResult);
//         return {success: true, confirmationResult, verifier: verifier};
//     }).catch((error) => {
//         //verifier.clear();
//         return {success: false, errorMessage: errorMessages(error), verifier: verifier};
//      })    
// }

// const onAuthStateChangedListener = (callback : () => void) => onAuthStateChanged(auth, callback);

// const logout = () => { 
//     return signOut(auth).then(() => {
//         return { success: true };
//       }).catch((error) => {
//           return { success: false, message: error.message };
//       });
// }

//export { auth, authPhone, onAuthStateChangedListener, logout };
