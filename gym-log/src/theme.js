import { Platform } from "react-native"
import { createTheme, Icon } from "@rneui/themed"

const colors = {
  paleDogwood: "rgb(247, 209, 205)",
  fairyTale: "rgb(232, 194, 202)",
  thistle: "rgb(209, 179, 196)",
  roseQuartz: "rgb(179, 146, 172)",
  chineseViolet: "rgb(115, 93, 120)",
}

const theme = {
  colors: {
    background: colors.paleDogwood,
    secondaryVariant: colors.fairyTale,
    secondary: colors.thistle,
    primaryVariant: colors.roseQuartz,
    primary: colors.chineseViolet,
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    heading: 20,
  },
  fonts: {
    main: Platform.select({
      android: "Roboto",
      ios: "Arial",
      default: "system",
    }),
  },
  fontWeights: {
    normal: "400",
    bold: "700",
  },
}

export const defaultNavigationTheme = {
  dark: false,
  colors: {
    primary: theme.colors.primary,
    background: theme.colors.background,
    card: theme.colors.background,
    text: theme.colors.primary,
    border: theme.colors.primary,
    notification: "rgb(255, 69, 58)", // ??
  },
}

export const defaultRNETheme = createTheme({
  components: {
    ListItemSwipeable: {
      containerStyle: {
        backgroundColor: theme.colors.background,
      },
    },
    ListItemTitle: {
      style: {
        color: theme.colors.primary,
        fontSize: theme.fontSizes.subheading,
        fontWeight: theme.fontWeights.bold,
      },
    },
    ListItemSubtitle: {
      style: {
        color: theme.colors.primaryVariant,
      },
    },
    ListItem: {
      containerStyle: {
        backgroundColor: theme.colors.background,
      },
    },
    ListItemAccordion: {
      containerStyle: {
        backgroundColor: theme.colors.background,
      },
    },
    ListItemCheckBox: {
      containerStyle: {
        backgroundColor: theme.colors.background,
      },
      checkedColor: theme.colors.primary,
      uncheckedColor: theme.colors.primary,
    },
    ListItemChevron:{
      color: theme.colors.primary
    },
    SearchBar: {
      containerStyle: {
        backgroundColor: theme.colors.background,
        borderTopWidth: 0,
        borderBottomWidth: 0,
      },
      inputContainerStyle: {
        backgroundColor: theme.colors.background,
      },
      inputStyle: {
        color: theme.colors.primary,
      },
      placeholderTextColor: theme.colors.primaryVariant,
      placeholder: "Search...",
    },
    Icon: {
      color: theme.colors.primary,
      disabledStyle: { backgroundColor: theme.colors.background },
    },
    FAB: {
      color: theme.colors.primary,
      placement: "right",
    },
    Chip: {
      buttonStyle: {
        borderColor: theme.colors.primary,
      },
      titleStyle: {
        color: theme.colors.primary,
      },
    },
    Button: {
      buttonStyle: {
        backgroundColor: theme.colors.primary,
        borderColor: theme.colors.primary,
      },
      titleStyle: {
        color: theme.colors.background,
      },
      radius: "sm",
      raised: true,
      type: "outline",
      activeOpacity: 0.2, //default
    },
    Input: {
      inputContainerStyle: {
        borderColor: theme.colors.primary,
      },
      labelStyle: {
        color: theme.colors.primary,
      },
      inputStyle: {
        color: theme.colors.primary,
      },
      placeholderTextColor: theme.colors.primaryVariant,
    },
    Divider: {
      color: theme.colors.primaryVariant,
    },
    CardDivider: {
      color: theme.colors.primary,
    },
    Card: {
      containerStyle: {
        borderRadius: 20,
        backgroundColor: theme.colors.secondaryVariant,
        borderColor: theme.colors.primary,
      },
    },
    CardTitle: {
      style: {
        color: theme.colors.primary,
      },
    },
    CheckBox: {
      containerStyle: {
        backgroundColor: theme.colors.background,
        color: theme.colors.primary,
      },
      textStyle: {
        color: theme.colors.primary,
      },
      checkedColor: theme.colors.primary,
      uncheckedColor: theme.colors.secondary,
    },
    ButtonGroup: {
      buttonStyle: { backgroundColor: theme.colors.background },
      innerBorderStyle: { width: 0 },
      containerStyle: {
        borderRadius: 15,
        borderColor: theme.colors.primary,
      },
      textStyle: { color: theme.colors.primary },
      selectedButtonStyle: { backgroundColor: theme.colors.primary },
      selectedTextStyle: { color: theme.colors.background },
      disabledSelectedStyle: {
        backgroundColor: theme.colors.primaryVariant,
      },
      disabledSelectedTextStyle: {
        color: theme.colors.background,
      },
      disabledStyle: {
        backgroundColor: theme.colors.background,
      },
      disabledTextStyle: {
        color: theme.colors.primaryVariant,
      },
    },
  },
})

export default theme
