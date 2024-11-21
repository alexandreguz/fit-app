import { Component, EventEmitter, OnInit, Output, inject } from '@angular/core';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatButtonModule } from '@angular/material/button';
import { MatDialog, MatDialogModule} from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training/stop-training.component';

@Component({
  selector: 'app-current-training',
  standalone: true,
  imports: [MatProgressSpinnerModule, MatButtonModule, MatDialogModule],
  templateUrl: './current-training.component.html',
  styleUrl: './current-training.component.css'
})
export class CurrentTrainingComponent implements OnInit{
  @Output() trainingExit = new EventEmitter<void>()
  dialog = inject(MatDialog);
  progress = 0
  timer: number

  ngOnInit(): void {
    this.startOrResumeTimer()
  }

  startOrResumeTimer() {
    this.timer = window.setInterval(() => {
      this.progress = this.progress + 5
      if (this.progress >= 100) {
        clearInterval(this.timer)
      }
    }, 1000)
  }

  onStop() {
    clearInterval(this.timer)
    const dialogRef = this.dialog.open(StopTrainingComponent, {
      data: {progres: this.progress},
    });
    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.trainingExit.emit()
      } else {
        this.startOrResumeTimer()
      }
    })
  }

}
