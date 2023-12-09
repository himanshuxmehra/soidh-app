// components/MediaPicker.tsx
import React, { useState } from 'react';
import { View, Button, Image, FlatList, StyleSheet, TouchableOpacity, Text, Alert } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

import RNFS from 'react-native-fs';

interface MediaPickerProps {
  onMediaSelected: (media: string[]) => void;
}

const MediaPicker: React.FC<MediaPickerProps> = ({ onMediaSelected }) => {
  const [selectedMedia, setSelectedMedia] = useState<string[]>([]);
  const [displaySelectedMedia, setDisplaySelectedMedia] = useState<string[]>([]);

  const openImagePicker = () => {
    const options: any = {
      mediaType: 'mixed', // 'photo' or 'video' or 'mixed'
      quality: 1,
      noData: true,
    };

    launchImageLibrary(options, (response) => {
      console.log(response)
      if (response.didCancel) {
        console.log('Image picker cancelled');
      } else if (response.errorMessage) {
        console.log('Image picker error:', response.errorMessage);
      } else {
        let len = response.assets?.length || 0
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

  const renderSelectedMedia = ({ item }: { item: any }) => {
    return <Image source={{ uri: item.uri }} style={{ width: 100, height: 100, margin: 5 }} />;
  };

  const handleDone = () => {
    // Pass the selected media to the parent component
    if (selectedMedia.length != 0) {
      onMediaSelected(selectedMedia);
      setDisplaySelectedMedia([]);
    } else {
      Alert.alert('Error', 'Please select atleast 1 media');
    }
    // setSelectedMedia([]);
  };


  return (
    <View style={{ width: '100%' }}>
      <TouchableOpacity onPress={openImagePicker}>
        <View style={styles.uploadButton}>
          <Text style={styles.buttonText}>Open Gallery</Text>
        </View>
      </TouchableOpacity>
      <FlatList
        data={displaySelectedMedia}
        keyExtractor={(item) => item}
        renderItem={renderSelectedMedia}
        horizontal
      />
      <TouchableOpacity onPress={handleDone}>
        <View style={styles.uploadButton}>
          <Text style={styles.buttonText}>Upload</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default MediaPicker;

const styles = StyleSheet.create({
  uploadButton: {
    borderRadius: 20,
    width: '70%',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#c9184a',
    margin: 5,
    alignSelf: 'center'
  },
  buttonText: {
    color: '#fff0f3'
  }
})