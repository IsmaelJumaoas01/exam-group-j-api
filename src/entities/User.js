const { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn } = require('typeorm');

@Entity()
class User {
    @PrimaryGeneratedColumn('uuid')
    id;

    @Column({ unique: true })
    username;

    @Column({ unique: true })
    email;

    @Column()
    password;

    @CreateDateColumn()
    createdAt;

    @UpdateDateColumn()
    updatedAt;
}

module.exports = User; 