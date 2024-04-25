import { Routes } from '@angular/router';

import { previousStepCompletionGuard } from './guards/previous-step-completion.guard';

export const routes: Routes = [
  {
    path: 'stepper',
    loadComponent: () =>
      import('./layouts/stepper-layout/stepper-layout.component').then(
        (m) => m.StepperLayoutComponent
      ),
    children: [
      {
        path: 'details',
        loadComponent: () =>
          import('./pages/details-step/details-step.component').then(
            (m) => m.DetailsStepComponent
          ),
      },
      {
        path: 'preferences',
        canActivate: [previousStepCompletionGuard('details')],
        loadComponent: () =>
          import('./pages/preferences-step/preferences-step.component').then(
            (m) => m.PreferencesStepComponent
          ),
      },
      {
        path: 'complete',
        canActivate: [previousStepCompletionGuard('preferences')],
        loadComponent: () =>
          import('./pages/complete-step/complete-step.component').then(
            (m) => m.CompleteStepComponent
          ),
      },
      {
        path: '**',
        redirectTo: '',
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'test',
  },
  {
    path: '**',
    redirectTo: 'test',
  },
];
