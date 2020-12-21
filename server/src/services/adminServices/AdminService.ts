import {IUser,IUserInputDTO} from '../../interfaces/IUser';
import User from '../../models/User'


export default class AdminService{


    /**
     * Returns all users within the system.
     */
    public async ListAllUsers():Promise<{users:IUser[]}>{

        try {
            const allUsers = await User.find();

            const users:IUser[] = allUsers.map((user) =>
                {   const u = user.toObject();
                    Reflect.deleteProperty(u, 'password');
                return u;
            });
            return {users};
        } catch (error) {
            throw error;
        }

    }

    public async AddExercise(userInputDTO: IUserInputDTO):Promise<{user:IUser}>{

        /*
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
          */
         return null;
    }


}