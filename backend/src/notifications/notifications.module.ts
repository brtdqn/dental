import { Module, Global } from '@nestjs/common';
import { NotificationsService } from './notifications.service';
import NotificationsGateway from './notifications.gateway';

@Global()
@Module({
  providers: [NotificationsService, NotificationsGateway],
  exports: [NotificationsService, NotificationsGateway],
})
export class NotificationsModule {}
