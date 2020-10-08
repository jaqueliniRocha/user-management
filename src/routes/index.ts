import { Router } from 'express';
import usersRouter from './users.routes';
import profilesRouter from './profiles.routes';

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/profiles", profilesRouter);

export default routes;