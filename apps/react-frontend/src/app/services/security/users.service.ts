import firebase from '../../utils/firebase/firebase';
import BaseHttpService from '../base-http.service';

class UsersService extends BaseHttpService {
  private URL = '/users';

  async login() {
    const firebaseUser = await firebase.auth().currentUser;
    console.log('lena-dev firebaseUser', firebaseUser);

    const idToken = await firebase.auth().currentUser?.getIdToken(true);
    console.log('lena-dev token', idToken);

    if (idToken) {
      this.saveToken(idToken);
    }

    //const user =
  }

  // async getUserData() {

  // }
}

export default new UsersService();
