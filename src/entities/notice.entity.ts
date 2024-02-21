import { Column, CreateDateColumn, Entity, Index, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Users } from "./users.entity";

@Entity("notice")
@Index('idx_contentNotice_fulltext', ['contentNotice'], { fulltext: true })
export class Notice {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    authorId: number;

    @Column({ type: "varchar", length: 255 })
    contentNotice: string;

    @Column({ default: true })
    status: boolean;

    @CreateDateColumn({ type: 'datetime', nullable: false })
    createdAt: Date;

    @ManyToOne(() => Users, user => user.notice)
    @JoinColumn({ name: 'authorId' })
    user: Users;
}