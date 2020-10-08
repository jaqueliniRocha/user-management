import 'reflect-metadata';

import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import UserRepository from '../repositories/UserRepository';
import CreateUserService from '../services/CreateUserService'
import DeleteUserService from '../services/DeleteUserService'
import UpdateUserService from '../services/UpdateUserService';

const usersRouter = Router();

usersRouter.post('/', async (request, response) => {
    try {
        const { name, email, password, profile } = request.body;

        const createUserService = new CreateUserService();

        const user = await createUserService.execute({name, email, password, profileName: profile});

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
    try {
        const { id } = request.params;
        const deleteUserService = new DeleteUserService();
        const user = await deleteUserService.execute(id);
        return response.status(204).send();
    } catch (err) {
        response.status(400).json( { error: err.message } );
    }
})

usersRouter.put('/:id', async (request, response) => {
    try {
        const { id } = request.params;
        const { name, email, password, profile } = request.body;
        const updateUserService = new UpdateUserService();
        await updateUserService.execute(id, {name, email, password, profileName: profile});
        return response.status(204).send();
    } catch (err) {
        response.status(400).json( { error: err.message } );
    }
})

export default usersRouter;