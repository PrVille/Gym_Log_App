import React, { useState, useEffect } from "react"
import {
  createExercise,
  updateExercise,
} from "../../redux/reducers/exerciseReducer"
import { setNotification } from "../../redux/reducers/notificationReducer"
import { Input, Button, ListItem, Divider } from "@rneui/themed"
import uuid from "react-native-uuid"
import {
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Text,
  View,
  TouchableOpacity,
} from "react-native"
import { useDispatch, useSelector } from "react-redux"
import {
  selectRoutineById,
  selectActiveRoutine,
  updateRoutine,
} from "../../redux/reducers/routineReducer"
import theme from "../../theme"

const RoutineFormFinish = ({ setRoutine, routine }) => {
  return (
    <View style={{ flex: 1, paddingTop: 20 }}>
      <Input
        label={"Name"}
        value={routine.name}
        placeholder={`Name`}
        onChangeText={(value) => setRoutine({ ...routine, name: value })}
      />

      <Input
        label={"Notes"}
        value={routine.notes}
        placeholder={`Notes`}
        onChangeText={(value) => setRoutine({ ...routine, notes: value })}
      />

      <Divider style={{ marginVertical: 20 }} />
    </View>
  )
}

export default RoutineFormFinish
