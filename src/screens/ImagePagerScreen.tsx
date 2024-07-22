import {
  Animated,
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useMemo} from 'react';

import {StackNavigationProp} from '@react-navigation/stack';
import {RouteProp} from '@react-navigation/native';
import ButtonElement from '../elements/Button';
import PagerView from 'react-native-pager-view';
import {BASE_URL} from '../services/api';

type ImagePagerScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  'FolderDetails'
>;
type ImagePagerScreenRouteProp = RouteProp<
  RootStackParamList,
  'ImagePagerScreen'
>;

interface ImagePagerScreenProps {
  navigation: ImagePagerScreenNavigationProp;
  route: ImagePagerScreenRouteProp;
}

const AnimatedPagerView = Animated.createAnimatedComponent(PagerView);

const ImagePagerScreen: React.FC<ImagePagerScreenProps> = ({
  navigation,
  route,
}) => {
  const {data, index} = route.params;
  console.log(route);
  return (
    // <View style={styles.container}>
    //     <TouchableOpacity onPress={() => {
    //         navigation.goBack();
    //     }}>
    //         <ButtonElement title='Back' />
    //     </TouchableOpacity>
    //     <PagerView style={styles.pagerView} initialPage={index}>

    //         {data.map((item, index) => {
    //             return <View key={index} collapsable={false} stylr >
    //                 <Image
    //                     style={styles.image}
    //                     source={{ uri: BASE_URL + `/uploads/${item.account_id}/${item.folder_id}/${item.image_id}.png` }} />
    //                     <Text>Test</Text>
    //             </View>
    //         })}
    //     </PagerView >

    // </View >
    <SafeAreaView style={styles.container}>
      <AnimatedPagerView
        // @ts-ignore
        testID="pager-view"
        style={styles.pagerView}
        initialPage={index}
        layoutDirection="ltr"
        overdrag={true}
        scrollEnabled={true}
        // onPageScroll={true}
        // onPageSelected={true}
        // onPageScrollStateChanged={navigationPanel.onPageScrollStateChanged}
        pageMargin={10}
        // Lib does not support dynamically orientation change
        orientation="horizontal">
        {useMemo(
          () =>
            data.map((item, index) => (
              <View
                testID="pager-view-content"
                key={index}
                style={styles.imageContainer}
                collapsable={false}>
                <Text
                  testID={`pageNumber${index}`}>{`page number ${index}`}</Text>
                {/* <Image
                            style={styles.image}
                            source={{ uri: BASE_URL + `/uploads/${item.account_id}/${item.folder_id}/${item.image_id}.png` }} /> */}
                <Text>Test</Text>
              </View>
            )),
          [data],
        )}
      </AnimatedPagerView>
    </SafeAreaView>
    // </ImageBackground>
  );
};
const windowWidth = Dimensions.get('window').width;
const windowHeight = Dimensions.get('window').height;

export default ImagePagerScreen;

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  pagerView: {
    flex: 1,
  },
  imageContainer: {
    width: windowWidth - 20,
    height: windowHeight - 100,
    justifyContent: 'center',
    padding: 5,
    alignItems: 'center',
  },

  image: {
    flex: 1,
    resizeMode: 'contain',
    width: '100%',
    justifyContent: 'center',
  },
});
