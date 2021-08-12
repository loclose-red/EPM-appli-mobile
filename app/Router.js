import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import des composants internes
import Login from './vues/Login';
import Configuration from './vues/Configuration';
import Equipements from './vues/Equipements';
import UnEquipement from './vues/UnEquipement';
import UnPointDeMesure from './vues/UnPointDeMesure';






const Stack = createNativeStackNavigator();

export default Router = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Configuration" component={Configuration} />
                <Stack.Screen name="Equipements" component={Equipements} />
                <Stack.Screen name="UnEquipement" component={UnEquipement} />
                <Stack.Screen name="UnPointDeMesure" component={UnPointDeMesure} />

            </Stack.Navigator>
        </NavigationContainer>
    );
};



