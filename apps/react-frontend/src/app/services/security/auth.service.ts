import { User } from '../../store/user/user.types';
import firebase from '../../utils/firebase/firebase';
import BaseHttpService from '../base-http.service';

class AuthService extends BaseHttpService {
  private URL = 'auth';

  async login(): Promise<User> {
    const firebaseUser = firebase.auth().currentUser;
    console.log('lena-dev firebaseUser', firebaseUser);

    const idToken = await firebase.auth().currentUser?.getIdToken(true);
    console.log('lena-dev token', `${this.BASE_URL}/${this.URL}/user-data`);

    if (idToken) {
      this.saveToken(idToken);
    }

    const user = await this.get(`auth/user-data`);
    console.log('lena-dev user', user);
    return user;
  }
}

export default new AuthService();
