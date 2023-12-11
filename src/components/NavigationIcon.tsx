import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome6';


interface NavigationIconProps {
  route: string;
  isFocused: boolean;
}

const NavigationIcon = ({route, isFocused}: NavigationIconProps) => {
  const renderIcon = (route: string, isFocues: boolean) => {
    let height: number = 20;
    let width: number = 20;

    switch (route) {
      case 'home':
        return isFocues ? (
          <Image
          width={width}
            height={height}
          source={require('../../assets/gallery.png')}/>
        ) : (
          <Image
          width={width}
            height={height}
          source={require('../../assets/gallery.png')}/>
        );
      case 'folder':
        return isFocues ? (
          <Image
            source={require('../../assets/createfolder.png')}
            width={width}
            height={height}
          />
        ) : (
          <Image
            source={require('../../assets/createfolder.png')}
            width={width}
            height={height}
          />
        );
      case 'camera':
        return isFocues ? (
          <Image
            source={require('../../assets/camera-lens.png')}
            width={width}
            height={height}
          />
        ) : (
          <Image
            source={require('../../assets/camera-lens.png')}
            width={width}
            height={height}
          />
        );
      case 'notes':
        return isFocues ? (
          <Image
          source={require('../../assets/createfolder.png')}
          width={width}
          height={height}
        />
        ) : (
          <Image
            source={require('../../assets/createfolder.png')}
            width={width}
            height={height}
          />
        );
      case 'account':
        return isFocues ? (
          <Image
          source={require('../../assets/settingsbold.png')}
          width={width}
          height={height}
        />
        ) : (
          <Image
            source={require('../../assets/settings.png')}
            width={width}
            height={height}
          />
        );
      default:
        break;
    }
  };

  return <View>{renderIcon(route, isFocused)}</View>;
};

const styles = StyleSheet.create({});

export default NavigationIcon;
