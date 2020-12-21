import { Router, Request, Response } from 'express';

const route = Router();

export default (app: Router) => {
  app.use('/', route);

  route.get('/signup', (req: Request, res: Response) => {
    return  res.render('pages/signup');
  });
};