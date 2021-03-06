import { getRepository } from 'typeorm';
import { sign } from 'jsonwebtoken';

import User from '../models/User';
import authConfig from '../config/auth';

interface Request {
  email: string;
  password: string;
}

interface Response {
  user: User;
  token: string;
}

class AuthenticateUserService {
  public async execute({ email, password }: Request): Promise<Response> {
    const usersRepository = getRepository(User);

    const user = await usersRepository.findOne({ where: { email } });

    if (!user) {
      throw Error('Incorrect email/password combination');
    }

    if (password != user.password) {
      throw Error('Incorrect email/password combination');
    }

    const token = sign({  }, authConfig.jwt.secret, {
        subject: String(user.id),
        expiresIn: authConfig.jwt.expiresIn
    });

    return {
      user,
      token
    };
  }
}

export default AuthenticateUserService;