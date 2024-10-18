import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { PassportStrategy } from '@nestjs/passport';
import { Strategy, ExtractJwt } from 'passport-jwt';
import { Users } from '../schemas/auth.schema';
import { Model } from 'mongoose';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @InjectModel(Users.name)
    private userModel: Model<Users>,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload) {
    const { sub } = payload;
    console.log('payload',payload)
    const user = await this.userModel.findById(sub);
console.log('user',user)
    if (!user) {
      throw new UnauthorizedException('Please Login First Login');
    }

    return user;
  }
}
