import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



export default UnEquipement = ({navigation}) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Vue Un Equipement</Text>
      <Button
        title="allez à login"
        onPress={() => {
            console.log("click LesPointsDeMesures")
            navigation.navigate('Login');
        }}
      />
      
    </View>
  );
}
