import { DeleteResult, getCustomRepository } from 'typeorm';
import ProfileRepository from '../repositories/ProfileRepository';

class DeleteProfileService {

    public async execute(name: string): Promise<void> {
        const profileRepository = getCustomRepository(ProfileRepository);
        
        if(!name){
            throw Error('name is null');
        }

        const profile = await profileRepository.findByName(name);

        if(profile == null){
            throw Error('Profile not found');
        }

        await profileRepository.delete({name: name});
    }

}

export default DeleteProfileService;