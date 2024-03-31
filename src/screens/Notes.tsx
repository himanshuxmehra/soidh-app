import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import BottomSheet from '@gorhom/bottom-sheet';
import { useAuthentication } from '../services/AuthenticationContext';

const Notes = () => {
  // ref
  const bottomSheetRef = useRef<BottomSheet>(null);

  // variables
  const snapPoints = useMemo(() => ['25%', '50%'], []);

  // callbacks
  const handleSheetChanges = useCallback((index: number) => {
    console.log('handleSheetChanges', index);
  }, []);
  const { isLoggedIn, jwtToken, logOut } = useAuthentication();
  console.log(jwtToken)
  useEffect(() => {
    const checkSession = async (jwtToken: string) => {
      try {
        console.log(jwtToken)
        if (isLoggedIn) {
          // User is already logged in, navigate to Home screen
          console.log("Success")

        }
      } catch (err) {
        console.log(err)
      }
    }
    checkSession(jwtToken);
  }, []);

  // renders
  return (
    <View style={styles.container}>
      {/* <BottomSheet
        ref={bottomSheetRef}
        index={1}
        snapPoints={snapPoints}
        onChange={handleSheetChanges}
      >
        <View style={styles.contentContainer}>
          <Text>Awesome 🎉</Text>
        </View>
      </BottomSheet> */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 24,
    backgroundColor: 'grey',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
});

export default Notes;