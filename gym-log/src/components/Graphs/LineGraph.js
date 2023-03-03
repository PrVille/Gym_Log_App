import { StyleSheet, Dimensions } from "react-native"
import { format } from "date-fns"

import {
  VictoryChart,
  VictoryAxis,
  VictoryLine,
  VictoryVoronoiContainer,
  VictoryTooltip,
  VictoryLabel,
} from "victory-native"

import theme from "../../theme"

const LineGraph = ({ data, type, widget }) => {
  const getLabelText = () => {
    switch (type) {
      case "Duration":
        return "Minutes"
      case "Reps":
        return "Reps"
      case "Volume":
        return "Tonnes"
      case "Sets":
        return "Sets"
      case "Workouts":
        return "Workouts"
      case "1RM":
        return "Kg"
      default:
        return ""
    }
  }

  return (
    <VictoryChart
      height={Dimensions.get("window").height * (widget ? 0.3 : 0.6)}
      domainPadding={{ x: 5, y: 10 }}
      data={data}
      containerComponent={
        <VictoryVoronoiContainer
          disable={widget}
          labels={({ datum }) => datum.y}
          labelComponent={
            <VictoryTooltip
              style={styles.tooltip}
              renderInPortal={false}
              pointerLength={5}
              flyoutStyle={styles.flyout}
            />
          }
        />
      }
      padding={styles.padding}
    >
      <VictoryAxis
        scale="time"
        tickFormat={(x) => format(x, "dd.MM")}
        style={styles.axis}
      />
      <VictoryAxis dependentAxis tickFormat={(y) => Math.floor(y)} style={styles.axis} />
      <VictoryLine
        interpolation={"monotoneX"}
        data={data}
        style={styles.line}
      />
      <VictoryLabel x={25} y={25} style={styles.label} text={getLabelText()} />
    </VictoryChart>
  )
}

const styles = StyleSheet.create({
  tooltip: {
    fontSize: theme.fontSizes.subheading,
    fill: theme.colors.background,
  },
  flyout: {
    fill: theme.colors.primary,
    stroke: theme.colors.primary,
  },
  padding: {
    top: 50,
    bottom: 50,
    left: 50,
    right: 30,
  },
  label: {
    fill: theme.colors.primary,
  },
  axis: {
    grid: {
      stroke: theme.colors.secondaryVariant,
    },
    axis: { stroke: theme.colors.primary },
    tickLabels: {
      fill: theme.colors.primary,
    },
  },
  line: {
    data: {
      stroke: theme.colors.primary,
      strokeWidth: ({ active }) => (active ? 4 : 2),
    },
  },
})

export default LineGraph
