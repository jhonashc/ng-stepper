import { Component, inject } from '@angular/core';

import { StepperService } from '../../services/stepper.service';

@Component({
  selector: 'app-preferences-step',
  standalone: true,
  imports: [],
  templateUrl: './preferences-step.component.html',
  styleUrl: './preferences-step.component.scss',
})
export default class PreferencesStepComponent {
  private stepperService = inject(StepperService);

  prevStep(): void {
    this.stepperService.prevStep();
  }

  nextStep(): void {
    this.stepperService.setStepData({
      name: 'preferences',
      data: {
        receiveEmails: false,
        receiveNotifications: true,
      },
    });

    this.stepperService.nextStep();
  }
}
