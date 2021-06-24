import { BeforeInsert, Column, Entity, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcryptjs';

@Entity({ name: "users" })
export class UserEntity {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  email: string;

  @Column()
  username: string;

  @Column({ default: '' })
  bio: string;

  @Column({ default: '' })
  image: string;

  @Column()
  password: string;

  @BeforeInsert()
  async hashPassword() {
    const salt = await this.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  private async genSalt(salt) {
    return await bcrypt.genSalt(salt);
  }

}