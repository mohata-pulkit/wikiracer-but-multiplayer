import { Migration } from '@mikro-orm/migrations';

export class Migration20220204135725 extends Migration {

  async up(): Promise<void> {
    this.addSql('create table "lobby" ("uuid" text not null, "created_at" timestamptz(0) not null, "updated_at" timestamptz(0) not null, "users" jsonb not null, "start_article" text null, "end_article" text null, "options" jsonb null);');
    this.addSql('alter table "lobby" add constraint "lobby_pkey" primary key ("uuid");');
  }

}
