import { forwardRef, Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { RedisModule } from 'nestjs-redis';
import { MailService } from './../../../core/mailer/mailer.service';
import { AuthModule } from './../auth/auth.module';
import { CommonModule } from './../common/common.module';
import { Timesheet } from './models/timesheet.entity';
import { TimesheetResolver } from './timesheet.resolver';
import { TimesheetService } from './timesheet.service';
import { UserModule } from '..';

@Module({
  imports: [
    TypeOrmModule.forFeature([Timesheet]),
    JwtModule.registerAsync({
      useFactory: (config: ConfigService) => config.get('jwt').accessToken,
      inject: [ConfigService],
    }),
    RedisModule.forRootAsync({
      useFactory: (configService: ConfigService) => configService.get('redis'),
      inject: [ConfigService],
    }),
    forwardRef(() => AuthModule),
    forwardRef(() => CommonModule),
  ],
  exports: [TimesheetService],
  providers: [TimesheetService, TimesheetResolver, MailService],
})
export class TimesheetModule {}
