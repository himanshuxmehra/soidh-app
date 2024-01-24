import { Dimensions, Image, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import ButtonElement from '../elements/Button';
import FastImage from 'react-native-fast-image';

type ImageScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FolderDetails'>;
type ImageScreenRouteProp = RouteProp<RootStackParamList, 'ImageScreen'>;


interface ImageScreenProps {
    navigation: ImageScreenNavigationProp;
    route: ImageScreenRouteProp;
}

const ImageScreen: React.FC<ImageScreenProps> = ({ navigation, route }) => {
    const { imageUrl, jwtToken } = route.params;
    console.log(route);
    return (
        <ImageBackground
            style={{ flex: 1, width: '100%' }}
            source={{ uri: imageUrl }}
            blurRadius={50}>
            <View style={styles.container}>
                <TouchableOpacity onPress={() => {
                    navigation.goBack();
                }}>
                    <ButtonElement title=' X ' />
                </TouchableOpacity>
                <View style={styles.imageContainer}>

                    <FastImage
                        source={{
                            uri: imageUrl,
                            headers: { Authorization: `bearer ${jwtToken}` },
                            priority: FastImage.priority.normal,
                        }}
                        style={styles.image}
                    />
                </View>
            </View>

        </ImageBackground>

    )
}
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default ImageScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'flex-end',
    },
    imageContainer: {
        paddingHorizontal: 20,
        marginTop: 0,
        alignSelf: 'center',
    },

    image: {
        width: windowWidth - 20,
        height: windowHeight,
        alignSelf: 'center',
    }
})