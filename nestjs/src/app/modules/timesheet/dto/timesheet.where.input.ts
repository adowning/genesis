import { IsEmail, IsOptional } from 'class-validator';
import { Field, InputType } from '@nestjs/graphql';

@InputType()
export class TimesheetWhereInput {
  @Field()
  @IsOptional()
  id?: string;

  @Field()
  @IsEmail()
  @IsOptional()
  email?: string;

  @Field()
  @IsOptional()
  name?: string;

  @Field()
  @IsOptional()
  timesheetactive?: boolean;

  @Field()
  @IsOptional()
  googleId?: string;

  @Field()
  @IsOptional()
  facebookId?: string;

  @Field()
  @IsOptional()
  twitterId?: string;

  @Field()
  @IsOptional()
  githubId?: string;

  @Field()
  @IsOptional()
  role?: string;

  @Field()
  @IsOptional()
  status?: string;
}
