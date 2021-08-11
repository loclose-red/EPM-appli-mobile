import React from 'react';
import { View, Text, StyleSheet, TextInput } from "react-native";
//import des styles du projet
import localStyles from '../styles/localStyles';



export const TextCustom = (props) => {
    return (
        <View style={styles.container}>
            <Text style={styles.initiale}>{props.initiale}</Text><Text style={styles.suiteMot}>{props.suiteMot}</Text>
        </View>
    );
};

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
    },
    initiale:{
        color: "green",
        fontSize: 25,
        textAlignVertical: "bottom",
        // backgroundColor: "grey",
    },
    suiteMot:{
        fontSize: 18,
        // textAlign: "center",
        textAlignVertical: "bottom",
        paddingBottom: 3,
        // backgroundColor: "grey",
    },
    titre: {
    },
});