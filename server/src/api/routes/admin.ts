
import { Router, Request, Response, NextFunction } from 'express';
import User from "../../models/User";
import AdminService from "../../services/adminServices/AdminService";


const route = Router();

export default (app: Router) => {
    const service = new AdminService();



  app.use('/admin', route);

  route.get('/list/users', async (req: Request, res: Response,next: NextFunction) => {
    try {

        const users = await service.ListAllUsers();
        return res.status(201).json(users);

      } catch (e) {
        // logger.error('🔥 error: %o',  e );
        return next(e);
      }


  });


};