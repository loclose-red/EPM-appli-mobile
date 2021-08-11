import React from 'react';
import { View, Text, StyleSheet } from "react-native";

//import des styles du projet
import localStyles from '../styles/localStyles';



export const Equipement = ({item}) => {
    return (
        <View style={styles.container}>
            {/* <Text >{props.initiale}</Text> */}
            <Text >{item.equ_serie}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        
    },
    
});