import { Component, inject } from '@angular/core';

import { StepperService } from '../../services/stepper.service';

@Component({
  selector: 'app-preferences-step',
  standalone: true,
  imports: [],
  templateUrl: './preferences-step.component.html',
  styleUrl: './preferences-step.component.scss',
})
export class PreferencesStepComponent {
  private stepperService = inject(StepperService);

  prevStep(): void {
    this.stepperService.prevStep();
    this.stepperService.redirectTo('/stepper/details');
  }

  nextStep(): void {
    this.stepperService.setStepData({
      stepName: 'preferences',
      data: {
        receiveEmails: false,
        receiveNotifications: true,
      },
    });

    this.stepperService.nextStep();
    this.stepperService.redirectTo('/stepper/complete');
  }
}
