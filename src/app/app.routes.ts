import { Routes } from '@angular/router';

import { previousStepCompletionGuard } from './guards/previous-step-completion.guard';

export const routes: Routes = [
  {
    path: 'stepper',
    loadComponent: () => import('./layouts/stepper-layout/stepper-layout.component'),
    children: [
      {
        path: 'details',
        loadComponent: () => import('./pages/details-step/details-step.component'),
      },
      {
        path: 'preferences',
        canActivate: [previousStepCompletionGuard('details')],
        loadComponent: () => import('./pages/preferences-step/preferences-step.component'),
      },
      {
        path: 'complete',
        canActivate: [previousStepCompletionGuard('preferences')],
        loadComponent: () => import('./pages/complete-step/complete-step.component'),
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
