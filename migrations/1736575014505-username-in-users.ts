import { MigrationInterface, QueryRunner } from 'typeorm';

export class UsernameInUsers1736575014505 implements MigrationInterface {
  name = 'UsernameInUsers1736575014505';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "profileImagePublicId"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" DROP COLUMN "profileImagePublicUrl"`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "username" character varying NOT NULL`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`ALTER TABLE "user" DROP COLUMN "username"`);
    await queryRunner.query(
      `ALTER TABLE "user" ADD "profileImagePublicUrl" character varying DEFAULT ''`,
    );
    await queryRunner.query(
      `ALTER TABLE "user" ADD "profileImagePublicId" character varying DEFAULT ''`,
    );
  }
}
