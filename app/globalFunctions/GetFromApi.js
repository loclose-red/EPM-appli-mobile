import AsyncStorage from '@react-native-async-storage/async-storage';

import {saveSite, saveEquipements, savePointsMesures, saveCapteurs, saveGrandeurs} from '../globalFunctions/SaveLocal';
import {loadSite, loadEquipements, loadPointsMesures, loadCapteurs} from '../globalFunctions/LoadLocal';


const adresseServeur = "http://192.168.1.13:8000";
let site = [];
let equipements = [];
let pointsMesures = [];
let capteurs = [];
let grandeurs = [];

//création d'indicateurs pour vérifier le bon déroulement des requetes API
let fetchSiteFinish = false;
let fetchEquipementsFinish = false;
let fetchPointsMesuresFinish = false;
let fetchCapteursFinish = false;
let fetchGrandeursFinish = false;


// site.push(5);   //pour ajouter une valeur dans un tableau
// site.length = 0;   // pour effacer le tableau et ses références




export function GetAndSaveAll(idSite) {

  let controller = new AbortController();
  let signal = controller.signal;
  console.log("dans fonction globale");
  
  //raz des tableaux
  site.length = 0;
  equipements.length = 0;
  pointsMesures.length = 0;
  capteurs.length = 0;

  fetchSiteFinish = false;
  fetchEquipementsFinish = false;
  fetchPointsMesuresFinish = false;
  fetchCapteursFinish = false;

  
  
  getSiteAndEquipementsByIdSiteFromApi(idSite,signal);
  getGrandeursFromApi(signal);

  //mise en place d'un timeOut de 15 secondes sur les fetch
  setTimeout(() => checkFetch (controller), 15000);
  
}









// cette fonction s'execute après le temps du time out
function checkFetch (controller) {
  // on arrête les fetch en cours si tout n'est pas terminé
  if((fetchSiteFinish == false)
    ||(fetchEquipementsFinish == false)
    ||(fetchPointsMesuresFinish == false)
    ||(fetchCapteursFinish == false)
    ||(fetchGrandeursFinish == false))
    {
    console.log('fetch erreur');
    controller.abort();    
  }else{
    console.log('fetch ok');
    
  }

  //si au moins un fetch a fonctionné, on sauvegarde avec async storage
  if(fetchSiteFinish||fetchEquipementsFinish||fetchPointsMesuresFinish||fetchCapteursFinish||fetchGrandeursFinish){
    saveSite(site);
    saveEquipements(equipements);
    savePointsMesures(pointsMesures);
    saveCapteurs(capteurs);
    saveGrandeurs(grandeurs);
  }

}

// export function getAllFromApiByIdSite(idSite) {
//   console.log("dans fonction globale");
//   setTimeout(() => console.log('test fonction time out ') , 10000);
//   getSiteByIdFromApi(idSite);
// }
// export function stopFetch (){
//   controller.abort();
// }

const getSiteAndEquipementsByIdSiteFromApi = async (idSite,signal) => {
  //création d'une référence du tableau "site" pour utilisation dans le "try..."
  let site_sc = site;
  try {
    //const response = await fetch('http://192.168.1.13:8000/api/sites/1');
    const response = await fetch(adresseServeur + '/api/sites/' + idSite, {signal});
    const json = await response.json();
    site_sc.push(json);
    let lesEquipements = [];
    lesEquipements = json.equipements;
    console.log('dans getSiteByIdFromApi');

    // on récupère de l'api les équipements liés au site 
    let idEquipement = "";
    lesEquipements.forEach(equipement => {
      idEquipement = equipement.replace("/api/equipements/", "");
      console.log("dans for each id equipement: " + idEquipement);
      getEquipementAndPtMesureByIdEquiFromApi(idEquipement,signal);
    });
  } catch (error) {
    console.log('Erreur dans fct: getSiteAndEquipementsByIdSiteFromApi()');
    console.error(error);
  } finally {
    fetchSiteFinish = true;
    // console.log('dans finally ...');
  }

};

//cette fonction déclenche en cascade les autres fonctions
//
const getEquipementAndPtMesureByIdEquiFromApi = async (idEqui,signal) =>{
  let equipements_sc = equipements;
  try {
    const response = await fetch(adresseServeur + '/api/equipements/' + idEqui, {signal});
    const json = await response.json();
    equipements_sc.push(json);
    let lesPointsDeMesures = [];
    lesPointsDeMesures = json.ptMesures;

    // on récupère de l'api les points de mesure liés à l'équipement 
    let idPtDeMes = "";
    lesPointsDeMesures.forEach(unPtDeMes => {
      idPtDeMes = unPtDeMes.replace("/api/pt_mesures/", "");
      console.log("dans for each id pt de mesure: " + idPtDeMes);
      getPtDeMesAndCapteurByIdPtdeMesFromApi(idPtDeMes,signal);
    });
  } catch (error) {
    console.error(error);
  } finally {
    fetchEquipementsFinish = true;
    // console.log('dans finally ...');
  }  
};

const getPtDeMesAndCapteurByIdPtdeMesFromApi = async (idPtMes,signal) =>{
  let pointsMesures_sc = pointsMesures;
  try {
    const response = await fetch(adresseServeur + '/api/pt_mesures/' + idPtMes, {signal});
    const json = await response.json();
    pointsMesures_sc.push(json);
    let leCapteur = "";
    leCapteur = json.capteur;

    // on récupère de l'api, le capteur lié au point de mesure 
    let idCapteur = leCapteur.replace("/api/capteurs/", "");
    console.log("l'id capteur: " + idCapteur);
    getCapteurByIdFromApi(idCapteur,signal);
  } catch (error) {
    console.error(error);
  } finally {
    fetchPointsMesuresFinish = true;
    // console.log('dans finally ...');
  }
};

//fonction interne déclenchée par les fonctions précédentes
const getCapteurByIdFromApi = async (idCapteur,signal) =>{
  let capteurs_sc = capteurs;
  try {
    const response = await fetch(adresseServeur + '/api/capteurs/' + idCapteur, {signal});
    const json = await response.json();
    capteurs_sc.push(json);
  } catch (error) {
    console.error(error);
  } finally {
    fetchCapteursFinish = true;
    // console.log('dans finally ...');
  }
};

//fonction interne
const getGrandeursFromApi = async (signal) =>{
  let grandeurs_sc = grandeurs;
  try {
    const response = await fetch(adresseServeur + '/api/grandeurs', {signal});
    const json = await response.json();
    grandeurs_sc.push(json);
  } catch (error) {
    console.error(error);
  } finally {
    fetchGrandeursFinish = true;
    // console.log('dans finally ...');
  }
};


//fonction externe isolée, n'est pas déclenchée par les fonction précédentes
export const getUsersFromApi = async () => {
  
  // console.log(adresseServeur);
  // console.log(adresseServeur + '/api/utilisateurs?page=1');

  let controllerGu = new AbortController(); //objet utilisé pour stopper les fetch
  let signalGu = controllerGu.signal; // propriété pour insérer dans le fetch
  let fetchOk = false; // indicateur pour fetch terminé?
  // time out de 15 secondes sur le fetch
  setTimeout(() => {fetchOk ? null:controllerGu.abort();}, 15000);
  tableauUsers = [];
  try {
  //  const response = await fetch('https://reactnative.dev/movies.json');
    const response = await fetch(adresseServeur + '/api/utilisateurs?page=1', signalGu);
    const json = await response.json();
    console.log('dans getUsersFromApi');
    // console.log(json);
    tableauUsers = json["hydra:member"];
    // console.log(tableauUsers);
 } catch (error) {
   console.log("erreur fonction getUsersFromApi");
   console.error(error);
 } finally {
   fetchOk = true;
   return tableauUsers;
  //  setLoading(false);
 }
}
