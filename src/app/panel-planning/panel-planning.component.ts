import { Component, OnInit, Inject, Output, EventEmitter, Input, SimpleChanges } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {creationCheval} from '../formulaire'

@Component({
  selector: 'app-panel-planning',
  templateUrl: './panel-planning.component.html',
  styleUrls: ['./panel-planning.component.css']
})
export class PanelPlanningComponent implements OnInit {

  dataPlanning=[]
  listEleve:boolean=false
  user:any
  listeChevaux=[]
  creationCheval:creationCheval;

  //items retrieved when sending the request rest and display in the bar nenus
  @Input() typePanel:any;
  @Input() planning:any;
  @Input() planning2:any;
  @Input() data:any
  @Input() tabCourCheval:any
  //Send object that is type of panel for exemple 'operator'
  @Output() getCourUser = new EventEmitter();
  @Output() getListEleve = new EventEmitter();
  @Output() getAllObject = new EventEmitter();
  @Output() formulaireAddChevaux = new EventEmitter();
  @Output() addChevauxToCavalier = new EventEmitter();
  @Output() delCour = new EventEmitter();

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.creationCheval= new creationCheval();
    this.user = JSON.parse(localStorage.getItem('userCourrant'));
    var username = this.user.name + " " + this.user.lastname;
    this.getCourUser.emit({obj:username});
    this.getAllObject.emit({});
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if change data
    if(changes['planning']){
      if(this.planning!=null){
        if(this.typePanel == 'Planning de cours'){
          if(this.user.role == "moniteur"){
            console.log(this.planning);
            this.getListEleve.emit({});
          }else{
            console.log(this.planning)
          }
        }
      }
    }
    if(changes['tabCourCheval']){
      if(this.tabCourCheval!=null){
        if(this.typePanel == 'Planning de cours'){
          this.user = JSON.parse(localStorage.getItem('userCourrant'));
          if(this.user.role == "cavalier"){
            console.log(this.tabCourCheval)
          }
        }
      }
    }
  }

  supprCours(event){
    this.delCour.emit({obj:event.id});
  }

  validation(event){
    for(var i=0; i<event.length; i++){
      this.addChevauxToCavalier.emit({obj:event[i]});
    }
  }

  openDialogCheval(): void {
    let dialogRef = this.dialog.open(DialogCreateChevalComponent, {
      data: { elem: this.creationCheval, typePanel: this.typePanel}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        this.formulaireAddChevaux.emit({obj:result.elem});
        setTimeout(()=>{this.getAllObject.emit({})}, 100);
      }
    });
  }
}

@Component({
  selector: 'dialog-create-cheval',
  templateUrl: './dialog-create-cheval.component.html',
  styleUrls: ['./dialog-create-cheval.component.css']
})
export class DialogCreateChevalComponent {
  // constructor..
  constructor(
    public dialogRef: MatDialogRef<DialogCreateChevalComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
     }

  onNoClick(): void {
    this.dialogRef.close();
  }
}
