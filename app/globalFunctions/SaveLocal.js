import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveSite = async (site = [{}]) =>{
    try{
        const jsonValue = JSON.stringify(site)
        await AsyncStorage.setItem("@site", jsonValue)
        console.log('dans saveSite');
    }catch(e){
        console.log("erreur fct 'saveSite': ",e);
    }
};

export const saveEquipements = async (equipements = [{}]) =>{
    try{
        const jsonValue = JSON.stringify(equipements)
        await AsyncStorage.setItem("@equipements", jsonValue)
        console.log('dans save equipements');
    }catch(e){
        console.log("erreur fct 'saveEquipements': ",e);
    }
  };
export  const savePointsMesures = async (pointsMesures = [{}]) =>{
    try{
        const jsonValue = JSON.stringify(pointsMesures)
        await AsyncStorage.setItem("@pointsMesures", jsonValue)
        console.log('dans savePointsMesures');
    }catch(e){
        console.log("erreur fct 'savePointsMesures': ",e);
    }
  };
export  const saveCapteurs = async (capteurs = [{}]) =>{
    try{
        const jsonValue = JSON.stringify(capteurs)
        await AsyncStorage.setItem("@capteurs", jsonValue)
        console.log('dans saveCapteurs');
    }catch(e){
        console.log("erreur fct 'saveCapteurs': ",e);
    }
};
export  const saveGrandeurs = async (grandeurs = [{}]) =>{
    try{
        const jsonValue = JSON.stringify(grandeurs)
        await AsyncStorage.setItem("@grandeurs", jsonValue)
        console.log('dans saveGrandeurs');
    }catch(e){
        console.log("erreur fct 'saveGrandeurs': ",e);
    }
};

export const saveAdresseServeur = async (adresseServeur = [""])=>{
    try{
        const jsonValue = JSON.stringify(adresseServeur)
        await AsyncStorage.setItem("@adresseServeur", jsonValue)
        console.log('dans saveAdresseServeur');
    }catch(e){
        console.log("erreur fct 'saveAdresseServeur': ",e);
    }
};

export const saveUserLocal = async (localUser = "")=>{
    try{
        const jsonValue = JSON.stringify(localUser)
        await AsyncStorage.setItem("@localUser", jsonValue)
        console.log('dans saveUserLocal');
    }catch(e){
        console.log("erreur fct 'saveUserLocal': ",e);
    }
};

export const saveSynchroTime = async (save = true) =>{
    let date = new Date;
    let dateString = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
    let heureString = date.getHours() + ':' + date.getMinutes();
    let dateHeureString = dateString + ' à ' + heureString;
    if (save == false){dateHeureString = "Pas de date!"};
    console.log("trace");
    console.log(dateHeureString);

    try{
        const jsonValue = JSON.stringify(dateHeureString)
        await AsyncStorage.setItem("@dateSychro", jsonValue)
        console.log('dans saveSynchroTime');
    }catch(e){
        console.log("erreur fct 'saveSynchroTime': ",e);
    }
}

export const clearAllLocalData = () =>{
    saveSynchroTime(false);
    //On appelle les fonction de sauvegarde avec des valeurs vides
    //ainsi on efface les datas
    saveUserLocal();
    saveAdresseServeur();
    saveAdresseServeur();
    saveGrandeurs();
    saveCapteurs();
    savePointsMesures();
    saveEquipements();
    saveSite();
    
}

//   saveGrandeurs(grandeurs)

  // saveSite, saveEquipements, savePointsMesures, saveCapteurs