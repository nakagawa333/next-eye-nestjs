import { StoresTagsEntity } from 'src/storeTags/entities/stores-tags.entity';
import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';

@Entity('stores')
export class StoresEntity extends BaseEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ type: 'uuid', name: 'store_id', nullable: false })
    storeId: string;

    @Column({ type: 'varchar', length: 100, name: 'store_name', nullable: false })
    storeName: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    address: string;

    @Column({ type: 'varchar', length: 100, nullable: false })
    content: string;

    @Column({ type: 'double precision', nullable: false })
    lat: number;

    @Column({ type: 'double precision', nullable: false })
    lng: number;

    @CreateDateColumn({ name: 'created_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdA: Date;

    @UpdateDateColumn({ name: 'updated_at', type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    updatedAt: Date;

    //中間テーブルとのリレーション（1対多）
    @OneToMany(() => StoresTagsEntity, (storeTag) => storeTag.store)
    storeTags: StoresTagsEntity[];
}
