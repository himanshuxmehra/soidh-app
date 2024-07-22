import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  Pressable,
} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';
import {COLORS} from '../constants/theme';

const SearchBar = () => {
  const [text, onChangeText] = React.useState('');
  function onTouch() {
    onChangeText('');
  }
  return (
    <View>
      <View style={styles.searchContainer}>
        <Pressable onPress={onTouch}>
          <TextInput
            style={[styles.searchTextInput]}
            onChangeText={onChangeText}
            placeholder="Search Photos, Things, Places"
            placeholderTextColor={COLORS.secondary}
            value={text}
          />
        </Pressable>
        <View style={styles.searchIcon}>
          <Image
            source={require('../../assets/search.png')}
            style={{
              width: 24,
              height: 24,
            }}
          />
        </View>
      </View>
    </View>
  );
};

export default SearchBar;

const styles = StyleSheet.create({
  searchContainer: {
    width: '90%',
    height: 40,
    top: 5,
    left: 20,
    marginBottom: 10,
    paddingRight: 20,
    backgroundColor: COLORS.lightBg,
    borderRadius: 75,
  },
  searchTextInput: {
    fontSize: 15,
    fontFamily: 'Arial',
    fontWeight: '200',
    color: 'rgba(255, 255, 255, 0.6)',
    top: 0,
    textAlign: 'left',
    lineHeight: 20,
    paddingLeft: 14,
    paddingTop: 8,
  },
  searchIcon: {
    alignSelf: 'flex-end',
    position: 'absolute',
    paddingVertical: 8,
    paddingRight: 14,
  },
});
