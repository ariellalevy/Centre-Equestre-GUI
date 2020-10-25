import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class AppService {

  conf: Object;
  configUrl = '../assets/config.json';

  constructor(private http: HttpClient) { this.getConfig(); }

  getConfig() {
    return this.http.get(this.configUrl).subscribe(conf => {this.conf = conf});
  }

  public getUser(){
    return this.http.get(this.conf['urlBase'] + "user/1");
  }

  public get(typePanel){
    switch(typePanel){
      case 'Gestion des utilisateurs':
        return this.http.get(this.conf['urlBase'] +  "users", HTTP_OPTIONS)
      case 'Gestion des chevaux':
        return this.http.get(this.conf['urlBase'] +  "chevaux", HTTP_OPTIONS)
      case 'Gestion des cours':
        return this.http.get(this.conf['urlBase'] +  "cours", HTTP_OPTIONS)
      case 'Planning de cours':
        return this.http.get(this.conf['urlBase'] +  "cours", HTTP_OPTIONS)
    }
  }

  getobjet(event, typePanel){
    switch(typePanel){
      case 'Gestion des utilisateurs':
        return this.http.get(this.conf['urlBase'] +  "user/" + event.obj, HTTP_OPTIONS)
      case 'Gestion des chevaux':
        return this.http.get(this.conf['urlBase'] +  "cheval/" + event.obj, HTTP_OPTIONS)
      case 'Gestion des cours':
        console.log(event)
        if(event.obj == null || event.obj == undefined){
          return this.http.get(this.conf['urlBase'] +  "cour/" + event, HTTP_OPTIONS)
        }else{
          return this.http.get(this.conf['urlBase'] +  "cour/" + event.obj, HTTP_OPTIONS)
        }
      case 'Planning de cours':
        return this.http.get(this.conf['urlBase'] +  "courCavalier?cavalier=" + event.obj, HTTP_OPTIONS)
    }
  }

  public put(corps, typePanel){
    var body;
    switch(typePanel){
      case 'Informations utilisateur':
        if(corps.obj.type == 'modificationInformation'){
          body = {firstName:corps.obj.firstName,lastName:corps.obj.lastName,email:corps.obj.email,password:corps.obj.password,phoneNumber:corps.obj.phoneNumber,licenceNumber:corps.obj.licenceNumber,role:corps.obj.role};
          return this.http.put(this.conf['urlBase'] +  "user/1", body, HTTP_OPTIONS)
        }if(corps.obj.type == 'modificationPassword'){
          body = {password:corps.obj.password};
          return this.http.put(this.conf['urlBase'] +  "user/1", body, HTTP_OPTIONS)
        }
      case 'Gestion des utilisateurs':
        body = {firstName:corps.obj.firstName,lastName:corps.obj.lastName,email:corps.obj.email,password:corps.obj.password,phoneNumber:corps.obj.phoneNumber,licenceNumber:corps.obj.licenceNumber,role:corps.obj.role};
        return this.http.put(this.conf['urlBase'] +  "user/" + corps.obj.id, body, HTTP_OPTIONS)
      case 'Gestion des chevaux':
        body = {nom:corps.obj.nom,type:corps.obj.type,poids:corps.obj.poids,taille:corps.obj.taille};
        return this.http.put(this.conf['urlBase'] +  "cheval/" + corps.obj.id, body, HTTP_OPTIONS)
      case 'Gestion des cours':
        console.log(corps.obj.dateCours)
        body = {titre: corps.obj.titre,dateCours: corps.obj.dateCours,horaire: corps.obj.horaire,nbrCavalier: corps.obj.nbrCavalier,niveau: corps.obj.niveau,idMoniteur: corps.obj.idMoniteur};
        return this.http.put(this.conf['urlBase'] +  "cour/" + corps.obj.id, body, HTTP_OPTIONS)
        
    }
  }

  public post(corps, typePanel){
    var body;
    switch(typePanel){
      case 'Gestion des utilisateurs':
        body = {firstName:corps.obj.name,lastName:corps.obj.lastname,email:corps.obj.email,password:corps.obj.password,phoneNumber:corps.obj.phone,licenceNumber:corps.obj.licence,role:corps.obj.role}
        return this.http.post(this.conf['urlBase'] +  "user", body, HTTP_OPTIONS)
      case 'Gestion des chevaux':
        body = {nom:corps.obj.nom,type:corps.obj.type,poids:corps.obj.poids,taille:corps.obj.taille};
        return this.http.post(this.conf['urlBase'] +  "cheval", body, HTTP_OPTIONS)
      case 'Gestion des cours':
        body = {titre: corps.obj.titre,dateCours: corps.obj.dateCours,horaire: corps.obj.horaire,nbrCavalier: corps.obj.nbrCavalier,niveau: corps.obj.niveau};
        return this.http.post(this.conf['urlBase'] +  "cour", body, HTTP_OPTIONS)
      case 'Planning de cours':
        body = body={idCour:corps.obj.idCour,moniteur:corps.obj.moniteur,cavalier:corps.obj.cavalier,cheval:corps.obj.cheval};
        return this.http.post(this.conf['urlBase'] +  "courDetail", body, HTTP_OPTIONS)
    }
  }

  public del(corps, typePanel){
    var id;
    switch(typePanel){
      case 'Gestion des utilisateurs':
        id = corps.obj;
        return this.http.delete(this.conf['urlBase'] +  "user/" + id, HTTP_OPTIONS)
      case 'Gestion des chevaux':
        id = corps.obj;
        return this.http.delete(this.conf['urlBase'] +  "cheval/" + id, HTTP_OPTIONS)
      case 'Gestion des cours':
        id = corps.obj;
        return this.http.delete(this.conf['urlBase'] +  "cour/" + id, HTTP_OPTIONS)
    }
  }

  public postInscription(corps){
    var body;
    body = {firstName:corps.obj.name,lastName:corps.obj.lastname,email:corps.obj.email,password:corps.obj.password,phoneNumber:corps.obj.phone,licenceNumber:corps.obj.licence,role:corps.obj.role}
    return this.http.post(this.conf['urlBase'] +  "user", body, HTTP_OPTIONS)
  }

  public getPassword(corps){
    return this.http.get(this.conf['urlBase'] +  "getNewPassword?email=" + corps.obj, HTTP_OPTIONS)
  }

  public modifyMdp(corps){
    var body;
    body = {email:corps.email,password:corps.password,passwordConfirm:corps.passwordConfirm};
    return this.http.put(this.conf['urlBase'] +  "modifyMdp", body, HTTP_OPTIONS)
  }
}

export const HTTP_OPTIONS = {
  headers: new HttpHeaders({
    'Content-Type':  'application/json',
    'Access-Control-Allow-Credentials' : 'true',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, PATCH, DELETE, PUT, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With',
  })
};