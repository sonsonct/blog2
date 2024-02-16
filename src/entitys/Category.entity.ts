import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Posts } from "./Posts.entity";
import { Faq } from "./Faq.entity";

@Entity("category")
export class Category {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: true })
    parentId: number;

    @Column({ nullable: false, type: "varchar", length: 255, unique: true })
    categoryName: string;

    @OneToMany(() => Posts, (post) => post.category)
    post: Posts[]

    @ManyToOne(() => Category, (category) => category.subCategories, { nullable: true })
    @JoinColumn({ name: 'parentId' })
    parentCategory: Category;

    @OneToMany(() => Category, (category) => category.parentCategory)
    subCategories: Category[];

    @OneToMany(() => Faq, (faq) => faq.category)
    faq: Faq[]
}