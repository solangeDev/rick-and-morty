import { Component, OnInit } from '@angular/core';
import { DataService } from '@app/shared/services/data.service';

@Component({
  selector: 'app-episodes',
  template: `<div class="container">
    <ul class="episodes__list">
      <li *ngFor="let item of episodes$ | async">
        {{ item.episode }} - {{ item.name }}
      </li>
    </ul>
  </div> `,
  styleUrls: ['./episodes.component.scss'],
})
export class EpisodesComponent implements OnInit {
  episodes$ = this.dataSvc.episodes$;
  constructor(private dataSvc: DataService) {}

  ngOnInit(): void {}
}
