////////////////////////////////////////////////////////////////////////////////
///                             Structure Générale                          ///
//////////////////////////////////////////////////////////////////////////////

export class inscription{
    type: string="inscription";
    email:string="";
    password:string="";
    name:string="";
    lastname:string="";
    phone:string="";
    role:string="";
    licence:string="";
    // empty constructor
    constructor(){}
}

export interface user{
    id: any;
    email:any;
    nom:any;
    prenom:any;
    phone:any;
    role:any;
    licence:any;
    suppression: string;
    modification: string;
}

export interface cheval{
    id: any;
    nom:any;
    type:any;
    poids:any;
    taille:any;
    suppression: string;
    modification: string;
}

export interface cour{
    id: any;
    titre:any;
    dateCours:any;
    horaire:any;
    moniteur:any;
    nbrCavalier:any;
    niveau:any;
    suppression: string;
    modification: string;
}

export interface cours{
    id: any;
    titre:any;
    dateCours:any;
    horaire:any;
    nbrCavalier:any;
    niveau:any;
    moniteur:any
    inscription: string;
    desinscription: string;
}

export class connexion{
    type: string="connexion";
    identifiant:string="";
    email:string="";
    password:string="";
    phone:string="";
    // empty constructor
    constructor(){}
}

export class creationUser{
    type: string="creation";
    id:number=0;
    email:string="";
    password:string="";
    name:string="";
    lastname:string="";
    phone:string="";
    role:string="";
    licence:string="";
    // empty constructor
    constructor(){}
}

export class courSpecifique{
    idCour:number=0;
    moniteur:string="";
    cavalier:string="";
    cheval:string="";
    // empty constructor
    constructor(){}
}

export class courTotal{
    idCour:number=0;
    moniteur:string="";
    cavalier:string="";
    cheval:string="";
    titre:string="";
    dateCours:string="";
    horaire:string="";
    nbrCavalier:string="";
    niveau:string="";
    // empty constructor
    constructor(){}
}



export class creationCheval{
    nom:string="";
    type:string="";
    poids:string="";
    taille:string="";
    // empty constructor
    constructor(){}
}

export class creationCours{
    titre:string="";
    dateCours:string="";
    horaire:string="";
    nbrCavalier:string="";
    niveau:string="";
    moniteur:string=""
    // empty constructor
    constructor(){}
}