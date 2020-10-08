import { getCustomRepository } from 'typeorm';
import Profile from '../models/Profile';

import User from '../models/User';
import UserRepository from '../repositories/UserRepository';
import ProfileRepository from '../repositories/ProfileRepository';

interface UserRequest {
    name: string, 
    email: string, 
    password: string, 
    profile: string
}

class CreateUserService {

    public async execute({name, email, password, profile}: UserRequest): Promise<User> {
        const userRepository = getCustomRepository(UserRepository);
        const profileRepository = getCustomRepository(ProfileRepository);
        
        if(await profileRepository.findByName(profile) == null){
            throw Error('Profile name not found');
        }

        const user = userRepository.create({
            name, 
            email, 
            password, 
            profile: new Profile(profile)
        });

        await userRepository.save(user);

        return user;
    }

}

export default CreateUserService;