import 'dotenv/config';

export default {
    "name": "Gym Log",
    "slug": "gym-log",
    "privacy": "public",
    "description": "Gym workout logger app.",
    "version": "1.0.0",
    "orientation": "portrait",
    "icon": "./assets/icon.png",
    "userInterfaceStyle": "light",
    "splash": {
      "image": "./assets/splash.png",
      "resizeMode": "contain",
      "backgroundColor": "#F7D1CD"
    },
    "updates": {
      "fallbackToCacheTimeout": 0
    },
    "assetBundlePatterns": [
      "**/*"
    ],
    "ios": {
      "supportsTablet": true
    },
    "android": {
      "adaptiveIcon": {
        "foregroundImage": "./assets/adaptive-icon.png",
        "backgroundColor": "#F7D1CD"
      }
    },
    "web": {
      "favicon": "./assets/favicon.png"
    },
    "extra": {
      "BASE_URL": process.env.BASE_URL,
    },
  }

