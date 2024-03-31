import { Dimensions, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Camera, PhotoFile, useCameraDevice, useCameraPermission, useMicrophonePermission } from 'react-native-vision-camera'
import { COLORS } from '../constants/theme'
import { useIsFocused } from '@react-navigation/native'
import { Image } from 'react-native-elements'
import { uploadMedia } from '../services/api'
import Toast from 'react-native-toast-message'
import { useAuthentication } from '../services/AuthenticationContext'
import v4 from 'react-native-uuid';
import SelectFolder from '../components/SelectFolder'

const CameraScreen = () => {
    const device = useCameraDevice('back');
    const requestCPermission = useCameraPermission().requestPermission;
    const { accountId, jwtToken }: any = useAuthentication();
    const [selectedFoler, setSelectedFolder] = useState({});

    const requestMPermission = useMicrophonePermission().requestPermission;
    const hasMPermission = useMicrophonePermission().hasPermission;
    useEffect(() => {
        const cameraPermission = Camera.getCameraPermissionStatus()
        const microphonePermission = Camera.getMicrophonePermissionStatus()
        if (cameraPermission != 'granted')
            requestCPermission();
        if (microphonePermission != 'granted')
            requestMPermission();
    })
    const camera = useRef<Camera>(null);
    let [photo, setPhoto] = useState<PhotoFile>();
    const onTakePhotoButton = async () => {
        try {
            if(!selectedFoler.folder_id){
                Toast.show({
                    type: 'error',
                    text1: 'Oops!',
                    text2: 'Select a folder to upload'
                });
            }
            const photoTaken = await camera.current?.takePhoto();
            setPhoto(photoTaken);
            console.log(photo);
            const imageId = v4.v4();
            const data = new FormData();
            data.append("accountId", accountId);
            data.append("folderId", selectedFoler.folder_id);
            data.append("imageId", imageId);
            const newImageUri = "file:///" + photo?.path.split("file:/").join("");
            data.append("image", {
                uri: newImageUri,
                name: 'test.png',
                type: 'image/png'
            });
            const response = await uploadMedia(data, jwtToken);
            if (response.success) {
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
        catch (err) {
            console.log(err);
        }
    }
    const isFocused = useIsFocused();
    const isActive = isFocused;
    return (
        <View style={{ backgroundColor: COLORS.secondary, height: Dimensions.get('window').height, }}>
            {/* <Text style={{ color: COLORS.white, position: 'relative', zIndex: 2, }}>CameraScreen</Text> */}
            {/* {
                photo ? <Image source={{ uri: photo.path }} style={{ zIndex: 1, height: 100, width: 100 }} /> : <></>
            } */}
            {device != null ?
                <Camera
                    ref={camera}
                    style={styles.Camera}
                    device={device}
                    isActive={isActive}
                    photo={true}
                    video={true}
                    audio={hasMPermission}
                />
                :
                <Text style={{ color: COLORS.white }}>failed</Text>
            }
            <TouchableOpacity
                onPress={onTakePhotoButton}
                style={{
                    width: 75,
                    height: 75,
                    position: 'absolute',
                    zIndex: 1,
                    // backgroundColor: COLORS.lightGrey,
                    borderRadius: 75,
                    borderColor: COLORS.secondary,
                    borderWidth: 10,
                    alignSelf: 'center',
                    justifyContent: 'center',
                    bottom: 82,
                }}
            >
                <View
                    style={{
                        width: 25,
                        height: 25,
                        position: 'absolute',
                        backgroundColor: COLORS.secondary,
                        borderRadius: 30,
                        borderColor: COLORS.white,
                        borderWidth: 10,
                        alignSelf: 'center',
                    }}>
                </View>
            </TouchableOpacity>
            <SelectFolder selectedFolder={selectedFoler} setSelectedFolder={setSelectedFolder}/>
        </View>
    )
}

export default CameraScreen

const styles = StyleSheet.create({
    Camera: {
        height: Dimensions.get('window').height - 80,
        width: Dimensions.get('window').width,
        zIndex: -1,
    }

})