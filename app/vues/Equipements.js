import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



export default Equipements = ({navigation}) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Vue Equipements</Text>
      <Button
        title="allez à LesPointsDeMesures"
        onPress={() => {
            console.log("click Equipements")
            navigation.navigate('LesPointsDeMesures');
        }}
      />
      
    </View>
  );
}