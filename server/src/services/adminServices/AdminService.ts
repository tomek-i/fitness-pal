import {IUser,IUserInputDTO} from '../../interfaces/IUser';
import {IExercise,IExerciseInputDTO} from '../../interfaces/workout/IExercise';
import User from '../../models/User'
import Exercise from '../../models/Exercise'

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

    public async AddExercise(excerciseInputDTO:IExerciseInputDTO):Promise<{excercise:IExercise}>{

        try{
          const excercise = await new Exercise({
              ...excerciseInputDTO,
          }).save();

            return { excercise };

          } catch (e) {

            throw e;
          }
      }

}