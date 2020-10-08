import 'reflect-metadata';

import { Router } from 'express';
import { getCustomRepository } from 'typeorm';

import ProfileRepository from '../repositories/ProfileRepository';
import CreateProfileService from '../services/CreateProfileService'

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
    const { name } = request.params;
    const profileRepository = getCustomRepository(ProfileRepository);
    const profiles = await profileRepository.delete({name: name});
    return response.json( profiles );
})

export default profilesRouter;