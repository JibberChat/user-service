import { Module } from "@nestjs/common";

import { ConfigurationModule } from "@infrastructure/configuration/configuration.module";
import { DatabaseModule } from "@infrastructure/database/database.module";

import { UserModule } from "@modules/user.module";

@Module({
  imports: [ConfigurationModule, UserModule, DatabaseModule],
  providers: [],
})
export class AppModule {}
