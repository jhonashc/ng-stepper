import { Routes } from '@angular/router';

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
        loadComponent: () =>
          import('./pages/preferences-step/preferences-step.component').then(
            (m) => m.PreferencesStepComponent
          ),
      },
      {
        path: 'complete',
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
    redirectTo: 'stepper',
  },
  {
    path: '**',
    redirectTo: 'stepper',
  },
];
