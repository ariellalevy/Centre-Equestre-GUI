import {MediaMatcher} from '@angular/cdk/layout';
import {ChangeDetectorRef, Component, OnDestroy} from '@angular/core';
import { AppService } from '../app.service'
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-panel-general',
  templateUrl: './panel-general.component.html',
  styleUrls: ['./panel-general.component.css']
})
export class PanelGeneralComponent implements OnDestroy {


  data:any;

  mobileQuery: MediaQueryList;
  tabletQuery: MediaQueryList;

  fillerNav= [
    {icon: "home", text: "Accueil"},
    {icon: "account_box", text: "Informations utilisateur"},
    {icon: "supervisor_account", text: "Gestion des utilisateurs"},
    {icon: "card_membership", text: "Gestion des chevaux"},
    {icon: "wysiwyg", text: "Gestion des cours"},
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

  getAll(event,typePanel){
    console.log(event);
  }

  get(event,typePanel){
    switch(typePanel){
      case 'Informations utilisateur':
        this.restservice.getUser().subscribe(res => { this.data = res },err => console.error(err))
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
    }
  }

  del(event, typePanel){
    switch(typePanel){
      case 'Gestion des utilisateurs':
        this.restservice.del(event, typePanel).subscribe(res => { this.openSnackBar("l'utilisateur vient d'être supprimé ", 'Close')},err => console.error(err));
        break;
      case 'Gestion des chevaux':
        this.restservice.del(event, typePanel).subscribe(res => { this.openSnackBar("le cheval vient d'être supprimer", 'Close')},err => console.error(err));
        break;
      case 'Gestion des cours':
        this.restservice.del(event, typePanel).subscribe(res => { this.openSnackBar("le cour vient d'être annulée" , 'Close')},err => console.error(err));
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
      case "Planning de cours": break;
    }
    this.selectedTab = 0;
  }
  
}
