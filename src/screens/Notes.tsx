import React, {useCallback, useEffect, useMemo, useRef} from 'react';
import {View, Text, FlatList, StyleSheet, TextInput} from 'react-native';

const Notes = () => {
  const contacts = [
    {id: 1, name: 'Albert Johns', phone: '+7 8585 57 45 41'},
    {id: 2, name: 'Arlene McCoy', phone: '+7 8585 57 45 41'},
    {id: 3, name: 'Annette Black', phone: '+7 8585 57 45 41'},
    {id: 4, name: 'Albert Flores', phone: '+7 8585 57 45 41'},
    {id: 5, name: 'Alex Black', phone: '+7 8585 57 45 41'},
    // Add more contacts as needed
  ];

  const renderItem = ({item}) => (
    <View style={styles.contactItem}>
      <View style={styles.avatarContainer}>
        <Text style={styles.avatarText}>DT</Text>
      </View>
      <View style={styles.contactDetails}>
        <Text style={styles.contactName}>{item.name}</Text>
        <Text style={styles.contactName}>{item.phone}</Text>
      </View>
      <View style={styles.iconContainer}>
        <Text style={styles.iconText}>I</Text>
      </View>
    </View>
  );

  // renders
  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <TextInput
          style={styles.searchInput}
          placeholder="Search"
          placeholderTextColor="#ccc"
        />
      </View>
      <FlatList
        data={contacts}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  searchContainer: {
    padding: 10,
  },
  searchInput: {
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 10,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  avatarContainer: {
    backgroundColor: '#ccc',
    width: 40,
    height: 40,
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: {
    fontWeight: 'bold',
    color: '#fff',
  },
  contactDetails: {
    flex: 1,
    marginLeft: 10,
  },
  contactName: {
    fontWeight: 'bold',
  },
  iconContainer: {
    backgroundColor: '#ccc',
    width: 30,
    height: 30,
    borderRadius: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconText: {
    color: '#fff',
  },
});

export default Notes;
