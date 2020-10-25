import {AfterViewInit, Inject, Component, ViewChild, OnInit,  Output, EventEmitter, OnChanges, Input, SimpleChanges} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import {FormControl} from '@angular/forms';
import { user, cheval, cour } from '../formulaire'
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-panel-liste',
  templateUrl: './panel-liste.component.html',
  styleUrls: ['./panel-liste.component.css']
})
export class PanelListeComponent implements OnInit {
  displayedColumnsUser: string[] = ['id', 'nom', 'prenom', 'role','email', 'phone', 'licence', 'modification', 'suppression'];
  displayedColumnsCheval: string[] = ['id', 'nom', 'type', 'poids', 'taille', 'modification', 'suppression'];
  //['id', 'titre', 'date', 'horaire', 'niveau', 'moniteur', 'modification', 'suppression'];
  displayedColumnsCour: string[] = ['id', 'titre', 'date', 'horaire','nbrCavalier', 'niveau', 'modification', 'suppression'];

  ELEMENT_DATA_USER: user[] = [];
  ELEMENT_DATA_CHEVAL: cheval[] = [];
  ELEMENT_DATA_COUR: cour[] = [];
  dataSource:any;

  isGood: boolean=false
  isData: boolean=false;
  donneeVide:string="";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() typePanel: String;
  @Output() sentForm = new EventEmitter();
  @Output() sentForm2 = new EventEmitter();
  @Output() sentForm3 = new EventEmitter();
  @Output() sentForm4 = new EventEmitter();
  @Input() data: any;
  @Input() data2: any;
  @Input() data3: any;

  constructor(public dialog: MatDialog) {}

  ngOnInit(): void {
    this.sentForm.emit({obj:this.donneeVide});
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if change data
    if(changes['data']){
      if(this.data!=null){
        if(this.typePanel == "Gestion des utilisateurs"){
          this.isData = true;
          this.ELEMENT_DATA_USER=[];
          this.ELEMENT_DATA_USER.length=0;
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA_USER);
          for(var i = 0; i<this.data.length; i++){
            this.ELEMENT_DATA_USER[i]={id: this.data[i].id,nom: this.data[i].firstName,prenom: this.data[i].lastName,role: this.data[i].role,email: this.data[i].email,phone: this.data[i].phoneNumber,licence: this.data[i].licenceNumber,modification: 'Modifier',suppression: 'Supprimer'};
          }
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        if(this.typePanel == "Gestion des chevaux"){
          this.isData = true;
          this.ELEMENT_DATA_CHEVAL=[];
          this.ELEMENT_DATA_CHEVAL.length=0;
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA_CHEVAL);
          for(var i = 0; i<this.data.length; i++){
            this.ELEMENT_DATA_CHEVAL[i]={id: this.data[i].id,nom: this.data[i].nom,type: this.data[i].type,poids: this.data[i].poids,taille: this.data[i].taille,modification: 'Modifier',suppression: 'Supprimer'};
          }
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
        if(this.typePanel == "Gestion des cours"){
          this.isData = true;
          this.ELEMENT_DATA_COUR=[];
          this.ELEMENT_DATA_COUR.length=0;
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA_COUR);
          for(var i = 0; i<this.data.length; i++){
            this.ELEMENT_DATA_COUR[i]={id: this.data[i].id,titre: this.data[i].titre,dateCours: this.data[i].dateCours,horaire: this.data[i].horaire,nbrCavalier: this.data[i].nbrCavalier,niveau: this.data[i].niveau,modification: 'Modifier',suppression: 'Supprimer'};
          }
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }
    }
    if(changes['data2']){
      if(this.data2!=null){
        if(this.isGood == true){
          if(this.typePanel == "Gestion des utilisateurs"){
            return this.openDialogModification(this.data2);
          }
          if(this.typePanel == "Gestion des chevaux"){
            this.openDialogModification(this.data2);
          }
          if(this.typePanel == "Gestion des cours"){
            this.openDialogModification(this.data2);
          }
        }
      }
    }
    if(changes['data3']){
      if(this.data!=null){
        if(this.typePanel == "Gestion des utilisateurs"){
          if(this.data3.type == "deleteUser" && this.data3.status == 200){
            this.data = null;
            this.isData = false;
            this.ngOnInit();
          }
        }
        if(this.typePanel == "Gestion des chevaux"){
          if(this.data3.type == "deleteCheval" && this.data3.status == 200){
            this.data = null;
            this.isData = false;
            this.ngOnInit();
          }
        }
        if(this.typePanel == "Gestion des cours"){
          if(this.data3.type == "deleteCours" && this.data3.status == 200){
            this.data = null;
            this.isData = false;
            this.ngOnInit();
          }
        }
      }
    }
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

  openDialogDelete(element): void {
    let dialogRef = this.dialog.open(DialogOverviewDeleteComponent, {
      width: "600px" , height: "175px",
      data: { elem: element, typePanel: this.typePanel}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      if(result != undefined){
        this.supprimer(element);
      }
    });
  }

  openDialogModification(element): void {
    let dialogRef = this.dialog.open(DialogOverviewModificationComponent, {
      data: { elem: element, typePanel: this.typePanel}
    });
  
    dialogRef.afterClosed().subscribe(result => {
      this.isGood = false;
      if(result != undefined){
        switch(result.typePanel){
          case 'Gestion des utilisateurs':
            this.sentForm3.emit({obj:result.elem});
            break;
          case 'Gestion des chevaux':
            this.sentForm3.emit({obj:result.elem});
            break;
          case 'Gestion des cours':
            result.elem.dateCours = this.formatdate(result.elem.dateCours);
            this.sentForm3.emit({obj:result.elem});
            break;
        }
        this.ngOnInit();
      }
    });
  }

  supprimer(element){
    if(this.typePanel == "Gestion des utilisateurs"){
      this.sentForm2.emit({obj:element.id}); //send data
    }
    if(this.typePanel == "Gestion des chevaux"){
      this.sentForm2.emit({obj:element.id});
    }
    if(this.typePanel == "Gestion des cours"){
      this.sentForm2.emit({obj:element.id});
    }
  }

  modifier(element){
    this.isGood = true;
    if(this.typePanel == "Gestion des utilisateurs"){
      this.sentForm4.emit({obj:element.id}); //send data
    }
    if(this.typePanel == "Gestion des chevaux"){
      this.sentForm4.emit({obj:element.id});
    }
    if(this.typePanel == "Gestion des cours"){
      this.sentForm4.emit({obj:element.id});
    }
  }

  formatdate(date){
    var str3 = '';
    switch(date.toString().substring(4, 7)){
      case 'Jan':
        str3 = '01';
        break;
      case 'Feb':
        str3='02';
        break;
      case 'Mar':
        str3 = '03';
        break;
      case 'Apr':
        str3 = '04';
        break;
      case 'May':
        str3 = '05';
        break;
      case 'Jun':
        str3 = '06';
        break;
      case 'Jul':
        str3 = '07';
        break;
      case 'Aug':
        str3 = '08';
        break;
      case 'Sep':
        str3 = '09';
        break;
      case 'Oct':
        str3 = '10';
        break;
      case 'Nov':
        str3 = '11';
        break;
      case 'Dec':
        str3 = '12';
        break;
    }
    var str2 = date.toString().substring(11, 15) + '-' + str3 + '-' + date.toString().substring(8, 10);
    return str2
  }
}

@Component({
  selector: 'dialog-overview-delete',
  templateUrl: './dialog-overview-delete.component.html',
  styleUrls: ['./dialog-overview-delete.component.css']
})
export class DialogOverviewDeleteComponent {
  // constructor..
  constructor(
    public dialogRef: MatDialogRef<DialogOverviewDeleteComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
     }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-overview-modification',
  templateUrl: './dialog-overview-modification.component.html',
  styleUrls: ['./dialog-overview-modification.component.css']
})
export class DialogOverviewModificationComponent {
  // constructor..
  serializedDate = new FormControl((new Date()).toISOString());

  constructor(
    public dialogRef: MatDialogRef<DialogOverviewModificationComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {
     }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

