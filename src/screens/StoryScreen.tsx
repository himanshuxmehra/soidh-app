import {
  Dimensions,
  Image,
  ImageBackground,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import ButtonElement from '../elements/Button';
import ContentLoader, {Rect} from 'react-content-loader/native';
import {COLORS} from '../constants/theme';
import FastImage from 'react-native-fast-image';

type StoryScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'FolderDetails'
>;
type StoryScreenRouteProp = RouteProp<RootStackParamList, 'StoryScreen'>;

const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

interface StoryScreenProps {
  navigation: StoryScreenNavigationProp;
  route: StoryScreenRouteProp;
}

const StoryScreen: React.FC<StoryScreenProps> = ({navigation, route}) => {
  const {storyUrl, jwtToken} = route.params;
  let [loading, setLoading] = useState<boolean>(true);
  const fakeLoading = setTimeout(() => {
    setLoading(false);
    clearTimeout(fakeLoading);
  }, 1000);
  console.log(route);
  return (
    <ImageBackground
      style={{flex: 1, width: '100%', height: windowHeight}}
      source={{uri: storyUrl}}
      blurRadius={50}>
      <View style={styles.container}>
        <View style={{marginBottom: -30, zIndex: 10, padding: 0}}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <ButtonElement title=" X " />
          </TouchableOpacity>
        </View>
        {loading ? (
          <ContentLoader
            style={styles.storyLoader}
            speed={1}
            width={windowWidth}
            height={windowHeight}
            backgroundColor={COLORS.lightBg}
            foregroundColor="#cedcc9">
            <Rect
              x="0"
              y="0"
              rx="1"
              ry="1"
              width={windowWidth}
              height={windowHeight - 10}
            />
          </ContentLoader>
        ) : (
          <View style={styles.storyContainer}>
            <FastImage
              source={{
                uri: storyUrl,
                headers: {Authorization: `bearer ${jwtToken}`},
                priority: FastImage.priority.normal,
              }}
              style={styles.story}
            />
          </View>
        )}
      </View>
    </ImageBackground>
  );
};

export default StoryScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'flex-start',
    width: '100%',
    height: '100%',
  },
  storyContainer: {
    width: windowWidth,
    height: windowHeight,
    padding: 5,
    resizeMode: 'stretch',
  },
  story: {
    resizeMode: 'cover',
    width: windowWidth,
    height: windowHeight,
  },
  storyLoader: {
    width: windowWidth,
    height: windowHeight,
  },
});
