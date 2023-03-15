import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { Strategy, ExtractJwt } from 'passport-firebase-jwt';
import { User } from '../../db/security/user.entity';
import { Repository } from 'typeorm';
import firebase from 'firebase-admin';
import * as firebaseConfig from '../../firebase/dodgeball-firebase-adminsdk.json';

const firebase_params = {
  type: firebaseConfig.type,
  projectId: firebaseConfig.project_id,
  privateKeyId: firebaseConfig.private_key_id,
  privateKey: firebaseConfig.private_key,
  clientEmail: firebaseConfig.client_email,
  clientId: firebaseConfig.client_id,
  authUri: firebaseConfig.auth_uri,
  tokenUri: firebaseConfig.token_uri,
  authProviderX509CertUrl: firebaseConfig.auth_provider_x509_cert_url,
  clientC509CertUrl: firebaseConfig.client_x509_cert_url,
};

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy, 'firebase-auth') {
  private defaultApp: any;

  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });

    this.defaultApp = firebase.initializeApp({
      credential: firebase.credential.cert(firebase_params),
    });
  }

  async validate(token: string): Promise<User> {
    console.log('payload', token);
    //let user: User;

    console.log('lena-dev payload', token);

    const firebaseUser: any = await this.defaultApp
      .auth()
      .verifyIdToken(token, true)
      .catch((err) => {
        console.log(err);
        throw new UnauthorizedException(err.message);
      });
    if (!firebaseUser) {
      throw new UnauthorizedException();
    }

    //if (payload.firebase.sign_in_provider) {
    const user = await this.userRepository.findOne({
      where: { phoneNumber: firebaseUser.phone_number },
    });
    // } else {
    //   //for another type of authentication user should be searched by another criteria
    // }

    if (!user) {
      throw new UnauthorizedException();
    }

    return user;
  }
}
