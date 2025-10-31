// import { PermissionsAndroid, Platform } from 'react-native';

// export const requestCameraAndGalleryPermissions = async () => {
//   if (Platform.OS === 'android') {
//     try {
//       const granted = await PermissionsAndroid.requestMultiple([
//         PermissionsAndroid.PERMISSIONS.CAMERA,
//         PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE,
//         PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
//       ]);

//       const cameraGranted = granted['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED;
//       const storageGranted =
//         granted['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED ||
//         granted['android.permission.READ_MEDIA_IMAGES'] === PermissionsAndroid.RESULTS.GRANTED;

//       if (cameraGranted && storageGranted) {
//         console.log('Camera & Gallery permissions granted');
//         return true;
//       } else {
//         console.log('Permissions denied');
//         return false;
//       }
//     } catch (err) {
//       console.warn(err);
//       return false;
//     }
//   } else {
//     return true;
//   }
// };

import { PermissionsAndroid, Platform, Alert } from 'react-native';

export const requestPermissions = async () => {
  if (Platform.OS !== 'android') return true;

  try {
    const permissionsToRequest = [
      PermissionsAndroid.PERMISSIONS.CAMERA,
    ];

    // Android 13 (API 33+) uses READ_MEDIA_IMAGES
    if (Platform.Version >= 33) {
      permissionsToRequest.push(PermissionsAndroid.PERMISSIONS.READ_MEDIA_IMAGES);
    } else {
      permissionsToRequest.push(PermissionsAndroid.PERMISSIONS.READ_EXTERNAL_STORAGE);
    }

    const result = await PermissionsAndroid.requestMultiple(permissionsToRequest);

    const cameraGranted = result['android.permission.CAMERA'] === PermissionsAndroid.RESULTS.GRANTED;
    const storageGranted =
      result['android.permission.READ_EXTERNAL_STORAGE'] === PermissionsAndroid.RESULTS.GRANTED ||
      result['android.permission.READ_MEDIA_IMAGES'] === PermissionsAndroid.RESULTS.GRANTED;

    if (cameraGranted && storageGranted) {
      console.log('✅ Permissions granted');
      return true;
    } else {
      console.log('❌ Permissions denied');
      Alert.alert('Permission required', 'Please allow camera and gallery access in settings.');
      return false;
    }
  } catch (err) {
    console.warn(err);
    return false;
  }
};
