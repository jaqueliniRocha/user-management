import { getCustomRepository, UpdateResult } from 'typeorm';
import User from '../models/User';
import UserRepository from '../repositories/UserRepository';
import ProfileRepository from '../repositories/ProfileRepository';

interface UserRequest {
    name: string, 
    email: string, 
    password: string, 
    profileName: string
}

class UpdateUserService {

    public async execute(id: string, {name, email, password, profileName}: UserRequest): Promise<User> {
        const userRepository = getCustomRepository(UserRepository);
        const profileRepository = getCustomRepository(ProfileRepository);

        const profile = await profileRepository.findByName(profileName);
        
        if(profile == null){
            throw Error('Profile name not found');
        }

        const oldUser = await userRepository.findOne(id);

        if(oldUser == null){
            throw Error('User not found');
        }

        return await userRepository.save({
            id,
            name, 
            email, 
            password, 
            profileId: profile.id
        });
    }

}

export default UpdateUserService;