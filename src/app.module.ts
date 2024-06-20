import { Module } from '@nestjs/common';
import { ConfigurationModule } from '@infrastructure/configuration/configuration.module';
import { UserModule } from '@modules/user.module';
import { DatabaseModule } from '@infrastructure/database/database.module';

@Module({
  imports: [ConfigurationModule, UserModule, DatabaseModule],
  providers: [],
})
export class AppModule {}
