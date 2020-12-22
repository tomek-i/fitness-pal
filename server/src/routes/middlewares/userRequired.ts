import { Router, Request, Response, NextFunction } from 'express';




const UserRequired = async (req: Request, res: Response,next: NextFunction) => {
    // console.log('LOGGED')
    next()
}