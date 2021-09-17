import React, { useState, useEffect } from 'react';
// import React from 'react';
import { View, Text, Image, Button, TextInput, ActivityIndicator, TouchableHighlight, PermissionsAndroid, StyleSheet } from "react-native";

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import AsyncStorage from '@react-native-async-storage/async-storage';

import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

import localStyles from '../styles/localStyles';
//import Icon from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/FontAwesome5';

//import composants internes
import { TextCustom } from '../composants/TextCustom';

//import de fonctions globales internes
import { GetAndSaveAll, getUsersFromApi } from '../globalFunctions/GetFromApi';
import {loadSite} from '../globalFunctions/LoadLocal';
import {postMesure} from '../globalFunctions/PostApi';
import {downloadPhotos} from '../globalFunctions/DownlaodPhotos';
import {saveUserLocal} from '../globalFunctions/SaveLocal';



// globaleAdresseServeur

export default Login = ({route, navigation}) => {
    const [logName, onChangeLogName] = useState("");
    const [passWord, onChangePassword] = useState("");
    const [usersFromServeur, setUsersFromServer] = useState([]);
    const [adresseServeur, setAdresseServeur] = useState("");
    // const [adresseServeur, setAdresseServeur] = useState("http://192.168.43.79:8000/");

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
    const [idLocalSite, setIdLocalSite] = useState("");
    const [localSite, setLocalSite] = useState([]);
    const [localEquipements, setLocalEquipements] = useState([]);
    const [localPointsMesures, setLocalPointsMesures] = useState([]);
    const [localCapteurs, setLocalCapteurs] = useState([]);

    //variable utilisée pour afficher ou effacer des composant lors de la saisie du log-pass
    const [showComponent, setShowComponent] = useState(true);

    //Configutation de la barre de navigation
    React.useLayoutEffect(() => {
        navigation.setOptions({
            headerRight: () => <TouchableHighlight
                                    style={styles.touchable}
                                    activeOpacity={0.9}
                                    underlayColor="#DDDDDD"
                                    onPress={() => {
                                    navigation.navigate('Configuration', {adresseServeur: adresseServeur, vueParent: "login"});
                                        console.log("on press bar nav");
                                    }
                                    }>
                                    {/* <Icon name="plus-square" size={35} color="#000" /> */}
                                    <FontAwesome5 name={'cogs'} solid size={30} />
                                </TouchableHighlight>,
        });
    }, [navigation]);
    const loadAdresseServeur = async () => {
        try {
        const jsonValue = await AsyncStorage.getItem("@adresseServeur");
        let retour = (jsonValue != null ? JSON.parse(jsonValue) : null);
        console.log("dans loadAdresseServeur vue login:"); 
        retour? console.log(retour[0]) : console.log('Pas d\'adresse serveur en mémoire');;
        if (retour != null){
            setAdresseServeur(retour[0]);
        }else{
            alert('Il n\'y a pas d\adresse serveur de configurée. Veuillez modifier la configuration!');
            setAdresseServeur("");
        }
        } catch (e) {
        // traitement des erreurs
        console.log("erreur fct 'loadAdresseServeur' dans vue login: ", e);
        }
    };

    const loadUserLocal = async () => {
        try {
        const jsonValue = await AsyncStorage.getItem("@localUser");
        let retour = (jsonValue != null ? JSON.parse(jsonValue) : null);
        console.log("dans loadUserLocal vue login:"); 
        retour? console.log(retour[0]) : console.log('Pas de user enregistré en local');;
        //si on trouve un user enregistré 
        //alors, on affecte l'id site du hook pour utilisation dans la cession
        if (retour != null){
            alert("Utilisateur trouvé: " + retour[0].logname + ". Clique sur valider sans saisir un logname");
            setLocalUser(retour[0]);
            let user = retour[0];
            
            if(user.site.length > 0){
                cheminSite = user.site[0];
                idSite = cheminSite.replace("/api/sites/","");
                setIdLocalSite(idSite);
            };
        }else{
            // alert('Il n y a pas de user d enregisté!');
        }
        } catch (e) {
        // traitement des erreurs
        console.log("erreur fct 'loadUserLocal' dans vue login: ", e);
        }
    };

    async function verifLogName () {
        // on récupère tous les users avec l'api
        //ceci est uniquement pour la phase dev
        // il faudra trouver une autre façon
        if (logName != ""){
            const tableauUsers = await getUsersFromApi();
            console.log("dans verifLogName() vue login");
            console.log(tableauUsers);
            setUsersFromServer(tableauUsers);

            //test si le logname saisi existe dans la liste des users
            //récupération de l'id du site
            //Ce fonctionnement sera à changer lors de la véritable autentification
            let idSite;
            tableauUsers.forEach(user => {
                if (user.logname == logName){
                    console.log('login ok');
                    console.log(user);
                    saveUserLocal([user]);
                    //on récupère l'id site du user
                    if(user.site.lengh > 0){
                        cheminSite = user.site[0];
                        idSite = cheminSite.replace("/api/sites/","");
                        setIdLocalSite(idSite);
                    };
                }
            })
        }
        
        navigation.navigate('Equipements', {adresseServeur: adresseServeur, idSite : idLocalSite});

    };
    
    useEffect(() => {    
        
        loadAdresseServeur();
        loadUserLocal();

        // Demande de Permission d'ecriture en local pour la sauvegarde des images
        const requestPermissionAsync = async () => {
            try {
                await PermissionsAndroid.request(
                    PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE
                );
            } catch (err) {
                console.error(err);
            }
        };
        requestPermissionAsync();  
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
                        verifLogName();
                        console.log("click sur validez");
                        
                    }}
                    title="Validez"
                    // color="#841584"
                    color="green"
                    />
                <Button style={styles.btn} title="test" color="blue"
                    onPress={() => {
                        console.log("click sur test");
                        downloadPhotos("http://192.168.1.13:8000","machine-production-4-6140c2e9c9322750663675.jpg");
                        // console.log(usersFromServeur);
                        // postMesure();
                        // loadSite();
                        // loadAdresseServeur();
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