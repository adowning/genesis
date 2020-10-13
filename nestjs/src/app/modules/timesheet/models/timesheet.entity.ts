import { User } from '@app/modules/user/models';
import { Field, HideField, ID, ObjectType } from '@nestjs/graphql';
import GraphQLJSON from 'graphql-type-json';
import {
  BaseEntity,
  Column,
  CreateDateColumn,
  Entity,
  Index,
  JoinColumn,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
// import { TimesheetActivity } from './timesheetActivity.entity';

@ObjectType()
@Entity('timesheet', { schema: 'public' })
export class Timesheet extends BaseEntity {
  @Field(() => ID)
  @PrimaryGeneratedColumn('uuid')
  readonly id: string;

  @Field(() => String, { nullable: true })
  @Column('uuid', {
    nullable: true,
    unique: true,
    name: 'userId',
  })
  userId?: string | null;

  @Field()
  @Column('text', {
    nullable: false,
    default: () => 'notsubmitted',
    name: 'status',
  })
  status?: string;

  @Field()
  @Column('boolean', {
    nullable: true,
    default: () => true,
    name: 'is_active',
  })
  isActive: boolean | null;

  @Field(() => String, { nullable: true })
  @Column('timestamp with time zone', {
    nullable: true,
    name: 'start_at',
  })
  startAt?: Date | null;

  @Field(() => String, { nullable: true })
  @Column('timestamp with time zone', {
    nullable: true,
    name: 'end_at',
  })
  endAt?: Date | null;

  @Field(() => Date, { nullable: true })
  @CreateDateColumn({
    nullable: true,
    default: () => 'now()',
    name: 'created_at',
  })
  createdAt: Date | null;

  @Field(() => Date, { nullable: true })
  @UpdateDateColumn({
    nullable: true,
    name: 'updated_at',
  })
  updatedAt: Date | null;

  // @OneToMany(
  //   () => TimesheetActivity,
  //   (timesheetActivity) => timesheetActivity.createdBy,
  //   { lazy: true },
  // )
  // timesheetActivities: TimesheetActivity[];

  @JoinColumn([{ name: 'owner', referencedColumnName: 'id' }])
  owner: User;
}

export default Timesheet;
