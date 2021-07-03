import { BaseEntity, BeforeInsert, Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import * as bcrypt from 'bcryptjs';
import { ArticleEntity } from "src/article/article.entity";

@Entity({ name: "users" })
export class UserEntity extends BaseEntity {

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

  @Column({ select: false })
  password: string;

  @OneToMany(() => ArticleEntity, article => article.author)
  articles: ArticleEntity[];

  @BeforeInsert()
  async hashPassword() {
    const salt = await this.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }

  private async genSalt(salt) {
    return await bcrypt.genSalt(salt);
  }

  async comparePassword(password: string): Promise<boolean> {
    return bcrypt.compare(password, this.password);
  }

}