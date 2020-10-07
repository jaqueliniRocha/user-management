import User from '../models/User';
import UserRepository from '../repositories/UserRepository';

interface UserRequest {
    name: string, 
    email: string, 
    password: string, 
    profiles: string[]
}

class CreateUserService {

    private userRepository: UserRepository;

    constructor(userRepository: UserRepository){
        this.userRepository = userRepository;
    }

    public execute({name, email, password, profiles}: UserRequest): User {
        if(password == null){
            throw Error('Password is null');
        }

        const user = this.userRepository.create({
            name, email, password, profiles
        });

        return user;
    }

}

export default CreateUserService;