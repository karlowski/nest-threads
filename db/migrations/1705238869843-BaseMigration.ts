import { MigrationInterface, QueryRunner } from "typeorm";

export class BaseMigration1705238869843 implements MigrationInterface {
    name = 'BaseMigration1705238869843'

    public async up(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`ALTER TABLE \`comments\` CHANGE \`creation_time\` \`creationTime\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        // await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`creation_time\` \`creationTime\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        // await queryRunner.query(`ALTER TABLE \`likes\` CHANGE \`creation_time\` \`creationTime\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        // await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`creation_time\``);
        // await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`last_time_online\``);
        // await queryRunner.query(`ALTER TABLE \`users\` ADD \`lastTimeOnline\` varchar(255) NULL`);
        // await queryRunner.query(`ALTER TABLE \`comments\` DROP COLUMN \`creationTime\``);
        // await queryRunner.query(`ALTER TABLE \`comments\` ADD \`creationTime\` varchar(255) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`posts\` DROP COLUMN \`creationTime\``);
        // await queryRunner.query(`ALTER TABLE \`posts\` ADD \`creationTime\` varchar(255) NOT NULL`);
        // await queryRunner.query(`ALTER TABLE \`likes\` DROP COLUMN \`creationTime\``);
        // await queryRunner.query(`ALTER TABLE \`likes\` ADD \`creationTime\` varchar(255) NOT NULL`);
        // await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_772886e2f1f47b9ceb04a06e20\` ON \`users\` (\`email\`, \`username\`)`);
        // await queryRunner.query(`ALTER TABLE \`comments\` ADD CONSTRAINT \`FK_e44ddaaa6d058cb4092f83ad61f\` FOREIGN KEY (\`postId\`) REFERENCES \`posts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        // await queryRunner.query(`ALTER TABLE \`likes\` ADD CONSTRAINT \`FK_e2fe567ad8d305fefc918d44f50\` FOREIGN KEY (\`postId\`) REFERENCES \`posts\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        // await queryRunner.query(`ALTER TABLE \`likes\` ADD CONSTRAINT \`FK_ec3c75d6522fc60e0ebaf58a6b7\` FOREIGN KEY (\`commentId\`) REFERENCES \`comments\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        // await queryRunner.query(`ALTER TABLE \`likes\` DROP FOREIGN KEY \`FK_ec3c75d6522fc60e0ebaf58a6b7\``);
        // await queryRunner.query(`ALTER TABLE \`likes\` DROP FOREIGN KEY \`FK_e2fe567ad8d305fefc918d44f50\``);
        // await queryRunner.query(`ALTER TABLE \`comments\` DROP FOREIGN KEY \`FK_e44ddaaa6d058cb4092f83ad61f\``);
        // await queryRunner.query(`DROP INDEX \`IDX_772886e2f1f47b9ceb04a06e20\` ON \`users\``);
        // await queryRunner.query(`ALTER TABLE \`likes\` DROP COLUMN \`creationTime\``);
        // await queryRunner.query(`ALTER TABLE \`likes\` ADD \`creationTime\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        // await queryRunner.query(`ALTER TABLE \`posts\` DROP COLUMN \`creationTime\``);
        // await queryRunner.query(`ALTER TABLE \`posts\` ADD \`creationTime\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        // await queryRunner.query(`ALTER TABLE \`comments\` DROP COLUMN \`creationTime\``);
        // await queryRunner.query(`ALTER TABLE \`comments\` ADD \`creationTime\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        // await queryRunner.query(`ALTER TABLE \`users\` DROP COLUMN \`lastTimeOnline\``);
        // await queryRunner.query(`ALTER TABLE \`users\` ADD \`last_time_online\` varchar(255) NULL`);
        // await queryRunner.query(`ALTER TABLE \`users\` ADD \`creation_time\` datetime NULL DEFAULT CURRENT_TIMESTAMP`);
        // await queryRunner.query(`ALTER TABLE \`likes\` CHANGE \`creationTime\` \`creation_time\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        // await queryRunner.query(`ALTER TABLE \`posts\` CHANGE \`creationTime\` \`creation_time\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
        // await queryRunner.query(`ALTER TABLE \`comments\` CHANGE \`creationTime\` \`creation_time\` datetime NOT NULL DEFAULT CURRENT_TIMESTAMP`);
    }

}
