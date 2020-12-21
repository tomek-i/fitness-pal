import { Router } from 'express';
import hello from './web/hello';
import auth from './web/auth';
// import user from './routes/user';


// guaranteed to get dependencies
export default () => {
	const app = Router();

	hello(app);
 	auth(app);


	return app
}