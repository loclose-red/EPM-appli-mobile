import AsyncStorage from '@react-native-async-storage/async-storage';

export const saveSite = async (site) =>{
    try{
        const jsonValue = JSON.stringify(site)
        await AsyncStorage.setItem("@site", jsonValue)
        console.log('dans saveSite');
    }catch(e){
        console.log("erreur fct 'saveSite': ",e);
    }
  };
  
export const saveEquipements = async (equipements) =>{
    try{
        const jsonValue = JSON.stringify(equipements)
        await AsyncStorage.setItem("@equipements", jsonValue)
        console.log('dans save equipements');
    }catch(e){
        console.log("erreur fct 'saveEquipements': ",e);
    }
  };
export  const savePointsMesures = async (pointsMesures) =>{
    try{
        const jsonValue = JSON.stringify(pointsMesures)
        await AsyncStorage.setItem("@pointsMesures", jsonValue)
        console.log('dans savePointsMesures');
    }catch(e){
        console.log("erreur fct 'savePointsMesures': ",e);
    }
  };
export  const saveCapteurs = async (capteurs) =>{
    try{
        const jsonValue = JSON.stringify(capteurs)
        await AsyncStorage.setItem("@capteurs", jsonValue)
        console.log('dans saveCapteurs');
    }catch(e){
        console.log("erreur fct 'saveCapteurs': ",e);
    }
  };

  // saveSite, saveEquipements, savePointsMesures, saveCapteurs