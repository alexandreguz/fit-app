import { Component, EventEmitter, Output } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select'

@Component({
  selector: 'app-new-training',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatFormFieldModule, MatSelectModule, ],
  templateUrl: './new-training.component.html',
  styleUrl: './new-training.component.css'
})
export class NewTrainingComponent {
@Output() startTraining = new EventEmitter<void>()

  onStartTraining() {
    this.startTraining.emit();
  }

}
