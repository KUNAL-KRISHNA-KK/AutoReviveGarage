import { StyleSheet, Text, View,ActivityIndicator } from 'react-native'
import React from 'react'

const Loading = () => {
  return (
    <View style={{ backgroundColor: '#001e3c', padding: 5, }}>
    <View style={{ display: "flex", flexDirection: "row", justifyContent: 'center', alignItems: "center" }}>
        <ActivityIndicator size="large" color="#004040" />
        <Text style={{ color: "white", fontSize: 16, marginLeft: 14, fontWeight: "500" }}>Loading</Text>
    </View>
</View>

  )
}

export default Loading

const styles = StyleSheet.create({})