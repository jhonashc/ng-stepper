import { StepName } from '../types/stepper.type';

export interface DetailsStep {
  name: string;
  dueDate: Date;
}

export interface PreferencesStep {
  receiveEmails: boolean;
  receiveNotifications: boolean;
}

export interface StepInfo {
  name: StepName;
  data: DetailsStep | PreferencesStep;
}

export interface StepperState {
  currentIndex: number;
  steps: {
    details?: DetailsStep;
    preferences?: PreferencesStep;
  };
}

export interface Step {
  id: number;
  name?: StepName;
  label: string;
  route: string;
}
