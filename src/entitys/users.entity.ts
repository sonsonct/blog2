import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Posts } from './Posts.entity';
import { Roles } from './Roles.entity';

@Entity('users')
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, type: 'varchar', length: 255 })
    First_Name: string;

    @Column({ nullable: false, type: 'varchar', length: 255 })
    Middle_Name: string;

    @Column({ nullable: false, type: 'varchar', length: 255 })
    Last_Name: string;

    @Column({ nullable: false, type: 'varchar', length: 20, unique: true })
    Mobile: string;

    @Column({ nullable: false, type: 'varchar', length: 255, unique: true })
    Email: string;

    @Column({ nullable: false, type: 'varchar', length: 255 })
    Password_Hash: string;

    @CreateDateColumn({ type: 'timestamp' })
    Registered_At: Date;

    @CreateDateColumn({ type: 'timestamp' })
    Last_Login: Date;

    @Column({ nullable: false, type: 'text' })
    Intro: string;

    @Column({ nullable: false, type: 'text' })
    Profile: string;

    @Column({ nullable: false, default: 3 })
    role_id: number;

    @OneToMany(() => Posts, (post) => post.user)
    post: Posts[]

    @ManyToOne(() => Roles, role => role.user)
    @JoinColumn({ name: 'role_id' })
    role: Roles;
}