import { Component, OnInit } from '@angular/core';
import { MatTabsModule } from '@angular/material/tabs';
import { NewTrainingComponent } from "./new-training/new-training.component";
import { PastTrainingComponent } from "./past-training/past-training.component";
import { CurrentTrainingComponent } from "./current-training/current-training.component";
import { Subscription } from 'rxjs';
import { TrainingService } from './training.service';

@Component({
  selector: 'app-training',
  standalone: true,
  imports: [MatTabsModule, NewTrainingComponent, PastTrainingComponent, CurrentTrainingComponent,],
  templateUrl: './training.component.html',
  styleUrl: './training.component.css'
})
export class TrainingComponent implements OnInit{
  onGointraining = false;
  exerciseSubscription: Subscription;

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.exerciseSubscription = this.trainingService.exerciseChanged.subscribe(
      exercise => {
        if(exercise){
          this.onGointraining = true
        } else {
          this.onGointraining = false
        }
      }
    )
  }
}
