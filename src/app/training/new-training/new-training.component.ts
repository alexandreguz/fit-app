import { Component, OnInit} from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule} from '@angular/material/select'
import { TrainingService } from '../training.service';
import { Exercise } from '../exercise.model';
import { FormsModule, NgForm} from '@angular/forms'; 

@Component({
  selector: 'app-new-training',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatFormFieldModule, MatSelectModule, FormsModule,],
  templateUrl: './new-training.component.html',
  styleUrl: './new-training.component.css',
})

export class NewTrainingComponent implements OnInit {
  exercises: Exercise[] = []
  constructor(private trainingService: TrainingService) {}
  
  ngOnInit() {
    this.exercises = this.trainingService.getAvailableExercises();
    console.log(this.exercises)
  }

  onStartTraining(form: NgForm) {
    console.log(form.value)
    this.trainingService.startExercise(form.value.exercise);
  }

}

