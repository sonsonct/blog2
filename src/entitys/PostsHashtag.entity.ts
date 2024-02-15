import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity("posts_hashtag")
export class PostsHashtag {
    @PrimaryColumn()
    postsId: number;

    @PrimaryColumn()
    hashtagId: number;
}