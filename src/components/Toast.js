import Toast, { ToastPosition } from 'react-native-toast-message';

const CustomToast = (
    type = 'success',
    text1 = '',
    text2 = '',
    time = 4000,
    position = 'bottom',
) => {
    return Toast.show({
        type: type,
        text1: text1,
        text2: text2,
        visibilityTime: time,
        position: position,
    });
};

export default CustomToast;