import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

// import { Icon } from 'react-native-elements';
import { Icon as Icon_ne } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

function HomeScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Home Screen</Text>
      <Text>coucou</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
      <Icon_ne name='fingerprint' size={50} />
      <Icon_ne name='rowing' />
      <Icon_ne name='g-translate' color='#00aced' />
      <Icon_ne name='rowing' />
      <FontAwesome5 name={'accessible-icon'} solid size={50} />
      <FontAwesome5 name={'allergies'} solid size={50} />
      <Icon name="500px" size={50} color="#900" />
      <Icon.Button
        name="facebook"
        backgroundColor="#3b5998"
        onPress={""}
      >
        Login with Facebook
      </Icon.Button>
    </View>
  );
}

function DetailsScreen({navigation}) {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Details Screen</Text>
      <Button
        title="Go to home"
        onPress={() => navigation.navigate('Home')}
      />
    </View>
  );
}

const Stack = createNativeStackNavigator();

function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Home">
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{ title: 'Overview' }}
        />
        <Stack.Screen name="Details" component={DetailsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;