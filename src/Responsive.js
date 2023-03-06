import {Dimensions, PixelRatio} from 'react-native';

const {width, height} = Dimensions.get('window');

export const widthToDp = (wnumber) => {
  let givenWidth = typeof wnumber === 'number' ? number : parseFloat(wnumber);
  return PixelRatio.roundToNearestPixel((width * givenWidth) / 100);
};

export const heightToDp = (hnumber) => {
  let givenHeight = typeof hnumber === 'number' ? number : parseFloat(hnumber);
  return PixelRatio.roundToNearestPixel((height * givenHeight) / 100);
};
