import { Component, inject, OnInit } from '@angular/core';

import { StepperService } from '../../services/stepper.service';

@Component({
  selector: 'app-complete-step',
  standalone: true,
  imports: [],
  templateUrl: './complete-step.component.html',
  styleUrl: './complete-step.component.scss',
})
export class CompleteStepComponent implements OnInit {
  private stepperService = inject(StepperService);

  ngOnInit(): void {
    this.stepperService.setSelectedIndex(2);
  }

  prevStep(): void {
    this.stepperService.prevStep();
    this.stepperService.redirectTo('/stepper/preferences');
  }
}
