
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeUpdate, ManyToOne, JoinColumn, AfterInsert } from 'typeorm';
import { Users } from './users.entity';

@Entity('posts')
export class Posts {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    Author_Id: number;

    @Column({ default: null })
    Parent_Id: number;

    @Column({ nullable: false, type: 'varchar', length: 255 })
    Title: string;

    @Column({ nullable: false, type: 'varchar', length: 255 })
    Meta_Title: string;

    @Column({ nullable: false, type: 'varchar', length: 255 })
    Slug: string;

    @Column({ nullable: false, type: 'text' })
    Summary: string;

    @Column({ nullable: false })
    Published: boolean;

    @CreateDateColumn({ type: 'datetime', nullable: false })
    Created_At: Date;

    @UpdateDateColumn({ type: 'datetime', nullable: true })
    Updated_At: Date;

    @Column({ type: 'datetime', nullable: true })
    Published_At: Date;


    @Column({ type: 'text', nullable: true })
    Content: string;

    @AfterInsert()
    setPublishedAt() {
        if (this.Published) {
            this.Published_At = new Date();
        } else {
            this.Published_At = null;
        }
    }

    @BeforeUpdate()
    updatePublishedAt() {
        if (this.Published == true) {
            this.Published_At = new Date();
        }
        if (this.Published == false) {
            this.Published_At = null;
        }
        this.Updated_At = new Date();
    }
    @ManyToOne(() => Users, user => user.post)
    @JoinColumn({ name: 'Author_Id' })
    user: Users;
}