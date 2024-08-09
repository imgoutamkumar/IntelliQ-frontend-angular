import { Component, inject } from '@angular/core';
import { Router, RouterLink, Routes } from '@angular/router';
import { UserService } from '../../services/user.service';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

@Component({
  selector: 'app-sign-up',
  standalone: true,
  imports: [RouterLink, HttpClientModule, ReactiveFormsModule],
  templateUrl: './sign-up.component.html',
  styleUrl: './sign-up.component.scss',
})
export class SignUpComponent {
  userService = inject(UserService);

  signUpForm: FormGroup;
  constructor(private formBuilder: FormBuilder, private route: Router) {
    this.signUpForm = this.formBuilder.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  signUp() {
    this.userService.register(this.signUpForm.value).subscribe({
      next: (result: any) => {
        console.log(result);
        this.route.navigate(['signIn']);
      },
      error: (error: any) => {
        console.log(error);
      },
    });
  }
}
