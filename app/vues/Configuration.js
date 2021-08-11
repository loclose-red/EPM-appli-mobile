import * as React from 'react';
import { View, Text, Button } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';



export default Configuration = ({navigation}) => {
  return (
    <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
      <Text>Vue configuration</Text>
      <Button
        title="Go to Details"
        onPress={() => {
            console.log("click configuration")
            // navigation.navigate('Details');
        }}
      />
      
    </View>
  );
}





// export default App;