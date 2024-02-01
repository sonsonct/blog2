import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Posts } from "./Posts.entity";

@Entity("media")
export class Media {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    postId: number;

    @Column({ nullable: false, type: "text" })
    url: string;

    @ManyToOne(() => Posts, post => post.media)
    @JoinColumn({ name: 'postId' })
    post: Posts;
}