import { SafeAreaView, ImageBackground, StyleSheet, Text, View, Alert, TouchableOpacity, FlatList, Image } from 'react-native'
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
    <View style={{
    }}>
      {/* <Text style={[styles.darkText]}>{token}</Text> */}
      <Text style={[styles.folderText]}>Your Folders:</Text>
      <View style={styles.folderList}>

        {folders ?
          folders.map((folder: any) => {
            return <TouchableOpacity style={styles.folderListTab} key={folder.id} onPress={() => {
              navigation.push('FolderDetails', {
                folder_id: folder.folder_id,
                canEdit: true,
                jwtToken: jwtToken
              })
            }}>
              <ImageBackground
                style={{ flex: 1, width: '100%' }}
                source={require('../../assets/foldericon.png')}
                blurRadius={0}>
                <Text style={[styles.folderListTabText]}>
                  {folder.folder_name}</Text>
              </ImageBackground>
            </TouchableOpacity>
          }) : <Text style={[styles.darkText]}>
            no folders
          </Text>}
      </View>

      <Text style={[styles.folderText]}>Shared with me</Text>

      <View style={styles.folderList}>
        {sharedfolders ? sharedfolders.map((folder: any) => {
          return <TouchableOpacity style={styles.folderListTab} key={folder.id} onPress={() => {
            navigation.push('FolderDetails', {
              folder_id: folder.folder_id,
              canEdit: folder.canEdit,
              jwtToken: jwtToken
            })
          }}>
            <ImageBackground
              style={{ flex: 1, width: '100%' }}
              source={require('../../assets/foldericon.png')}
              blurRadius={0}>
              <Text style={[styles.folderListTabText]}>
                {folder.folder_name}</Text>
            </ImageBackground>
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
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  folderText: {
    paddingLeft: 20,
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: '#C9184A',
  },
  folderListTab: {
    marginTop: 5,
    padding: 10,
    backgroundColor: '#FFCCD5',
    borderRadius: 15,
    marginHorizontal: 5,
    width: '30%',
  },
  folderListTabText: {
    color: '#A4133C',
    padding: 10,
    fontWeight: '600',
    paddingVertical: 30
  },
})