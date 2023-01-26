import { Platform } from 'react-native'

const theme = {
  colors: {
    textPrimary: '#fff',
  },
  backgroundColors: {
    primary: '#25292e',
  },
  fontSizes: {
    body: 14,
    subheading: 16,
    heading: 20,
  },
  fonts: {
    main: Platform.select({
      android: 'Roboto',
      ios: 'Arial',
      default: 'system',
    }),
  },
  fontWeights: {
    normal: '400',
    bold: '700',
  },
}

export default theme