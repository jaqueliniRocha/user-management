import { DeleteResult, getCustomRepository } from 'typeorm';
import UserRepository from '../repositories/UserRepository';

class DeleteUserService {

    public async execute(id: string): Promise<void> {
        const userRepository = getCustomRepository(UserRepository);

        const user = await userRepository.findOne(id);

        if(!user){
            throw Error('User not found');
        }

        await userRepository.delete(id);
    }

}

export default DeleteUserService;