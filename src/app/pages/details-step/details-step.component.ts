import { Component, inject, OnInit } from '@angular/core';

import { StepperService } from '../../services/stepper.service';

@Component({
  selector: 'app-details-step',
  standalone: true,
  imports: [],
  templateUrl: './details-step.component.html',
  styleUrl: './details-step.component.scss',
})
export class DetailsStepComponent implements OnInit {
  private stepperService = inject(StepperService);

  ngOnInit(): void {
    this.stepperService.setSelectedIndex(0);
  }

  nextStep(): void {
    this.stepperService.setDetailsStep({
      name: 'John Doe',
      dueDate: new Date(),
    });

    this.stepperService.nextStep();
    this.stepperService.redirectTo('/stepper/preferences');
  }
}
