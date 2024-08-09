import { Component } from '@angular/core';
import { Route, Router, RouterLink } from '@angular/router';
import { UserService } from '../../services/user.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-sign-in',
  standalone: true,
  imports: [RouterLink, HttpClientModule, ReactiveFormsModule],
  templateUrl: './sign-in.component.html',
  styleUrl: './sign-in.component.scss',
})
export class SignInComponent {
  signInForm: FormGroup;
  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private route: Router,
    private cookie: CookieService
  ) {
    this.signInForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: [''],
    });
  }

  signIn() {
    console.log('singIn Called');
    if (this.signInForm.valid) {
      this.userService.signIn(this.signInForm.value).subscribe({
        next: (result: any) => {
          console.log(result);
          if (result) {
            console.log(result);
            this.cookie.set('token', result.jwt);
            // localStorage.setItem('token', result.jwt);
            this.route.navigate(['']);
          }
        },
        error: (error: any) => {
          console.log(error);
        },
      });
    }
  }
}
