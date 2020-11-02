import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class AppService {

  conf: Object;
  configUrl = '../assets/config.json';
  user

  constructor(private http: HttpClient) { 
    this.getConfig(); 
    this.user = JSON.parse(localStorage.getItem('userCourrant'));
  }

  getConfig() {
    return this.http.get(this.configUrl).subscribe(conf => {this.conf = conf});
  }

  public login(corps){
    var body = {email:corps.obj.email,phoneNumber:corps.obj.phone,password:corps.obj.password,firstName:corps.obj.identifiant}
    return this.http.post(this.conf['urlBase'] +  "login", body, HTTP_OPTIONS)
  }

  public logout(event){
    return this.http.get(this.conf['urlBase'] + "logout/" + event, {responseType: 'text'});
  }

  public getUser(id){
    return this.http.get(this.conf['urlBase'] + "user/" + id);
  }

  public get(typePanel){
    switch(typePanel){
      case 'Gestion des utilisateurs':
        return this.http.get(this.conf['urlBase'] +  "users", HTTP_OPTIONS)
      case 'Gestion des Administateur':
        return this.http.get(this.conf['urlBase'] +  "usersAdmin", HTTP_OPTIONS)
      case 'Gestion des chevaux':
        return this.http.get(this.conf['urlBase'] +  "chevaux", HTTP_OPTIONS)
      case 'Gestion des cours':
        return this.http.get(this.conf['urlBase'] +  "cours", HTTP_OPTIONS)
      case 'Planning de cours':
        if(this.user.role == "cavalier"){
          return this.http.get(this.conf['urlBase'] +  "cours", HTTP_OPTIONS)
        }else{
          return this.http.get(this.conf['urlBase'] +  "chevaux", HTTP_OPTIONS)
        }
    }
  }

  getList(event, typePanel){
    var user = JSON.parse(localStorage.getItem('userCourrant'));
    switch(typePanel){
      case 'Planning de cours':
        if(user.role=="moniteur"){
          return this.http.get(this.conf['urlBase'] +  "listCavalierCheval", HTTP_OPTIONS)
        }
    }
  }

  getById(event,username){
    return this.http.get(this.conf['urlBase'] +  "getByIdCour?idCour=" + event.obj + "&cavalier=" + username, HTTP_OPTIONS)
  }

  getobjet(event, typePanel){
    var user = JSON.parse(localStorage.getItem('userCourrant'));
    switch(typePanel){
      case 'Gestion des utilisateurs':
        return this.http.get(this.conf['urlBase'] +  "user/" + event.obj, HTTP_OPTIONS)
      case 'Gestion des chevaux':
        return this.http.get(this.conf['urlBase'] +  "cheval/" + event.obj, HTTP_OPTIONS)
      case 'Gestion des cours':
        if(event.obj == null || event.obj == undefined){
          return this.http.get(this.conf['urlBase'] +  "cour/" + event, HTTP_OPTIONS)
        }else{
          return this.http.get(this.conf['urlBase'] +  "cour/" + event.obj, HTTP_OPTIONS)
        }
      case 'Planning de cours':
        if(user.role=="cavalier"){
          return this.http.get(this.conf['urlBase'] +  "idByCavalier?cavalier=" + event.obj, HTTP_OPTIONS)
        }else{
          return this.http.get(this.conf['urlBase'] +  "coursMoniteur?moniteur=" + event.obj, HTTP_OPTIONS)
        }
    }
  }

  public put(corps, typePanel){
    var body;
    switch(typePanel){
      case 'Informations utilisateur':
        if(corps.obj.type == 'modificationInformation'){
          body = {firstName:corps.obj.firstName,lastName:corps.obj.lastName,email:corps.obj.email,password:corps.obj.password,phoneNumber:corps.obj.phoneNumber,licenceNumber:corps.obj.licenceNumber,role:corps.obj.role};
          return this.http.put(this.conf['urlBase'] +  "user/" + this.user.id, body, HTTP_OPTIONS)
        }if(corps.obj.type == 'modificationPassword'){
          body = {password:corps.obj.password};
          return this.http.put(this.conf['urlBase'] +  "user/" + this.user.id, body, HTTP_OPTIONS)
        }
      case 'Gestion des utilisateurs':
        body = {firstName:corps.obj.firstName,lastName:corps.obj.lastName,email:corps.obj.email,password:corps.obj.password,phoneNumber:corps.obj.phoneNumber,licenceNumber:corps.obj.licenceNumber,role:corps.obj.role};
        return this.http.put(this.conf['urlBase'] +  "user/" + corps.obj.id, body, HTTP_OPTIONS)
      case 'Gestion des chevaux':
        body = {nom:corps.obj.nom,type:corps.obj.type,poids:corps.obj.poids,taille:corps.obj.taille};
        return this.http.put(this.conf['urlBase'] +  "cheval/" + corps.obj.id, body, HTTP_OPTIONS)
      case 'Gestion des cours':
        body = {titre: corps.obj.titre,dateCours: corps.obj.dateCours,horaire: corps.obj.horaire,nbrCavalier: corps.obj.nbrCavalier,niveau: corps.obj.niveau,idMoniteur: corps.obj.idMoniteur};
        return this.http.put(this.conf['urlBase'] +  "cour/" + corps.obj.id, body, HTTP_OPTIONS)
      case 'Planning de cours':
        body = body={cheval:corps.obj.cheval};
        return this.http.put(this.conf['urlBase'] +  "addCheval/" + corps.obj.id, body, HTTP_OPTIONS)
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
        body = {titre: corps.obj.titre,dateCours: corps.obj.dateCours,horaire: corps.obj.horaire,nbrCavalier: corps.obj.nbrCavalier,niveau: corps.obj.niveau,moniteur:corps.obj.moniteur};
        return this.http.post(this.conf['urlBase'] +  "cour", body, HTTP_OPTIONS)
      case 'Planning de cours':
        body = body={idCour:corps.obj.idCour,moniteur:corps.obj.moniteur,cavalier:corps.obj.cavalier,cheval:corps.obj.cheval};
        return this.http.post(this.conf['urlBase'] +  "addCavalierCheval", body, HTTP_OPTIONS)
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
      case 'Planning de cours':
        return this.http.delete(this.conf['urlBase'] +  "deleteCavalierCheval/" + corps, HTTP_OPTIONS)
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