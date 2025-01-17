import React, {useState, useEffect} from 'react';
import {
  View,
  Text,
  TouchableOpacity,
  Modal,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import Icon1 from 'react-native-vector-icons/AntDesign';
import APISERVICES from '../apiService';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ScrollView} from 'react-native-gesture-handler';
import AssignTeam from './AssignTeam';
import CustomToast from './Toast';

const AssignModal = ({showModal, closeEvent, id, getJobList}) => {
  const [loading, setLoading] = useState(false);
  const [teamList, setTeamList] = useState();
  const [showTeam, setShowTeam] = useState(false);
  const [teamIds, setTeamIds] = useState([]);

  const addTeam = id => {
    setTeamIds(prevTeamIds => [...prevTeamIds, id]);
  };

  const removeTeam = id => {
    setTeamIds(prevTeamIds => prevTeamIds.filter(teamId => teamId !== id));
  };

  const handleAssign = () => {
    setLoading(true);
    const apiData = {
      team: teamIds,
      status_change: 2,
    };
    closeEvent();
    APISERVICES.job
      .put(id, apiData)
      .then(res => {
        CustomToast('success', 'Job in progress!');
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
        getJobList();
        closeEvent();
      });
  };

  const getTeamList = () => {
    setLoading(true);
    APISERVICES.team
      .get(`?status=1`)
      .then(res => {
        setTeamList(res.data);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  };

  useEffect(() => {
    getTeamList();
  }, []);

  return (
    <SafeAreaView>
      {loading && (
        <View style={styles.loadingContainer}>
          <ActivityIndicator size="100" color="black" />
        </View>
      )}
      <Modal transparent={true} visible={showModal} animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalHeaderText}>Move to in progress</Text>
            </View>

            <TouchableOpacity
              onPress={() => setShowTeam(!showTeam)}
              style={styles.selectTeamButton}>
              <View style={styles.selectTeamTextContainer}>
                <Icon1 name="adduser" size={20} color="gray" />
                <Text style={styles.selectTeamText}>Select Team</Text>
              </View>

              <View style={styles.selectTeamIconContainer}>
                <Icon1 name="down" size={20} color="gray" />
              </View>
            </TouchableOpacity>

            <View style={styles.actionButtonsContainer}>
              <View style={styles.actionButtonWrapper}>
                <TouchableOpacity
                  disabled={teamIds.length === 0}
                  onPress={handleAssign}
                  style={[
                    styles.assignButton,
                    {backgroundColor: teamIds.length === 0 ? '#99CCFF' : '#3D75E1'},
                  ]}>
                  <Text style={styles.buttonText}>Assign</Text>
                </TouchableOpacity>
              </View>
              <View style={styles.actionButtonWrapper}>
                <TouchableOpacity
                  onPress={closeEvent}
                  style={styles.cancelButton}>
                  <Text style={styles.cancelButtonText}>Cancel</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {showTeam && (
            <ScrollView style={styles.teamListContainer}>
              {teamList?.map(item => (
                <AssignTeam
                  first_name={item.first_name}
                  last_name={item.last_name}
                  id={item.id}
                  teamIds={teamIds}
                  addTeam={addTeam}
                  removeTeam={removeTeam}
                />
              ))}
            </ScrollView>
          )}
        </View>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  loadingContainer: {
    margin: 15,
    position: 'absolute',
    top: '50%',
    left: '40%',
  },
  modalContainer: {
    backgroundColor: '#000000aa',
    flex: 1,
    justifyContent: 'flex-end',
  },
  modalContent: {
    width: '99%',
    height: '35%',
    borderTopEndRadius: 20,
    borderTopStartRadius: 20,
    backgroundColor: '#ffffff',
    marginLeft: 3,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  modalHeaderText: {
    fontWeight: '600',
    fontSize: 19,
    color: '#000000',
    marginLeft: 15,
    marginTop: 25,
  },
  selectTeamButton: {
    backgroundColor: '#F6F6F6',
    margin: 15,
    height: '19%',
    borderRadius: 5,
    flexDirection: 'row',
    marginTop: 30,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectTeamTextContainer: {
    flexDirection: 'row',
    margin: 12,
  },
  selectTeamText: {
    color: 'gray',
    fontWeight: '500',
    fontSize: 15,
    marginLeft: 15,
  },
  selectTeamIconContainer: {
    margin: 12,
  },
  actionButtonsContainer: {
    flexDirection: 'row',
  },
  actionButtonWrapper: {
    width: '49%',
  },
  assignButton: {
    height: 50,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  cancelButton: {
    backgroundColor: '#F6F6F6',
    height: 50,
    borderRadius: 10,
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  buttonText: {
    fontWeight: '600',
    color: 'white',
    fontSize: 16,
  },
  cancelButtonText: {
    fontWeight: '600',
    color: 'black',
    fontSize: 16,
  },
  teamListContainer: {
    position: 'absolute',
    height: '32%',
    width: '90%',
    elevation: 5,
    backgroundColor: 'white',
    top: '31%',
    left: '5%',
    padding: 15,
    paddingBottom: 25,
    borderRadius: 5,
  },
});

export default AssignModal;
