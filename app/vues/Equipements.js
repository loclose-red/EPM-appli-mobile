import * as React from 'react';
import { View, Text, Button, FlatList, SafeAreaView, StyleSheet } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

//import composants internes
import { Equipement } from '../composants/Equipement';

//fichier json local des equipements (cette etape est pour le dev avant la récupération via api)
import * as listeEquimements from '../src/json/equipements.json';



export default Equipements = ({navigation}) => {
  // console.log(listeEquimements.default['hydra:member']);
  
  const DATA = [
    {
      id: 'bd7acbea-c1b1-46c2-aed5-3ad53abb28ba',
      title: 'First Item',
    },
    {
      id: '3ac68afc-c605-48d3-a4f8-fbd91aa97f63',
      title: 'Second Item',
    },
    {
      id: '58694a0f-3da1-471f-bd96-145571e29d72',
      title: 'Third Item',
    },
  ];

  const lesEquipements = listeEquimements.default['hydra:member'];
  console.log(lesEquipements);

  
  
  
    const renderItem = ({ item }) => (
      <Equipement item={item}></Equipement>
    );

  return (
    <View style={styles.body}>
      <Text>Vue Equipements</Text>
      <Button
        title="allez à LesPointsDeMesures"
        onPress={() => {
            console.log("click Equipements")
            navigation.navigate('LesPointsDeMesures');
        }}
      />
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
      // flex: 1,
      // alignItems: 'center',
      // justifyContent: 'center',
  },
  
});