import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy, Input, SimpleChanges, Output, EventEmitter} from '@angular/core';
import { AppService } from '../app.service'
import {MatSnackBar} from '@angular/material/snack-bar';
import {creationUser} from '../formulaire'

@Component({
  selector: 'app-panel-general',
  templateUrl: './panel-general.component.html',
  styleUrls: ['./panel-general.component.css']
})
export class PanelGeneralComponent implements OnDestroy {

  user:creationUser;
  username:any

  data:any;
  data2:any;
  data3:any;

  isLogin:any

  planning:any;
  planning2:any;
  tabCourCheval=[]
  compteur=0;

  mobileQuery: MediaQueryList;
  tabletQuery: MediaQueryList;

  fillerNav= [
    {icon: "home", text: "Accueil"},
    {icon: "account_box", text: "Informations utilisateur"}
  ]
  //variable pour savoir si le menu est active
  disableTab1: boolean = true;
  disableTab2: boolean = true;
  selectedTab: number = 0;

  fillerContent = {icon: "home", text: "Accueil"};

  snackBar:MatSnackBar

  private _mobileQueryListener: () => void;

  @Input() utilisateur: any;
  @Output() isLoggedEvent = new EventEmitter<boolean>();

  constructor(changeDetectorRef: ChangeDetectorRef, media: MediaMatcher, private changeDetectorRef2: ChangeDetectorRef, private media2: MediaMatcher, private restservice: AppService, private _snackBar: MatSnackBar) {
    this.mobileQuery = media.matchMedia('(max-width: 600px)');
    this._mobileQueryListener = () => changeDetectorRef.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.user = new creationUser();
  }
  
  ngOnInit(){// detect responsive
    this.mobileQuery = this.media2.matchMedia('(max-width: 1023px)');
    this.tabletQuery = this.media2.matchMedia('(max-width: 1479px)');
    this._mobileQueryListener = () => this.changeDetectorRef2.detectChanges();
    this.mobileQuery.addListener(this._mobileQueryListener);
    this.tabletQuery.addListener(this._mobileQueryListener);
  }

  ngOnDestroy(): void {
    this.mobileQuery.removeListener(this._mobileQueryListener);
  }

  ngOnChanges(changes: SimpleChanges): void {
    // if change data
    if(changes['utilisateur']){
      if(this.utilisateur!=null){
        this.user.id = this.utilisateur.id
        this.user.email = this.utilisateur.email
        this.user.lastname = this.utilisateur.lastName
        this.user.licence = this.utilisateur.licenceNumber
        this.user.name = this.utilisateur.firstName
        this.user.phone = this.utilisateur.phoneNumber
        this.user.role = this.utilisateur.role
        this.user.password = this.utilisateur.password
        //Stockage d'un objet plus compliqué
        console.log(this.user);
        localStorage.setItem('userCourrant', JSON.stringify(this.user));
        //Récupération de l'objet
        var obj = JSON.parse(localStorage.getItem('userCourrant'));
        this.username = obj.name + " " + obj.lastname;
        if(this.user.role=="cavalier"){
          this.fillerNav.push({icon: "assignment", text: "Planning de cours"});
        }if(this.user.role=="moniteur"){
          this.fillerNav.push({icon: "account_balance", text: "Gestion des cours"})
          this.fillerNav.push({icon: "assignment", text: "Planning de cours"} )
        }if(this.user.role=="admin"){
          this.fillerNav.push({icon: "supervisor_account", text: "Gestion des utilisateurs"})
          this.fillerNav.push({icon: "card_membership", text: "Gestion des chevaux"})
        }if(this.user.role=="SuperAdmin"){
          this.fillerNav.push({icon: "card_membership", text: "Gestion des Administateur"})
        }
      }
    }
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

  logout(){
    this.restservice.logout(this.user.id).subscribe(res => { 
      if(res = "User Logged out Successfully"){
        this.openSnackBar(res.toString(), 'Close')
        this.isLogin=false;
        this.isLoggedEvent.emit(false)
      }else{
        this.openSnackBar(res.toString(), 'Close')
      }
    },err => console.error(err))
  }

  getAll(typePanel){
    switch(typePanel){
      case 'Gestion des utilisateurs':
        this.restservice.get(typePanel).subscribe(res => { this.data = res },err => console.error(err));
        break;
      case 'Gestion des Administateur':
        this.restservice.get(typePanel).subscribe(res => { this.data = res },err => console.error(err));
        break;
      case 'Gestion des chevaux':
        this.restservice.get(typePanel).subscribe(res => { this.data = res },err => console.error(err));
        break;
      case 'Gestion des cours':
        this.restservice.get(typePanel).subscribe(res => { this.data = res },err => console.error(err));
        break;
      case 'Planning de cours':
        this.restservice.get(typePanel).subscribe(res => {this.data = res},err => console.error(err));
        break;
      case 'Planning de cours':
        this.restservice.get(typePanel).subscribe(res => {this.data = res},err => console.error(err));
        break;
    }
  }

  get(event,typePanel){
    switch(typePanel){
      case 'Informations utilisateur':
        this.restservice.getUser(this.user.id).subscribe(res => { this.data = res },err => console.error(err))
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
        if(this.user.role == "cavalier"){
          this.restservice.getobjet(event, typePanel)
          .subscribe(res => { 
            this.planning = res
            for (var i = 0; i<this.planning.length; i++){
              this.restservice.getobjet(this.planning[i].idCour, 'Gestion des cours')
              .subscribe(res => { 
                this.tabCourCheval.push(res);
              },err => console.error(err));
            }
          },err => console.error(err));
        }else{
          this.restservice.getobjet(event, typePanel).subscribe(res => { this.planning =  res;},err => console.error(err));
        }
        break;
    }
  }

  getListEleve(event,typePanel){
    switch(typePanel){
      case 'Planning de cours':
        this.restservice.getList(event, typePanel).subscribe(res => { this.planning2 =  res;},err => console.error(err));
        break;
    }
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
        this.restservice.put(event, typePanel).subscribe(() => { this.data3 = "modify"; this.openSnackBar("Vos donnée ont été mis à jour", 'Close')},err => console.error(err));
        break;
      case 'Gestion des chevaux':
        this.restservice.put(event, typePanel).subscribe(() => { this.data3 = "modify"; this.openSnackBar("Vos donnée ont été mis à jour", 'Close')},err => console.error(err));
        break;
      case 'Gestion des cours':
        this.restservice.put(event, typePanel).subscribe(() => { this.data3 = "modify"; this.openSnackBar("Vos donnée ont été mis à jour", 'Close')},err => console.error(err));
        break;
      case 'Planning de cours':
        this.restservice.put(event, typePanel).subscribe(() => { this.openSnackBar("Les chevaux ont bien été affecté", 'Close')},err => console.error(err));
        break;
    }
    
  }

  post(event, typePanel){
    switch(typePanel){
      case 'Gestion des utilisateurs':
        this.restservice.post(event, typePanel).subscribe(res => { this.selectedTab = 0; this.openSnackBar("l'utilisateur vient d'être crée un mail va être envoyée a celui ci sont identifiant est: " + res, 'Close')},err => console.error(err));
        break;
      case 'Gestion des chevaux':
        this.restservice.post(event, typePanel).subscribe(res => { this.selectedTab = 0; this.openSnackBar("le cheval vient d'être crée sont identifiant est: " + res, 'Close')},err => console.error(err));
        break;
      case 'Gestion des cours':
        this.restservice.post(event, typePanel).subscribe(res => { this.selectedTab = 0; this.openSnackBar("le cour vient d'être crée sont identifiant est: " + res, 'Close')},err => console.error(err));
        break;
      case 'Planning de cours':
        this.restservice.post(event, typePanel).subscribe(() => { this.openSnackBar("Vous venez de vous inscrire au cour", 'Close')},err => console.error(err));
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
      case 'Planning de cours':
        this.restservice.getById(event, this.username).subscribe(res => {this.restservice.del(res, typePanel).subscribe(res => { this.openSnackBar("vous êtes désinscrire du cour" , 'Close')},err => console.error(err));},err => console.error(err));
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
      case "Gestion des Administateur": this.disableTab2 = false; break;
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
