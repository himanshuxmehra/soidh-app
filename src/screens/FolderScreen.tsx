import { Text, View, TouchableOpacity, ScrollView, Image } from 'react-native'
import React, { useState } from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import { Button } from 'react-native-elements';
import MediaPicker from '../components/MediaPicker';
import { uploadMedia } from '../services/api';

type FolderScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FolderDetails'>;
type FolderScreenRouteProp = RouteProp<RootStackParamList, 'FolderDetails'>;


interface FolderScreenProps {
    navigation: FolderScreenNavigationProp;
    route: FolderScreenRouteProp;
}

const FolderScreen: React.FC<FolderScreenProps> = ({ navigation, route }) => {
    const { folder_id, jwtToken } = route.params;
    const [selectedImages, setSelectedImages] = useState<string[]>([]);

    const handleMediaSelected = async (selectedMedia: string[]) => {
        // Do something with the selected media (e.g., save to state, upload to server, etc.)
        setSelectedImages(selectedMedia);
        for (var i = 0; i < selectedImages.length; i++) {
            const image = selectedImages[i];
            console.log('1', jwtToken, folder_id, image)
            const data = new FormData();
            data.append("accountId", '1')
            data.append("folderId", folder_id)
            data.append('Content-Type', 'image/png');
            const newImageUri =  "file:///" + image.uri.split("file:/").join("");
            data.append("image", {
                uri: newImageUri,
                name: 'test.png',
                type: 'image/png'
            });
            const response = await uploadMedia(data, jwtToken);
            console.log(response);
        }

        console.log('Selected Media:', selectedMedia);
    };
    return (
        <View>
            <Text>FolderScreen</Text>
            <Text>{folder_id}</Text>
            <View style={{
                borderColor: '#00FFFF',
                height: 100,
            }}></View>
            <TouchableOpacity>
                <Button title="+" style={{
                    height: 50
                }} />
            </TouchableOpacity>
            <MediaPicker onMediaSelected={handleMediaSelected} />

        </View>
    )
}


export default FolderScreen