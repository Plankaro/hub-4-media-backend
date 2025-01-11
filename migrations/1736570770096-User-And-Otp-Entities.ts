import { MigrationInterface, QueryRunner } from "typeorm";

export class UserAndOtpEntities1736570770096 implements MigrationInterface {
    name = 'UserAndOtpEntities1736570770096'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE "user_otp" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "otp" character varying NOT NULL, "createdAt" TIMESTAMP NOT NULL, "expiresAt" TIMESTAMP NOT NULL, "otpAttempts" integer NOT NULL DEFAULT '0', "otpAuthRestricted" boolean NOT NULL DEFAULT false, "otpAuthRestrictedTill" TIMESTAMP, "userId" uuid, CONSTRAINT "REL_bd81461d078fe46743dd535fb2" UNIQUE ("userId"), CONSTRAINT "PK_494c022ed33e6ee19a2bbb11b22" PRIMARY KEY ("id"))`);
        await queryRunner.query(`CREATE TYPE "public"."user_provider_enum" AS ENUM('google', 'facebook', 'email')`);
        await queryRunner.query(`CREATE TYPE "public"."user_role_enum" AS ENUM('EXTERNAL_USER', 'PROVIDER', 'ADMIN', 'SUPER_ADMIN')`);
        await queryRunner.query(`CREATE TABLE "user" ("id" uuid NOT NULL DEFAULT uuid_generate_v4(), "email" character varying NOT NULL, "isEmailVerified" boolean NOT NULL DEFAULT false, "password" character varying NOT NULL, "hasSetPassword" boolean NOT NULL DEFAULT false, "hasOnboarded" boolean NOT NULL DEFAULT false, "isAdmin" boolean NOT NULL DEFAULT false, "firstName" character varying NOT NULL DEFAULT '', "lastName" character varying NOT NULL DEFAULT '', "profileImagePublicId" character varying DEFAULT '', "profileImagePublicUrl" character varying DEFAULT '', "country" character varying DEFAULT 'NA', "region" character varying DEFAULT 'NA', "timezone" character varying DEFAULT 'NA', "provider" "public"."user_provider_enum" NOT NULL DEFAULT 'email', "providerAuthId" character varying DEFAULT '', "role" "public"."user_role_enum" NOT NULL DEFAULT 'EXTERNAL_USER', "refreshToken" character varying(1024), "createdAt" TIMESTAMP NOT NULL DEFAULT now(), "updatedAt" TIMESTAMP NOT NULL DEFAULT now(), CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY ("id"))`);
        await queryRunner.query(`ALTER TABLE "user_otp" ADD CONSTRAINT "FK_bd81461d078fe46743dd535fb27" FOREIGN KEY ("userId") REFERENCES "user"("id") ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE "user_otp" DROP CONSTRAINT "FK_bd81461d078fe46743dd535fb27"`);
        await queryRunner.query(`DROP TABLE "user"`);
        await queryRunner.query(`DROP TYPE "public"."user_role_enum"`);
        await queryRunner.query(`DROP TYPE "public"."user_provider_enum"`);
        await queryRunner.query(`DROP TABLE "user_otp"`);
    }

}
