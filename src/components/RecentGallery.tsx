import { Alert, StyleSheet, Text, View, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { Image } from 'react-native-elements'

export const BASE_URL = 'http://10.0.2.2:3333'; // API URL

interface RecentGalleryProps {
    jwtToken: string
    navigation: any
    phoneNumber: number
    accountId: string
}

const RecentGallery: React.FC<RecentGalleryProps> = ({ navigation, jwtToken, phoneNumber, accountId }) => {
    const [folders, setFolders] = useState([]);
    const [mediaFiles, setMediaThumbnail] = useState<{}>({});


    useEffect(() => {
        const fetchFolder = async () => {
            const response = await getRecentMedia(accountId, token);

            // Handle the response as needed
            if (response.success) {
                setFolders(response.data.folders);
                console.log("Folders got in response", folders)
            } else {
                Alert.alert('Error', response.message || 'An error occurred while fetching folders.');
            }
        };
        fetchFolder();
    }, [])


    return (
        <View>
            <Text>RecentGallery</Text>
            <FlatList
                data={folders}
                horizontal={false}
                numColumns={2}
                renderItem={({ item, index }) => (
                    <TouchableOpacity
                        key={index}
                        onPress={() =>
                            navigation.push('ImageScreen', {
                                imageUrl: `${BASE_URL}/uploads/${item.account_id}/${item.folder_id}/${item.image_id}.png`
                            })
                        }>
                        <Image source={{ uri: BASE_URL + `/uploads/${item.account_id}/${item.folder_id}/${item.image_id}.png` }} style={{ width: 125, height: 100, margin: 5 }} />

                        <Text style={styles.whitetext}></Text>

                    </TouchableOpacity>
                )}
            />
        </View>
    )
}

export default RecentGallery

const styles = StyleSheet.create({
    image: {
        height: 200,
        borderRadius: 22,
        left: 0,
        marginHorizontal: 10,
        width: 200,
    },
    whitetext: {
        color: 'white',
    },
    containerGallery: {
        flex: 1,
        flexDirection: 'row',
    },
})