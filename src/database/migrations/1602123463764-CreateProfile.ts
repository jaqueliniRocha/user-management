import {MigrationInterface, QueryRunner} from "typeorm";
import { MongoQueryRunner } from "typeorm/driver/mongodb/MongoQueryRunner";
import Profile from "../../models/Profile";

export class CreateProfile1602123463764 implements MigrationInterface {

    //cria estrutura do banco
    public async up(queryRunner: MongoQueryRunner): Promise<void> {
        const profileAdmin = new Profile("admin");
        await queryRunner.insertOne('profiles', profileAdmin);

        const profileUser = new Profile("user");
        await queryRunner.insertOne('profiles', profileUser);

        const profileViewer = new Profile("viewer");
        await queryRunner.insertOne('profiles', profileViewer);
    }

    //equivalente ao rollback - desfaz a alteração acima
    public async down(queryRunner: MongoQueryRunner): Promise<void> {
        await queryRunner.deleteOne('profiles', { name: 'admin'});
        await queryRunner.deleteOne('profiles', { name: 'user'});
        await queryRunner.deleteOne('profiles', { name: 'viewer'});
    }

}
