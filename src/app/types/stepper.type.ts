import {
  DetailsStep,
  PreferencesStep,
  StepperState,
} from '../interfaces/stepper.interface';

export type StepDataActions =
  | { stepName: 'details'; data: DetailsStep }
  | { stepName: 'preferences'; data: PreferencesStep };

export type StepType = keyof StepperState['steps'];
