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
          style={{
            width:35,
            height:35,
          }}
          source={{
            uri:'https://cdn0.iconfinder.com/data/icons/apple-apps/100/Apple_Photos-512.png'
          }}/>
        ) : (
          <Image
          style={{
            width:35,
            height:35,
          }}
          source={{
            uri:'https://cdn0.iconfinder.com/data/icons/apple-apps/100/Apple_Photos-512.png'
          }}/>
        );
      case 'folder':
        return isFocues ? (
          <Icon
            name="folder"
            style={{
              fontSize: 30,
            }}
            color="#fff"
          />
        ) : (
          <Icon
            name="folder"
            style={{
              fontSize: 30,
            }}
            color="#6b4eff"
          />
        );
      case 'camera':
        return isFocues ? (
          <Icon
            name="camera-retro"
            style={{
              fontSize: 30,
            }}
            color="#fff"
          />
        ) : (
          <Icon
            name="camera-retro"
            style={{
              fontSize: 30,
            }}
            color="#6b4eff"
          />
        );
      case 'notes':
        return isFocues ? (
          <Icon
            name="clipboard"
            style={{
              fontSize: 30,
            }}
            color="#fff"
          />
        ) : (
          <Icon
            name="clipboard"
            style={{
              fontSize: 30,
            }}
            color="#6b4eff"
          />
        );
      case 'account':
        return isFocues ? (
          <Icon
            name="user"
            style={{
              fontSize: 30,
            }}
            color="#fff"
          />
        ) : (
          <Icon
            name="user"
            style={{
              fontSize: 30,
            }}
            color="#6b4eff"
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
