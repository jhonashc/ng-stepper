import { Component, inject, OnInit } from '@angular/core';

import { StepperService } from '../../services/stepper.service';

@Component({
  selector: 'app-preferences-step',
  standalone: true,
  imports: [],
  templateUrl: './preferences-step.component.html',
  styleUrl: './preferences-step.component.scss',
})
export class PreferencesStepComponent implements OnInit {
  private stepperService = inject(StepperService);

  ngOnInit(): void {
    this.stepperService.setSelectedIndex(1);
  }

  prevStep(): void {
    this.stepperService.prevStep();
    this.stepperService.redirectTo('/stepper/details');
  }

  nextStep(): void {
    this.stepperService.setPreferencesStep({
      receiveEmails: false,
      receiveNotifications: true,
    });

    this.stepperService.nextStep();
    this.stepperService.redirectTo('/stepper/complete');
  }
}
