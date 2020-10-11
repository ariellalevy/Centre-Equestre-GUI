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
    }
  }

  public del(corps, typePanel){
    var id;
    switch(typePanel){
      case 'Gestion des utilisateurs':
        id = corps.obj.id;
        return this.http.delete(this.conf['urlBase'] +  "user/" + id, HTTP_OPTIONS)
      case 'Gestion des chevaux':
        id = corps.obj.id;
        return this.http.delete(this.conf['urlBase'] +  "cheval/" + id, HTTP_OPTIONS)
      case 'Gestion des cours':
        id = corps.obj.id;
        return this.http.delete(this.conf['urlBase'] +  "cour/" + id, HTTP_OPTIONS)
    }
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