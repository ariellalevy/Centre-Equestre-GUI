import {Component, OnInit, Input, Output, EventEmitter} from '@angular/core';
import {FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import { creationUser, creationCheval, creationCours } from '../formulaire';
import {MatDatepickerInputEvent} from '@angular/material/datepicker';

@Component({
  selector: 'app-panel-create',
  templateUrl: './panel-create.component.html',
  styleUrls: ['./panel-create.component.css']
})
export class PanelCreateComponent implements OnInit {
  isOptional = true;

  formCreateUser: creationUser;
  formCreateCheval: creationCheval;
  formCreateCours: creationCours;

  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  name = new FormControl('', [Validators.required]);
  lastname = new FormControl('', [Validators.required]);
  phone = new FormControl('', [Validators.required]);
  role = new FormControl('', [Validators.required]);
  type = new FormControl('', [Validators.required]);
  taille = new FormControl('', [Validators.required]);
  poids = new FormControl('', [Validators.required]);
  dateCours = new FormControl('', [Validators.required]);
  horaire = new FormControl('', [Validators.required]);
  nbrCavalier = new FormControl('', [Validators.required]);
  niveau = new FormControl('', [Validators.required]);
  serializedDate = new FormControl((new Date()).toISOString());

  //items retrieved when sending the request rest and display in the bar nenus
  @Input() typePanel:any;
  //Send object that is type of panel for exemple 'operator'
  @Output() sendform = new EventEmitter();

  constructor() {}

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : 'You must enter a value';
  }

  ngOnInit() {
    this.formCreateUser = new creationUser();
    this.formCreateCheval = new creationCheval();
    this.formCreateCours = new creationCours();
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

  ajout(){
    switch(this.typePanel){
      case 'Gestion des utilisateurs':
        this.sendform.emit({obj:this.formCreateUser});
        break;
      case 'Gestion des chevaux':
        this.sendform.emit({obj:this.formCreateCheval});
        break;
      case 'Gestion des cours':
        this.formCreateCours.dateCours = this.formatdate(this.formCreateCours.dateCours);
        this.sendform.emit({obj:this.formCreateCours});
        break;
    };
  }
}
