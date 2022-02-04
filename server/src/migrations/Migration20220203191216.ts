import { Migration } from '@mikro-orm/migrations';

export class Migration20220203191216 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "user" ("uuid" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "username" text not null, "email" text not null, "password" text not null, "elo" bigint not null default 12000);');
    this.addSql('alter table "user" add constraint "user_pkey" primary key ("uuid");');
  }

}
