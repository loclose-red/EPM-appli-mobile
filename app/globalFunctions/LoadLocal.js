// cet ensemble de fonctions sert uniquement pour le dev debug


import AsyncStorage from '@react-native-async-storage/async-storage';


export const loadUserLocalGf = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem("@localUser");
        let retour = (jsonValue != null ? JSON.parse(jsonValue) : null);
        console.log(retour[0]);
        console.log("dans loadUserLocal de fonction globales:");
        console.log(retour[0]);
    } catch(e) {
       // traitement des erreurs
        console.log("erreur fct 'loadUserLocal': ", e);
    }
};

export const loadSite = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem("@site");
        let retour = (jsonValue != null ? JSON.parse(jsonValue) : null);
        let nomSite = retour[0].sit_raison_sociale;
        console.log(retour[0]);
        // setDesRecettes(retour);
        // setEndAsync(true);
        console.log("dans loadSite:" + retour[0].sit_raison_sociale);

    } catch(e) {
       // traitement des erreurs
        console.log("erreur fct 'loadSite': ", e);
    }
};

export const loadEquipements = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem("@equipements");
        let retour = (jsonValue != null ? JSON.parse(jsonValue) : null);
        // setDesRecettes(retour);
        // setEndAsync(true);
        console.log("dans loadEquipements:" + retour[0].equ_marque);
    } catch(e) {
       // traitement des erreurs
        console.log("erreur fct 'loadEquipements': ", e);
    }
};

export const loadPointsMesures = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem("@pointsMesures");
        let retour = (jsonValue != null ? JSON.parse(jsonValue) : null);
        // setDesRecettes(retour);
        // setEndAsync(true);
        console.log("dans loadPointsMesures:" + retour[0].pt_mes_nom);
    } catch(e) {
       // traitement des erreurs
        console.log("erreur fct 'loadPointsMesures': ", e);
    }
};

export const loadCapteurs = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem("@capteurs");
        let retour = (jsonValue != null ? JSON.parse(jsonValue) : null);
        // setDesRecettes(retour);
        // setEndAsync(true);
        console.log("dans loadCapteurs:" + retour[0].cap_marque);
    } catch(e) {
       // traitement des erreurs
        console.log("erreur fct 'loadCapteurs': ", e);
    }
};
export const loadAdresseServeur = async (setAdresseServeur) => {
    setAdresseServeur_copie = setAdresseServeur; // copie de la fonction car l'utilisation directe ne fonctionne pas
    try {
    const jsonValue = await AsyncStorage.getItem("@adresseServeur");
    let retour = (jsonValue != null ? JSON.parse(jsonValue) : null);
    console.log("dans loadAdresseServeur vue login:"); 
    retour? console.log(retour[0]) : console.log("Pas d'adresse serveur en m??moire");;
    if (retour != null){
        setAdresseServeur_copie(retour[0]);
    }else{
        alert("Il n'y a pas d'adresse serveur de configur??e. Veuillez modifier la configuration!");
        setAdresseServeur_copie("");
    }
    } catch (e) {
    // traitement des erreurs
    console.log("erreur fct 'loadAdresseServeur' ", e);
    }
};

