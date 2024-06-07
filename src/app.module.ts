import { Module } from '@nestjs/common';
import { ConfigurationModule } from '@infrastructure/configuration/configuration.module';
import { UserModule } from '@modules/user.module';

@Module({
  imports: [ConfigurationModule, UserModule],
  providers: [],
})
export class AppModule {}
