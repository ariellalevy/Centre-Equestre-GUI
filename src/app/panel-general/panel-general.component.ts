import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import { AppService } from '../app.service'
import {MatSnackBar} from '@angular/material/snack-bar';
import {creationUser, courTotal} from '../formulaire'

@Component({
  selector: 'app-panel-general',
  templateUrl: './panel-general.component.html',
  styleUrls: ['./panel-general.component.css']
})
export class PanelGeneralComponent implements OnDestroy {

  user:creationUser;
  courTotal:courTotal

  data:any;
  data2:any;
  data3:any;

  planningCours:any
  planning:any;
  planning2:any;
  compteur=0;

  mobileQuery: MediaQueryList;
  tabletQuery: MediaQueryList;

  fillerNav= [
    {icon: "home", text: "Accueil"},
    {icon: "account_box", text: "Informations utilisateur"},
    {icon: "supervisor_account", text: "Gestion des utilisateurs"},
    {icon: "card_membership", text: "Gestion des chevaux"},
    {icon: "account_balance", text: "Gestion des cours"},
    {icon: "assignment", text: "Planning de cours"}  
  ]
  //variable pour savoir si le menu est active
  disableTab1: boolean = true;
  disableTab2: boolean = true;
  selectedTab: number = 0;

  fillerContent = {icon: "home", text: "Accueil"};

  snackBar:MatSnackBar

  private _mobileQueryListener: () => void;

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private changeDetectorRef2: ChangeDetectorRef, private media2: MediaMatcher, private restservice: AppService, private _snackBar: MatSnackBar) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.user = new creationUser();
    this.courTotal = new courTotal();
  }
  
  ngOnInit(){// detect responsive
    this.mobileQuery = this.media2.matchMedia('(max-width: 1023px)');
    this.tabletQuery = this.media2.matchMedia('(max-width: 1479px)');
    this._mobileQueryListener = () => this.changeDetectorRef2.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.tabletQuery.addListener(this._mobileQueryListener);

    this.user.email = "ariellalevy78@gmail.com"
    this.user.lastname = "Levy"
    this.user.licence = "23456787654"
    this.user.name = "Ariella"
    this.user.password= "password"
    this.user.phone = "0623504047"
    this.user.role = "moniteur"
    //Stockage d'un objet plus compliqué
    localStorage.setItem('userCourrant', JSON.stringify(this.user));
    //Récupération de l'objet
    var obj = JSON.parse(localStorage.getItem('userCourrant'));
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  goToFunct(nav){
    this.fillerContent = nav;
    // refresh "action tabs"
    this.functSelectedUI(nav.text)
  }

  getAll(typePanel){
    switch(typePanel){
      case 'Gestion des utilisateurs':
        this.restservice.get(typePanel).subscribe(res => { this.data = res },err => console.error(err));
        break;
      case 'Gestion des chevaux':
        this.restservice.get(typePanel).subscribe(res => { this.data = res },err => console.error(err));
        break;
      case 'Gestion des cours':
        this.restservice.get(typePanel).subscribe(res => { this.data = res },err => console.error(err));
        break;
      case 'Planning de cours':
        this.restservice.get(typePanel).subscribe(res => { this.data = res },err => console.error(err));
        break;
    }
  }

  get(event,typePanel){
    switch(typePanel){
      case 'Informations utilisateur':
        this.restservice.getUser().subscribe(res => { this.data = res },err => console.error(err))
        break;
      case 'Gestion des utilisateurs':
        this.restservice.getobjet(event, typePanel).subscribe(res => { this.data2 = res },err => console.error(err))
        break;
      case 'Gestion des chevaux':
        this.restservice.getobjet(event, typePanel).subscribe(res => { this.data2 = res },err => console.error(err))
        break;
      case 'Gestion des cours':
        this.restservice.getobjet(event, typePanel).subscribe(res => { this.data2 = res },err => console.error(err))
        break;
    }  
  }

  getCours(event,typePanel){
    switch(typePanel){
      case 'Planning de cours':
        this.planning2 = []
        this.restservice.getobjet(event, typePanel)
          .subscribe(
            res => { 
              this.planning =  res;
              for(var i = 0; i<this.planning.length; i++){
                this.restservice.getobjet(res[i].idCour, 'Gestion des cours')
                  .subscribe(
                    res => {
                      this.planning2.push(res);
                    },err => console.error(err)) 
              }
            },err => console.error(err))
        break;
    }
    setTimeout(() => {
      this.creationStructure();
    }, 1000);
  }

  creationStructure(){
    this.planningCours = [];
    //console.log(this.planning)
    //console.log(this.planning2)
    for(var i = 0; i<this.planning.length; i++){
      this.courTotal.cavalier=this.planning[i].cavalier;
      this.courTotal.cheval=this.planning[i].cheval;
      this.courTotal.idCour=this.planning[i].idCour;
      this.courTotal.moniteur=this.planning[i].moniteur;
      for(var i = 0; i<this.planning2.length; i++){
        this.courTotal.dateCours=this.planning2[i].dateCours
        this.courTotal.horaire=this.planning2[i].horaire
        this.courTotal.nbrCavalier=this.planning2[i].nbrCavalier
        this.courTotal.niveau=this.planning2[i].niveau
        this.courTotal.titre=this.planning2[i].titre
        this.planningCours.push(this.courTotal);
        this.courTotal = new courTotal();
      }
    }
    console.log(this.planningCours);
  }

  put(event, typePanel){
    switch(typePanel){
      case 'Informations utilisateur':
        if(event.obj.type == 'modificationInformation'){
          this.restservice.put(event, typePanel).subscribe(res => { this.data = res; this.openSnackBar("Vos donnée ont été mis à jour", 'Close')},err => console.error(err));
        }if(event.obj.type == 'modificationPassword'){
          this.restservice.put(event, typePanel).subscribe(res => {this.openSnackBar("Le mot de passe a été modifier", 'Close')},err => console.error(err))
        }
        break;
      case 'Gestion des utilisateurs':
        this.restservice.put(event, typePanel).subscribe(res => { this.data = res; this.openSnackBar("Vos donnée ont été mis à jour", 'Close')},err => console.error(err));
        break;
      case 'Gestion des chevaux':
        this.restservice.put(event, typePanel).subscribe(res => { this.data = res; this.openSnackBar("Vos donnée ont été mis à jour", 'Close')},err => console.error(err));
        break;
      case 'Gestion des cours':
        this.restservice.put(event, typePanel).subscribe(res => { this.data = res; this.openSnackBar("Vos donnée ont été mis à jour", 'Close')},err => console.error(err));
        break;
    }
    
  }

  post(event, typePanel){
    switch(typePanel){
      case 'Gestion des utilisateurs':
        this.restservice.post(event, typePanel).subscribe(res => { this.openSnackBar("l'utilisateur vient d'être crée un mail va être envoyée a celui ci sont identifiant est: " + res, 'Close')},err => console.error(err));
        break;
      case 'Gestion des chevaux':
        this.restservice.post(event, typePanel).subscribe(res => { this.openSnackBar("le cheval vient d'être crée sont identifiant est: " + res, 'Close')},err => console.error(err));
        break;
      case 'Gestion des cours':
        this.restservice.post(event, typePanel).subscribe(res => { this.openSnackBar("le cour vient d'être crée sont identifiant est: " + res, 'Close')},err => console.error(err));
        break;
      case 'Planning de cours':
        this.restservice.post(event, typePanel).subscribe(res => { this.openSnackBar("Vous venez de vous inscrire au cour", 'Close')},err => console.error(err));
        break;
    }
  }

  del(event, typePanel){
    switch(typePanel){
      case 'Gestion des utilisateurs':
        this.restservice.del(event, typePanel).subscribe(res => { this.data3 = res; this.openSnackBar("l'utilisateur vient d'être supprimé ", 'Close')},err => console.error(err));
        break;
      case 'Gestion des chevaux':
        this.restservice.del(event, typePanel).subscribe(res => { this.data3 = res; this.openSnackBar("le cheval vient d'être supprimer", 'Close')},err => console.error(err));
        break;
      case 'Gestion des cours':
        this.restservice.del(event, typePanel).subscribe(res => { this.data3 = res; this.openSnackBar("le cour vient d'être annulée" , 'Close')},err => console.error(err));
        break;
    }
  }

  // use to enable or disable "action tabs" for each menu items
  functSelectedUI(name){
    this.disableTab2 = true
    this.disableTab1 = true
    switch (name){
      //géneral
      case "Accueil": break;
      case "Informations signataire": break;
      case "Gestion des utilisateurs": this.disableTab2 = false; break;
      case "Gestion des chevaux": this.disableTab2 = false; break;
	    case "Gestion des cours": this.disableTab2 = false; break;
      case "Planning de cours": 
        if(this.user.role == 'cavalier'){
          this.disableTab2 = false; 
        }
        break;
        
    }
    this.selectedTab = 0;
  }
  
}
