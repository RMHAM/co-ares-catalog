import { Component, inject } from '@angular/core';
import { Auth, GoogleAuthProvider, signInWithPopup } from '@angular/fire/auth';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent {
  private auth: Auth = inject(Auth);

  async logInWithGoogle() {
    await signInWithPopup(this.auth, new GoogleAuthProvider());
  }
}
