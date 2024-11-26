import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training/stop-training.component';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-current-training',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatButtonModule, MatDialogModule],
  templateUrl: './current-training.component.html',
  styleUrl: './current-training.component.css'
})
export class CurrentTrainingComponent implements OnInit{
  dialog = inject(MatDialog);
  progress = 0
  timer: number

  constructor(private trainingService: TrainingService) {}

  ngOnInit(): void {
    this.startOrResumeTimer()
  }

  startOrResumeTimer() {
    const step = this.trainingService.getRunningExercise().duration /100 *1000
    this.timer = window.setInterval(() => {
      this.progress = this.progress + 1
      if (this.progress >= 100) {
        this.trainingService.completeExercise();
        clearInterval(this.timer)
      }
    }, step)
  }

  onStop() {
    clearInterval(this.timer)
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {progres: this.progress},
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainingService.cancelExercise(this.progress)
      } else {
        this.startOrResumeTimer()
      }
    })
  }

}
