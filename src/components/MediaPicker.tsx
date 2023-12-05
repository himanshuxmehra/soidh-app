// components/MediaPicker.tsx
import React, { useState } from 'react';
import { View, Button, Image, FlatList } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

import RNFS from 'react-native-fs';

interface MediaPickerProps {
  onMediaSelected: (media: string[]) => void;
}

const MediaPicker: React.FC<MediaPickerProps> = ({ onMediaSelected }) => {
  const [selectedMedia, setSelectedMedia] = useState<string[]>([]);

  const openImagePicker = () => {
    const options = {
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
          let pickedUp:any[] = response?.assets || [];
          for (var i = 0; i < pickedUp.length; i++) {
            const image = pickedUp[i];

            // Display selected media
            setSelectedMedia([...selectedMedia, image]);

            // You can save the file locally using RNFS if needed
            // For example, to save an image:
            // RNFS.copyFile(path, RNFS.DocumentDirectoryPath + '/selectedImage.jpg');
          }
        }
      }
    });
  };

  const renderSelectedMedia = ({ item }: { item: string }) => {
    return <Image source={{ uri: item.uri }} style={{ width: 100, height: 100, margin: 5 }} />;
  };

  const handleDone = () => {
    // Pass the selected media to the parent component
    onMediaSelected(selectedMedia);
  };


  return (
    <View>
      <Button title="Open Gallery" onPress={openImagePicker} />
      <FlatList
        data={selectedMedia}
        keyExtractor={(item) => item}
        renderItem={renderSelectedMedia}
        horizontal
      />
      <Button title="Done" onPress={handleDone} />
    </View>
  );
};

export default MediaPicker;
