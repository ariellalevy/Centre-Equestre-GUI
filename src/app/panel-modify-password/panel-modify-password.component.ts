import { Component, OnInit } from '@angular/core';
import {FormControl, Validators} from '@angular/forms';
import { AppService } from '../app.service'
import {MatSnackBar} from '@angular/material/snack-bar';

@Component({
  selector: 'app-panel-modify-password',
  templateUrl: './panel-modify-password.component.html',
  styleUrls: ['./panel-modify-password.component.css']
})
export class PanelModifyPasswordComponent implements OnInit {

  data:MdpData;
  email = new FormControl('', [Validators.required]);
  password = new FormControl('', [Validators.required]);
  passwordConfirm = new FormControl('', [Validators.required]);
  
  constructor(private restservice: AppService,private _snackBar: MatSnackBar) { }

  ngOnInit(): void {
    this.data = new MdpData()
  }

  getErrorMessage() {
    if(this.password.value()==this.passwordConfirm.value()){
      return 'les mot des passe doivent etre identique!!!';
    }else{
      return 'You must enter a value';
    }
  }

  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 2000,
    });
  }

  valider(){
    console.log(this.data)
    this.restservice.modifyMdp(this.data).subscribe(res => { this.openSnackBar("Vos donnée ont été mis à jour", 'Close')},err => console.error(err));
  }
}

export class MdpData {
  email: string="";
  password: string="";
  passwordConfirm: string="";
  // empty constructor
  constructor(){}
}