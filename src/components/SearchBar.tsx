import {Image, StyleSheet, Text, TextInput, View, Pressable} from 'react-native';
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome6';

const SearchBar = () => {
    const [text, onChangeText] = React.useState('');
    function onTouch(){
        onChangeText('')
    }
  return (
    <View>
      <View style={styles.searchContainer}>
        <Pressable onPress={onTouch}>
        <TextInput
          style={[styles.searchTextInput]}
          onChangeText={onChangeText}
          placeholder='Search Photos, Things, Places'
          placeholderTextColor={'rgba(255, 255, 255, 0.6)'}
          value={text}
        />
        </Pressable>
        {/* <Icon
          name="magnifying-glass"
          style={styles.searchIcon}
          color="#FFF"
          size={15}
        /> */}
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
    backgroundColor: '#282828',
    borderRadius: 75,
  },
  searchTextInput: {
    fontSize: 15,
    fontFamily: 'Arial',
    fontWeight:'200',
    color: 'rgba(255, 255, 255, 0.6)',
    top: 0,
    textAlign: 'left',
    lineHeight: 20,
    paddingLeft: 14,
    paddingTop: 7,
  },
  searchIcon: {
    alignSelf: 'flex-end',
    width: 30,
    height: 30,
    position: 'absolute',
    paddingTop: 12,
    paddingRight: 20,
  },
});
