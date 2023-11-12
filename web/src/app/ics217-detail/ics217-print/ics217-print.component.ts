import {
  AfterViewInit,
  Component,
  Input,
  OnDestroy,
  inject,
} from '@angular/core';
import {
  BehaviorSubject,
  Observable,
  Subscription,
  delay,
  mergeMap,
} from 'rxjs';
import { shareReplay } from 'rxjs/operators';

import { Ics217 } from '../../datatypes/ics217';
import { Ics217Service } from '../../ics217.service';
import { OrganizationsService } from '../../organizations.service';

@Component({
  selector: 'app-ics217-print',
  templateUrl: './ics217-print.component.html',
  styleUrls: ['./ics217-print.component.scss'],
})
export class Ics217PrintComponent implements AfterViewInit, OnDestroy {
  ics217Service = inject(Ics217Service);
  organizationsService = inject(OrganizationsService);

  ics217Id$ = new BehaviorSubject<string | undefined>(undefined);
  ics217$: Observable<Ics217> = this.ics217Id$.pipe(
    mergeMap((id) => this.ics217Service.get(id!)),
  );
  ownerOrg$ = this.ics217$.pipe(
    mergeMap((ics217) => this.organizationsService.get(ics217.owner.id)),
    shareReplay(1),
  );
  subscription: Subscription = undefined!;

  @Input()
  set ics217Id(ics217Id: string) {
    this.ics217Id$.next(ics217Id);
  }

  ngAfterViewInit() {
    this.subscription = this.ownerOrg$
      .pipe(delay(500))
      .subscribe((ownerOrg) => {
        if (ownerOrg) {
          window.print();
        }
      });
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }
}
