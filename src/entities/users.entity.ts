import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, OneToMany, ManyToOne, JoinColumn } from 'typeorm';
import { Posts } from './posts.entity';
import { Roles } from './roles.entity';
import { Comments } from './comments.entity';
import { Notice } from './notice.entity';

@Entity('users')
export class Users {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false, type: 'varchar', length: 255 })
    firstName: string;

    @Column({ nullable: false, type: 'varchar', length: 255 })
    middleName: string;

    @Column({ nullable: false, type: 'varchar', length: 255 })
    lastName: string;

    @Column({ nullable: false, type: 'varchar', length: 20, unique: true })
    mobile: string;

    @Column({ nullable: false, type: 'varchar', length: 255, unique: true })
    email: string;

    @Column({ nullable: false, type: 'varchar', length: 255 })
    passwordHash: string;

    @Column({ type: 'varchar', default: "abc" })
    avataUser: string;

    @CreateDateColumn({ type: 'timestamp' })
    registeredAt: Date;

    @CreateDateColumn({ type: 'timestamp' })
    lastLogin: Date;

    @Column({ nullable: false, type: 'text' })
    intro: string;

    @Column({ nullable: false, type: 'text' })
    profile: string;

    @Column({ nullable: false, default: 3 })
    roleId: number;

    @OneToMany(() => Posts, (post) => post.user)
    post: Posts[]

    @ManyToOne(() => Roles, role => role.user)
    @JoinColumn({ name: 'roleId' })
    role: Roles;

    @OneToMany(() => Comments, (comments) => comments.users)
    comments: Comments[]

    @OneToMany(() => Notice, (notice) => notice.user)
    notice: Notice[]
}