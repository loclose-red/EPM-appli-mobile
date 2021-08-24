import React, { useState, useEffect } from 'react';
// import React from 'react';
import { View, Text, Image, Button, TextInput, ActivityIndicator, StyleSheet } from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import localStyles from '../styles/localStyles';
//import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';

//import composants internes
import { TextCustom } from '../composants/TextCustom';

//import de fonctions globales
import { TestFunc1 } from '../globalFunctions/GetFromApi';
import {loadSite, loadEquipements, loadPointsMesures, loadCapteurs} from '../globalFunctions/LoadLocal';


export default Login = ({route, navigation}) => {
    const [logName, onChangeLogName] = useState("");
    const [passWord, onChangePassword] = useState("");
    const [usersFromServeur, setUsersFromServer] = useState([]);

    //Ce local user à une valeur par défaut pour le dev 
    //Ce paramètre sera persisté en mémoire par la suite
    const [localUser, setLocalUser] = useState([
        {"@id": "/api/utilisateurs/15",
            "@type": "Utilisateur",
            "id": 15,
            "logname": "user_rennes_robert",
            "roles": [
                "ROLE_USER"
            ],
            "password": "$2y$13$ND1C/5AtMNeqaxVHcSCZ.ewCxXXrKn8HTk.oOv/TGyV.0V2Ha6or.",
            "site": [
                "/api/sites/1"
            ]}
    ]);
    const [localSite, setLocalSite] = useState([]);
    const [localEquipements, setLocalEquipements] = useState([]);
    const [localPointsMesures, setLocalPointsMesures] = useState([]);
    const [localCapteurs, setLocalCapteurs] = useState([]);

    //variable utilisée pour afficher ou effacer des composant lors de la saisie du log-pass
    const [showComponent, setShowComponent] = useState(true);



    const verifLogName = () => {

        console.log("dans verifLogName");
        
        TestFunc1();
        //récupération de l'id du site correspondant au User (voir structure Json User)
        let cheminSite = localUser[0].site[0];
        let idSite = cheminSite.replace("/api/sites/","");
        console.log(idSite);
        //
        getUsersFromApi()
        // console.log(usersFromServeur);
        let userFind = false;
        usersFromServeur.forEach(userFromServer => {
            if(userFromServer.logname == logName){
                userFind = true;
                // console.log(userFromServer);
                setLocalUser(userFromServer);
            }
        });
        userFind ? console.log("yes") : console.log("no");

    };
    const getUsersFromApi = async () => {
        try {
        //  const response = await fetch('https://reactnative.dev/movies.json');
         const response = await fetch('http://192.168.1.13:8000/api/utilisateurs?page=1');
         const json = await response.json();
         setUsersFromServer(json["hydra:member"]);
        //  console.log(json);
         
         console.log('dans getUsersFromApi');
       } catch (error) {
         console.error(error);
       } finally {
        //  setLoading(false);
       }
     }
     useEffect(() => {
        getUsersFromApi();
      }, []);


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
                        verifLogName();
                        // navigation.navigate('Equipements');
                    }}
                    title="Validez"
                    // color="#841584"
                    color="green"
                    />
                <Button style={styles.btn} title="test" color="blue"
                    onPress={() => {
                        console.log("click sur test");
                        loadSite();
                    }}
                />
            <ActivityIndicator size="large" color="#0000ff" />

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