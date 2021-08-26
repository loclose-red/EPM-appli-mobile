// import * as React from 'react';
import { View, Text, TextInput, TouchableHighlight, Button, Image, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useState, useEffect } from 'react';

//import composants internes
import { TextCustom } from '../composants/TextCustom';

//import de fonctions globales
import { GetAndSaveAll, getUsersFromApi } from '../globalFunctions/GetFromApi';



export default Configuration = ({route, navigation}) => {
  const [adresseServeur, setAdresseServeur] = React.useState("Adresse serveur");

  //variable utilisée pour afficher ou effacer des composant lors de la saisie de l'adresse serveur
  const [showComponent, setShowComponent] = React.useState(true);

  const saveAdresseServeur = async (adresseServeur)=>{
    try{
        const jsonValue = JSON.stringify(adresseServeur)
        await AsyncStorage.setItem("@adresseServeur", jsonValue)
        console.log('dans saveAdresseServeur');
    }catch(e){
        console.log("erreur fct 'saveAdresseServeur': ",e);
    }
  }
  console.log("pour test dans config");
  console.log(route.params.adresseServeur);
  useEffect(() => {
    if ((route.params.adresseServeur) != ""){
      setAdresseServeur(route.params.adresseServeur);
    }
  }, []);
  

  return (
    <View style={styles.body}>
      {showComponent ? ( // technique pour effacer des composants. Ici lors de la saisie de l'adresse serveur, on efface le header et le footer
        <View style={styles.header}>
          <Image
            style={styles.logo}
            source={require('../src/images/stvLogo.png')}
          />
          <View style={styles.blocTextHeader}>
            <TextCustom initiale="E" suiteMot="nergy"></TextCustom>
            <TextCustom initiale="P" suiteMot="ower"></TextCustom>
            <TextCustom initiale="M" suiteMot="anagment"></TextCustom>
          </View>
        </View>
      ) :null}
      <View style={styles.main}>
        <View style={styles.blocAdresse}>
          <Text style={styles.titreAdresse}>Adresse serveur:</Text>
          <TextInput
            style={styles.input}
            onChangeText={setAdresseServeur}
            value={adresseServeur}
            placeholder = {adresseServeur}
            onFocus={() => { //quand on prend le focus, on affiche uniquement les champs de saisie
              setShowComponent(false);
            }}
            onSubmitEditing={() => { //quand on perd le focus, on affiche toute la page
              setShowComponent(true);
              saveAdresseServeur([adresseServeur]);
            }}
            />
        </View>
          {showComponent ? ( // technique pour effacer des composants. Ici lors de la saisie de l'adresse serveur, on efface le header et le footer
            <TouchableHighlight 
              style={styles.btnDownload}
              activeOpacity={0.5}
              underlayColor="#DDDDDD"
              onPress={() => {
                GetAndSaveAll();
              // navigation.navigate('UnEquipement');
              console.log("sync");
              }
              }>
              <View style={styles.blocBtn}>
                <View style={styles.blocBtnText}>
                  <Text >Synchronisation avec le seveur</Text>
                  <Text >mise à jour des données.</Text>
                </View>
                <FontAwesome5 style={styles.blocBtnIcone} name={'sync'} solid size={50} />
              </View>
            </TouchableHighlight>
          ) :null}

          {showComponent ? ( // technique pour effacer des composants. Ici lors de la saisie de l'adresse serveur, on efface le header et le footer
            <TouchableHighlight 
              style={styles.btnDownload}
              activeOpacity={0.5}
              underlayColor="#DDDDDD"
              onPress={() => {
                // navigation.navigate('Detail', {uneRecette : item});
                // navigation.navigate('UnEquipement');
                console.log("trash-alt");
              }
              }>
              <View style={styles.blocBtn}>
                <View style={styles.blocBtnText}>
                  <Text >Suppression du compte et</Text>
                  <Text >initialisation de l'application.</Text>
                </View>
                <FontAwesome5 style={styles.blocBtnIcone} name={'trash-alt'} solid size={50} />
              </View>
            </TouchableHighlight>
          ) :null}
      </View>
        {showComponent ? ( // technique pour effacer des composants. Ici lors de la saisie de l'adresse serveur, on efface le header et le footer
        <View style={styles.footer}>
          <Image
            style={styles.banniere}
            source={require('../src/images/stvBanniere.png')}
          />
        </View>
        ) :null}

    </View>
  );
};

const styles = StyleSheet.create({
  body:{
      flex: 1,
      flexDirection: "column",
  },
  header: {
    margin: "5%",
    flex: 1,
    flexDirection: "row",
},
logo: {
    // hide: true,
    width: 100,
    height: 100,
    // backgroundColor : 'yellow'
},
blocTextHeader: {
    marginTop: 5,
    marginLeft: 40,
},

main:{
  flex: 3,
  justifyContent: "center",
  marginLeft: 15,
  marginRight: 15,
},
blocAdresse: {
  borderColor: "black",
  borderWidth: 1,
  borderRadius: 5,
  padding: 5,
},
titreAdresse: {
  textDecorationLine: "underline",
},
blocBtn: {
  flexDirection: "row",
  justifyContent: "space-between",
  backgroundColor: "lightgrey",
  borderRadius: 5,
  padding: 10,
  margin: 5,
},
blocBtnIcone: {
},


footer: {
  flex: 1,
  alignSelf: "flex-end",
  // backgroundColor: 'grey',
  // margin: "5%",
  padding: "3%",
},
banniere: {
  width: 200,
  height: "100%",
},
  
});
