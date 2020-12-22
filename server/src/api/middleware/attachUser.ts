import mongoose from 'mongoose';
import { IUser } from '../../interfaces/IUser';
import User from '../../models/User';
import {  Request, Response, NextFunction } from 'express';



const attachCurrentUser = async (req: Request, res: Response,next: NextFunction) => {

    try {

      const userRecord = await User.findById(req.token._id);
      if (!userRecord) {
        return res.sendStatus(401);
      }
      const currentUser = userRecord.toObject();

      Reflect.deleteProperty(currentUser, 'password');
      Reflect.deleteProperty(currentUser, 'salt');

      req.currentUser = currentUser;
      return next();
    } catch (e) {
      // Logger.error('🔥 Error attaching user to req: %o', e);
      return next(e);
    }
  };

  export default attachCurrentUser;