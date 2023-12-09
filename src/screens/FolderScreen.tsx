import { Text, View, TouchableOpacity, ScrollView, Image, Alert, StyleSheet, TouchableWithoutFeedback } from 'react-native'
import React, { useState, useEffect } from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Button } from 'react-native-elements';
import MediaPicker from '../components/MediaPicker';
import { uploadMedia, getMedia, BASE_URL, getFolderDetails } from '../services/api';

import v4 from 'react-native-uuid';
import { FlatList } from 'react-native-gesture-handler';
import AddUsers from '../components/AddUsers';

type FolderScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FolderDetails'>;
type FolderScreenRouteProp = RouteProp<RootStackParamList, 'FolderDetails'>;


interface FolderScreenProps {
    navigation: FolderScreenNavigationProp;
    route: FolderScreenRouteProp;
}

const FolderScreen: React.FC<FolderScreenProps> = ({ navigation, route }) => {
    const { folder_id, jwtToken } = route.params;
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [mediaFiles, setMediaFiles] = useState<string[]>([]);
    const [folderDetails, setFolderDetails] = useState({
        folder_name: 'Folder Name',
        folder_id: 'Folder Id',
        privacy: true
    });

    useEffect(() => {
        async function fetchMedia(folder_id: string, accountId: string) {
            const response = await getMedia(accountId, folder_id, jwtToken);
            if (response.success) {
                setMediaFiles(response.data.media);
                console.log("media got in response", mediaFiles)
            } else {
                Alert.alert('Error', response.message || 'An error occurred while fetching meida.');
            }

            const responseFolder = await getFolderDetails(accountId, folder_id, jwtToken);
            if (responseFolder.success) {
                setFolderDetails(responseFolder.data.folder[0]);
                console.log("folder details got in response", responseFolder)
            } else {
                Alert.alert('Error', responseFolder.message || 'An error occurred while fetching meida.');
            }
        }
        fetchMedia(folder_id, '1');
    }, []);

    const handleMediaSelected = async (selectedMedia: string[]) => {
        // Do something with the selected media (e.g., save to state, upload to server, etc.)
        setSelectedImages(selectedMedia);
        for (var i = 0; i < selectedImages.length; i++) {
            const image = selectedImages[i];
            console.log('1', jwtToken, folder_id, image)
            // Generate a UUID for the folder
            const imageId = v4.v4();
            const data = new FormData();
            data.append("accountId", '1')
            data.append("folderId", folder_id)
            data.append("imageId", imageId)
            const newImageUri = "file:///" + image.uri.split("file:/").join("");
            data.append("image", {
                uri: newImageUri,
                name: 'test.png',
                type: 'image/png'
            });
            const response = await uploadMedia(data, jwtToken);
            if (response.success) {
                console.log('reponse data', response.data.media)
                const res = [...mediaFiles, ...response.data.media]
                setMediaFiles(res);
                console.log('media files:: ', mediaFiles);
            }
        }
        console.log('Selected Media:', selectedMedia);
    };

    const loadMedia = (media: any) => {

        media = media.item
        return <TouchableOpacity onPress={() => {
            //   navigation.push('FolderDetails', {
            //     folder_id: folder.folder_id,
            //     jwtToken: jwtToken
            //   })
        }}>
            <Text key={media.id} style={[styles.darkText]}>
                {media.id}</Text>

            <Image source={{ uri: BASE_URL + `/uploads/${media.account_id}/${media.folder_id}/${media.image_id}.png` }} style={{ width: 125, height: 100, margin: 5 }} />
        </TouchableOpacity>
    }
    return (
        <>
            <View style={styles.headerContainer}>
                <Text style={styles.folderName}>{folderDetails.folder_name}</Text>
                <Text style={styles.folderId}>{folderDetails.folder_id}</Text>
                <Text style={styles.privacy}>{folderDetails.privacy ? <Text>Private</Text> : <Text>Public</Text>}</Text>
            </View>
            <AddUsers/>
            <MediaPicker onMediaSelected={handleMediaSelected} />
            <FlatList
                style={styles.gallery}
                data={mediaFiles}
                horizontal={false}
                numColumns={3}
                renderItem={loadMedia}
                contentContainerStyle={{paddingBottom:100}} 
            />
        </>
    )
}


export default FolderScreen

const styles = StyleSheet.create({
    darkText: {
        color: '#000',
    },
    headerContainer: {
        width: '100%',
        alignItems: 'center',
        paddingTop: 20,
        paddingBottom: 10,
        backgroundColor: '#FFCCD5',
        alignSelf: 'center'
    },
    folderName: {
        color: '#590D22',
        fontSize: 24,
        fontWeight: '800',
        paddingBottom: 5,
    },
    folderId: {
        color: '#C9184A',
        fontSize: 14,
        fontWeight: '700',
        paddingBottom: 5,
    },
    privacy: {
        color: '#C9184A',
        fontSize: 12,
        fontWeight: '700',
    },
    gallery: {
        alignSelf: 'center',
        paddingBottom: 15
    }
})