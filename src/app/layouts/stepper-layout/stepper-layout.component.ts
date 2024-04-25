import { Component, inject, effect } from '@angular/core';
import { NgClass, TitleCasePipe } from '@angular/common';
import { RouterOutlet } from '@angular/router';

import { StepperService } from '../../services/stepper.service';

import { StepName } from '../../types/stepper.type';

@Component({
  selector: 'app-stepper-layout',
  standalone: true,
  imports: [NgClass, RouterOutlet, TitleCasePipe],
  templateUrl: './stepper-layout.component.html',
  styleUrl: './stepper-layout.component.scss',
})
export default class StepperLayoutComponent {
  private stepperService = inject(StepperService);

  public stepList = this.stepperService.stepList;
  public currentIndex = this.stepperService.currentIndex;
  public currentRoute = this.stepperService.currentRoute;

  constructor() {
    effect(() => {
      this.stepperService.redirectTo(this.currentRoute());
    });
  }

  isStepCompleted(name: StepName): boolean {
    return this.stepperService.isStepCompleted(name);
  }
}
