import { StyleSheet, Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'

const ModelStrip = ({ id, name, selectModel, selectModelId ,formik}) => {
    const navigation = useNavigation();
    return (
        <TouchableOpacity
            onPress={() => {
                navigation.goBack()
                selectModel(name)
                selectModelId(id)
            }}
            style={{ borderBottomColor: "#E3E5EC", borderBottomWidth: 1, margin: 2 }}>
            <Text style={{ margin: 15, marginLeft: 25, fontSize: 16, color: "black", }}> {name}</Text>
        </TouchableOpacity>
    )
}

export default ModelStrip

const styles = StyleSheet.create({})