
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeUpdate, ManyToOne, JoinColumn, AfterInsert } from 'typeorm';
import { Users } from './users.entity';

@Entity('posts')
export class Posts {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    authorId: number;

    @Column({ default: null })
    parentId: number;

    @Column({ nullable: false, type: 'varchar', length: 255 })
    title: string;

    @Column({ nullable: false, type: 'varchar', length: 255 })
    metaTitle: string;

    @Column({ nullable: false, type: 'varchar', length: 255 })
    slug: string;

    @Column({ nullable: false, type: 'text' })
    summary: string;

    @Column({ nullable: false })
    published: boolean;

    @CreateDateColumn({ type: 'datetime', nullable: false })
    createdAt: Date;

    @UpdateDateColumn({ type: 'datetime', nullable: true })
    updatedAt: Date;

    @Column({ type: 'datetime', nullable: true })
    publishedAt: Date;


    @Column({ type: 'text', nullable: true })
    content: string;

    @AfterInsert()
    setPublishedAt() {
        if (this.published) {
            this.publishedAt = new Date();
        } else {
            this.publishedAt = null;
        }
    }

    @BeforeUpdate()
    updatePublishedAt() {
        if (this.published == true) {
            this.publishedAt = new Date();
        }
        if (this.published == false) {
            this.publishedAt = null;
        }
        this.publishedAt = new Date();
    }
    @ManyToOne(() => Users, user => user.post)
    @JoinColumn({ name: 'authorId' })
    user: Users;
}