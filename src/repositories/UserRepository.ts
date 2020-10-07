import User from '../models/User';

interface CreateUserDTO {
    name: string, 
    email: string, 
    password: string, 
    profiles: string[]
}

class UserRepository {
    private users: User[];

    constructor(){
        this.users = [];
    }

    public findAll(): User[] {
        return this.users;
    }

    public findById(id: string): User | null {
        return this.users.find(u => id == u.id) || null;
    }

    public create({name, email, password, profiles}: CreateUserDTO): User{
        const user = new User({name, email, password, profiles});

        this.users.push(user);

        return user;
    }
}

export default UserRepository;