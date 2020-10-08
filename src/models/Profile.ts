import {Entity, ObjectID, ObjectIdColumn, Column} from "typeorm";

@Entity('profiles')
class Profile {

    @ObjectIdColumn()
    id: string; 

    @Column()
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

export default Profile;