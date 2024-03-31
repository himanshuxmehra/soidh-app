import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';


interface NavigationIconProps {
  route: string;
  isFocused: boolean;
}
const height: number = 25;
const width: number = 25;
const NavigationIcon = ({ route, isFocused }: NavigationIconProps) => {
  const renderIcon = (route: string, isFocues: boolean) => {


    switch (route) {
      case 'home':
        return isFocues ? (
          <Image
            style={styles.iconSize}
            source={require('../../assets/home-focused.png')} />
        ) : (
          <Image
            style={styles.iconSize}
            source={require('../../assets/home.png')} />
        );
      case 'feed':
        return isFocues ? (
          <Image
            source={require('../../assets/hashtag-focused.png')}
            style={styles.iconSize}
          />
        ) : (
          <Image
            source={require('../../assets/hashtag.png')}
            style={styles.iconSize}
          />
        );
      case 'camera':
        return isFocues ? (
          <Image
            source={require('../../assets/camera-focused.png')}
            style={styles.iconSize}
          />
        ) : (
          <Image
            source={require('../../assets/camera.png')}
            style={styles.iconSize}
          />
        );
      case 'gallery':
        return isFocues ? (
          <Image
            source={require('../../assets/gallery-focused.png')}
            style={styles.iconSize}
          />
        ) : (
          <Image
            source={require('../../assets/gallery.png')}
            style={styles.iconSize}
          />
        );
      case 'account':
        return isFocues ? (
          <Image
            source={require('../../assets/user-focused.png')}
            style={styles.iconSize}
          />
        ) : (
          <Image
            source={require('../../assets/user.png')}
            style={styles.iconSize}
          />
        );
      default:
        break;
    }
  };

  return <View>{renderIcon(route, isFocused)}</View>;
};

const styles = StyleSheet.create({
  iconSize: {
    width: width,
    height: height,
  }
});

export default NavigationIcon;
