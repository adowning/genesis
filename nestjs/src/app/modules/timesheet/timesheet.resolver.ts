import {
  UseGuards,
  ValidationPipe,
  InternalServerErrorException,
} from '@nestjs/common';
import { Args, Context, Mutation, Query, Resolver } from '@nestjs/graphql';
import get from 'lodash.get';
import {
  ResolverContext,
  TIMESHEET_VALIDATION_ERROR,
  VALIDATION_ERROR,
} from '../../../core';
import { GqlAuthGuard } from '../auth';
import {
  TimesheetCreateInput,
  StartTimesheetResult,
  MyTimesheets,
} from './dto';

import { Timesheet } from './models';
import { TimesheetService } from './timesheet.service';
import { User, UserService } from '..';
import { UserWhereInput } from '../user';

// const emptyValidationResult = { code: null, message: null };
// const emptyAuthPayload = { token: null, tokenExpiry: null, timesheet: null };

@Resolver(() => Timesheet)
export class TimesheetResolver {
  constructor(
    private readonly timesheetService: TimesheetService,
    private readonly userService: UserService,
  ) {}

  @Query(() => MyTimesheets)
  @UseGuards(GqlAuthGuard)
  async myTimesheets(
    @Context() ctx: ResolverContext,
  ): Promise<typeof MyTimesheets> {
    try {
      const user: User = get(ctx, 'req.user', null);
      if (user) {
        const timesheets = await this.timesheetService.findAllOfUser(user.id);
        console.log(timesheets);
        return { timesheets: timesheets, timesheet: null };
      } else {
        return {
          code: VALIDATION_ERROR.UNAUTHORIZED,
          message: 'Not authorized',
        };
      }
    } catch (e) {
      throw new InternalServerErrorException(e);
    }
  }

  @Mutation(() => StartTimesheetResult)
  @UseGuards(GqlAuthGuard)
  async startTimesheet(
    @Context() ctx: ResolverContext,
  ): Promise<typeof StartTimesheetResult> {
    try {
      const user: User = get(ctx, 'req.user', null);
      if (user.clockedIn == true) {
        const message = `User ${user.name} is already clocked in`;
        return {
          code: TIMESHEET_VALIDATION_ERROR.ALREADY_CLOCKED_IN,
          message,
        };
      }

      const timesheetnameExists = await this.timesheetService.findUserActive(
        user.id,
      );
      console.log(timesheetnameExists);

      if (timesheetnameExists.length > 0) {
        const message = `timesheetactive ${timesheetnameExists} is already in use`;
        return {
          code: TIMESHEET_VALIDATION_ERROR.ALREADY_CLOCKED_IN,
          message,
        };
      }
      const timesheetCreateInput = new TimesheetCreateInput();
      timesheetCreateInput.userId = user.id;
      const timesheet = await this.timesheetService.create({
        ...timesheetCreateInput,
      });
      if (timesheet) {
        const input = new UserWhereInput();
        input.id = user.id;
        user.clockedIn = true;
        await this.userService.update(user, input);
        return { timesheet: timesheet, timesheets: [] };
      }
    } catch (error) {
      throw new InternalServerErrorException(error);
    }
  }
}
