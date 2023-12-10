import { Alert, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import EnterPhoneNumberModal from './EnterPhoneNumberModal';
import { shareFolder } from '../services/api';

interface AddUsersProps {
    jwtToken: string
    folder_id: string
  }

const AddUsers: React.FC<AddUsersProps> = ({ folder_id, jwtToken }) => {
    const [isModalOpen, setModalOpen] = useState(false);

    const handleOpenModal = () => {
        setModalOpen(true);
    };

    const handleCloseModal = () => {
        setModalOpen(false);
    };

    const handleSubmitForm = async (formData: {phone:number, permission:boolean}) => {
        // Replace this with your API call logic
        const phoneNumber = formData.phone;
        const canEdit = formData.permission;

        const response = await shareFolder(phoneNumber, folder_id, canEdit, jwtToken);
            if (response.success) {
                console.log("got in response", response.data)
            } else {
                Alert.alert('Error', response.message || 'An error occurred while sharing folder.');
            }
        console.log('Form Data Submitted:', formData);
    };
    return (
        <View style={{width: '70%', alignSelf:'center'}}>
            <TouchableOpacity onPress={handleOpenModal}>
                <View style={styles.addButton}>

                    <Text style={styles.buttonText}>Share with</Text>
                </View>
            </TouchableOpacity>
            <EnterPhoneNumberModal isOpen={isModalOpen} onClose={handleCloseModal} onSubmit={handleSubmitForm} />
        </View>
    )
}

export default AddUsers

const styles = StyleSheet.create({
    addButton: {
        borderRadius: 20,
        width: '100%',
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