import * as React from 'react';
import { View, Text, Button, TouchableHighlight, StyleSheet  } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';



export default UnPointDeMesure = ({route, navigation}) => {
  //fichier json local des points de mesures (cette etape est pour le dev avant la récupération via api)
  const ptMesure21 = require('../src/json/ptMesure21.json');
  const capteur4 = require('../src/json/capteur4.json');
  const grandeurs = require('../src/json/grandeurs.json');


  //récupération de la grandeur du point dans lesGrandeurs
  let laGrandeur = "";
  const tableauGrandeurs = grandeurs["hydra:member"];
  tableauGrandeurs.forEach(element => {
    if(ptMesure21.grandeur == element["@id"]){
      laGrandeur = element.gra_unite;
    }
  });

  console.log(route.params.unPtDeMes);

  return (
    <View style={styles.body}>
      <View style={styles.sectionPointDeMesure}>
        <View style={styles.texteUnPoint}>
          <Text style={styles.texteUnPointDescription}>Nom:</Text>
          <Text style={styles.texteUnPointContenu}>{route.params.unPtDeMes.pt_mes_nom}</Text>
          <Text style={styles.texteUnPointVide}></Text>
        </View>
        <View style={styles.texteUnPoint}>
          <Text style={styles.texteUnPointDescription}>Position:</Text>
          <Text style={styles.texteUnPointContenu}>{route.params.unPtDeMes.pt_mes_position}</Text>
          <Text style={styles.texteUnPointVide}></Text>
        </View>
        <View style={styles.texteUnPoint}>
          <Text style={styles.texteUnPointDescription}>Grandeur:</Text>
          <Text style={styles.texteUnPointContenu}>{laGrandeur}</Text>
          <Text style={styles.texteUnPointVide}></Text>
        </View>
      </View>

      <View style={styles.sectionCapteur}>
        <Text style={styles.titreCapteur}>Capteur associé:</Text>
        <View style={styles.texteUnCap}>
          <Text style={styles.texteUnCapDescription}>Marque:</Text>
          <Text style={styles.texteUnCapContenu}>{capteur4.cap_marque}</Text>
          {/* Balise vide Utilisée pour l'allignement avec des flex: 1...*/}
          <Text style={styles.texteUnCapVide}></Text> 
        </View>
        <View style={styles.texteUnCap}>
          <Text style={styles.texteUnCapDescription}>Modèle:</Text>
          <Text style={styles.texteUnCapContenu}>{capteur4.cap_modele}</Text>
          {/* Balise vide Utilisée pour l'allignement avec des flex: 1...*/}
          <Text style={styles.texteUnCapVide}></Text> 
        </View>
        <View style={styles.texteUnCap}>
          <Text style={styles.texteUnCapDescription}>N° série:</Text>
          <Text style={styles.texteUnCapContenu}>{capteur4.cap_serie}</Text>
          {/* Balise vide Utilisée pour l'allignement avec des flex: 1...*/}
          <Text style={styles.texteUnCapVide}></Text> 
        </View>

        <View style={styles.sectionBoutons}>
          <TouchableHighlight 
            style={styles.btnSearch}
            activeOpacity={0.5}
            underlayColor="#DDDDDD"
            onPress={() => {
            // navigation.navigate('Detail', {uneRecette : item});
            // navigation.navigate('UnEquipement');
            console.log("touch");
            }
          }>
            <View>
              <Text>Détection</Text>
              <FontAwesome5 name={'spinner'} solid size={50} />
            </View>
          </TouchableHighlight>
          <TouchableHighlight 
            style={styles.btnDownload}
            activeOpacity={0.5}
            underlayColor="#DDDDDD"
            onPress={() => {
            // navigation.navigate('Detail', {uneRecette : item});
            // navigation.navigate('UnEquipement');
            console.log("touch");
            }
          }>
            <View>
              <Text>Télécharger</Text>
              <FontAwesome5 name={'download'} solid size={50} />
            </View>
          </TouchableHighlight>
        </View>
        
      </View>
      
    </View>
  );
};

const styles = StyleSheet.create({
  body:{
    margin: 20,
  },

  sectionPointDeMesure:{

  },
  texteUnPoint:{
    flexDirection: "row"
  },
  texteUnPointDescription: {
    flex: 1,
    textAlignVertical: "bottom",

  },
  texteUnPointContenu: {
    flex: 3,
    fontSize: 18,
    fontWeight:"bold",
    // alignSelf: "flex-end"
    textAlignVertical: "bottom",
    textAlign: "center",
  },
  texteUnPointVide:{
    flex: 1,
    // backgroundColor: "grey",
  },

  sectionCapteur:{
    marginTop: 40,
    padding: 10,
    borderColor: "black",
    borderRadius: 5,
    borderWidth: 1,
  },
  titreCapteur: {
    marginBottom: 15,
    textAlign: "center",
    fontWeight: "bold",
  },
  texteUnCap:{
    flexDirection: "row",
    marginBottom: 5,
  },
  texteUnCapDescription: {
    flex: 1,
    textAlignVertical: "bottom",
  },
  texteUnCapContenu: {
    flex: 3,
    fontSize: 18,
    fontWeight:"bold",
    // alignSelf: "flex-end"
    textAlign: "center",
    textAlignVertical: "bottom",
  },
  texteUnCapVide:{
    flex: 1,
    // backgroundColor: "grey",
  },
  sectionBoutons: {
    marginTop: 20,
    flexDirection: "row",
  },
  btnSearch: {
    flex: 1,
    backgroundColor: "lightgrey",
    borderRadius: 5,
    marginRight : 5,
    padding: 10,
    alignItems: "center",
  },
  btnDownload: {
    flex: 1,
    backgroundColor: "lightgrey",
    borderRadius: 5,
    marginLeft: 5,
    padding: 10,
    // alignSelf: "center",
    alignItems: "center",
  },
  
});