import { Text, View, TouchableOpacity, Image, Alert, StyleSheet, ActivityIndicator, FlatList, ScrollView, ImageBackground, Dimensions, Switch, Button, TextInput, Keyboard } from 'react-native'
import React, { useState, useEffect, useRef, useMemo, useCallback } from 'react'
import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import MediaPicker from '../components/MediaPicker';
import { uploadMedia, getMedia, BASE_URL, getFolderDetails, shareFolder } from '../services/api';

import v4 from 'react-native-uuid';
import AddUsers from '../components/AddUsers';
import { useAuthentication } from '../services/AuthenticationContext';
import Toast from 'react-native-toast-message';
import { COLORS, SIZES } from '../constants/theme';
import { MasonryFlashList } from '@shopify/flash-list';
import FastImage from 'react-native-fast-image';
import Animated, { FadeIn, FadeInUp } from 'react-native-reanimated';
import BottomSheet from '@gorhom/bottom-sheet';
import ButtonElement from '../elements/Button';

type FolderScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FolderDetails'>;
type FolderScreenRouteProp = RouteProp<RootStackParamList, 'FolderDetails'>;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

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
        console.log(folder_id)
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
            } else {
                Toast.show({
                    type: 'error',
                    text1: 'Oops!',
                    text2: 'Media upload failed🥺'
                });
                // return false;
            }
        }
        console.log('Selected Media:', selectedMedia);
        setLoading(false);
        return true;
    };

    let [height, setHeightState] = useState<number>(200);
    let [width, setWidthState] = useState<number>(300);


    const loadMedia = (media: any) => {

        media = media.item
        let imageUrl = `${BASE_URL}/uploads/${media.account_id}/${media.folder_id}/${media.image_id}.png`;

        Image.getSize(imageUrl, (width, height) => {
            setWidthState(width);
            setHeightState(height);
        });
        const headers = {
            Authorization: `Bearer ${jwtToken}`,
        };
        return <TouchableOpacity onPress={() => {
            navigation.navigate('ImageScreen', {
                imageUrl: imageUrl,
                imageId: media.image_id,
                jwtToken: jwtToken,
            })

        }}
        onLongPress={() => {
            console.log('Long Press')
        }}
        delayLongPress={1000}
            style={{

            }}
        >
            {/* <Text key={media.id} style={[styles.mediaName]}>
                {media.id}</Text> */}
            <Animated.View entering={FadeInUp.duration(500).delay(200)}>
                <Animated.View style={{
                    width: '100%',
                    height: (height * (width / height)),
                }}
                    sharedTransitionTag={`${media.image_id}`}>
                    <FastImage
                        source={{
                            uri: imageUrl,
                            headers: headers,
                            priority: FastImage.priority.normal,
                        }}
                        resizeMode={FastImage.resizeMode.cover}
                        style={{
                            width: '100%',
                            height: (height * (width / height)),
                        }} />
                </Animated.View>
            </Animated.View>
        </TouchableOpacity>
    }
    //---bottom sheet---

    const bottomSheetRef = useRef<BottomSheet>(null);
    const handleSubmitForm = async () => {
        // Replace this with your API call logic
        const phoneNumber = phone;
        const canEdit = permission;

        const response = await shareFolder(phoneNumber, folder_id, canEdit, jwtToken);
        if (response.success) {
            console.log("got in response", response.data);
            Toast.show({
                type: 'success',
                text1: 'hurray!',
                text2: 'successfully shared👋'
            });
            Keyboard.dismiss();
            bottomSheetRef.current?.close();


        } else {
            Alert.alert('Error', response.message || 'An error occurred while sharing folder.');
            Toast.show({
                type: 'error',
                text1: 'oops!',
                text2: 'sharing failed🥺'
            });
        }
        console.log('Form Data Submitted', response);
    };

    // ref

    // variables
    const snapPoints = useMemo(() => ['25%', '50%'], []);

    const handleOpenModal = () => {
        bottomSheetRef.current?.expand();
    };

    const handleCloseModal = () => {
        Keyboard.dismiss();
        bottomSheetRef.current?.close();
    };
    // callbacks
    const handleSheetChanges = useCallback((index: number) => {
        console.log('handleSheetChanges', index);
    }, []);
    const [phone, setPhone] = useState(7);
    const [permission, setPermission] = useState(false);
    return (
        <>
            <View style={styles.headerContainer}>
                <Text style={styles.folderName}>{folderDetails.folder_name}</Text>
                <Text style={styles.folderId}>{folderDetails.folder_id}</Text>
                <Text style={styles.privacy}>{folderDetails.privacy ? <Text>Private</Text> : <Text>Public</Text>}</Text>
            </View>
            {canEdit ?
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ width: '33%' }}>
                        <TouchableOpacity onPress={handleOpenModal}>
                            <View style={styles.addButton}>

                                <Text style={styles.buttonText}>Share with</Text>
                            </View>
                        </TouchableOpacity>
                    </View>
                    <MediaPicker onMediaSelected={handleMediaSelected} />
                </View>
                : <>
                </>}
            {loading && <ActivityIndicator style={styles.loader} />}

            {/* <FlatList
                style={styles.gallery}
                data={mediaFiles}
                horizontal={false}
                numColumns={3}
                renderItem={loadMedia}
                contentContainerStyle={{ paddingBottom: 100 }}
            /> */}


            <MasonryFlashList
                style={styles.gallery}
                data={mediaFiles}
                numColumns={2}
                renderItem={loadMedia}
                estimatedItemSize={200}
            />
            <BottomSheet
                ref={bottomSheetRef}
                index={-1}
                snapPoints={snapPoints}
                onChange={handleSheetChanges}
                enablePanDownToClose={true}
            >

                <View style={styles.contentContainer}>
                    <Text style={{ color: COLORS.secondary, fontSize: SIZES.h4 }}>Enter the phone number with you want to share 🎉</Text>
                    <View style={styles.centeredView}>
                        <View style={styles.modalView}>
                            <View>
                                <Text style={{ color: COLORS.primary, fontSize: SIZES.h4 }}>Share with:</Text>
                                <TextInput
                                    style={styles.input}
                                    value={phone}
                                    onChangeText={(text) => setPhone(text)}
                                />
                            </View>
                            <View style={styles.permissionInput}>
                                <Text style={styles.allowEditText}>Allow editing:</Text>
                                <Switch style={{

                                }}
                                    value={permission} onValueChange={() => setPermission(!permission)} />
                            </View>
                            <View style={{ paddingTop: 10, flexDirection: 'row', justifyContent: 'space-evenly' }}>
                                <TouchableOpacity style={styles.actionButtons} onPress={handleSubmitForm}>
                                    <ButtonElement title="Submit" />
                                </TouchableOpacity>
                                <TouchableOpacity style={styles.actionButtons} onPress={handleCloseModal}>
                                    <ButtonElement title="Close" />
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </View>
            </BottomSheet>
        </>
    )
}


export default FolderScreen

const styles = StyleSheet.create({
    mediaName: {
        color: COLORS.grey,
        marginBottom: -15
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
        flex: 1,
        width: '100%',
    },
    loader: {
        marginTop: 20,
    }, addButton: {
        borderRadius: 100,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: COLORS.primary,
        marginVertical: 2,
        width: '100%'
    },
    buttonText: {
        color: COLORS.white,
        textAlign: 'center',
        fontSize: 12,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    centeredView: {
        justifyContent: "center",
        alignSelf: "center",
        width: '100%'
    },
    input: {
        height: 40,
        borderColor: COLORS.primary,
        borderBottomWidth: 1,
        marginBottom: 10,
        width: '100%',
    },
    permissionInput: {
        color: '#000',
        paddingVertical: 10,
        flexDirection: 'row',
        justifyContent: 'space-between'
    },
    allowEditText: {
        color: COLORS.primary,
        fontSize: SIZES.h4,
    },
    modalView: {
        marginHorizontal: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        paddingVertical: 10,
        width: '90%'
    },
    actionButtons: {
        width: '30%',
        paddingTop: 5,
    }
})