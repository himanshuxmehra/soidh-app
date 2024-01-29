import { SafeAreaView, ImageBackground, StyleSheet, Text, View, Alert, TouchableOpacity, FlatList, Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import { BASE_URL, getFolders, getMedia, getSharedFolders } from '../services/api'
import { useNavigation } from '@react-navigation/native';
import { COLORS } from '../constants/theme';


interface FoldersListProps {
  jwtToken: string
  navigation: any
  phoneNumber: number
  accountId: string
}

const FoldersList: React.FC<FoldersListProps> = ({ navigation, jwtToken, phoneNumber, accountId }) => {
  const [folders, setFolders] = useState([]);
  const [sharedfolders, setSharedFolders] = useState([]);
  const [mediaFiles, setMediaThumbnail] = useState<{}>({});

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

  const loadThumbnail = async (folder_id: string) => {
    const response3 = await getMedia(accountId, folder_id, jwtToken);
    if (response3.success) {
      setMediaThumbnail(response3.data.media[0]);
      console.log("fetching thumbnails:---", mediaFiles)
      return response3.data.media;
    } else {
      Alert.alert('Error', response3.message || 'An error occurred while fetching meida.');
    }
  }

  const loadMedia = (folder: any) => {

    folder = folder.item
    return <TouchableOpacity style={[styles.folderListTab]} key={folder.id} onPress={() => {
      navigation.push('FolderDetails', {
        folder_id: folder.folder_id,
        canEdit: true,
        jwtToken: jwtToken
      })
    }}>
      <ImageBackground
        style={{ flex: 1, width: '100%', }}
        source={{ 
          uri: BASE_URL + `/uploads/${folder.account_id}/${folder.folder_id}/${folder.image_id}.png`, 
          headers: { Authorization: `bearer ${jwtToken}` },
        
        }}
        blurRadius={5}>
        <Text style={[styles.folderListTabText]}>
          {folder.folder_name}</Text>
      </ImageBackground>
    </TouchableOpacity>
  }

  return (
    <View style={{
    }}>
      {/* <Text style={[styles.darkText]}>{token}</Text> */}
      <Text style={[styles.folderText]}>Your Folders</Text>
      <View style={styles.folderList}>

        {folders ?
          <FlatList
            style={styles.folderListTab}
            data={folders}
            horizontal={true}
            renderItem={loadMedia}
          // contentContainerStyle={{ paddingBottom: 100 }}
          />
          : <Text style={[styles.darkText]}>
            no folders
          </Text>}
      </View>

      {/* <Text style={[styles.folderText]}>Shared with me</Text>

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
              style={{ flex: 1, width: '100%', }}
              resizeMode='contain'
              source={require('../../assets/foldericon.png')}
              blurRadius={0}>
              <Text style={[styles.folderListTabText]}>
                {folder.folder_name}</Text>
            </ImageBackground>
          </TouchableOpacity>
        }) : <Text style={[styles.darkText]}>
          No Folders
        </Text>}



      </View> */}
{/*   <View style={
        {
          marginVertical: 10,
          borderTopColor: '#00FFFF',
          borderWidth: 10,
          height: 0
        }
      }>
      </View> */}
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
    // paddingVertical: 10,
    display: 'flex',
    flexDirection: 'row',
    flexWrap: 'wrap'
  },
  folderText: {
    paddingLeft: 20,
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: COLORS.primary,
  },
  folderListTab: {
    padding: 0,
    backgroundColor: COLORS.lightBg,
    marginRight: 0,
    width: 100,
    height: 128,
    // paddingRight: 8,
    borderRightWidth: 1,
  },
  folderListTabText: {
    color: COLORS.white,
    backgroundColor: 'rgba(0,0,0,0.3)',
    padding: 10,
    paddingVertical: 30,
    fontSize: 18,
    fontFamily: 'Poppins-Light',
    height:'100%',
  },
})