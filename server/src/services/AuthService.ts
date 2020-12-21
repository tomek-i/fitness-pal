import {IUser,IUserInputDTO} from '../interfaces/IUser';
import User from '../models/User'
import argon2 from 'argon2';

export default class AuthService{



    public async SingUp(userInputDTO: IUserInputDTO):Promise<{user:IUser}>{

        // TODO: hash password properly
        const hashedPassword = userInputDTO.password;

        const userRecord = await new User({
            ...userInputDTO,
            password:hashedPassword
        }).save();

        if (!userRecord) {
            throw new Error('User cannot be created');
          }

          // await this.mailer.SendWelcomeEmail(userRecord);

          // this.eventDispatcher.dispatch(events.user.signUp, { user: userRecord });

          const user = userRecord.toObject();
          Reflect.deleteProperty(user, 'password');
          // Reflect.deleteProperty(user, 'salt');
          return { user };
    }

    public async SignIn(email: string, password: string): Promise<{ user: IUser }> {
        const userRecord = await User.findOne({ email });
        if (!userRecord) {
          throw new Error('User not registered');
        }
        /**
         * We use verify from argon2 to prevent 'timing based' attacks
         */

        const validPassword = await argon2.verify(userRecord.password, password);
        if (validPassword) {

          const user = userRecord.toObject();
          Reflect.deleteProperty(user, 'password');
          // Reflect.deleteProperty(user, 'salt');

          return { user };
        } else {
          throw new Error('Invalid Password');
        }
      }


      /*
      private generateToken(user) {
    const today = new Date();
    const exp = new Date(today);
    exp.setDate(today.getDate() + 60);

    /**
     * A JWT means JSON Web Token, so basically it's a json that is _hashed_ into a string
     * The cool thing is that you can add custom properties a.k.a metadata
     * Here we are adding the userId, role and name
     * Beware that the metadata is public and can be decoded without _the secret_
     * but the client cannot craft a JWT to fake a userId
     * because it doesn't have _the secret_ to sign it
     * more information here: https://softwareontheroad.com/you-dont-need-passport
     */

    /*
     this.logger.silly(`Sign JWT for userId: ${user._id}`);
    return jwt.sign(
      {
        _id: user._id, // We are gonna use this in the middleware 'isAuth'
        role: user.role,
        name: user.name,
        exp: exp.getTime() / 1000,
      },
      config.jwtSecret
    );
  }
  */
}