import { SafeAreaView, StyleSheet, Text, View, Alert } from 'react-native'
import React, { useEffect, useState } from 'react'
import { getFolders } from '../services/api'
import { Button } from 'react-native-elements'


interface FoldersListProps {
  jwtToken: string
}

const FoldersList: React.FC<FoldersListProps> = ({ jwtToken }) => {
  const [folders, setFolders] = useState([]);
  console.log(jwtToken)
  const token = jwtToken;
  const accountId = '1'
  useEffect(() => {
    const fetchFolder = async () => {
      try {
        const response = await getFolders(accountId, token);

        // Handle the response as needed
        if (response.success) {
          setFolders(response.data.folders);
          console.log("Folders got in response",folders)
        } else {
          Alert.alert('Error', response.message || 'An error occurred while fetching folders.');
        }
      } catch (error) {
        console.error('Error in get-folders call:', error);
        Alert.alert('Error', 'An error occurred while fetching folders.');
      }
    };
    fetchFolder();
  }, [])

  
  return (
    <View>
      <Text style={[styles.darkText]}>{token}</Text>

      <Text style={[styles.darkText]}>FoldersList</Text>
      {folders ? folders.map((folder:any) => { return <Text key={folder.id} style={[styles.darkText]}>{folder.id} - {folder.folder_name}</Text> }) : <Text style={[styles.darkText]}>no folders</Text>}

      <View style={
        {
          marginVertical:10,
          borderTopColor: '#00FFFF',
          borderWidth: 10,
          height:0
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
})