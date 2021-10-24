const bodyTest = {
    "grandeur": "/api/grandeurs/2",
    "capteur": "/api/capteurs/1",
    "ptmesure": "/api/pt_mesures/21",
    "mesValeur1": "86.00",
    "mesDate": "2021-09-17T15:34:31.732Z",
    "mesObjJson": {"recoucou":"recoucou"}
  };

const urlTest = "http://192.168.43.79:8000/api/mesures"


export const postMesure = async (url, body,setUploading , compteur, index) => {
    try {
        const response = await fetch(url + "/api/mesures", {
            method: 'POST',
            headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(body)
        });
        const json = await response.json();
        console.log("dans postMesure:");
        console.log(json);
        if (compteur == index){
            setUploading(false);
        }
    }
    catch (e) {
        console.log("erreur dans postMesure: " + e);
    }
};