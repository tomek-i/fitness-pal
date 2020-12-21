import { Router } from 'express';
import health from "./routes/health"
import auth from './routes/auth';
import admin from './routes/admin';


// guaranteed to get dependencies
export default () => {
	const app = Router();


	health(app);
	auth(app);
	admin(app);

	return app
}