import { ObjectType } from '@nestjs/graphql';
import Timesheet from '../models/timesheet.entity';

@ObjectType()
export class TimesheetPayload {
  timesheets: Timesheet[];
  timesheet: Timesheet;
}
