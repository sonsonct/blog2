import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Category } from "./category.entity";

@Entity('faq')
@Index('idx_question_answer_fulltext', ['question', 'answer'], { fulltext: true })
export class Faq {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    categoryId: number;

    @Column({ type: "text", nullable: false })
    question: string;

    @Column({ type: "text", nullable: false })
    answer: string;

    @Column()
    published: boolean;

    @ManyToOne(() => Category, category => category.faq)
    @JoinColumn({ name: 'categoryId' })
    category: Category;
}