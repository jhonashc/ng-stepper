import { Component, inject } from '@angular/core';

import { StepperService } from '../../services/stepper.service';

@Component({
  selector: 'app-complete-step',
  standalone: true,
  imports: [],
  templateUrl: './complete-step.component.html',
  styleUrl: './complete-step.component.scss',
})
export default class CompleteStepComponent {
  private stepperService = inject(StepperService);

  prevStep(): void {
    this.stepperService.prevStep();
  }
}
