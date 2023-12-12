type RootStackParamList = {
  Welcome: undefined;
  Otp: { phoneNumber: string };
  Home: undefined;
  CreateFolder: undefined;
  FolderDetails: { folder_id: string, canEdit: boolean, jwtToken: string };
  ImageScreen: {imageUrl: string};
};
