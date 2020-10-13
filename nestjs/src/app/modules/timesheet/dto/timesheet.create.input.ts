import { IsEmail, IsOptional } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TimesheetCreateInput {
  userId: string;
}
