import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DailyBugleService} from '../../services/daily-bugle.service';
import {Router} from '@angular/router';
import {AuthService} from '../../services/auth.service';
import {LoginResponseModel} from '../../models/loginResponseModel';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrl: './login.css',
})
export class Login implements OnInit {

  loginForm!: FormGroup;
  loginError = false;

  constructor(private formBuilder: FormBuilder,
              private dailyBugleService: DailyBugleService,
              private router: Router,
              private authService: AuthService) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  ngOnInit(): void {

  }

  protected onSubmit() {
    this.dailyBugleService.loginProfile(this.loginForm.value).subscribe({
      next: (data: LoginResponseModel) => {
        console.log(data);

        this.authService.setSession(data);

        this.loginForm.reset();
        this.router.navigate(['/']);
      },
      error: (err) => {
        console.error(err);
      }
    })
  }
}
