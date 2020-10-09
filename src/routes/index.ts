import { Router } from 'express';
import usersRouter from './users.routes';
import profilesRouter from './profiles.routes';
import sessionsRouter from './session.routes';

const routes = Router();

routes.use("/users", usersRouter);
routes.use("/profiles", profilesRouter);
routes.use("/sessions", sessionsRouter);

export default routes;