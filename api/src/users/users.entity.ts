import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

const genRandStr = (length: number) => {
  const characters = '0123456789';
  let result = '';
  const charLength = characters.length;

  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * charLength));
  }

  return 'Anon' + result;
};

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('numeric', { default: Math.random() * 999 })
  intraId: number;

  @Column('varchar', { default: genRandStr(6) })
  displayname: string;

  @Column('varchar', { default: genRandStr(6) })
  username: string;

  @Column('varchar', { default: 'https://unsplash.com/photos/ObQ4fncHRHg' })
  picture: string;

  @Column('numeric', { default: 0 })
  wins: number;

  @Column('numeric', { default: 0 })
  losses: number;

  @Column('boolean', { default: false })
  twoFAEnabled;
}
