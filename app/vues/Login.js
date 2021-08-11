//import React, { useState, useEffect } from 'react';
import React from 'react';
import { View, Text, Image, Button, TextInput, StyleSheet } from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import localStyles from '../styles/localStyles';
//import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';

//import composants internes
import { TextCustom } from '../composants/TextCustom';


export default Login = ({route, navigation}) => {
    const [logName, onChangeLogName] = React.useState("");
    const [passWord, onChangePassword] = React.useState("");

    //variable utilisée pour afficher ou effacer des composant lors de la saisie du log-pass
    const [showComponent, setShowComponent] = React.useState(true);
    return(
        // <View style={{backgroundColor : 'yellow',}}>
        <View style={styles.body}>

            {showComponent ? ( // technique pour effacer des composants. Ici lors de la saisie du log, on efface le header et le footer
                <View style={styles.header}>
                    <Image
                        style={styles.logo}
                        source={require('../src/images/stvLogo.png')}
                    />
                    <View style={styles.blocTextHeader}>
                        <TextCustom initiale="E" suiteMot="nergy"></TextCustom>
                        <TextCustom initiale="P" suiteMot="ower"></TextCustom>
                        <TextCustom initiale="M" suiteMot="anagment"></TextCustom>
                    </View>
                </View>
            ) :null}

            <View style={styles.main}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeLogName}
                    value={logName}
                    placeholder="Log name"
                    onFocus={() => { //quand on prend le focus, on affiche uniquement les champs de saisie
                        setShowComponent(false);
                    }}
                    onSubmitEditing={() => { //quand on perd le focus, on affiche toute la page
                        setShowComponent(true);
                    }}
                    />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangePassword}
                    value={passWord}
                    placeholder="PassWord"
                    onFocus={() => { //quand on prend le focus, on affiche uniquement les champs de saisie
                        setShowComponent(false);
                    }}
                    onSubmitEditing={() => { //quand on perd le focus, on affiche toute la page
                        setShowComponent(true);
                    }}
                    // autoCompleteType="tel"
                    // autoCapitalize= 'characters'
                    // caretHidden = {true}
                    secureTextEntry= {true}

                    />
                <Button
                    style={styles.btn}
                    onPress={() => {
                        console.log("click sur validez");
                        navigation.navigate('UnPointDeMesure');
                    }}
                    title="Validez"
                    // color="#841584"
                    color="green"
                    accessibilityLabel="Learn more about this purple button"
                    />
            </View>
            
            {showComponent ? ( // technique pour effacer des composants. Ici lors de la saisie du log, on efface le header et le footer
            <View style={styles.footer}>
                <Image
                    style={styles.banniere}
                    source={require('../src/images/stvBanniere.png')}
                />
            </View>
            ) :null}
            
            
            
            

        </View>
    );
};

const styles = StyleSheet.create({
    body:{
        flex: 1,
        flexDirection: "column",
    },
    header: {
        margin: "5%",
        flex: 1,
        flexDirection: "row",
    },
    logo: {
        // hide: true,
        width: 100,
        height: 100,
        // backgroundColor : 'yellow'
    },
    blocTextHeader: {
        marginTop: 5,
        marginLeft: 40,
    },
    
    input: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width:200,
        // border: 'solid',
        // border: '2',
        // backgroundColor: localStyles.darkBlue,
    },
    btn:{
        width: 100,
    },
    main:{
        flex: 3,
        justifyContent: "center",
        marginLeft: 'auto',
        marginRight: 'auto',
        marginBottom:"20%",
        // width:200,
        // backgroundColor: 'grey',
    },
    
    footer: {
        flex: 1,
        alignSelf: "flex-end",
        // backgroundColor: 'grey',
        // margin: "5%",
        padding: "3%",
    },
    banniere: {
        width: 200,
        height: "100%",
    },
    text1: {
        marginLeft: 'auto',
        marginRight: 'auto',
        width:200,
        height: 60,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: localStyles.darkBlue,
        borderRadius : localStyles.radius_s,
    },
    text2: {
        height: 60,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: localStyles.lightBlue,
        borderRadius : localStyles.radius_m,
    },
    text3: {
        height: 60,
        textAlign: 'center',
        textAlignVertical: 'center',
        backgroundColor: localStyles.lightGrey,
        borderRadius : localStyles.radius_l,
    },
});