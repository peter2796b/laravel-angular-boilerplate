import {Component, Input, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup} from "@angular/forms";
import {loginForm} from "../../../shared/forms/Auth/login";
import {Router} from "@angular/router";
import {MatSnackBar} from "@angular/material/snack-bar";
import {Observable, of, Subject, Subscription} from "rxjs";
import {catchError, filter, finalize, map, switchMap} from "rxjs/operators";
import {AuthService} from "../../../shared/services/app/auth.service";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {
  /**
   * The form group
   */
  form: FormGroup = loginForm( this.fb );

  /**
   * Flag indicating if the login request is processing
   */
  processing = false;

  /**
   * Flag indicating if the login request is processing
   */
  loading = false;

  /**
   * The submit form request subscription
   */
  submitSubscription: Subscription;

  /**
   * The submit request
   */
  private submit = new Subject();

  /**
   * Constructor
   * @param authService The authentication service
   * @param router The router
   * @param fb The form builder
   * @param snackBar The snack bar
   */
  constructor(
    private authService: AuthService,
    private router: Router,
    private fb: FormBuilder,
    private snackBar: MatSnackBar
  ) {
  }

  /**
   * On initialisation of the component
   */
  ngOnInit(): void {

    const user = this.authService.getCurrentUser();
    if ( user ) {
      this.authService.refresh().subscribe();
      this.authService.redirectToDashboard();
      return;
    }

    this.submitSubscription = this.submit
      .pipe(
        filter( () => this.form.valid ),
        switchMap( () => this.handleSubmitRequest() )
      )
      .subscribe();
  }

  /**
   * On destroy of this component
   */
  ngOnDestroy(): void {
    if ( this.submitSubscription ) {
      this.submitSubscription.unsubscribe();
    }
  }

  /**
   * Handles submitting the form to the authentication service
   * @param event The form submit event
   */
  onSubmit( event ): void {
    event.preventDefault();
    this.submit.next();
  }

  /**
   * Handles a submit request
   */
  private handleSubmitRequest(): Observable<void> {
    this.processing = true;
    this.loading = true;

    // Build the request
    const request = {
      ...this.form.value
    };

    // Set the remember me flag to the auth service

    // Request a token
    return this.authService.login( request )
      .pipe(
        map( response => {
          if(response.user){
            console.log(response.user);
            this.authService.redirectToDashboard();
          }
          this.loading = false;
        }),
        catchError( err => {
          this.processing = false;
          this.loading = false;
          this._loginFailedSnackBar();
          return of( err );
        }),
        finalize( () => {
          this.loading = false;
        })
      );
  }

  /**
   * Displays the snack bar message on failure
   * @private
   */
  private _loginFailedSnackBar(): void {
    this.snackBar.open('Login failed', 'error', {
      duration: 2000
    });
    this.loading = false;
  }

}
