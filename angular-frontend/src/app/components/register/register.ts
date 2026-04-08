import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {DailyBugleService} from '../../services/daily-bugle.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: false,
  templateUrl: './register.html',
  styleUrl: './register.css',
})
export class Register implements OnInit {

  registerForm!: FormGroup;
  roles: string[] = ['READER', 'JOURNALIST'];

  constructor(private formBuilder: FormBuilder,
              private dailyBugleService: DailyBugleService,
              private router: Router) {
    this.registerForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
      displayName: ['', Validators.required],
      role: ['', Validators.required]
    });
  }

  ngOnInit(): void {

    }

    protected onSubmit() {
      this.dailyBugleService.registerProfile(this.registerForm.value).subscribe({
        next: () => {
          console.log('Register successful');
          this.registerForm.reset();
          this.router.navigate(['/']);
        },
        error: (err) => {
          console.error(err);
        }
      });
    }

}
