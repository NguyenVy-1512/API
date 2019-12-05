import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { first } from 'rxjs/operators';

import { AlertService, UserService } from '../_services';
import { UsernameValidators } from './username.validators';
import { PasswordValidators } from './password.validators';

@Component({templateUrl: 'signup.component.html'})
export class RegisterComponent implements OnInit {
    registerForm: FormGroup;
    loading = false;
    submitted = false;

    constructor(
        private formBuilder: FormBuilder,
        private router: Router,
        private userService: UserService,
        private alertService: AlertService) { }

    ngOnInit() {
        this.registerForm = this.formBuilder.group({
          email: ['', Validators.required],
            name: ['', Validators.required],
            password: ['', [Validators.required, Validators.minLength(6)]],
            confirmpassword: ['', [Validators.required, Validators.minLength(6)]]
        });
    }

    // convenience getter for easy access to form fields
    get f() { return this.registerForm.controls; }

    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.registerForm.invalid) {
            return;
        }
        console.log(this.registerForm.value);
        
        this.loading = true;
        this.userService.register(this.registerForm.value)
            .subscribe((
                result) => {
                    console.log('done');
                    this.alertService.success('Registration successful', true);
                    this.router.navigate(['/login']);
                },
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
        
    }
    get username(){
      return this.registerForm.get('username');
    }
  
    get password(){
      return this.registerForm.get('password');
    }
  
    get confirmPassword(){
      return this.registerForm.get('confirmPassword');
    }

    get mail(){
      return this.registerForm.get('mail');
    }
    login(){
      this.registerForm.setErrors({
        invalidLogin: true
      });
    }
    
  
}
