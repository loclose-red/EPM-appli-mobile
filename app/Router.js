import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import des composants internes
import Login from './vues/Login';
import Configuration from './vues/Configuration';






const Stack = createNativeStackNavigator();

export default Router = () => {
    return (
        <NavigationContainer>
            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="Configuration" component={Configuration} />

            </Stack.Navigator>
        </NavigationContainer>
    );
};



