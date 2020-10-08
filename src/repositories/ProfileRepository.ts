import Profile from '../models/Profile';
import { EntityRepository, Repository } from 'typeorm';

@EntityRepository(Profile)
class ProfileRepository extends Repository<Profile> {

    public async findByName(name: string): Promise<Profile | null> {
        const findProfile = await this.findOne({
            where: { name },
        })

        return findProfile || null;
    }
}

export default ProfileRepository;