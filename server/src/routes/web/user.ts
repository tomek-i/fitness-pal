import { Router, Request, Response } from 'express';


const route = Router();

export default (app: Router) => {


  app.use('/', route);

  // TODO: need middleware to check user's logged in
  route.get('/dashboard', (req: Request, res: Response) => {
    return  res.render('pages/user/dashboard');
  });


};