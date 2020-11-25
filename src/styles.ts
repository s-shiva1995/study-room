import {StyleSheet} from 'react-native';

export const commonStyles = StyleSheet.create({
  container: {
    flex: 1,
    margin: 8,
  },
  fullFlex: {flex: 1},
});

export const detailViewStyles = StyleSheet.create({
  imageContainer: {alignContent: 'center', justifyContent: 'center'},
  image: {width: 240, height: 360, resizeMode: 'contain'},
});
