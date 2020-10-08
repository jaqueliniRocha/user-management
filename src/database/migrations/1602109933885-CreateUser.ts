import {MigrationInterface, QueryRunner} from "typeorm";
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner";
import Profile from "../../models/Profile";
import User from "../../models/User";

export class CreateUser1602109933885 implements MigrationInterface {

    //cria estrutura do banco
    public async up(queryRunner: MongoQueryRunner): Promise<void> {
        const user = new User();
        user.name = "admin";
        user.email = "admin@admin.com", 
        user.password = "adminpw", 
        user.profile =  new Profile("admin");
        await queryRunner.insertOne('users', user);
    }

    //equivalente ao rollback - desfaz a alteração acima
    public async down(queryRunner: MongoQueryRunner): Promise<void> {
        await queryRunner.deleteOne('users', { name: 'admin'});
    }

}
