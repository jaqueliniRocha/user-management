import { getCustomRepository, UpdateResult } from 'typeorm';
import Profile from '../models/Profile';
import ProfileRepository from '../repositories/ProfileRepository';

class UpdateProfileService {

    public async execute(oldName: string, name: string): Promise<Profile> {
        const profileRepository = getCustomRepository(ProfileRepository);
        
        if(name == null){
            throw Error('name is null');
        }

        const profile = await profileRepository.findByName(oldName);

        if(profile == null){
            throw Error('Profile not found');
        }

        return await profileRepository.save(
            {
                id: (profile.id), 
                name: name
            });
    }

}

export default UpdateProfileService;