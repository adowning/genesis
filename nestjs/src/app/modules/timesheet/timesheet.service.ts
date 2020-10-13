import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import head from 'lodash.head';
import {
  FindManyOptions,
  FindOneOptions,
  Repository,
  UpdateResult,
} from 'typeorm';
import { CryptoService } from '../auth/crypto.service';
import { USER_STATUS_ACTIVE } from './../../constants';
import { TimesheetWhereInput } from './dto/timesheet.where.input';
import Timesheet from './models/timesheet.entity';

import { TimesheetCreateInput } from './dto/timesheet.create.input';
import { TimesheetUpdateInput } from './dto/timesheet.update.input';

@Injectable()
export class TimesheetService {
  constructor(
    @InjectRepository(Timesheet)
    private readonly timesheetRepository: Repository<Timesheet>,
    private readonly cryptoService: CryptoService,
  ) {}

  public async update(
    timesheet: Partial<Timesheet>,
    where: TimesheetWhereInput,
  ): Promise<UpdateResult> {
    const result: UpdateResult = await this.timesheetRepository.update(
      where,
      timesheet,
    );
    return result;
  }

  public async find(
    criteria: FindManyOptions<Timesheet>,
  ): Promise<Array<Timesheet>> {
    const result: Array<Timesheet> = await this.timesheetRepository.find(
      criteria,
    );
    return result;
  }
  public async findAllOfUser(userId: string): Promise<Array<Timesheet>> {
    const result: Array<Timesheet> = await this.timesheetRepository.find({
      where: { userId },
    });
    return result;
  }
  public async findUserActive(userId: string): Promise<Array<Timesheet>> {
    const result: Array<Timesheet> = await this.timesheetRepository.find({
      where: { userId },
    });

    return result.filter((r) => r.isActive === true);
  }
  public async findOne(
    criteria: FindOneOptions<Timesheet>,
  ): Promise<Timesheet> {
    const timesheets: Timesheet = await this.timesheetRepository.findOne(
      criteria,
    );
    return timesheets;
  }

  public async findById(id: string): Promise<Timesheet> {
    const timesheet: Timesheet = head(
      await this.timesheetRepository.findByIds([id], { take: 1 }),
    );
    return timesheet;
  }

  public async findByUserId(userId: string): Promise<Timesheet> {
    const timesheet: Timesheet = await this.timesheetRepository.findOne({
      where: { userId },
    });
    return timesheet;
  }

  public async exists(criteria: FindOneOptions<Timesheet>): Promise<boolean> {
    const timesheet = await this.timesheetRepository.findOne(criteria);
    return timesheet ? true : false;
  }

  public async encrypt(password: string): Promise<string> {
    return await this.cryptoService.hashPassword(password);
  }

  public async create(timesheet: Partial<Timesheet>): Promise<Timesheet> {
    const newTimesheet = await this.timesheetRepository.create({
      ...timesheet,
    });
    await newTimesheet.save();
    return newTimesheet;
  }

  /**
   * Seed all resources.
   *
   * @function
   */
  public createAll(
    timesheets: Array<Partial<Timesheet>>,
  ): Array<Promise<Partial<Timesheet>>> {
    return timesheets.map(async (timesheet: Partial<Timesheet>) => {
      try {
        const record = await this.findByUserId(timesheet.userId);
        if (record) {
          return Promise.resolve({
            ...record,
            ...timesheet,
            status: USER_STATUS_ACTIVE,
            emailVerified: true,
          });
        }
        return Promise.resolve(
          await this.timesheetRepository.create(timesheet),
        );
      } catch (error) {
        Promise.reject(error);
      }
    });
  }

  public async saveAll(
    timesheets: Array<Partial<Timesheet>>,
  ): Promise<Array<Timesheet>> {
    try {
      const savedTimesheets = await this.timesheetRepository.save(timesheets);
      return savedTimesheets;
    } catch (error) {
      Promise.reject(error);
    }
  }
}
