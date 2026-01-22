// import { Component, OnInit } from '@angular/core';
// import { FormBuilder, FormGroup, Validators } from '@angular/forms';
// import { Router } from '@angular/router';
// import { AuthService } from '../auth/auth.service';
 
// @Component({
//   selector: 'app-register',
//   standalone: false,
//   templateUrl: './register.html',
//   styleUrls: ['./register.css']
// })
// export class Register implements OnInit {
 
//   form!: FormGroup;
//   loading = false;
//   submitted = false;
//   serverError = '';
 
//   constructor(
//     private fb: FormBuilder,
//     private auth: AuthService,
//     private router: Router
//   ) {}
 
//   ngOnInit(): void {
//     this.form = this.fb.group({
//       email: ['', [Validators.required, Validators.email]],
//       password: ['', [Validators.required, Validators.minLength(6)]]
//     });
//   }
 
//   // ✅ REGISTER BUTTON CLICK
// onSubmit(): void {
//   console.log('REGISTER BUTTON CLICKED');
 
//   this.submitted = true;
//   this.serverError = '';
 
//   if (this.form.invalid) {
//     console.log('FORM INVALID', this.form.value);
//     return;
//   }
 
//   console.log('FORM DATA', this.form.value);
 
//   this.loading = true;
 
//   this.auth.register(this.form.value).subscribe({
//     next: (res) => {
//       console.log('REGISTER SUCCESS', res);
 
//       // ✅ NAVIGATE ONLY ON SUCCESS
//       this.router.navigate(['/login']);
//     },
//     error: (err) => {
//       console.error('REGISTER FAILED', err);
//       this.serverError = 'Registration failed';
//       this.loading = false;
//     }
//   });
// }
 
 
//   backToLogin(): void {
//     this.router.navigate(['/login']);
//   }
// }
import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';
import { HttpErrorResponse } from '@angular/common/http';
 
@Component({
  selector: 'app-register',
  standalone: false, // NgModule-based (as per your project)
  templateUrl: './register.html',
  styleUrls: ['./register.css']
})
export class Register implements OnInit {
 
  form!: FormGroup;
  loading = false;
  submitted = false;
  serverError = '';
 
  constructor(
    private fb: FormBuilder,
    @Inject(AuthService) private auth: AuthService,
    private router: Router
  ) {}
 
  ngOnInit(): void {
    this.form = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }
 
  // getters (same as your style)
  get email(): AbstractControl | null {
    return this.form.get('email');
  }
 
  get password(): AbstractControl | null {
    return this.form.get('password');
  }
 
  // ✅ REGISTER BUTTON HANDLER
  onSubmit(): void {
    console.log('REGISTER BUTTON CLICKED');
 
    this.submitted = true;
    this.serverError = '';
 
    // Stop if form invalid or already loading
    if (this.form.invalid || this.loading) {
      console.log('FORM INVALID OR LOADING', this.form.value);
      return;
    }
 
    console.log('REGISTER PAYLOAD:', this.form.value);
 
    this.loading = true;
 
    // ✅ API CALL → backend → SQL DB
    this.auth.register(this.form.value).subscribe({
      next: (response) => {
        console.log('REGISTER SUCCESS RESPONSE:', response);
 
        // ✅ Navigate to login ONLY after successful DB save
        this.router.navigate(['/login']);
      },
      error: (err: HttpErrorResponse) => {
        console.error('REGISTER ERROR RESPONSE:', err);
 
        this.serverError =
          err?.error?.message ||
          err?.error?.title ||
          err?.message ||
          'Registration failed. Please try again.';
 
        this.loading = false;
      },
      complete: () => {
        this.loading = false;
      }
    });
  }
 
  // Optional back button
  backToLogin(): void {
    if (!this.loading) {
      this.router.navigate(['/login']);
    }
  }
}
 