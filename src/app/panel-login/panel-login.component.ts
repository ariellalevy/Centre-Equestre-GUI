import { Component, Inject, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import {connexion, inscription} from '../formulaire';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';

@Component({
  selector: 'app-panel-login',
  templateUrl: './panel-login.component.html',
  styleUrls: ['./panel-login.component.css']
})
export class PanelLoginComponent implements OnInit {

  login:boolean=true;
  email = new FormControl('', [Validators.required, Validators.email]);
  password = new FormControl('', [Validators.required]);
  name = new FormControl('', [Validators.required]);
  lastname = new FormControl('', [Validators.required]);
  phone = new FormControl('', [Validators.required]);
  role = new FormControl('', [Validators.required]);
  emailPhone = new FormControl('', [Validators.required]);
  formInscription: inscription;
  formConnexion: connexion;
  emailPhoneChamp:string ="";

  //Data of the form that will be returned.
  @Output() sentForm = new EventEmitter();
  @Output() sentForm2 = new EventEmitter();
  @Output() sentForm3 = new EventEmitter();

  constructor(public dialog: MatDialog) {}

  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : 'You must enter a value';
  }

  ngOnInit(): void {
    this.formInscription = new inscription();
    this.formConnexion = new connexion();
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogRetrievePassword, {});

    dialogRef.afterClosed().subscribe(result => {
      this.sentForm2.emit({obj:result});
    });
  }

  openDialog2(): void {
    var identifiant = "";
    var password = "";
    const dialogRef = this.dialog.open(DialogConnexion, {
      data: {identifiant: identifiant, password: password}
    });

    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
    });
  }

  inscription(){
    console.log(this.formInscription.licence);
    console.log(this.formInscription);
    this.sentForm.emit({obj:this.formInscription});
  }

  connexion(){
    const searchTerm = '@';
    const indexOfFirst = this.emailPhoneChamp.indexOf(searchTerm);
    if(indexOfFirst!=-1){
      this.formConnexion.email = this.emailPhoneChamp;
    }else{
      this.formConnexion.phone = this.emailPhoneChamp;
    }
    this.sentForm3.emit({obj:this.formConnexion});
  }
}

export interface DialogData {
  identifiant: string;
  password: string;
}

@Component({
  selector: 'dialog-retrieve-password',
  templateUrl: 'dialog-retrieve-password.html',
  styleUrls: ['./dialog-retrieve-password.css']
})
export class DialogRetrievePassword {
  email = new FormControl('', [Validators.required, Validators.email]);

  constructor(
      public dialog: MatDialog, public dialogRef: MatDialogRef<DialogRetrievePassword>,
      @Inject(MAT_DIALOG_DATA) public data: any){}
  
  getErrorMessage() {
    if (this.email.hasError('required')) {
      return 'You must enter a value';
    }

    return this.email.hasError('email') ? 'Not a valid email' : 'You must enter a value';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

@Component({
  selector: 'dialog-connexion',
  templateUrl: 'dialog-connexion.html',
  styleUrls: ['./dialog-connexion.css']
})
export class DialogConnexion {
  identifiant = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);

  constructor(
      public dialog: MatDialog, public dialogRef: MatDialogRef<DialogConnexion>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData){}
  
  getErrorMessage() {
    return 'You must enter a value';
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}