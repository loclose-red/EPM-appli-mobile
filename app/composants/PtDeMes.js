import React from 'react';
import { View, Text, Image, TouchableHighlight, StyleSheet } from "react-native";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

export const PtDeMes = ({item, navigation}) => {
    
    return (
        <View style={styles.container}>
            <View style={styles.blocText}>
                <Text>Nom: {item["pt_mes_nom"]}</Text>
                <Text>Pos.: {item["pt_mes_position"]}</Text>
                <Text>Dernière synchro.:</Text>
                <Text>21/07/2021 10:12</Text>
            </View>
            <View style={styles.clickDownload}>
                <TouchableHighlight style={styles.touchable} onPress={() => {
                    console.log("Download: " + item.id);
                    }
                }>
                    <FontAwesome5 name={'download'} solid size={50} />
                </TouchableHighlight>
            </View>
            <View style={styles.clickVersUnPoint}>
                <TouchableHighlight style={styles.touchable} onPress={() => {
                    // navigation.navigate('Detail', {uneRecette : item});
                    navigation.navigate('UnPointDeMesure');
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
        borderColor: "black",
        borderWidth: 1,
        borderRadius: 5,
        margin: 5,
        padding: 5,
    },
    blocText:{
        flex: 3,
    },
    clickDownload:{
        flex: 1,
        justifyContent: "center",
    },
    clickVersUnPoint:{
        flex: 1,
        justifyContent: "center",
    },
    
    
});