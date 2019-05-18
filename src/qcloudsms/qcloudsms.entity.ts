import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"

@Entity()
export class QcloudSms {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  mobile: string

  @Column()
  randomCode: string

  @Column()
  sendAt: Date
}