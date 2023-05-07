import { Component, Input } from '@angular/core';
import { LoadingService } from 'src/app/services/loading/loading.service';

@Component({
  selector: 'spinner-component',
  templateUrl: './spinner.component.html',
  styleUrls: [`./spinner.component.scss`]
})
export class SpinnerComponent {

  loading = this.loadingService.loading$;

  constructor( private loadingService: LoadingService) {}

}