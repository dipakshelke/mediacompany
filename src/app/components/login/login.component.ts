import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, FormControl, Validators, FormArray } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { AuthenticationService } from '../services/authentication.service';
import { Router, ActivatedRoute } from '@angular/router';
import { first } from 'rxjs/operators';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  providers: [HttpClient]
})
export class LoginComponent implements OnInit {
  loginForm: FormGroup;
  private currentUserSubject: BehaviorSubject<any>;
  public currentUser: Observable<any>;

  constructor(private http: HttpClient,
    private authenticationService: AuthenticationService,
    private route: ActivatedRoute,
    private router: Router) {
    this.loginForm = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required])
    });
  }
  ngOnInit() {

  }
  get f() { return this.loginForm.controls; }
  onSubmit() {
    if (this.loginForm.valid) {
      this.authenticationService.login(this.f.email.value, this.f.password.value)
        .pipe(first())
        .subscribe(
          data => {
            console.log('Login Success');
            this.router.navigate(['home']);
          },
          error => {

          });
      // this.http.get("assets/login-details.json").subscribe((data: any) => {
      //   console.log(this._v);
      //   for (let user of data.usersDB) {
      //     if (this._v.email == user.userid && this._v.password == user.password) {
      //       console.log(user);
      //       localStorage.setItem('currentUser', JSON.stringify(user));
      //       this.currentUserSubject.next(user);
      //     }
      //   }
      // })
    }
  }
  get _v() {
    return this.loginForm.value;
  }
}