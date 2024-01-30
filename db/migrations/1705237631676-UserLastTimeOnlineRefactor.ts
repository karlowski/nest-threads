import { MigrationInterface, QueryRunner } from "typeorm";

export class UserLastTimeOnlineRefactor1705237631676 implements MigrationInterface {
    name = 'UserLastTimeOnlineRefactor1705237631676'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` RENAME COLUMN \`lastTimeOnline\` TO \`last_time_online\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` RENAME COLUMN \`last_time_online\` TO \`lastTimeOnline\``);
    }

}
