import AsyncStorage from '@react-native-async-storage/async-storage';


export const loadSite = async () => {
    try {
        const jsonValue = await AsyncStorage.getItem("@site");
        let retour = (jsonValue != null ? JSON.parse(jsonValue) : null);
        let nomSite = retour[0].sit_raison_sociale;
        console.log(retour[0]);
        siteTemp.push(retour[0]);
        console.log("sitetemp:"); console.log(siteTemp[0]);
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
