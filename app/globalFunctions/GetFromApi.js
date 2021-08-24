import AsyncStorage from '@react-native-async-storage/async-storage';

import {saveSite, saveEquipements, savePointsMesures, saveCapteurs} from '../globalFunctions/SaveLocal';


const adresseServeur = "http://192.168.43.79:8000/";
let site = [];
let equipements = [];
let pointsMesures = [];
let capteurs = [];

//création d'indicateurs pour vérifier le bon déroulement des requetes API
let fetchSiteFinish = false;
let fetchEquipementsFinish = false;
let fetchPointsMesuresFinish = false;
let fetchCapteursFinish = false;


// site.push(5);   //pour ajouter une valeur dans un tableau
// site.length = 0;   // pour effacer le tableau et ses références




export function TestFunc1() {

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
  
  getSiteAndEquipementsByIdSiteFromApi(1,signal);
  // getEquipementAndPtMesureByIdEquiFromApi(1);
  // getPtDeMesAndCapteurByIdPtdeMesFromApi(21);
  // getCapteurByIdFromApi(4);

  setTimeout(() => console.log('contenu tableau site ' + site[0].sit_raison_sociale), 10000);
  setTimeout(() => console.log('contenu tableau equipements ' + equipements[0].equ_marque), 10500);
  setTimeout(() => console.log('contenu tableau points de mesures ' + pointsMesures[0].pt_mes_nom), 11000);
  setTimeout(() => console.log('contenu tableau capteurs ' + capteurs[0].cap_marque), 11500);
  setTimeout(() => console.log('fetchSiteFinish: ' + fetchSiteFinish), 12500);
  setTimeout(() => console.log('fetchEquipementsFinish: ' + fetchEquipementsFinish), 12500);
  setTimeout(() => console.log('fetchPointsMesuresFinish: ' + fetchPointsMesuresFinish), 12500);
  setTimeout(() => console.log('fetchCapteursFinish: ' + fetchCapteursFinish), 12500);

  //mise en place d'un timeOut de 15 secondes sur les fetch
  setTimeout(() => checkFetch (controller), 15000);
  

}


// fonction pour le dev: test de lecture mémoire
export function lectureMemoire() {
  loadSite();
}






// cette fonction s'execute après le temps du time out
function checkFetch (controller) {
  // on arrête les fetch en cours si tout n'est pas terminé
  if((fetchSiteFinish == false)
    ||(fetchEquipementsFinish == false)
    ||(fetchPointsMesuresFinish == false)
    ||(fetchCapteursFinish == false))
    {
    console.log('fetch erreur');
    controller.abort();
    
  }else{
    console.log('fetch ok');
    
  }

  //si au moins un fetch a fonctionné, on sauvegarde avec async storage
  if(fetchSiteFinish||fetchEquipementsFinish||fetchPointsMesuresFinish||fetchCapteursFinish){
    //console.log("dans save: " + site);
    saveSite(site);
    saveEquipements(equipements);
    savePointsMesures(pointsMesures);
    saveCapteurs(capteurs);
  }

}


//site,equipements,pointsMesures,capteurs
const loadSite = async () => {
  try {
      const jsonValue = await AsyncStorage.getItem("@site");
      let retour = (jsonValue != null ? JSON.parse(jsonValue) : null);
      // setDesRecettes(retour);
      // setEndAsync(true);
      console.log("dans loadSite:" + retour[0].sit_raison_sociale);
  } catch(e) {
     // traitement des erreurs
      console.log("erreur fct 'loadSite': ", e);
  }
};




export function getAllFromApiByIdSite(idSite) {
  console.log("dans fonction globale");
  setTimeout(() => console.log('test fonction time out ') , 10000);
  getSiteByIdFromApi(idSite);
}
export function stopFetch (){
  controller.abort();
}

const getSiteAndEquipementsByIdSiteFromApi = async (idSite,signal) => {
  //création d'une référence du tableau "site" pour utilisation dans le "try..."
  let site_sc = site;
  try {
    //const response = await fetch('http://192.168.1.13:8000/api/sites/1');
    const response = await fetch(adresseServeur + 'api/sites/' + idSite, {signal});
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
    console.error(error);
  } finally {
    fetchSiteFinish = true;
    // console.log('dans finally ...');
  }

};

const getEquipementAndPtMesureByIdEquiFromApi = async (idEqui,signal) =>{
  let equipements_sc = equipements;
  try {
    const response = await fetch(adresseServeur + 'api/equipements/' + idEqui, {signal});
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
    const response = await fetch(adresseServeur + 'api/pt_mesures/' + idPtMes, {signal});
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

const getCapteurByIdFromApi = async (idCapteur,signal) =>{
  let capteurs_sc = capteurs;
  try {
    const response = await fetch(adresseServeur + 'api/capteurs/' + idCapteur, {signal});
    const json = await response.json();
    capteurs_sc.push(json);
  } catch (error) {
    console.error(error);
  } finally {
    fetchCapteursFinish = true;
    // console.log('dans finally ...');
  }
};
