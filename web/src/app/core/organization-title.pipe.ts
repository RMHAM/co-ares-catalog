import { Pipe, PipeTransform } from '@angular/core';

import { Organization } from '../datatypes/organization';

@Pipe({
  name: 'orgTitle',
  standalone: true,
})
export class OrganizationTitlePipe implements PipeTransform {
  transform(value: Organization | undefined | null): string {
    if (!value) {
      return 'Loading';
    }
    let title = '';
    if (value.region && !value.district) {
      title += 'Region ' + value.region + ' ';
    }
    if (value.region && value.district) {
      title += 'R' + value.region + 'D' + value.district + ' ';
    }
    title += value.name;
    return title;
  }
}
