import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-panel-acceuil',
  templateUrl: './panel-acceuil.component.html',
  styleUrls: ['./panel-acceuil.component.css']
})
export class PanelAcceuilComponent implements OnInit {

  //items retrieved when sending the request rest and display in the bar nenus
  @Input() service:any;
  //Send object that is type of panel for exemple 'operator'
  @Output() selected = new EventEmitter<string>();

  constructor() { }

  ngOnInit(){
  }

  // sends the selected data from the menu to the application
  selection(){
    this.selected.next(this.service)
  }

}
