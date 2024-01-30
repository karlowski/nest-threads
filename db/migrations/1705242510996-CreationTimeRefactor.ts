import { MigrationInterface, QueryRunner } from "typeorm";

export class CreationTimeRefactor1705242510996 implements MigrationInterface {
    name = 'CreationTimeRefactor1705242510996'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`creationTime\``);
        await queryRunner.query(`ALTER TABLE \`users\` RENAME COLUMN \`creationTime\` TO \`creation_time\``);
        await queryRunner.query(`ALTER TABLE \`likes\` RENAME COLUMN \`creationTime\` TO \`creation_time\``);
        await queryRunner.query(`ALTER TABLE \`comments\` RENAME COLUMN \`creationTime\` TO \`creation_time\``);
        await queryRunner.query(`ALTER TABLE \`posts\` RENAME COLUMN \`creationTime\` TO \`creation_time\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`users\` RENAME COLUMN \`creation_time\` TO \`creationTime\``);
        await queryRunner.query(`ALTER TABLE \`likes\` RENAME COLUMN \`creation_time\` TO \`creationTime\``);
        await queryRunner.query(`ALTER TABLE \`comments\` RENAME COLUMN \`creation_time\` TO \`creationTime\``);
        await queryRunner.query(`ALTER TABLE \`posts\` RENAME COLUMN \`creation_time\` TO \`creationTime\``);
    }

}
