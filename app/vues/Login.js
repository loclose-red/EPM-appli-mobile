import React, { useState, useEffect } from 'react';
import { useFocusEffect } from '@react-navigation/native';
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
import {loadUserLocalGf} from '../globalFunctions/LoadLocal';
import {postMesure} from '../globalFunctions/PostApi';
import {downloadPhotos} from '../globalFunctions/DownlaodPhotos';
import {saveUserLocal} from '../globalFunctions/SaveLocal';
import {loadAdresseServeur} from '../globalFunctions/LoadLocal';



// globaleAdresseServeur

export default Login = ({route, navigation}) => {
    const [logName, onChangeLogName] = useState("");
    const [passWord, onChangePassword] = useState("");
    const [usersFromServeur, setUsersFromServer] = useState([]);
    const [adresseServeur, setAdresseServeur] = useState("");
    // const [adresseServeur, setAdresseServeur] = useState("http://192.168.43.79:8000/");

    //Ce local user à une valeur par défaut pour le dev 
    //Ce paramètre sera persisté en mémoire par la suite

    const [localUser, setLocalUser] = useState([]);
    // const [localUser, setLocalUser] = useState([
    //     {"@id": "/api/utilisateurs/15",
    //         "@type": "Utilisateur",
    //         "id": 15,
    //         "logname": "user_rennes_robert",
    //         "roles": [
    //             "ROLE_USER"
    //         ],
    //         "password": "$2y$13$ND1C/5AtMNeqaxVHcSCZ.ewCxXXrKn8HTk.oOv/TGyV.0V2Ha6or.",
    //         "site": [
    //             "/api/sites/1"
    //         ]}
    // ]);
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
                                    navigation.navigate('Configuration', {vueParent: "login"});
                                    }
                                    }>
                                    {/* <Icon name="plus-square" size={35} color="#000" /> */}
                                    <FontAwesome5 name={'cogs'} solid size={30} />
                                </TouchableHighlight>,
            headerTitle: "Login",
        });
    }, [navigation]);

    const loadUserLocal = async () => {
        try {
        const jsonValue = await AsyncStorage.getItem("@localUser");
        let retour = (jsonValue != null ? JSON.parse(jsonValue) : null);
        //si on trouve un user enregistré 
        //alors, on affecte l'id site du hook pour utilisation dans la cession
        if (retour){
            navigation.navigate('Equipements', {adresseServeur: adresseServeur});
            // alert("Utilisateur trouvé: " + retour[0].logname + ". Clique sur valider sans saisir un logname");
            setLocalUser(retour[0]);
            let user = retour[0];
            
            if(user.site.length > 0){
                cheminSite = user.site[0];
                idSite = cheminSite.replace("/api/sites/","");
                setIdLocalSite(idSite);
            };
        }else{
            alert('Il n y a pas de user d enregisté!');
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
            const tableauUsers = await getUsersFromApi(adresseServeur);
            setUsersFromServer(tableauUsers);

            //test si le logname saisi existe dans la liste des users
            //récupération de l'id du site
            //Ce fonctionnement sera à changer lors de la véritable autentification
            let idSite = "";
            let loginOk = false;
            tableauUsers.forEach(user => {
                if (user.logname == logName){
                    saveUserLocal([user]);
                    loginOk = true;
                    //on récupère l'id site du user
                    if(user.site.length > 0){
                        cheminSite = user.site[0];
                        idSite = cheminSite.replace("/api/sites/","");
                        setIdLocalSite(idSite);
                    };                    
                }
            });
            if (loginOk){
                alert("veuillez synchroniser les données avec le serveur!")
                navigation.navigate('Configuration', {adresseServeur: adresseServeur, idSite : idSite});
            }else{
                alert("Veuillez verifier le login ou l'adresse serveur dans la configuration!")
            }

        }
        

    };
    
    useEffect(() => {    
        
        
        

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
    useFocusEffect(
        React.useCallback(() => {
            console.log("on focus vue login");
            loadAdresseServeur(setAdresseServeur);
            loadUserLocal();
        }, [])
    );

    return(
        // <View style={{backgroundColor : 'yellow',}}>
        <View style={styles.body}>

            {showComponent ? ( // technique pour cacher des composants. Ici lors de la saisie du log, on cache le header et le footer
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
                    }}
                    title="Validez"
                    // color="#841584"
                    color="green"
                    />
                <Button style={styles.btn} title="test" color="blue"
                    onPress={() => {
                        console.log("click sur test");
                        loadUserLocalGf();
                        
                    }}
                />


            <ActivityIndicator size="large" color="#0000ff" />

            </View>
            
            {showComponent ? ( // technique pour cacher des composants. Ici lors de la saisie du log, on cache le header et le footer
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