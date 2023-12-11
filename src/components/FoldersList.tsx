import { SafeAreaView, StyleSheet, Text, View, Alert, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getFolders, getSharedFolders } from '../services/api'
import { useNavigation } from '@react-navigation/native';


interface FoldersListProps {
  jwtToken: string
  navigation: any
  phoneNumber: number
  accountId: string
}

const FoldersList: React.FC<FoldersListProps> = ({ navigation, jwtToken, phoneNumber, accountId }) => {
  const [folders, setFolders] = useState([]);
  const [sharedfolders, setSharedFolders] = useState([]);

  const token = jwtToken;

  useEffect(() => {
    const fetchFolder = async () => {
        const response = await getFolders(accountId, token);

        // Handle the response as needed
        if (response.success) {
          setFolders(response.data.folders);
          console.log("Folders got in response", folders)
        } else {
          Alert.alert('Error', response.message || 'An error occurred while fetching folders.');
        }

        const response2 = await getSharedFolders(phoneNumber, token);

        // Handle the response as needed
        if (response2.success) {
          setSharedFolders(response2.data.folders);
          console.log("Folders got in response", folders)
        } else {
          Alert.alert('Error', response2.message || 'An error occurred while fetching shared folders.');
        }

    };
    fetchFolder();
  }, [])

  return (
    <View>
      {/* <Text style={[styles.darkText]}>{token}</Text> */}
      <View style={styles.folderList}>
        <Text style={[styles.folderText]}>FoldersList</Text>
        {folders ? folders.map((folder: any) => {
          return <TouchableOpacity key={folder.id} onPress={() => {
            navigation.push('FolderDetails', {
              folder_id: folder.folder_id,
              canEdit: true,
              jwtToken: jwtToken
            })
          }}>
            <View key={folder.id} style={styles.folderListTab}>
              <Text style={[styles.folderListTabText]}>
                {folder.id} - {folder.folder_name}</Text>
            </View>
          </TouchableOpacity>
        }) : <Text style={[styles.darkText]}>
          no folders
        </Text>}
      </View>
      <View style={styles.folderList}>
        <Text style={[styles.folderText]}>Shared with me</Text>
        {sharedfolders ? sharedfolders.map((folder: any) => {
          return <TouchableOpacity key={folder.id} onPress={() => {
            navigation.push('FolderDetails', {
              folder_id: folder.folder_id,
              canEdit: folder.canEdit,
              jwtToken: jwtToken
            })
          }}>
            <View key={folder.id} style={styles.folderListTab}>
              <Text style={[styles.folderListTabText]}>
                {folder.id} - {folder.folder_id}</Text>
            </View>

          </TouchableOpacity>
        }) : <Text style={[styles.darkText]}>
          no folders
        </Text>}
      </View>


      <View style={
        {
          marginVertical: 10,
          borderTopColor: '#00FFFF',
          borderWidth: 10,
          height: 0
        }
      }>
      </View>
    </View>
  )
}

export default FoldersList

const styles = StyleSheet.create({
  darkText: {
    color: '#000',
  },
  folderList: {
    paddingHorizontal: 10,
    paddingVertical: 10,
  },
  folderText: {
    paddingLeft: 20,
    fontSize: 18,
    color: '#C9184A'
  },
  folderListTab: {
    marginTop: 5,
    paddingHorizontal: 10,
    paddingVertical: 10,
    backgroundColor: '#FFCCD5',
    borderRadius: 15,
  },
  folderListTabText: {
    color: '#A4133C',
    fontWeight: '600',
  },
})