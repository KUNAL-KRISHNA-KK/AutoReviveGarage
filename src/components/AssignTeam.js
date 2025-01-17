import { StyleSheet, Text, View ,TouchableOpacity} from 'react-native'
import Entypo from 'react-native-vector-icons/Entypo';
import React, { useState } from 'react'

const AssignTeam = ({id,first_name,last_name ,teamIds,addTeam,removeTeam}) => {
     const [checked,setChecked]=useState(false);

     const addRemoveTeam=()=>{
       if(checked){
        removeTeam(id);
        setChecked(false);
       }
       else{
        addTeam(id);
        setChecked(true);
       }
     }

         return (
                <TouchableOpacity  onPress={addRemoveTeam}
                 style={{flexDirection:"row",justifyContent:"space-between"}}>
                  <Text
                  style={{
                    color: 'black',
                    margin: 10,
                    fontSize: 16,
                    fontWeight: '500',
                  }}>
                  {first_name} {last_name}
                 </Text>

                 <TouchableOpacity
                onPress={addRemoveTeam}
                style={{
                  height: 21,
                  width: 21,
                  backgroundColor: checked ? '#3D75E1': 'white',
                  marginLeft: 25,
                  marginTop: 10,
                  borderRadius: 5,
                  borderColor: 'gray',
                  borderWidth: 1,
                }}>
                {checked && <Entypo name="check" size={18} color="white" />}
              </TouchableOpacity>
                   
                </TouchableOpacity>
  )
}

export default AssignTeam

const styles = StyleSheet.create({})