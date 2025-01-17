import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import Header from '../components/Header';
import {useNavigation, useRoute} from '@react-navigation/native';
import APISERVICES from '../apiService';
import {FlatList} from 'react-native-gesture-handler';
import ButtonBlue from '../components/ButtonBlue';
import {useSelector} from 'react-redux';

const TeamDetails = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const id = route.params;
  const user = useSelector(state => state.user);
  const permissions = user?.role_permission?.permissions;
  // console.log(permissions?.team?.Add);

  const [loading, setLoading] = useState(false);
  const [teamData, setTeamData] = useState();

  const getTeamDetail = () => {
    setLoading(true);
    APISERVICES.team
      .get(id)
      .then(res => {
        console.log(res.data);
        setTeamData(res.data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getTeamDetail();
  }, []);

  return (
    <SafeAreaView style={{flex: 1, backgroundColor: 'white'}}>
      <Header title="Team Details" />

      {loading && (
        <View style={{margin: 15, position: 'absolute', top: 350, left: 170}}>
          <ActivityIndicator size="100" color="black" />
        </View>
      )}
      <View>
        <View
          style={{
            width: '92%',
            marginLeft: 16,
            borderRadius: 5,
            borderColor: '#DCE2EC',
            borderWidth: 3,
            marginTop: 20,
          }}>
          <View style={{flexDirection: 'row'}}>
            <View
              style={{width: '50%', padding: 15, marginLeft: 5, marginTop: 10}}>
              <Text
                style={{color: '#717171', letterSpacing: 0.3, fontSize: 15}}>
                Name:
              </Text>
              <Text
                style={{
                  color: 'black',
                  fontSize: 18,
                  fontWeight: '500',
                  letterSpacing: 0.3,
                }}>
                {teamData?.first_name} {teamData?.last_name}
              </Text>
            </View>
          </View>

          <View>
            <Text
              style={{
                color: '#717171',
                marginLeft: 20,
                letterSpacing: 0.3,
                fontSize: 15,
              }}>
              Role:
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: '500',
                marginLeft: 20,
                letterSpacing: 0.3,
              }}>
              {teamData?.roles[0]?.label}
              {}
            </Text>
          </View>

          <View>
            <Text
              style={{
                color: '#717171',
                marginLeft: 20,
                marginTop: 15,
                letterSpacing: 0.3,
                fontSize: 15,
              }}>
              Phone:
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: '500',
                marginLeft: 20,
                letterSpacing: 0.3,
              }}>
              {teamData?.phone}
            </Text>
          </View>

          <View>
            <Text
              style={{
                fontSize: 15,
                color: '#717171',
                marginLeft: 20,
                marginTop: 15,
                letterSpacing: 0.3,
              }}>
              Email:
            </Text>
            <Text
              style={{
                color: 'black',
                fontSize: 18,
                fontWeight: '500',
                marginLeft: 20,
                height: 70,
                letterSpacing: 0.3,
              }}>
              {teamData?.email}
            </Text>
          </View>
        </View>
      </View>

      {permissions?.team?.Add && (
        <ButtonBlue
          textComponent="Update Team"
          handleOnPress={() => navigation.navigate('UpdateTeam', teamData)}
        />
      )}
    </SafeAreaView>
  );
};

export default TeamDetails;

const styles = StyleSheet.create({});
