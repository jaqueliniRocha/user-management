import { Router } from 'express';
import UserRepository from '../repositories/UserRepository';
import CreateUserService from '../services/CreateUserService'

const usersRouter = Router();
const userRepository = new UserRepository();

usersRouter.post('/', (request, response) => {
    try {
        const { name, email, password, profiles } = request.body;

        const createUserService = new CreateUserService(userRepository);

        return response.json( createUserService.execute({name, email, password, profiles}));
    } catch (err) {
        response.status(400).json( { error: err.message } );
    }
})

usersRouter.get('/', (request, response) => {
    return response.json( userRepository.findAll() );
})

export default usersRouter;