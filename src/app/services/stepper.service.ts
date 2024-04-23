import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

interface FormState {
  selectedIndex: number;
  steps: {
    details?: DetailsStep;
    preferences?: PreferencesStep;
  };
}

export type StepType = keyof FormState['steps'] | 'untrack';

interface FormStep {
  id: number;
  label: string;
  route: string;
  stepType: StepType;
}

interface DetailsStep {
  name: string;
  dueDate: Date;
}

interface PreferencesStep {
  receiveEmails: boolean;
  receiveNotifications: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class StepperService {
  private STEPPER_LOCAL_STORAGE_KEY = 'stepper-storage';

  private router = inject(Router);

  private _formState = signal<FormState>({
    selectedIndex: 0,
    steps: {},
  });

  public formSteps: FormStep[] = [
    {
      id: 1,
      label: 'Details',
      route: '/stepper/details',
      stepType: 'details',
    },
    {
      id: 2,
      label: 'Preferences',
      route: '/stepper/preferences',
      stepType: 'preferences',
    },
    {
      id: 3,
      label: 'Complete',
      route: '/stepper/complete',
      stepType: 'untrack'
    },
  ];

  public formState = computed(() => this._formState());
  public selectedIndex = computed(() => this.formState().selectedIndex);
  public currentRoute = computed(() => this.formSteps[this.selectedIndex()].route);

  constructor() {
    effect(() => this.loadFromLocalStorage(), { allowSignalWrites: true });
    effect(() => this.saveToLocalStorage());
  }

  nextStep(): void {
    this._formState.update((state) => ({
      ...state,
      selectedIndex: state.selectedIndex + 1,
    }));
  }

  prevStep(): void {
    this._formState.update((state) => ({
      ...state,
      selectedIndex: state.selectedIndex - 1,
    }));
  }

  setSelectedIndex(index: number): void {
    this._formState.update((state) => ({
      ...state,
      selectedIndex: index,
    }));
  }

  setDetailsStep(detailsStep: DetailsStep): void {
    this._formState.update((state) => ({
      ...state,
      steps: {
        ...state.steps,
        details: detailsStep,
      },
    }));
  }

  setPreferencesStep(preferencesStep: PreferencesStep): void {
    this._formState.update((state) => ({
      ...state,
      steps: {
        ...state.steps,
        preferences: preferencesStep,
      },
    }));
  }

  isStepCompleted(stepType: StepType): boolean {
    return this._formState().steps.hasOwnProperty(stepType);
  }

  saveToLocalStorage(): void {
    localStorage.setItem(
      this.STEPPER_LOCAL_STORAGE_KEY,
      JSON.stringify(this._formState())
    );
  }

  loadFromLocalStorage(): void {
    const stepperState: string | null = localStorage.getItem(
      this.STEPPER_LOCAL_STORAGE_KEY
    );

    if (!stepperState) return;

    this._formState.set(JSON.parse(stepperState));
  }

  redirectTo(route: string): void {
    this.router.navigateByUrl(route);
  }
}
