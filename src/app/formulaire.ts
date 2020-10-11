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

export class connexion{
    type: string="connexion";
    email:string="";
    password:string="";
    phone:string="";
    // empty constructor
    constructor(){}
}

export class creationUser{
    type: string="creation";
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
    // empty constructor
    constructor(){}
}