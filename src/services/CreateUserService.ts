import { getCustomRepository } from 'typeorm';

import User from '../models/User';
import UserRepository from '../repositories/UserRepository';
import ProfileRepository from '../repositories/ProfileRepository';

interface UserRequest {
    name: string, 
    email: string, 
    password: string, 
    profileName: string
}

class CreateUserService {

    public async execute({name, email, password, profileName}: UserRequest): Promise<User> {
        const userRepository = getCustomRepository(UserRepository);
        const profileRepository = getCustomRepository(ProfileRepository);
        const profile = await profileRepository.findByName(profileName);
        
        if(profile == null){
            throw Error('Profile name not found');
        }

        const user = userRepository.create({
            name, 
            email, 
            password, 
            profileId: profile.id
        });

        await userRepository.save(user);

        return user;
    }

}

export default CreateUserService;