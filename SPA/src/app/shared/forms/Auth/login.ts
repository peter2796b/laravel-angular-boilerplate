import { FormBuilder, Validators } from '@angular/forms';

/**
 * The login form
 * @param fb The form builder instance
 */
export const loginForm = ( fb: FormBuilder) => {
  return fb.group({
    email: [ '', Validators.compose( [ Validators.required, Validators.email ] ) ],
    password: [ '', Validators.compose( [ Validators.required ] ) ],
  });
};
