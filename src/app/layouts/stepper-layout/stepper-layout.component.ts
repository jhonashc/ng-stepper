import { Component, effect, inject } from '@angular/core';
import { NgClass, TitleCasePipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { StepperService, StepsType } from '../../services/stepper.service';

@Component({
  selector: 'app-stepper-layout',
  standalone: true,
  imports: [NgClass, RouterOutlet, TitleCasePipe],
  templateUrl: './stepper-layout.component.html',
  styleUrl: './stepper-layout.component.scss',
})
export class StepperLayoutComponent {
  private stepperService = inject(StepperService);

  public formSteps = this.stepperService.formSteps;
  public selectedIndex = this.stepperService.selectedIndex;
  public currentRoute = this.stepperService.currentRoute;

  constructor() {
    effect(() => this.stepperService.redirectTo(this.currentRoute()));
  }

  isStepCompleted(stepType: StepsType): boolean {
    return this.stepperService.isStepCompleted(stepType);
  }
}
