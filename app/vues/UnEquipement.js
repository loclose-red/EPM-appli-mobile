import * as React from 'react';
import { View, Text, Image, Button, SafeAreaView, FlatList, ScrollView, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//import composants internes
import { PtDeMes } from '../composants/PtDeMes';
// cet import est pour le dev en attendant de gérer les photos en réel
import { images } from '../globalFunctions/ImageRequire'; 



export default UnEquipement = ({route, navigation}) => {
  const [tableauDesPoints, setTableauDesPoints] = useState([{"id":1}]);//on affecte un id pour éviter un message d'erreur au premier lancement de l'appli pour la flat list

  //fichier json local des points de mesures (cette etape est pour le dev avant la récupération via api)
  const ptMesure21 = require('../src/json/ptMesure21.json');
  const ptMesure22 = require('../src/json/ptMesure22.json');
  const ptMesure23 = require('../src/json/ptMesure23.json');
  let tableauTemp = [];
  tableauTemp.push(ptMesure21);
  tableauTemp.push(ptMesure22);
  // const tableauDesPoints = [...tableauTemp];

  useEffect(() => {
    loadPointsMesures();
  }, []);

  
  const loadPointsMesures = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem("@pointsMesures");
      let retour = (jsonValue != null ? JSON.parse(jsonValue) : null);
      console.log("dans loadPointsMesures:"); console.log(retour);
      console.log(route.params.equipement.equ_photo_1);

      //filtre pour récupérer uniquement les points de l'equipement
      let lesPtMesTemp = retour.filter(unPtMes => unPtMes.equipement == route.params.equipement["@id"]);
      console.log(lesPtMesTemp);

      setTableauDesPoints(lesPtMesTemp);
    } catch (e) {
      // traitement des erreurs
      console.log("erreur fct 'loadPointsMesures': ", e);
    }
  };


  const renderItem = ({ item }) => (
    <PtDeMes 
      item={item}
      navigation={navigation} //On passe l'objet navgation au composant "PtDeMes"
    ></PtDeMes>
  );

// console.log(route);
// console.log(route.params.equipement.equ_nom);
// {route.params.equipement.equ_nom}

  return (
    <View style={styles.body}>
      <Text style={styles.nomEquipement}>{route.params.equipement.equ_nom}</Text>
      <Image
            style={styles.imageEquipement}
            // source={require('../src/images/machine-production-1.jpg')}
            source= {images[route.params.equipement.equ_photo_1]}
        />
      <View style={styles.btnDetect}>
        <Button
        // onPress={() => console.log(ptMesure21["pt_mes_nom"])}
        onPress={() => console.log(tableauDesPoints)}
        title="Détection des points"
        color="green"
        accessibilityLabel="Learn more about this purple button"
        />
      </View>  
      <Text style={styles.texteListe}>Liste des points</Text>

      <SafeAreaView style={styles.container}>
      {/* <ScrollView style={styles.scrollView}> */}
        <FlatList
          data={tableauDesPoints}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      {/* </ScrollView> */}
      </SafeAreaView>
      
    </View>
  );
}
const styles = StyleSheet.create({
  body:{
    
  },
  nomEquipement:{
    textAlign: "center",
    backgroundColor: "lightgrey",
    width: "60%",
    height: 30,
    borderRadius: 5,
    textAlignVertical: "center",
    alignSelf: "center",
    margin: 10,
  },
  imageEquipement:{
    width: 300,
    height: 150,
    margin: 10,
    // alignItems: "center",
    // justifyContent: 'center',
    alignSelf: "center",

  },
  btnDetect:{
    marginLeft: 20,
    marginRight: 20,
    // paddingLeft: 10,
  },

  texteListe: {
    textAlign: "center",
    marginTop: 10,
  },
  
});
