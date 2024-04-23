import { inject } from '@angular/core';
import { CanActivateFn, Router, UrlTree } from '@angular/router';

import { StepperService, StepsType } from '../services/stepper.service';

export function canActiveStepGuard(stepName: StepsType): CanActivateFn {
  return (): boolean | UrlTree => {
    const router = inject(Router);
    const stepperService = inject(StepperService);

    return (
      stepperService.isStepCompleted(stepName) ||
      router.createUrlTree([stepperService.currentRoute()])
    );
  };
}
