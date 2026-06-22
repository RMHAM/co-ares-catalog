import { ChangeDetectionStrategy, Component } from '@angular/core';
import { GoogleAuthProvider, signInWithPopup } from 'firebase/auth';

import { injectFirebaseAuth } from '../firebase-sdk';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  standalone: true,
  changeDetection: ChangeDetectionStrategy.Eager,
})
export class LoginComponent {
  private auth = injectFirebaseAuth();

  async logInWithGoogle() {
    await signInWithPopup(this.auth, new GoogleAuthProvider());
  }
}
