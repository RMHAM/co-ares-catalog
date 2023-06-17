import { Component, inject, OnDestroy } from '@angular/core';
import { Auth, User, user } from '@angular/fire/auth';
import { BehaviorSubject, Subscription } from 'rxjs';

@Component({
  selector: 'app-avatar',
  templateUrl: './avatar.component.html',
  styleUrls: ['./avatar.component.scss'],
})
export class AvatarComponent implements OnDestroy {
  readonly blankPhotoUrl: string =
    'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png';
  private auth: Auth = inject(Auth);

  private user$ = user(this.auth);
  private userSubscription: Subscription;
  loggedIn$ = new BehaviorSubject<boolean>(false);
  photoURL$ = new BehaviorSubject<URL>(new URL(this.blankPhotoUrl));
  displayName$ = new BehaviorSubject<string>('Anonymous');
  email$ = new BehaviorSubject<string>('me@example.com');

  constructor() {
    this.userSubscription = this.user$.subscribe((user: User | null) => {
      this.loggedIn$.next(!!user);
      this.photoURL$.next(new URL(user?.photoURL ?? this.blankPhotoUrl));
      this.displayName$.next(user?.displayName ?? 'Anonymous');
      this.email$.next(user?.email ?? 'me@example.com');
    });
  }

  ngOnDestroy() {
    this.userSubscription.unsubscribe();
  }
  async logout() {
    await this.auth.signOut();
  }
}
