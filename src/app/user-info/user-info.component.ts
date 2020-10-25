import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges, Inject  } from '@angular/core';
import {MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit, OnChanges {

  dataInfos:dataInfos;
  donneevide:string="";

  @Output() sentForm = new EventEmitter();
  @Output() sentForm2 = new EventEmitter();
  @Output() sentForm3 = new EventEmitter();
  @Input() data: any;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.sentForm2.emit({obj:this.donneevide});
    this.dataInfos = new dataInfos();
  }

  ngOnChanges(changes: SimpleChanges) {
    if(changes['data']){
      if(this.data!=undefined){
        this.dataInfos = new dataInfos();
        this.dataInfos.email = this.data.email;
        this.dataInfos.firstName = this.data.firstName;
        this.dataInfos.lastName = this.data.lastName;
        this.dataInfos.licenceNumber = this.data.licenceNumber;
        this.dataInfos.phoneNumber = this.data.phoneNumber;
        this.dataInfos.role = this.data.role;
      }
    }
  }

  openDialog(): void {
    var type  = "modificationPassword"
    var password = "";
    var passwordConfirm = "";
    const dialogRef = this.dialog.open(DialogModificationMdp, {
      data: {type:type, password: password, passwordConfirm: passwordConfirm}
    });

    dialogRef.afterClosed().subscribe(result => {
      this.sentForm3.emit({obj:result});
    });
  }

  modifier(){
    this.sentForm.emit({obj:this.dataInfos});
  }

}

@Component({
  selector: 'dialog-modification-mdp',
  templateUrl: 'dialog-modification-mdp.html',
  styleUrls: ['./dialog-modification-mdp.css']
})
export class DialogModificationMdp {
  password = new FormControl('', [Validators.required]);
  passwordConfirm = new FormControl('', [Validators.required]);

  constructor(
      public dialog: MatDialog, public dialogRef: MatDialogRef<DialogModificationMdp>,
      @Inject(MAT_DIALOG_DATA) public data: DialogData){}

  
  
  getErrorMessage() {
    if(this.password.value()==this.passwordConfirm.value()){
      return 'les mot des passe doivent etre identique!!!';
    }else{
      return 'You must enter a value';
    }
  }

  onNoClick(): void {
    this.dialogRef.close();
  }
}

export interface DialogData {
  type:string;
  password: string;
  passwordConfirm: string;
}

export class dataInfos{
  type:string="modificationInformation"
  email:string="";
  firstName:string="";
  lastName:string="";
  licenceNumber:string="";
  phoneNumber:string="";
  role:string="";

  // empty constructor
  constructor(){}
}