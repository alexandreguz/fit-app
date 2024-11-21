import {ChangeDetectionStrategy, Component, OnInit} from '@angular/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatInputModule} from '@angular/material/input';
import { MatFormFieldModule} from '@angular/material/form-field';
import {provideNativeDateAdapter} from '@angular/material/core';
import { FormControl, FormGroup } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ReactiveFormsModule } from '@angular/forms';
import { Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  standalone: true,
  providers: [provideNativeDateAdapter(),],
  imports: [MatFormFieldModule, MatInputModule, MatDatepickerModule, MatButtonModule, ReactiveFormsModule],
  changeDetection: ChangeDetectionStrategy.OnPush,  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit{
  loginForm: FormGroup;

  constructor(private authsService: AuthService) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl('', {validators: [Validators.required, Validators.email]}),
      password: new FormControl('', {validators: [Validators.required]})
    })
  }
  handleSubmit() {
    this.authsService.login({
      email: this.loginForm.value.email,
      password: this.loginForm.value.password
    })
  }

}
