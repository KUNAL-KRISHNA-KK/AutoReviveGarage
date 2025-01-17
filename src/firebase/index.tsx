import messaging from '@react-native-firebase/messaging';
import AsyncStorage from '@react-native-async-storage/async-storage';

async function requestUserPermission(os) {
  try {
    const authStatus = await messaging().requestPermission();

    const enabled =
      authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
      authStatus === messaging.AuthorizationStatus.PROVISIONAL;

    if (enabled) {
      const token = await getFcmToken(os);
      return token;
    } else {
      console.log('Permission denied for receiving push notifications.');
      return null;
    }
  } catch (error) {
    console.log('Error requesting user permission:', error);
    return null;
  }
}

const getFcmToken = async os => {
  try {
    let storedToken = await AsyncStorage.getItem('fcmToken');
    if (!storedToken) {
      const fcmToken = await messaging().getToken();
      if (fcmToken) {
        await AsyncStorage.setItem(
          'fcmToken',
          JSON.stringify({fcmToken, PlatformOs: os}),
        );
        return {fcmToken, PlatformOs: os};
      } else {
        console.log('FCM token not available.');
        return null;
      }
    } else {
      return JSON.parse(storedToken);
    }
  } catch (error) {
    console.log('Error getting FCM token:', error);
    return null;
  }
};

export default requestUserPermission;
