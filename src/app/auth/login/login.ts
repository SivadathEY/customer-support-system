
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

// ⬇️ Make sure this path matches your real folder structure:
// Because this file is in src/app/auth/login/login.ts and the service is in src/app/auth/auth.service.ts,
// the correct relative import from this file is '../auth.service'.
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.html',
  standalone: false,
  styleUrls: ['./login.css']
})
export class Login implements OnInit {
  form!: FormGroup;
  loading = false;
  errorMsg = '';

  constructor(
    private fb: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    // Optional: check current user on init
    // this.authService.me().subscribe({ next: (u) => console.log(u) });
  }

  get f() {
    return this.form.controls;
  }

  // Navigate to /register (button on login page)
  goToRegister(): void {
    this.router.navigate(['/register']);
  }

  onSubmit(): void {
    this.errorMsg = '';

    if (this.form.invalid) {
      this.form.markAllAsTouched();
      return;
    }

    this.loading = true;

    this.authService
      .login(this.form.value as { email: string; password: string })
      .subscribe({
        next: (res) => {
          // If the service already stores token, this is redundant; otherwise keep:
          if (res?.token) {
            localStorage.setItem('access_token', res.token);
          }
          this.loading = false;
          this.router.navigate(['/dashboard']);
        },
        error: (err: Error) => {
          this.loading = false;
          // Will show "Invalid credentials" if service normalized it
          this.errorMsg = err?.message ?? 'Login failed. Please check your credentials.';
        }
      });
  }
}
