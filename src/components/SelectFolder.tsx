import {View, Text, StyleSheet, TouchableOpacity, FlatList} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../constants/theme';
import {getFolders, getSharedFolders} from '../services/api';
import {useAuthentication} from '../services/AuthenticationContext';

const SelectFolder = ({selectedFolder, setSelectedFolder}) => {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [folders, setFolders] = useState<any[]>();
  const {phoneNumber, jwtToken, accountId} = useAuthentication();

  useEffect(() => {
    const fetchFolders = async () => {
      let sharedFolders = await getSharedFolders(phoneNumber, jwtToken);
      let ownFolders = await getFolders(accountId, jwtToken);
      const sharedsFolders = sharedFolders.data.folders;
      const ownsFolders = ownFolders.data.folders;
      const res = [...ownsFolders, ...sharedsFolders];
      setFolders(res);
    };
    fetchFolders();
    //todo: move this to asyncstorage so that you dont have to send calls
  }, []);

  const showDropDown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const loadList = (folder: any) => {
    folder = folder.item;
    return (
      <TouchableOpacity
        key={folder.id}
        onPress={() => {
          setSelectedFolder(folder);
          setIsDropdownOpen(false);
        }}>
        <Text style={{color: COLORS.white}}>{folder.folder_name}</Text>
      </TouchableOpacity>
    );
  };
  return (
    <View style={styles.container}>
      {isDropdownOpen ? (
        <View>
          {folders ? (
            <View
              style={{
                borderBottomColor: COLORS.secondary,
                borderBottomWidth: 1,
              }}>
              <FlatList
                data={folders}
                horizontal={false}
                renderItem={loadList}
              />
            </View>
          ) : (
            <Text>no folders</Text>
          )}
        </View>
      ) : (
        <></>
      )}
      <View style={styles.button}>
        <TouchableOpacity onPress={showDropDown}>
          {selectedFolder.folder_id ? (
            <Text style={styles.name}>{selectedFolder.folder_name}</Text>
          ) : (
            <Text style={styles.name}>SelectFolder /</Text>
          )}
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default SelectFolder;

const styles = StyleSheet.create({
  container: {
    zIndex: 1,
    position: 'absolute',
    backgroundColor: COLORS.primary,
    bottom: 102,
    marginLeft: 10,
    padding: 5,
    width: 100,
    fontFamily: 'Poppins-Bold',
  },
  button: {
    zIndex: 1,
    fontFamily: 'Poppins-Bold',
  },
  name: {
    color: COLORS.white,
  },
  foldersList: {
    color: COLORS.white,
  },
});
