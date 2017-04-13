import { Component, OnInit } from '@angular/core';
import { Markers } from "./markers";
import { DataService } from "../data.service";

@Component({
  selector: 'mb-rebels',
  templateUrl: './rebels.component.html',
  styleUrls: ['./rebels.component.scss']
})
export class RebelsComponent implements OnInit {
  title = 'Rebels';
  rebels: Markers[];
  selectedRebel: Markers;
  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataService.getRebels()
      .subscribe(rebels => this.rebels = rebels);
  }

  selectRebel(rebel) {
    this.selectedRebel = rebel;
  }

}
