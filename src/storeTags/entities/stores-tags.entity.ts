import { StoresEntity } from "src/stores/entities/stores.entity";
import { TagsEntity } from "src/tags/entities/tags.entity";
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('stores_tags')
export class StoresTagsEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'uuid', name: 'stores_tags_id', nullable: false })
    storesTagsId: string;

    @ManyToOne(() => StoresEntity, (store) => store.storeTags, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'store_id' })
    store: StoresEntity;

    @ManyToOne(() => TagsEntity, (tag) => tag.storeTags, { onDelete: 'CASCADE' })
    @JoinColumn({ name: 'tag_id' })
    tag: TagsEntity;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdA: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;
}