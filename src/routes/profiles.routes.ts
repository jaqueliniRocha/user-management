import 'reflect-metadata';

import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import ProfileRepository from '../repositories/ProfileRepository';
import CreateProfileService from '../services/CreateProfileService'
import DeleteProfileService from '../services/DeleteProfileService'

const profilesRouter = Router();

profilesRouter.post('/', async (request, response) => {
    try {
        const { name } = request.body;

        const createProfileService = new CreateProfileService();

        const profile = await createProfileService.execute(name);

        return response.json( profile );
    } catch (err) {
        response.status(400).json( { error: err.message } );
    }
})

profilesRouter.get('/', async (request, response) => {
    const profileRepository = getCustomRepository(ProfileRepository);
    const profiles = await profileRepository.find();
    return response.json( profiles );
})

profilesRouter.delete('/:name', async (request, response) => {
    try {
        const { name } = request.params;
        const deleteProfileService = new DeleteProfileService();
        await deleteProfileService.execute(name);
        return response.status(204).send();
    } catch (err) {
        response.status(400).json( { error: err.message } );
    }
})

export default profilesRouter;