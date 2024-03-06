import { Component, OnInit } from '@angular/core';
import * as menuItem from "../../../shared/data/dashboard/default";
import { Menu, NavService } from 'src/app/shared/services/nav.service';

@Component({
  selector: 'app-resources',
  templateUrl: './resources.component.html',
  styleUrls: ['./resources.component.scss']
})

export class ResourcesComponent implements OnInit {
public menuItems: Menu[];
public items: Menu[];

constructor(public navServices: NavService) {
    this.navServices.items.subscribe((menuItems) => (this.items = menuItems));
  }

  ngOnInit(): void {
  }

  public searchResult: boolean = false;
  public searchResultEmpty: boolean = false;
  public text: string;

  

}

