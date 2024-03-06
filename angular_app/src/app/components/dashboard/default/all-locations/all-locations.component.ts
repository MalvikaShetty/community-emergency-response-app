import { Component } from '@angular/core';
import * as chartData from '../../../../shared/data/dashboard/default'

@Component({
  selector: 'app-all-locations',
  templateUrl: './all-locations.component.html',
  styleUrls: ['./all-locations.component.scss']
})
export class AllLocationsComponent {

  public allLocations = chartData.allLocations;
  public show : boolean = false
  constructor() { }

  toggle(){
    this.show = !this.show
  }
}
