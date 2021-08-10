//import React, { useState, useEffect } from 'react';
import React from 'react';
import { View, Text, Image, Button, TextInput, StyleSheet } from "react-native";
import localStyles from '../styles/localStyles';
//import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';

//import composants internes
import { TextCustom } from '../composants/TextCustom';


export default Login = ({route, navigation}) => {
    const [logName, onChangeLogName] = React.useState("");
    const [passWord, onChangePassword] = React.useState("");
    return(
        // <View style={{backgroundColor : 'yellow',}}>
        <View>
            <View style={styles.header}>
                <Image
                    style={styles.logo}
                    source={require('../src/images/stvLogo.png')}
                />
                <View>
                    <TextCustom initiale="E" suiteMot="nergy"></TextCustom>
                    <TextCustom initiale="P" suiteMot="ower"></TextCustom>
                    <TextCustom initiale="M" suiteMot="anagment"></TextCustom>
                </View>
            </View>

            <View style={styles.main}>
                <TextInput
                    style={styles.input}
                    onChangeText={onChangeLogName}
                    value={logName}
                    placeholder="Log name"
                    />
                <TextInput
                    style={styles.input}
                    onChangeText={onChangePassword}
                    value={passWord}
                    placeholder="PassWord"
                    // autoCompleteType="tel"
                    // autoCapitalize= 'characters'
                    // caretHidden = {true}
                    secureTextEntry= {true}
                    />
                <Button
                    style={styles.btn}
                    onPress={() => {console.log("click sur validez");}}
                    title="Validez"
                    // color="#841584"
                    color="green"
                    accessibilityLabel="Learn more about this purple button"
                    />
            </View>

            <View style={styles.footer}>
                <Image
                    style={styles.banniere}
                    source={require('../src/images/stvBanniere.png')}
                />
            </View>
            
            
            
            
            

        </View>
    );
};

const styles = StyleSheet.create({
    header: {
        
        flexDirection: "row",
    },
    logo: {
        width: 100,
        height: 100,
        // backgroundColor : 'yellow'
    },
    main: {
        
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
        marginLeft: 'auto',
        marginRight: 'auto',
        width:200,
        // backgroundColor: 'grey',
    },

    footer: {
        
    },
    banniere: {
        width: 150,
        height: 70,
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