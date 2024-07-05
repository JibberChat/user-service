import { Module } from "@nestjs/common";

import { ConfigurationModule } from "@infrastructure/configuration/configuration.module";
import { DatabaseModule } from "@infrastructure/database/database.module";
import { LoggerModule } from "@infrastructure/logger/logger.module";

import { UserModule } from "@modules/user.module";

import { UserModule } from "@modules/user.module";

@Module({
  imports: [ConfigurationModule, UserModule, DatabaseModule, LoggerModule],
  providers: [],
})
export class AppModule {}
