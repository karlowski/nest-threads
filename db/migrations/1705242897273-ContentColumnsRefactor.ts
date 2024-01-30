import { MigrationInterface, QueryRunner } from "typeorm";

export class ContentColumnsRefactor1705242897273 implements MigrationInterface {
    name = 'ContentColumnsRefactor1705242897273'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`creationTime\``);
        await queryRunner.query(`ALTER TABLE \`posts\` RENAME COLUMN \`postMessage\` TO \`post_message\``);
        await queryRunner.query(`ALTER TABLE \`comments\` RENAME COLUMN \`commentMessage\` TO \`comment_message\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`posts\` RENAME COLUMN \`post_message\` TO \`postMessage\``);
        await queryRunner.query(`ALTER TABLE \`comments\` RENAME COLUMN \`comment_message\` TO \`commentMessage\``);
    }

}
