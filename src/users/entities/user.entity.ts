import { BeforeInsert, Column, Entity, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";
import { hash } from "bcrypt";

@Entity()
export class User {

    @PrimaryGeneratedColumn('uuid')
    id: number;

    @Column()
    fullName: string;

    @Column()
    email: string;

    @Column()
    password: string;


    @BeforeInsert()
    async hashPassword() {
        this.password = await hash(this.password, 10);

    }


}
