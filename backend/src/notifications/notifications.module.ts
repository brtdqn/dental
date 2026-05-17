import { Module, Global } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import NotificationsGateway from './notifications.gateway';

import { JwtModule } from '@nestjs/jwt';

@Global()
@Module({
  imports: [JwtModule],
  providers: [NotificationsService, NotificationsGateway],
  exports: [NotificationsService, NotificationsGateway],
})
export class NotificationsModule {}
