import { DetailsStep, PreferencesStep } from '../interfaces/stepper.interface';

export type StepDataActions =
  | { stepName: 'details'; data: DetailsStep }
  | { stepName: 'preferences'; data: PreferencesStep };

export type StepType = Pick<StepDataActions, 'stepName'>;
