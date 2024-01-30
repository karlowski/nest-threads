import { MigrationInterface, QueryRunner } from "typeorm";

export class IdRefactor1705241509004 implements MigrationInterface {
    name = 'IdRefactor1705241509004'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`ALTER TABLE \`likes\` RENAME COLUMN \`userId\` TO \`user_id\``);
        // await queryRunner.query(`ALTER TABLE \`likes\` RENAME COLUMN \`postId\` TO \`post_id\``);
        // await queryRunner.query(`ALTER TABLE \`likes\` RENAME COLUMN \`commentId\` TO \`comment_id\``);
        // await queryRunner.query(`ALTER TABLE \`comments\` RENAME COLUMN \`userId\` TO \`user_id\``);
        // await queryRunner.query(`ALTER TABLE \`comments\` RENAME COLUMN \`postId\` TO \`post_id\``);
        // await queryRunner.query(`ALTER TABLE \`comments\` RENAME COLUMN \`parentCommentId\` TO \`parent_comment_id\``);
        // await queryRunner.query(`ALTER TABLE \`posts\` RENAME COLUMN \`userId\` TO \`user_id\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`likes\` RENAME COLUMN \`user_id\` TO \`userId\``);
        await queryRunner.query(`ALTER TABLE \`likes\` RENAME COLUMN \`post_id\` TO \`postId\``);
        await queryRunner.query(`ALTER TABLE \`likes\` RENAME COLUMN \`comment_id\` TO \`commentId\``);
        await queryRunner.query(`ALTER TABLE \`comments\` RENAME COLUMN \`user_id\` TO \`userId\``);
        await queryRunner.query(`ALTER TABLE \`comments\` RENAME COLUMN \`post_id\` TO \`postId\``);
        await queryRunner.query(`ALTER TABLE \`comments\` RENAME COLUMN \`parent_comment_id\` TO \`parentCommentId\``);
        await queryRunner.query(`ALTER TABLE \`posts\` RENAME COLUMN \`user_id\` TO \`userId\``);
    }
}
