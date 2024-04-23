import { Routes } from '@angular/router';

import { canActiveStepGuard } from './guards/stepper-active.guard';

import { StepperLayoutComponent } from './layouts/stepper-layout/stepper-layout.component';

export const routes: Routes = [
  {
    path: 'stepper',
    component: StepperLayoutComponent,
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
        canActivate: [canActiveStepGuard('details')],
        loadComponent: () =>
          import('./pages/preferences-step/preferences-step.component').then(
            (m) => m.PreferencesStepComponent
          ),
      },
      {
        path: 'complete',
        canActivate: [canActiveStepGuard('preferences')],
        loadComponent: () =>
          import('./pages/complete-step/complete-step.component').then(
            (m) => m.CompleteStepComponent
          ),
      },
      {
        path: '**',
        redirectTo: 'details',
      },
    ],
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'stepper',
  },
  {
    path: '**',
    redirectTo: 'stepper',
  },
];
