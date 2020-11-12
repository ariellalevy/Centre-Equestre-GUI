import {Component, ViewChild, OnInit, Output, EventEmitter,Input, SimpleChanges} from '@angular/core';
import {MatPaginator} from '@angular/material/paginator';
import {MatSort} from '@angular/material/sort';
import {MatTableDataSource} from '@angular/material/table';
import { cours, courSpecifique } from '../formulaire'

@Component({
  selector: 'app-planning-list',
  templateUrl: './planning-list.component.html',
  styleUrls: ['./planning-list.component.css']
})

export class PlanningListComponent implements OnInit {
  displayedColumnsCour: string[] = ['id', 'titre', 'date', 'horaire','nbrCavalier', 'niveau', 'moniteur','ratio', 'inscription','desinscription'];
  displayedColumnsCourComplet: string[] = ['id', 'titre', 'date', 'horaire','nbrCavalier', 'niveau', 'moniteur','ratio', 'desinscription'];

  ELEMENT_DATA_COUR: cours[] = [];
  ELEMENT_DATA_COUR_COMPLET: cours[] = [];
  dataSource:any;

  courSpecifique:courSpecifique

  isGood: boolean=false
  isData: boolean=false;
  donneeVide:string="";

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  @Input() typePanel: String;
  @Output() getAllObject = new EventEmitter();
  @Output() inscriptionCour = new EventEmitter();
  @Output() desinscriptionCour = new EventEmitter();
  @Input() data: any;
  @Input() data2: any;

  constructor() {}

  ngOnInit(): void {
    this.getAllObject.emit({obj:this.donneeVide});
    this.courSpecifique = new courSpecifique();
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if change data
    if(changes['typePanel']){
      if(this.typePanel!=null){
        if(this.typePanel == "Planning de cours"){
          this.ngOnInit();
        }
      }
    }
    if(changes['data']){
      if(this.data!=null){
        if(this.typePanel == "Planning de cours"){
          // si ratio complet afficher le cour avec sans les bouton inscription/desincription et avec bannier complet
          this.isData = true;
          this.ELEMENT_DATA_COUR=[];
          this.ELEMENT_DATA_COUR.length=0;
          this.dataSource = new MatTableDataSource(this.ELEMENT_DATA_COUR);
          for(var i = 0; i<this.data.length; i++){
            var ratioCavalier = this.data[i].compteurNbrCavalier + "/" + this.data[i].nbrCavalier
            if(this.data[i].compteurNbrCavalier == this.data[i].nbrCavalier){
              this.ELEMENT_DATA_COUR[i]={id: this.data[i].id,titre: this.data[i].titre,dateCours: this.data[i].dateCours,horaire: this.data[i].horaire,nbrCavalier: this.data[i].nbrCavalier,niveau: this.data[i].niveau,moniteur: this.data[i].moniteur,ratio: ratioCavalier,inscription: "", desinscription:"Complet"};
            }else{
              this.ELEMENT_DATA_COUR[i]={id: this.data[i].id,titre: this.data[i].titre,dateCours: this.data[i].dateCours,horaire: this.data[i].horaire,nbrCavalier: this.data[i].nbrCavalier,niveau: this.data[i].niveau,moniteur: this.data[i].moniteur,ratio: ratioCavalier,inscription: "S'inscrire", desinscription:"se désinscrire"};
            }
            
          }
          this.dataSource.paginator = this.paginator;
          this.dataSource.sort = this.sort;
        }
      }
    }
    if(changes['data2']){
      if(this.data2!=null){
        if(this.isGood == true){
          if(this.typePanel == "Planning de cours"){
            console.log(this.data2)
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

  inscripton(element){
    if(this.typePanel == "Planning de cours"){
      var obj = JSON.parse(localStorage.getItem('userCourrant'));
      this.courSpecifique.cavalier = obj.name + " " + obj.lastname;
      this.courSpecifique.idCour = element.id;
      this.courSpecifique.moniteur = element.moniteur;
      this.inscriptionCour.emit({obj:this.courSpecifique});
    }
  }

  desinscription(element){
    if(this.typePanel == "Planning de cours"){
      if(element.desinscription!='Complet'){
        this.desinscriptionCour.emit({obj:element.id});
      }else{
        console.log("complet")
      }
    }
  }
}