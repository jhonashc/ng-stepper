import { Component, inject } from '@angular/core';

import { StepperService } from '../../services/stepper.service';

@Component({
  selector: 'app-details-step',
  standalone: true,
  imports: [],
  templateUrl: './details-step.component.html',
  styleUrl: './details-step.component.scss',
})
export class DetailsStepComponent {
  private stepperService = inject(StepperService);

  nextStep(): void {
    this.stepperService.setStepData({
      name: 'details',
      data: {
        name: 'John Doe',
        dueDate: new Date(),
      },
    });

    this.stepperService.nextStep();
  }
}
