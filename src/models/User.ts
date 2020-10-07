import { uuid } from 'uuidv4';

class User {
    id: string; 

    name: string;

    email: string;

    password: string;

    profiles: string[]

    constructor({name, email, password, profiles} : Omit<User, 'id'>) {
        this.id = uuid();
        this.name = name;
        this.password = password;
        this.email = email;
        this.profiles = profiles;
    }
}

export default User;