import { CanActivateFn, Router, UrlTree } from '@angular/router';
import { inject } from '@angular/core';

import { StepperService } from '../services/stepper.service';

import { StepName } from '../types/stepper.type';

export const previousStepCompletionGuard = (name: StepName): CanActivateFn => {
  return (): boolean | UrlTree => {
    const router = inject(Router);
    const stepperService = inject(StepperService);

    return (
      stepperService.isStepCompleted(name) ||
      router.createUrlTree([stepperService.currentRoute()])
    );
  };
};
