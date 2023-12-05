import React, { useState } from 'react';
import { View, TextInput, Button, Alert, Text, useColorScheme, StatusBar, Platform, StyleSheet, Switch } from 'react-native';

import { createFolder } from '../services/api';
import { useAuthentication } from '../services/AuthenticationContext';

interface FormData {
  folderName: string;
  isPrivate: boolean;
}

const CreateFolder: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    folderName: '',
    isPrivate: true, // Default is set to private
  });
  const { jwtToken }: any = useAuthentication();



  const handleInputChange = (field: keyof FormData, value: any) => {
    setFormData({
      ...formData,
      [field]: value,
    });
  };

  const  handleSubmit = async () => {
    try {

      // Make a POST request with form data
      const folderName = formData.folderName;
      const privacy = formData.isPrivate;

      const response = await createFolder('1',jwtToken,folderName, privacy)

      // Handle the response as needed
      console.log('Response:', response.data);

      // Example: Display a success message
      Alert.alert('Success', 'Form submitted successfully!');
    } catch (error) {
      // Handle errors
      console.error('Error in form submission:', error);

      // Example: Display an error message
      Alert.alert('Error', 'An error occurred during form submission.');
    }
  };

  const isDarkMode = useColorScheme() === 'dark';

  return (
    <View style={[
      isDarkMode ? { backgroundColor: '#FFF' } : { backgroundColor: '#FFF' },
      {
          flex: 1,
          overflow: "hidden",
      },
  ]}>
      <StatusBar
          animated={true}
          backgroundColor="#000"
          barStyle={'light-content'}
          hidden={false}
      />
      <Text
          style={
              [styles.headingText, styles.darkText, {
                  paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 35, alignSelf: 'center'
              }]
          }>
          SOIDH
      </Text>
      {/* Render form fields */}
      <TextInput
        placeholder="Folder Name"
        value={formData.folderName}
        onChangeText={(text) => handleInputChange('folderName', text)}
      />

      {/* Render switch for privacy */}
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text style={{ marginRight: 10 }}>Privacy:</Text>
        <Switch
          value={formData.isPrivate}  
          onValueChange={(value:boolean) => handleInputChange('isPrivate', value)}
        />
        <Text>{formData.isPrivate ? 'Private' : 'Public'}</Text>
      </View>

      {/* Render submit button */}
      <Button title="Submit Form" onPress={handleSubmit} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
      flex: 0,
      alignItems: 'center',
  },
  whiteText: {
      color: '#FFFFFF',
  },
  darkText: {
      color: '#000',
  },
  headingText: {
      fontSize: 26,
      fontWeight: '200',
      paddingHorizontal: 10,
      margin: 4
  },
  welcomeText: {
      fontSize: 14,
      paddingHorizontal: 10,
      margin: 4
  },
});

export default CreateFolder;
