export interface DetailsStep {
  name: string;
  dueDate: Date;
}

export interface PreferencesStep {
  receiveEmails: boolean;
  receiveNotifications: boolean;
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
  label: string;
  route: string;
}
