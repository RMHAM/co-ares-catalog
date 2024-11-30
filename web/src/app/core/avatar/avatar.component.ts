import { NgIf, NgOptimizedImage } from '@angular/common';
import { Component, computed, inject } from '@angular/core';
import { toSignal } from '@angular/core/rxjs-interop';
import { Auth, user } from '@angular/fire/auth';
import { MatIconButton } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatMenu, MatMenuItem, MatMenuTrigger } from '@angular/material/menu';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
  imports: [
    NgIf,
    MatIconButton,
    MatMenuTrigger,
    NgOptimizedImage,
    MatMenu,
    MatMenuItem,
    MatIcon,
    RouterLink,
  ],
})
export class AvatarComponent {
  readonly blankPhotoUrl: string =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png';
  private auth: Auth = inject(Auth);

  private user = toSignal(user(this.auth));
  loggedIn = computed(() => !!this.user());
  photoURL = computed(
    () => new URL(this.user()?.photoURL ?? this.blankPhotoUrl),
  );
  displayName = computed(() => this.user()?.displayName ?? 'Anonymous');
  email = computed(() => this.user()?.email ?? 'me@example.com');

  async logout() {
    await this.auth.signOut();
  }
}
