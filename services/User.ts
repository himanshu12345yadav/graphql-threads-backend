import client from 'lib/db';
import crypto from 'node:crypto';
import jwt from 'jsonwebtoken';
import { User } from '@prisma/client';
import { GraphQLError } from 'graphql';

class UserService {
  private static hashPassword(password: string, salt: string) {
    return crypto.createHmac('sha256', salt).update(password).digest('hex');
  }

  private static generateJWTToken(user: User) {
    const token = jwt.sign(
      { id: user.id, email: user.email, createdAt: Date.now() },
      process.env.JWT_SECRET as string
    );

    return token;
  }
  public static async createUser(userDetails: any) {
    const { email, firstName, lastName, password } = userDetails;

    const salt = crypto.randomBytes(16).toString('hex');
    const hashedPassword = UserService.hashPassword(password, salt);

    try {
      const user = await client.user.create({
        data: {
          email,
          firstName,
          lastName,
          salt,
          password: hashedPassword,
        },
      });

      return this.generateJWTToken(user);
    } catch (err: unknown) {
      throw new GraphQLError('User already exists', { extensions: { code: 'Bad Request' } });
    }
  }

  public static async getUserToken(payload: { email: string; password: string }) {
    const { email, password } = payload;
    const user = await client.user.findUnique({ where: { email } });

    if (!user) {
      throw new GraphQLError('Wrong username or password', { extensions: { code: 'Forbidden' } });
    }

    const userSalt = user.salt;

    const hashedPassword = this.hashPassword(password, userSalt);

    if (hashedPassword != user.password) {
      throw new GraphQLError('Wrong username or password', { extensions: { code: 'Forbidden' } });
    }

    return this.generateJWTToken(user);
  }
}

export default UserService;
