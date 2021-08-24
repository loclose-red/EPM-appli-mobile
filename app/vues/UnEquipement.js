import * as React from 'react';
import { View, Text, Image, Button, SafeAreaView, FlatList, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//import composants internes
import { PtDeMes } from '../composants/PtDeMes';



export default UnEquipement = ({route, navigation}) => {

  //fichier json local des points de mesures (cette etape est pour le dev avant la récupération via api)
  const ptMesure21 = require('../src/json/ptMesure21.json');
  const ptMesure22 = require('../src/json/ptMesure22.json');
  const ptMesure23 = require('../src/json/ptMesure23.json');
  let tableauTemp = [];
  tableauTemp.push(ptMesure21);
  tableauTemp.push(ptMesure22);
  const tableauDesPoints = [...tableauTemp];

  const renderItem = ({ item }) => (
    <PtDeMes 
      item={item}
      navigation={navigation} //On passe l'objet navgation au composant "Equipement"
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
            source={require('../src/images/machine-production-1.jpg')}
        />
      <Button
        // onPress={() => console.log(ptMesure21["pt_mes_nom"])}
        onPress={() => console.log(tableauDesPoints)}
        title="Détection des points"
        color="#841584"
        accessibilityLabel="Learn more about this purple button"
      />
      <Text style={styles.texteListe}>Liste des points</Text>

      <SafeAreaView style={styles.container}>
        <FlatList
          data={tableauDesPoints}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
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
  texteListe: {
    textAlign: "center",
    marginTop: 10,
  },
  
});
