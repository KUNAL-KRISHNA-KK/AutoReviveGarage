import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'

import { useNavigation } from '@react-navigation/native'

const MakeStrip = ({ name, id, selectMake, selectMakeId }) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => {
                selectMake(name);
                selectMakeId(id);
                navigation.goBack();
            }}
            style={{ borderBottomColor: "#E3E5EC", borderBottomWidth: 1, margin: 2 }}>
            <Text style={{ margin: 15, marginLeft: 25, fontSize: 16, color: "black", }}> {name}</Text>
        </TouchableOpacity>
    )
}

export default MakeStrip

const styles = StyleSheet.create({})