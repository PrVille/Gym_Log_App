import React, { useState } from "react"
import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableWithoutFeedback,
  View,
  Keyboard,
} from "react-native"
import { Divider, Input } from "@rneui/themed"
import theme from "../../theme"

const WarmupCalculator = ({ params }) => {
  const [weight, setWeight] = useState("")
  const [reps, setReps] = useState("")

  const Epley1RM = (w, r) => {
    return w * (1 + 0.0333 * r)
  }

  const repetitionPercentages = [
    1, 0.97, 0.94, 0.92, 0.89, 0.86, 0.83, 0.81, 0.78, 0.75,
  ]

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <ScrollView style={styles.container}>
        <View style={styles.inputContainer}>
          <View style={{ flex: 1, maxWidth: "50%" }}>
            <Input
              inputContainerStyle={styles.inputContainerStyle}
              inputStyle={styles.inputStyle}
              label="Weight"
              keyboardType="decimal-pad"
              maxLength={6}
              selectTextOnFocus={true}
              value={`${weight}`.replace(",", ".")}
              placeholder={`Weight in kg`}
              onChangeText={(value) => setWeight(value)}
            />
          </View>
        </View>

        <View>
          <View style={styles.tableHeaderRowContainer}>
            <Text style={styles.leftHeaderCellContainer}>Set</Text>
            <Text style={styles.leftHeaderCellContainer}>Reps</Text>
            <Text style={styles.leftHeaderCellContainer}>Weight</Text>
            <Text style={styles.rightHeaderCellContainer}>% of 1RM</Text>
          </View>

          <Divider />

          <View style={styles.rowContainer}>
            <Text style={styles.leftCellContainer}>1</Text>
            <Text style={styles.leftCellContainer}>15</Text>
            <Text style={styles.leftCellContainer}>Bar (20kg)</Text>
            <Text style={styles.rightCellContainer}>-</Text>
          </View>

          <View style={styles.rowContainer}>
            <Text style={styles.leftCellContainer}>2</Text>
            <Text style={styles.leftCellContainer}>5</Text>
            <Text style={styles.leftCellContainer}>{weight ? (weight * 0.4).toFixed(2) + " kg" : "-"}</Text>
            <Text style={styles.rightCellContainer}>40 %</Text>
          </View>

          <View style={styles.rowContainer}>
            <Text style={styles.leftCellContainer}>3</Text>
            <Text style={styles.leftCellContainer}>4</Text>
            <Text style={styles.leftCellContainer}>{weight ? (weight * 0.5).toFixed(2) + " kg" : "-"}</Text>
            <Text style={styles.rightCellContainer}>50 %</Text>
          </View>

          <View style={styles.rowContainer}>
            <Text style={styles.leftCellContainer}>4</Text>
            <Text style={styles.leftCellContainer}>3</Text>
            <Text style={styles.leftCellContainer}>{weight ? (weight * 0.6).toFixed(2) + " kg" : "-"}</Text>
            <Text style={styles.rightCellContainer}>60 %</Text>
          </View>

          <View style={styles.rowContainer}>
            <Text style={styles.leftCellContainer}>5</Text>
            <Text style={styles.leftCellContainer}>2</Text>
            <Text style={styles.leftCellContainer}>{weight ? (weight * 0.75).toFixed(2) + " kg" : "-"}</Text>
            <Text style={styles.rightCellContainer}>75 %</Text>
          </View>
        </View>
      </ScrollView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 15,
  },
  inputContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingTop: 10,
    flex: 1,
  },
  inputContainerStyle: {
    borderWidth: 1,
    borderRadius: 10,
    marginTop: 5,
    flex: 1,
  },
  inputStyle: {
    textAlign: "center",
    flex: 1,
  },
  tableContainer: {},
  tableHeaderRowContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: 20,
    paddingBottom: 10,
  },
  leftHeaderCellContainer: {
    textAlign: "left",
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
    flex: 1,
  },
  centerHeaderCellContainer: {
    textAlign: "center",
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
    flex: 1,
  },
  rightHeaderCellContainer: {
    textAlign: "right",
    color: theme.colors.primary,
    fontWeight: theme.fontWeights.bold,
    fontSize: theme.fontSizes.subheading,
    flex: 1,
  },
  rowContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
    paddingTop: 10,
  },
  leftCellContainer: {
    textAlign: "left",
    color: theme.colors.primary,
    fontSize: theme.fontSizes.subheading,
    flex: 1,
  },
  centerCellContainer: {
    textAlign: "center",
    color: theme.colors.primary,
    fontSize: theme.fontSizes.subheading,
    flex: 1,
  },
  rightCellContainer: {
    textAlign: "right",
    color: theme.colors.primary,
    fontSize: theme.fontSizes.subheading,
    flex: 1,
  },
})

export default WarmupCalculator
