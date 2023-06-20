import { NgOptimizedImage } from '@angular/common';
import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatMenuModule } from '@angular/material/menu';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatTableModule } from '@angular/material/table';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AvatarComponent } from './avatar/avatar.component';
import { Ics217DetailComponent } from './ics217-detail/ics217-detail.component';
import { LoginComponent } from './login/login.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { OrderByPipe } from './order-by.pipe';
import { OrgBranchComponent } from './org-branch/org-branch.component';
import { OrgDetailComponent } from './org-detail/org-detail.component';
import { OrgTreeComponent } from './org-tree/org-tree.component';
import { OrganizationTitlePipe } from './organization-title.pipe';

@NgModule({
  declarations: [
    AppComponent,
    AvatarComponent,
    Ics217DetailComponent,
    LoginComponent,
    MainNavComponent,
    OrderByPipe,
    OrgBranchComponent,
    OrgTreeComponent,
    OrganizationTitlePipe,
    OrgDetailComponent,
  ],
  imports: [
    AppRoutingModule,
    BrowserAnimationsModule,
    BrowserModule,
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatTableModule,
    MatToolbarModule,
    NgOptimizedImage,
    provideAuth(() => getAuth()),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
