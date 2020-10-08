import { DeleteResult, getCustomRepository } from 'typeorm';
import UserRepository from '../repositories/UserRepository';

class DeleteUserService {

    public async execute(id: string): Promise<DeleteResult> {
        const userRepository = getCustomRepository(UserRepository);

        const user = await userRepository.findOne(id);

        if(user == null){
            throw Error('User not found');
        }

        return await userRepository.delete(id);
    }

}

export default DeleteUserService;