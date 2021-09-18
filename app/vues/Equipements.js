import * as React from 'react';
import { View, Text, Image, Button, TouchableHighlight, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

//import composants internes
import { Equipement } from '../composants/Equipement';
// import * as Images from '../src/images';




//fichier json local des equipements (cette etape est pour le dev avant la récupération via api)
import * as listeEquimements from '../src/json/equipements.json';



export default Equipements = ({route, navigation}) => {
  // console.log(listeEquimements.default['hydra:member']);
  // console.log("mes images: " + Images);
  const [lesEquipements, setLesEquipements] = useState([{"id":1}]);//on affecte un id pour éviter un message d'erreur au premier lancement de l'appli pour la flat list
  const [leSite, setLeSite] = useState([{}]);
  const [nomDuSite, setNomDuSite] = useState("Pas de nom!");
  const [dateSynchro, setDateSynchro] = useState("Pas de date!");

  //Configutation de la barre de navigation
  React.useLayoutEffect(() => {
    navigation.setOptions({
        headerRight: () => <TouchableHighlight
                                style={styles.touchable}
                                activeOpacity={0.9}
                                underlayColor="#DDDDDD"
                                onPress={() => {
                                  navigation.navigate('Configuration', {adresseServeur: route.params.adresseServeur, idSite : route.params.idSite});
                                    console.log("on press bar nav");
                                  }
                                }>
                                {/* <Icon name="plus-square" size={35} color="#000" /> */}
                                <FontAwesome5 name={'cogs'} solid size={30} />
                            </TouchableHighlight>,
    });
}, [navigation]);

useEffect(() => {
  loadSite();
  loadEquipements();
  loadDateSynchro();
}, []);

const loadSite = async () => {
  try {
      const jsonValue = await AsyncStorage.getItem("@site");
      let retour = (jsonValue != null ? JSON.parse(jsonValue) : null);
      if((retour != null) && (retour.length != 0)){
        setLeSite(retour);
        setNomDuSite(retour[0].sit_raison_sociale)
      }      
      console.log("dans loadSite:"); console.log(retour);

  } catch(e) {
     // traitement des erreurs
      console.log("erreur fct 'loadSite': ", e);
  }
};
const loadEquipements = async () => {
  try {
      const jsonValue = await AsyncStorage.getItem("@equipements");
      let retour = (jsonValue != null ? JSON.parse(jsonValue) : null);
      console.log("dans loadEquipements:");
      console.log(retour);
      setLesEquipements(retour);
      // console.log("dans loadEquipements:" + retour[0].equ_marque);
  } catch(e) {
     // traitement des erreurs
      console.log("erreur fct 'loadEquipements': ", e);
  }
};

const loadDateSynchro = async () =>{
  try {
    const jsonValue = await AsyncStorage.getItem("@dateSychro");
    let retour = (jsonValue != null ? JSON.parse(jsonValue) : null);
    console.log("dans loadDateSynchro:");
    console.log(retour);
    setDateSynchro(retour);
    // console.log("dans loadEquipements:" + retour[0].equ_marque);
  } catch(e) {
   // traitement des erreurs
    console.log("erreur fct 'loadDateSynchro': ", e);
  }
};

    const renderItem = ({ item }) => (
      <Equipement 
        item={item}
        navigation={navigation} //On passe l'objet navgation au composant "Equipement"
      ></Equipement>
    );

  return (
    <View style={styles.body}>

      <Button style={styles.btn} title="test" color="blue"
                    onPress={() => {
                      let date = new Date;
                      let dateString = date.getDate() + '/' + date.getMonth() + '/' + date.getFullYear();
                      let heureString = date.getHours() + ':' + date.getMinutes();
                      console.log(dateString + ' à ' + heureString);
                      console.log(date.toUTCString());
                        console.log(date); 
                        console.log(date.toString());                    
                    }}
                />
      
      <View style={styles.titre}>
        <Text style={styles.titreDescription}>site:</Text>
        <Text style={styles.titreContenu}>{nomDuSite}</Text>
      </View>

      <View style={styles.infoSynchro}>
        <Text>Dernière sychronisation</Text>
        <Text>avec le serveur:</Text>
        <Text style={styles.infoSynchroDate}>{dateSynchro}</Text>
      </View>
      
      <SafeAreaView style={styles.container}>
        <FlatList
          data={lesEquipements}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      </SafeAreaView>
      
    </View>
  );
};

const styles = StyleSheet.create({
  body:{
    marginLeft: 20,
    marginRight: 20,
  },

  titre:{
    margin:10,
    padding:10,
    backgroundColor: "lightgrey",
    borderRadius: 5,
    flexDirection:"row"
  },

  titreDescription:{
    textAlignVertical:"bottom",
  },

  titreContenu:{
    width: "100%",
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  },

  infoSynchro:{
    margin: 10,
    padding: 10,
    backgroundColor: "lightgrey",
    borderRadius: 5,
  },

  infoSynchroDate:{
    fontWeight: "bold",
  },
  
});