import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from "typeorm"

@Entity()
export class BaiduOcr {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  accessToken: string

  @CreateDateColumn()
  createdAt: string
}