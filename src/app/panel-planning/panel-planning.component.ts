import { Component, OnInit,  Output, EventEmitter, Input, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-panel-planning',
  templateUrl: './panel-planning.component.html',
  styleUrls: ['./panel-planning.component.css']
})
export class PanelPlanningComponent implements OnInit {

  dataPlanning =[]
  user:any

  //items retrieved when sending the request rest and display in the bar nenus
  @Input() typePanel:any;
  @Input() planningCours:any;
  //Send object that is type of panel for exemple 'operator'
  @Output() sentForm = new EventEmitter();

  constructor() { }

  ngOnInit(): void {
    this.user = JSON.parse(localStorage.getItem('userCourrant'));
    var username = this.user.name + " " + this.user.lastname;
    this.sentForm.emit({obj:username});
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if change data
    if(changes['planningCours']){
      if(this.planningCours!=null){
        if(this.typePanel == 'Planning de cours'){
          console.log(this.planningCours);
        }
      }
    }
  }

  validation(){
    console.log("pipi")
  }
}
