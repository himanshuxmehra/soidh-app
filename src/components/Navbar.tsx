import React from 'react';

import {
  View,
  Pressable,
  Dimensions,
  StyleSheet,
  TouchableOpacity,
} from 'react-native';
import NavigationIcon from './NavigationIcon';

// import { SelectWheel } from '.';

const {width} = Dimensions.get('window');

const TabBar = ({state, descriptors, navigation}: any) => {
  return (
    <View style={styles.mainContainer}>
      {state.routes.map((route: any, index: number) => {
        if (route.name == 'PlaceholderScreen') {
          return <View key={index} style={styles.mainItemContainer}></View>;
        }

        const {options} = descriptors[route.key];
        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
            ? options.title
            : route.name;

        const isFocused = state.index === index;

        const onPress = () => {
          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name);
          }
        };

        return (
          <View
            key={index}
            style={[
              styles.mainItemContainer,
              {
                flex: 1,
                width: "70%",
                marginLeft:5,
                marginRight:5,
                overflow: "hidden",
            },
            ]}>
            <Pressable
              onPress={onPress}>
              <View
                style={{
                  padding:5,
                }}>
                <NavigationIcon route={label} isFocused={isFocused} />
              </View>
            </Pressable>
          </View>
        );
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flexDirection: 'row',
    position: 'absolute',
    bottom: 25,
    backgroundColor: '#030303',
    borderRadius: 25,
    marginHorizontal: width * 0.1,
  },
  mainItemContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
    borderRadius: 1,
    width:'70%',
    borderColor: '#333B42',
    flexDirection: 'row',
  },
});

export default TabBar;
