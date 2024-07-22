import {ImageBackground, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {Image} from 'react-native-elements';
import {COLORS} from '../constants/theme';

const Header = () => {
  return (
    <View style={styles.header}>
      <Image
        source={require('../../assets/soidh-clear.png')}
        style={styles.logo}
      />
      {/* <Text
                style={
                    [styles.textLogo]
                }>
                SOIDH
            </Text> */}
      {/* <Image
                source={require('../../assets/menu.png')}
            /> */}
    </View>
  );
};

export default Header;

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingTop: 5,
    paddingBottom: 0,
    paddingHorizontal: 10,
    backgroundColor: COLORS.secondary,
  },
  textLogo: {
    color: COLORS.white,
  },
  logo: {
    width: 96,
    height: 96,
  },
});
