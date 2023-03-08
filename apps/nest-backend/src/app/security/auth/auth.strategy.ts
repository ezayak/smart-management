import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { InjectRepository } from '@nestjs/typeorm';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { User } from '../users/user.entity';
import { Repository } from 'typeorm';
import * as authSecret from './secretOrKey.json';
import { log } from 'console';

@Injectable()
export class AuthStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: authSecret.secretOrKey2,
    });
  }

  async validate(payload): Promise<User> {
    console.log('payload', payload);
    let user: User;

    if (payload.firebase.sign_in_provider) {
      user = await this.userRepository.findOne({
        where: { phoneNumber: payload.phone_number },
      });
    } else {
      //for another type of authentication user should be searched by another criteria
    }

    if (!user) {
      throw new UnauthorizedException();
    }

    console.log('lena-dev user', user);

    return user;
  }
}
