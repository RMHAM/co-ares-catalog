import { NgModule } from '@angular/core';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { getAuth, provideAuth } from '@angular/fire/auth';
import { getFirestore, provideFirestore } from '@angular/fire/firestore';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { environment } from '../environments/environment';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { Ics217DetailComponent } from './ics217-detail/ics217-detail.component';
import { MainNavComponent } from './main-nav/main-nav.component';
import { OrderByPipe } from './order-by.pipe';
import { OrgBranchComponent } from './org-branch/org-branch.component';
import { OrgTreeComponent } from './org-tree/org-tree.component';
import { OrganizationTitlePipe } from './organization-title.pipe';

@NgModule({
  declarations: [
    AppComponent,
    Ics217DetailComponent,
    MainNavComponent,
    OrgTreeComponent,
    OrgBranchComponent,
    OrderByPipe,
    OrganizationTitlePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
