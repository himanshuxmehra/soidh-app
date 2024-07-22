// components/MediaPicker.tsx
import React, {useState} from 'react';
import {
  View,
  Button,
  Image,
  FlatList,
  StyleSheet,
  TouchableOpacity,
  Text,
  Alert,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';

import RNFS from 'react-native-fs';
import {COLORS} from '../constants/theme';
import Toast from 'react-native-toast-message';

interface MediaPickerProps {
  onMediaSelected: (media: string[]) => void;
}

const MediaPicker: React.FC<MediaPickerProps> = ({onMediaSelected}) => {
  const [selectedMedia, setSelectedMedia] = useState<string[]>([]);
  const [displaySelectedMedia, setDisplaySelectedMedia] = useState<string[]>(
    [],
  );
  const [isUploading, setIsUploading] = useState<boolean>(false);

  const openImagePicker = () => {
    setIsUploading(!isUploading);

    const options: any = {
      mediaType: 'mixed', // 'photo' or 'video' or 'mixed'
      quality: 1,
      noData: true,
      videoQuality: 'high',
      includeExtra: true,
    };

    launchImageLibrary(options, response => {
      console.log(response);
      if (response.didCancel) {
        console.log('Image picker cancelled');
        Toast.show({
          type: 'error',
          text1: 'Oops!',
          text2: 'Image picker cancelled',
        });
      } else if (response.errorMessage) {
        console.log('Image picker error:', response.errorMessage);
      } else {
        let len = response.assets?.length || 0;
        if (len > 0) {
          let pickedUp: any[] = response?.assets || [];
          for (var i = 0; i < pickedUp.length; i++) {
            const image = pickedUp[i];

            // Display selected media
            setSelectedMedia([...selectedMedia, image]);
            setDisplaySelectedMedia([...selectedMedia, image]);
            // You can save the file locally using RNFS if needed
            // For example, to save an image:
            // RNFS.copyFile(path, RNFS.DocumentDirectoryPath + '/selectedImage.jpg');
          }
        }
      }
    });
  };

  const renderSelectedMedia = ({item, index}: {item: any; index: number}) => {
    return (
      <Image
        key={index}
        source={{uri: item.uri}}
        style={{width: 100, height: 100, margin: 5}}
      />
    );
  };

  const clearPicker = () => {
    setDisplaySelectedMedia([]);
  };
  const handleDone = () => {
    setIsUploading(!isUploading);
    // Pass the selected media to the parent component
    if (selectedMedia.length != 0) {
      let uploadCheck = onMediaSelected(selectedMedia);
      console.log(
        '------------------------------------------------------',
        displaySelectedMedia,
        '------------------------------------------------------',
        selectedMedia,
      );
      if (uploadCheck) {
        // setDisplaySelectedMedia([]);
        // setSelectedMedia([]);
      }
      console.log(
        '------------------------------------------------------',
        displaySelectedMedia,
        '------------------------------------------------------',
        selectedMedia,
      );
    } else {
      Alert.alert('Error', 'Please select atleast 1 media');
    }
    // setSelectedMedia([]);
  };

  return (
    <View style={{width: '67%', alignSelf: 'center'}}>
      <View style={styles.uploadButtonsContainer}>
        <TouchableOpacity style={styles.uploadButton} onPress={handleDone}>
          <Text style={styles.buttonText}>Upload</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.uploadButton} onPress={openImagePicker}>
          <Text style={styles.buttonText}>Open Gallery</Text>
        </TouchableOpacity>
      </View>

      <FlatList
        data={displaySelectedMedia}
        keyExtractor={item => item}
        renderItem={renderSelectedMedia}
        horizontal
      />
    </View>
  );
};

export default MediaPicker;

const styles = StyleSheet.create({
  uploadButtonsContainer: {
    // flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
  },
  uploadButton: {
    borderRadius: 100,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: COLORS.primary,
    marginVertical: 2,
    width: '49%',
  },
  buttonText: {
    color: COLORS.white,
    textAlign: 'center',
    fontSize: 12,
  },
});
