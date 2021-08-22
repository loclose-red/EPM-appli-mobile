const adresseServeur = "http://192.168.1.13:8000/";
let site = [];
let equipements = [];
let pointsMesures = [];
let capteurs = [];


// site.push(5);   //pour ajouter une valeur dans un tableau
// site.length = 0;   // pour effacer le tableau et ses références


export function TestFunc1() {
  console.log("dans fonction globale");
  
  site.length = 0;
  equipements.length = 0;
  pointsMesures.length = 0;
  capteurs.length = 0;
  
  getSiteByIdFromApi(1);
  getEquipementByIdFromApi(1);
  getPtDeMesByIdFromApi(21);
  getCapteurByIdFromApi(4);

  setTimeout(() => console.log('contenu tableau site ' + site[0].sit_raison_sociale), 5000);
  setTimeout(() => console.log('contenu tableau equipements ' + equipements.[0].equ_marque), 5100);
  setTimeout(() => console.log('contenu tableau points de mesures ' + pointsMesures[0].pt_mes_nom), 5200);
  setTimeout(() => console.log('contenu tableau capteurs ' + capteurs[0].cap_marque), 5300);

}

export function getAllFromApiByIdSite(idSite) {
  console.log("dans fonction globale");
  setTimeout(() => console.log('test fonction time out ') , 10000);
  getSiteByIdFromApi(idSite);
}

const getSiteByIdFromApi = async (idSite) => {
  //création d'une référence du tableau "site" pour utilisation dans le "try..."
  let site_sc = site;
  try {
    //const response = await fetch('http://192.168.1.13:8000/api/sites/1');
    const response = await fetch(adresseServeur + 'api/sites/' + idSite);
    const json = await response.json();
    site_sc.push(json);
    let lesEquipements = [];
    lesEquipements = json.equipements;
    console.log('dans getSiteByIdFromApi');
    console.log("le site par id: " + lesEquipements);
    //  let idSite = cheminSite.replace("/api/equipements/","");
    lesEquipements.forEach(equipement => {
      console.log("dans for each: " + equipement.replace("/api/equipements/", ""));
    });
  } catch (error) {
    console.error(error);
  } finally {
    // console.log('dans finally ...');
  }

};

const getEquipementByIdFromApi = async (idEqui) =>{
  let equipements_sc = equipements;
  try {
    const response = await fetch(adresseServeur + 'api/equipements/' + idEqui);
    const json = await response.json();
    equipements_sc.push(json);
    let lesPointsDeMesures = [];
    lesPointsDeMesures = json.ptMesures;
    lesPointsDeMesures.forEach(unPtDeMes => {
      console.log("dans for each: " + unPtDeMes.replace("/api/pt_mesures/", ""));
    });
  } catch (error) {
    console.error(error);
  } finally {
    console.log('dans finally ...');
  }  
};

const getPtDeMesByIdFromApi = async (idPtMes) =>{
  let pointsMesures_sc = pointsMesures;
  try {
    const response = await fetch(adresseServeur + 'api/pt_mesures/' + idPtMes);
    const json = await response.json();
    pointsMesures_sc.push(json);
    let leCapteur = "";
    leCapteur = json.capteur;
      console.log("l'id capteur: " + leCapteur.replace("/api/capteurs/", ""));
    
  } catch (error) {
    console.error(error);
  } finally {
    // console.log('dans finally ...');
  }
};

const getCapteurByIdFromApi = async (idCapteur) =>{
  let capteurs_sc = capteurs;
  try {
    const response = await fetch(adresseServeur + 'api/capteurs/' + idCapteur);
    const json = await response.json();
    capteurs_sc.push(json);
    
  } catch (error) {
    console.error(error);
  } finally {
    // console.log('dans finally ...');
  }
};
