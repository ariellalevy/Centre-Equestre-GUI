import { Component,   Input } from '@angular/core';
import { AppService } from '../app.service';
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-panel-principal',
  templateUrl: './panel-principal.component.html',
  styleUrls: ['./panel-principal.component.css']
})
export class PanelPrincipalComponent {
  resultat:any
  utilisateur:any;
  title = 'Centre-Equestre-GUI';

  isLogin:boolean=false

  constructor(private restservice: AppService,private _snackBar: MatSnackBar) {}

  inscription(item) {
    this.restservice.postInscription(item).subscribe(res => { this.openSnackBar("FELICITATION! vous inscris vous êtes maintenant inviter a vous connecter.", 'Close')},err => console.error(err));
  }

  getPassword(event){
    this.restservice.getPassword(event).subscribe(res => { this.openSnackBar("Un mail viens d'être envoyée a un mot de passe temporaires.", 'Close')},err => console.error(err));
  }

  connexion(event){
    this.restservice.login(event)
      .subscribe(res => { 
        this.resultat = res
        if((this.resultat.status == 200)&&(this.resultat.message=="User Logged In Successfully!")){
          this.openSnackBar("Vous êtes connecté", 'Close')
          this.utilisateur = this.resultat.userReponse;
          this.isLogin=true;
        }if(this.resultat.status == 0){
          this.openSnackBar(this.resultat.message, 'Close')
        }
      },err => console.error(err));
  }

  changeLoginStatus(event){
    console.log(event)
    this.isLogin=event
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }
}
