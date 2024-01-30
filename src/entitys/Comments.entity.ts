import { AfterInsert, BeforeUpdate, Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Posts } from './Posts.entity';
import { Users } from "./users.entity";

@Entity("comments")
@Index('idx_title_content_fulltext', ['title', 'content'], { fulltext: true })
export class Comments {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    postId: number;

    @Column({ nullable: true })
    authorId: number;

    @Column({ nullable: true })
    parentId: number;

    @Column({ nullable: false, type: "varchar", length: 255 })
    title: string;

    @Column({ default: true })
    published: boolean;

    @CreateDateColumn({ type: 'datetime', nullable: false })
    createdAt: Date;

    @CreateDateColumn({ type: 'datetime', nullable: true })
    publishedAt: Date;


    @Column({ type: 'text', nullable: false })
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

    @ManyToOne(() => Posts, posts => posts.comments)
    @JoinColumn({ name: 'postId' })
    posts: Posts;

    @ManyToOne(() => Users, users => users.comments)
    @JoinColumn({ name: 'authorId' })
    users: Users;

    @ManyToOne(() => Comments, (comments) => comments.subComments, { nullable: true })
    @JoinColumn({ name: 'parentId' })
    parentComments: Comments;

    @OneToMany(() => Comments, (comments) => comments.parentComments)
    subComments: Comments[];
}