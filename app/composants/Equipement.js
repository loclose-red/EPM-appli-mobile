import React from 'react';
import { View, Text, Image, TouchableHighlight, StyleSheet } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

//import des styles du projet
import localStyles from '../styles/localStyles';



export const Equipement = ({item, navigation}) => {


    //////////////////////////////////////////////////////////////////////
    //Tableau d'index des images pour un affichage dynamique
    //ce tableau devra disparaitre après avoir implémenté une gestion des images
    //  
    //  cette contrainte est liée au "require" pour les images
    const images = {        
        "industrial-concept.jpg": require('../src/images/industrial-concept.jpg'),        
        "machine-production-1.jpg": require('../src/images/machine-production-1.jpg'),        
        "machine-production-2.webp": require('../src/images/machine-production-2.webp'),        
        "machine-production-3.jpg": require('../src/images/machine-production-3.jpg'),        
        "machine-production-4.jpg": require('../src/images/machine-production-4.jpg'),        
        "machine-production-5.jpg": require('../src/images/machine-production-5.jpg'),        
        "machine-production-6.jpg": require('../src/images/machine-production-6.jpg'),        
        "machine-production-7.jpg": require('../src/images/machine-production-7.jpg'),        
    };
    ////////////////////////////////////////////////////////////////////////

    
    return (
        <View style={styles.container}>
            <Image
                    style={styles.imgEqui}
                    source={images[item.equ_photo_1]}
            />
            <View style={styles.textDescript}>
                <Text >{item.equ_nom}</Text>
                <Text >{item.equ_marque}</Text>
                <Text >{item.equ_modele}</Text>
                <Text >{item.equ_serie}</Text>
            </View>
            <View style={styles.click}>
                <TouchableHighlight style={styles.touchable} onPress={() => {
                    // navigation.navigate('Detail', {uneRecette : item});
                    navigation.navigate('UnEquipement');
                    console.log("touch: " + item.id);
                    }
                }>
                    <FontAwesome5 name={'arrow-alt-circle-right'} solid size={50} />
                </TouchableHighlight>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        height: 90,
        marginTop: 10,
        marginBottom: 10,
        backgroundColor: "grey",
        borderRadius: 5,
        
    },
    imgEqui: {
        width: 90,
        height: 90,
        borderTopLeftRadius: 5,
        borderBottomLeftRadius: 5,
    },
    textDescript: {
        margin: 5,
    },
    click: {

    },
    
});