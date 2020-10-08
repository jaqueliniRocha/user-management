import 'reflect-metadata';

import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import UserRepository from '../repositories/UserRepository';
import CreateUserService from '../services/CreateUserService'

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
    try {
        const { name, email, password, profile } = request.body;

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({name, email, password, profile});

        return response.json( user );
    } catch (err) {
        response.status(400).json( { error: err.message } );
    }
})

usersRouter.get('/', async (request, response) => {
    const userRepository = getCustomRepository(UserRepository);
    const users = await userRepository.find();
    return response.json( users );
})

usersRouter.delete('/:id', async (request, response) => {
    const { id } = request.params;
    const userRepository = getCustomRepository(UserRepository);
    const user = await userRepository.delete({id: id});
    return response.status(204);
})

export default usersRouter;