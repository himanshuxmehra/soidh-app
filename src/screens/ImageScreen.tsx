import { Dimensions, Image, ImageBackground, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'

import { StackNavigationProp } from '@react-navigation/stack';
import { RouteProp } from '@react-navigation/native';
import ButtonElement from '../elements/Button';

type ImageScreenNavigationProp = StackNavigationProp<RootStackParamList, 'FolderDetails'>;
type ImageScreenRouteProp = RouteProp<RootStackParamList, 'ImageScreen'>;


interface ImageScreenProps {
    navigation: ImageScreenNavigationProp;
    route: ImageScreenRouteProp;
}

const ImageScreen: React.FC<ImageScreenProps> = ({ navigation, route }) => {
    const { imageUrl } = route.params;
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
                    <ButtonElement title='Back' />
                </TouchableOpacity>
                <View style={styles.imageContainer}>
                    <Image
                        style={styles.image}
                        source={{ uri: imageUrl }} />
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
        alignItems:'center',
    },
    imageContainer: {
        width: windowWidth-20,
        height: windowHeight-100,
        justifyContent: 'center',
        padding: 5,
        alignItems:'center',
    },

    image: {
        flex: 1,
        resizeMode: 'contain',
        width: '100%',
        justifyContent: 'center',
    }
})