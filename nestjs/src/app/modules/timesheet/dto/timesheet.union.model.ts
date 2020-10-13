import { createUnionType } from '@nestjs/graphql';
import { ActionResult } from '../../../../core/types/action.model';
import { ValidationResult } from '../../../../core/types/validation.model';
import { Timesheet } from '../models/timesheet.entity';
import { TimesheetPayload } from './timesheet.payload.model';

export const MutateTimesheetResult = createUnionType({
  name: 'MutateTimesheetResult', // the name of the GraphQL union
  types: () => [ActionResult, ValidationResult], // function that returns array of object types classes
  // our implementation of detecting returned object type
  resolveType: (value) => {
    if ('code' in value) {
      return ValidationResult; // we can return object type class (the one with `@ObjectType()`)
    }
    if ('success' in value) {
      return ActionResult; // or the schema name of the type as a string
    }
    return undefined;
  },
});

export const LoginResult = createUnionType({
  name: 'LoginResult', // the name of the GraphQL union
  types: () => [TimesheetPayload, ValidationResult], // function that returns array of object types classes
  // our implementation of detecting returned object type
  resolveType: (value) => {
    if ('code' in value) {
      return ValidationResult; // we can return object type class (the one with `@ObjectType()`)
    }
    if ('timesheet' in value || 'token' in value || 'tokenExpiry' in value) {
      return TimesheetPayload; // or the schema name of the type as a string
    }
    return undefined;
  },
});

export const MyTimesheets = createUnionType({
  name: 'MyTimesheets', // the name of the GraphQL union
  types: () => [ValidationResult, TimesheetPayload], // function that returns array of object types classes
  // our implementation of detecting returned object type
  resolveType: (value) => {
    if ('timesheets' in value) {
      return TimesheetPayload; // or the schema name of the type as a string
    }
    return undefined;
  },
});

export const ConfirmCollaboratorResult = createUnionType({
  name: 'ConfirmCollaboratorResult', // the name of the GraphQL union
  types: () => [TimesheetPayload, ValidationResult], // function that returns array of object types classes
  // our implementation of detecting returned object type
  resolveType: (value) => {
    if ('timesheet' in value) {
      return Timesheet; // or the schema name of the type as a string
    }
    return undefined;
  },
});

export const CollaboratorCreateResult = createUnionType({
  name: 'CollaboratorCreateResult', // the name of the GraphQL union
  types: () => [Timesheet, ValidationResult], // function that returns array of object types classes
  // our implementation of detecting returned object type
  resolveType: (value) => {
    if ('code' in value) {
      return ValidationResult; // we can return object type class (the one with `@ObjectType()`)
    }
    if ('id' in value) {
      return Timesheet; // or the schema name of the type as a string
    }
    return undefined;
  },
});

export const StartTimesheetResult = createUnionType({
  name: 'StartTimesheetResult', // the name of the GraphQL union
  types: () => [ValidationResult, TimesheetPayload], // function that returns array of object types classes
  // our implementation of detecting returned object type
  resolveType: (value) => {
    if ('timesheet' in value) {
      return TimesheetPayload; // or the schema name of the type as a string
    }
    return undefined;
  },
});
