
import { Router, Request, Response, NextFunction } from 'express';
import AuthService from '../../services/AuthService';
import {IUserInputDTO} from "../../interfaces/IUser";

const route = Router();

export default (app: Router) => {

  const service = new AuthService();


  app.use('/auth', route);

  route.post('/signup', async (req: Request, res: Response,next: NextFunction) => {
    try {


        const { user } = await service.SingUp(req.body as IUserInputDTO);
        return res.status(201).json({ user,});
      } catch (e) {
        // logger.error('🔥 error: %o',  e );
        return next(e);
      }


  });

  route.post('/signin', async (req: Request, res: Response,next: NextFunction) => {
    // return res.json("OK").status(200);


    try {
      const { email, password } = req.body;

      const { user } = await service.SignIn(email, password);
      return res.json({ user }).status(200);
    } catch (e) {
      // logger.error('🔥 error: %o',  e );
      return next(e);
    }


  });
};