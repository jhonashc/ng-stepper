import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { Router } from '@angular/router';

import { Step, StepInfo, StepperState } from '../interfaces/stepper.interface';

import { StepName } from '../types/stepper.type';

@Injectable({
  providedIn: 'root',
})
export class StepperService {
  private STEPPER_LOCAL_STORAGE_KEY = 'stepper-storage';

  private router = inject(Router);

  private _stepperState = signal<StepperState>({
    currentIndex: 0,
    steps: {},
  });

  public stepList: Step[] = [
    {
      id: 1,
      label: 'Details',
      route: '/stepper/details',
      name: 'details',
    },
    {
      id: 2,
      label: 'Preferences',
      route: '/stepper/preferences',
      name: 'preferences',
    },
    {
      id: 3,
      label: 'Complete',
      route: '/stepper/complete',
    },
  ];

  public stepperState = computed(() => this._stepperState());
  public currentIndex = computed(() => this.stepperState().currentIndex);
  public currentRoute = computed(() => this.stepList[this.currentIndex()].route);

  constructor() {
    effect(() => this.loadFromLocalStorage(), { allowSignalWrites: true });
    effect(() => this.saveToLocalStorage());
  }

  nextStep(): void {
    this._stepperState.update((state) => ({
      ...state,
      currentIndex: state.currentIndex + 1,
    }));
  }

  prevStep(): void {
    this._stepperState.update((state) => ({
      ...state,
      currentIndex: state.currentIndex - 1,
    }));
  }

  setCurrentIndex(index: number): void {
    this._stepperState.update((state) => ({
      ...state,
      currentIndex: index,
    }));
  }

  setStepData({ name, data }: StepInfo): void {
    this._stepperState.update((state) => ({
      ...state,
      steps: {
        ...state.steps,
        [name]: data,
      },
    }));
  }

  isStepCompleted(name: StepName): boolean {
    return this._stepperState().steps.hasOwnProperty(name);
  }

  redirectTo(route: string): void {
    this.router.navigateByUrl(route);
  }

  saveToLocalStorage(): void {
    localStorage.setItem(
      this.STEPPER_LOCAL_STORAGE_KEY,
      JSON.stringify(this._stepperState())
    );
  }

  loadFromLocalStorage(): void {
    const stepperState: string | null = localStorage.getItem(
      this.STEPPER_LOCAL_STORAGE_KEY
    );

    if (!stepperState) return;

    this._stepperState.set(JSON.parse(stepperState));
  }
}
