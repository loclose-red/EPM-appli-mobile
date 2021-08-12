import * as React from 'react';
import { View, Text, Image, Button, TouchableHighlight, FlatList, SafeAreaView, StyleSheet } from 'react-native';
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

  const lesEquipements = listeEquimements.default['hydra:member'];
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
      
      <Text>site: RENNES</Text>
      <Text>Dernière sychronisation</Text>
      <Text>avec le serveur:</Text>
      <Text>17/09/2021 à 17H12</Text>
      
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
  
});