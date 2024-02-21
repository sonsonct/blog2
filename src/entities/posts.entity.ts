
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BeforeUpdate, ManyToOne, JoinColumn, AfterInsert, Index, OneToMany, ManyToMany, JoinTable } from 'typeorm';
import { Users } from './users.entity';
import { Category } from './category.entity';
import { Comments } from './comments.entity';
import { Media } from './media.entity';
import { Hashtag } from './hashtag.entity';

@Entity('posts')
@Index('idx_title_content_fulltext', ['title', 'content'], { fulltext: true })
export class Posts {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    authorId: number;

    @Column({ nullable: true })
    categoryId: number;

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

    @Column({ nullable: false, default: true })
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

    @ManyToOne(() => Category, category => category.post)
    @JoinColumn({ name: 'categoryId' })
    category: Category;

    @OneToMany(() => Comments, (comments) => comments.posts)
    comments: Comments[]

    @OneToMany(() => Media, (media) => media.post)
    media: Media[]

    @ManyToMany(() => Hashtag, { cascade: true, eager: true })
    @JoinTable({
        name: "posts_hashtag",
    })
    hashtag: Hashtag[];
}