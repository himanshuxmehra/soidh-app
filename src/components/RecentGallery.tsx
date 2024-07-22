import {
  Alert,
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {COLORS} from '../constants/theme';
import {BASE_URL, getRecentMedia} from '../services/api';
import {FlashList} from '@shopify/flash-list';
import FastImage from 'react-native-fast-image';

interface RecentGalleryProps {
  jwtToken: string;
  navigation: any;
  phoneNumber: number;
  accountId: string;
}

const RecentGallery: React.FC<RecentGalleryProps> = ({
  navigation,
  jwtToken,
  phoneNumber,
  accountId,
}) => {
  const [folders, setFolders] = useState([]);
  const [mediaFiles, setMediaThumbnail] = useState<{}>({});

  useEffect(() => {
    const fetchRecentMedia = async () => {
      const response = await getRecentMedia(accountId, jwtToken);
      console.log('Media got in response', response);

      // Handle the response as needed
      if (response.success) {
        setFolders(response.data.media);
        console.log('Media got in response', folders);
      } else {
        Alert.alert(
          'Error',
          response.message || 'An error occurred while fetching folders.',
        );
      }
    };
    fetchRecentMedia();
  }, []);

  return (
    <View style={styles.containerGallery}>
      <Text style={styles.titleText}>Recent</Text>
      <View style={styles.gallery}>
        <FlashList
          data={folders}
          horizontal={false}
          numColumns={3}
          estimatedItemSize={200}
          renderItem={({item, index}) => (
            <TouchableOpacity
              key={index}
              onPress={() =>
                navigation.push('ImageScreen', {
                  imageUrl: `${BASE_URL}/uploads/${item.account_id}/${item.folder_id}/${item.image_id}.png`,
                  jwtToken: jwtToken,
                })
              }>
              <FastImage
                source={{
                  uri:
                    BASE_URL +
                    `/uploads/${item.account_id}/${item.folder_id}/${item.image_id}.png`,
                  headers: {Authorization: `bearer ${jwtToken}`},
                  priority: FastImage.priority.normal,
                }}
                style={styles.image}
              />
            </TouchableOpacity>
          )}
        />
        {/* {
                    folders.map((item,index)=>{
                        return <TouchableOpacity
                        key={index}
                        onPress={() =>
                            navigation.push('ImageScreen', {
                                imageUrl: `${BASE_URL}/uploads/${item.account_id}/${item.folder_id}/${item.image_id}.png`
                                // index: index,
                                // data: folders
                            })
                        }>
                        <Image source={{ uri: BASE_URL + `/uploads/${item.account_id}/${item.folder_id}/${item.image_id}.png` }} style={styles.image} />


                    </TouchableOpacity>
                    })
                } */}
      </View>
    </View>
  );
};

export default RecentGallery;

const styles = StyleSheet.create({
  image: {
    height: 120,
    width: 130,
    resizeMode: 'cover',
    padding: 0,
    margin: 0,
  },
  titleText: {
    paddingLeft: 10,
    fontSize: 18,
    fontFamily: 'Poppins-Bold',
    color: COLORS.primary,
  },
  containerGallery: {
    marginBottom: 60,
    marginLeft: 10,
    marginRight: 10,
    alignContent: 'stretch',
  },
  gallery: {
    // alignContent:'center',
    // flexWrap:'wrap',
    // flexDirection: 'row',
  },
});
