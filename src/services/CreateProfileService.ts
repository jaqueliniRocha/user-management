import { getCustomRepository } from 'typeorm';

import Profile from '../models/Profile';
import ProfileRepository from '../repositories/ProfileRepository';

class CreateProfileService {

    public async execute(name: string): Promise<Profile> {
        const profileRepository = getCustomRepository(ProfileRepository);
        
        if(!name){
            throw Error('name is null');
        }

        const profile = profileRepository.create({name});

        await profileRepository.save(profile);

        return profile;
    }

}

export default CreateProfileService;