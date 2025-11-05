import { StoresTagsEntity } from "src/storeTags/entities/stores-tags.entity";
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('tags')
export class TagsEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'uuid', name: 'tag_id', nullable: false })
    tagId: string;

    @Column({ type: 'varchar', length: 100, name: 'tag_name', nullable: false })
    tagName: string;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdA: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    //中間テーブルとのリレーション（1対多）
    @OneToMany(() => StoresTagsEntity, (storeTag) => storeTag.store)
    storeTags: StoresTagsEntity[];
}