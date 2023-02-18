import { Platform } from "react-native"
import { createTheme } from "@rneui/themed"

const theme = {
  colors: {
    paleDogwood: "rgb(247, 209, 205)",
    fairyTale: "rgb(232, 194, 202)",
    thistle: "rgb(209, 179, 196)",
    roseQuartz: "rgb(179, 146, 172)",
    chineseViolet: "rgb(115, 93, 120)",
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
    primary: theme.colors.chineseViolet,
    background: theme.colors.paleDogwood,
    card: theme.colors.paleDogwood,
    text: theme.colors.chineseViolet,
    border: theme.colors.chineseViolet,
    notification: "rgb(255, 69, 58)", // ??
  },
}

export const defaultRNETheme = createTheme({
  components: {
    ListItemSwipeable: {
      containerStyle: {
        backgroundColor: theme.colors.paleDogwood,
      },
    },
    ListItemTitle: {
      style: {
        color: theme.colors.chineseViolet,
        fontSize: theme.fontSizes.subheading,
        fontWeight: theme.fontWeights.bold,
      },
    },
    ListItemSubtitle: {
      style: {
        color: theme.colors.roseQuartz,
      },
    },
    ListItemChevron: {
      color: theme.colors.chineseViolet,
    },
    ListItem: {
      containerStyle: {
        backgroundColor: theme.colors.paleDogwood,
      },
    },
    ListItemAccordion: {
      containerStyle: {
        backgroundColor: theme.colors.paleDogwood,
      },
    },
    ListItemCheckBox: {
      containerStyle: {
        backgroundColor: theme.colors.paleDogwood,
      },
      checkedColor: theme.colors.chineseViolet,
      uncheckedColor: theme.colors.chineseViolet,
    },
    SearchBar: {
      containerStyle: {
        backgroundColor: theme.colors.paleDogwood,
        borderTopWidth: 0,
        borderBottomWidth: 0,
      },
      inputContainerStyle: {
        backgroundColor: theme.colors.paleDogwood,
      },
      inputStyle: {
        color: theme.colors.chineseViolet,
      },
      placeholderTextColor: theme.colors.roseQuartz,
      placeholder: "Search...",
    },
    Icon: {
      color: theme.colors.chineseViolet,
    },
    FAB: {
      color: theme.colors.chineseViolet,
      placement: "right",
    },
    Chip: {
      buttonStyle: {
        borderColor: theme.colors.chineseViolet,
      },
      titleStyle: {
        color: theme.colors.chineseViolet,
      },
    },
    Button: {
      buttonStyle: {
        backgroundColor: theme.colors.chineseViolet,
        borderColor: theme.colors.chineseViolet,
      },
      titleStyle: {
        color: theme.colors.paleDogwood,
      },
      radius: "sm",
      raised: true,
      type: "outline",
      activeOpacity: 0.2, //default
    },
    Input: {
      inputContainerStyle: {
        borderColor: theme.colors.chineseViolet,
      },
      labelStyle: {
        color: theme.colors.chineseViolet,
      },
      inputStyle: {
        color: theme.colors.chineseViolet,
      },
      placeholderTextColor: theme.colors.roseQuartz,
    },
    Divider: {
      color: theme.colors.roseQuartz,
    },
    CardDivider: {
      color: theme.colors.chineseViolet,
    },
    Card: {
      containerStyle: {
        borderRadius: 20,
        backgroundColor: theme.colors.fairyTale,
        borderColor: theme.colors.chineseViolet,
      },
    },
    CardTitle: {
      style: {
        color: theme.colors.chineseViolet,
      },
    },
    CheckBox: {
      containerStyle: {
        backgroundColor: theme.colors.paleDogwood,
        color: theme.colors.chineseViolet
      },
      textStyle: {
        color: theme.colors.chineseViolet
      },
      checkedColor: theme.colors.chineseViolet,
      uncheckedColor: theme.colors.thistle
    }
  },
})

export default theme
