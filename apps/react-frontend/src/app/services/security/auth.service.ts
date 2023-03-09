import { User } from '../../models';
import firebase from '../../utils/firebase/firebase';
import BaseHttpService from '../base-http.service';

class AuthService extends BaseHttpService {
  private URL = 'auth';

  async login(): Promise<User> {
    const firebaseUser = firebase.auth().currentUser;
    console.log('lena-dev firebaseUser', firebaseUser);

    const idToken = await firebase.auth().currentUser?.getIdToken(true);
    console.log('lena-dev token', idToken);

    if (idToken) {
      this.saveToken(idToken);
    }

    return this.get<User>(`auth/user-data`);
  }
}

export default new AuthService();
