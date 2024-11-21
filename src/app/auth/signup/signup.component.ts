import { ChangeDetectionStrategy,Component, inject, OnInit } from '@angular/core';
import {toSignal} from '@angular/core/rxjs-interop';
import {map} from 'rxjs/operators';
import {MatInputModule} from '@angular/material/input';
import {provideNativeDateAdapter} from '@angular/material/core';
import {FormControl, FormsModule, ReactiveFormsModule, FormBuilder, Validators, NgForm} from '@angular/forms';
import {FloatLabelType, MatFormFieldModule} from '@angular/material/form-field';
import {MatButtonModule} from '@angular/material/button';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatCheckboxModule} from '@angular/material/checkbox';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-signup',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatFormFieldModule, MatInputModule, FormsModule, ReactiveFormsModule, MatButtonModule, MatDatepickerModule, MatInputModule, MatCheckboxModule, ],
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush, 
})
export class SignupComponent implements OnInit{
  readonly floatLabelControl = new FormControl('auto' as FloatLabelType);
  readonly hideRequiredControl = new FormControl(false);
  readonly options = inject(FormBuilder).group({
    hideRequired: this.hideRequiredControl,
    floatLabel: this.floatLabelControl,
  });

  protected readonly hideRequired = toSignal(this.hideRequiredControl.valueChanges);
  protected readonly floatLabel = toSignal(
    this.floatLabelControl.valueChanges.pipe(map(v => v || 'auto')),
    {initialValue: 'auto'},
  );

  maxDate = new Date();

  constructor(private authService: AuthService) {}

  ngOnInit(): void {
    this.maxDate.setFullYear(this.maxDate.getFullYear() - 18)
  }

  onSubmit(form: NgForm) {
    this.authService.registerUser({
      email: form.value.email,
      password: form.value.password
    })
  }
}
