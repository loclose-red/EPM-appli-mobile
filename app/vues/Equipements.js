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



export default Equipements = ({navigation}) => {
  // console.log(listeEquimements.default['hydra:member']);
  // console.log("mes images: " + Images);
  const [lesEquipements, setLesEquipements] = useState([]);
  const [leSite, setLeSite] = useState([{}]);

  //Configutation de la barre de navigation
  React.useLayoutEffect(() => {
    navigation.setOptions({
        headerRight: () => <TouchableHighlight
                                style={styles.touchable}
                                activeOpacity={0.9}
                                underlayColor="#DDDDDD"
                                onPress={() => {
                                  navigation.navigate('Configuration');
                                    console.log("on press bar nav");
                                  }
                                }>
                                {/* <Icon name="plus-square" size={35} color="#000" /> */}
                                <FontAwesome5 name={'cogs'} solid size={50} />
                            </TouchableHighlight>,
    });
}, [navigation]);

useEffect(() => {
  loadSite();
  loadEquipements();
}, []);

const loadSite = async () => {
  try {
      const jsonValue = await AsyncStorage.getItem("@site");
      let retour = (jsonValue != null ? JSON.parse(jsonValue) : null);
      setLeSite(retour);
      console.log("dans ld site:"); console.log(leSite);

  } catch(e) {
     // traitement des erreurs
      console.log("erreur fct 'loadSite': ", e);
  }
};
const loadEquipements = async () => {
  try {
      const jsonValue = await AsyncStorage.getItem("@equipements");
      let retour = (jsonValue != null ? JSON.parse(jsonValue) : null);
      console.log("dans loadEquipements:" + retour);
      setLesEquipements(retour);
      // console.log("dans loadEquipements:" + retour[0].equ_marque);
  } catch(e) {
     // traitement des erreurs
      console.log("erreur fct 'loadEquipements': ", e);
  }
};


  // const lesEquipements = listeEquimements.default['hydra:member'];
  let copieEquipements = [...lesEquipements];
  // console.log(lesEquipements);
  //filtre pour récupérer uniquement les équipements de Rennes (site id = 1)
  let lesEquipementsRennes = copieEquipements.filter(equipement => equipement.site == "/api/sites/1");
  console.log(lesEquipementsRennes);
  
  
  
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
                        console.log("click get from API");
                        TestFunc1();
                        
                    }}
                />
      
      <View style={styles.titre}>
        <Text style={styles.titreDescription}>site:</Text>
        <Text style={styles.titreContenu}>{leSite[0].sit_raison_sociale}</Text>
      </View>

      <View style={styles.infoSynchro}>
        <Text>Dernière sychronisation</Text>
        <Text>avec le serveur:</Text>
        <Text style={styles.infoSynchroDate}>17/09/2021 à 17H12</Text>
      </View>
      
      <SafeAreaView style={styles.container}>
        <FlatList
          data={lesEquipementsRennes}
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
      // flex: 1,
      // alignItems: 'center',
      // justifyContent: 'center',
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