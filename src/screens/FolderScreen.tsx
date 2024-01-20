import { Text, View, TouchableOpacity, Image, Alert, StyleSheet, ActivityIndicator } from 'react-native'
import React, { useState, useEffect } from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import MediaPicker from '../components/MediaPicker';
import { uploadMedia, getMedia, BASE_URL, getFolderDetails } from '../services/api';

import v4 from 'react-native-uuid';
import { FlatList } from 'react-native-gesture-handler';
import AddUsers from '../components/AddUsers';
import { useAuthentication } from '../services/AuthenticationContext';
import Toast from 'react-native-toast-message';
import { COLORS } from '../constants/theme';

type FolderScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FolderDetails'>;
type FolderScreenRouteProp = RouteProp<RootStackParamList, 'FolderDetails'>;


interface FolderScreenProps {
    navigation: FolderScreenNavigationProp;
    route: FolderScreenRouteProp;
}

const FolderScreen: React.FC<FolderScreenProps> = ({ navigation, route }) => {
    const { folder_id, jwtToken, canEdit } = route.params;
    const [selectedImages, setSelectedImages] = useState<string[]>([]);
    const [mediaFiles, setMediaFiles] = useState<string[]>([]);
    const [folderDetails, setFolderDetails] = useState({
        folder_name: 'Folder Name',
        folder_id: 'Folder Id',
        privacy: true
    });
    const [loading, setLoading] = useState(false);
    const { accountId }: any = useAuthentication();



    useEffect(() => {
        async function fetchMedia(folder_id: string, accountId: string) {
            const response = await getMedia(accountId, folder_id, jwtToken);
            if (response.success) {
                setMediaFiles(response.data.media);
                console.log("media got in response", mediaFiles)
            } else {
                Alert.alert('Error', response.message || 'An error occurred while fetching meida.');
            }

            const responseFolder = await getFolderDetails(folder_id, jwtToken);
            if (responseFolder.success) {
                setFolderDetails(responseFolder.data.folder[0]);
                console.log("folder details got in response", responseFolder)
            } else {
                Alert.alert('Error', responseFolder.message || 'An error occurred while fetching meida.');
            }
        }
        fetchMedia(folder_id, accountId);
    }, []);

    const handleMediaSelected = async (selectedMedia: string[]): Promise<boolean> => {
        // Do something with the selected media (e.g., save to state, upload to server, etc.)
        setSelectedImages(selectedMedia);
        for (var i = 0; i < selectedImages.length; i++) {
            const image = selectedImages[i];
            console.log(accountId, jwtToken, folder_id, image)
            setLoading(true);

            // Generate a UUID for the folder
            const imageId = v4.v4();
            const data = new FormData();
            data.append("accountId", accountId)
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

                setLoading(false);

                console.log('reponse data', response.data.media)
                const res = [...mediaFiles, ...response.data.media]
                setMediaFiles(res);
                console.log('media files:: ', mediaFiles);
                Toast.show({
                    type: 'success',
                    text1: 'Hurray!',
                    text2: 'Media successfully uploaded👋'
                });
                // return true;
            }else{
                Toast.show({
                    type: 'danger',
                    text1: 'Oops!',
                    text2: 'Media upload failed👋'
                });
                // return false;
            }
        }
        console.log('Selected Media:', selectedMedia);
        setLoading(false);
        return true;
    };

    const loadMedia = (media: any) => {

        media = media.item
        return <TouchableOpacity onPress={() => {
            navigation.push('ImageScreen', {
                imageUrl: `${BASE_URL}/uploads/${media.account_id}/${media.folder_id}/${media.image_id}.png`
            })
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
            {canEdit ?
                <View style={{flexDirection:'row'}}>
                    <AddUsers jwtToken={jwtToken} folder_id={folder_id} />
                    <MediaPicker onMediaSelected={handleMediaSelected} />
                </View>
                : <>
                </>}
            {loading && <ActivityIndicator style={styles.loader} />}

            <FlatList
                style={styles.gallery}
                data={mediaFiles}
                horizontal={false}
                numColumns={3}
                renderItem={loadMedia}
                contentContainerStyle={{ paddingBottom: 100 }}
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
        backgroundColor: COLORS.secondary,
        alignSelf: 'center'
    },
    folderName: {
        color: COLORS.white,
        fontSize: 24,
        fontWeight: '800',
        paddingBottom: 5,
    },
    folderId: {
        color: COLORS.medBg,
        fontSize: 14,
        fontWeight: '700',
        paddingBottom: 5,
    },
    privacy: {
        color: COLORS.lightBg,
        fontSize: 12,
        fontWeight: '700',
    },
    gallery: {
        alignSelf: 'center',
        paddingBottom: 15
    },
    loader: {
        marginTop: 20,
    },
})