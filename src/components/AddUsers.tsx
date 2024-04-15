import { Alert, StyleSheet, Switch, Text, TouchableOpacity, View, Button, TextInput } from 'react-native'
import React, { Ref, useCallback, useMemo, useRef, useState } from 'react'
import EnterPhoneNumberModal from './EnterPhoneNumberModal';
import { shareFolder } from '../services/api';
import { COLORS } from '../constants/theme';
import BottomSheet from '@gorhom/bottom-sheet';
import ButtonElement from '../elements/Button';


interface AddUsersProps {
    phone: string
    setPhone: any
    permission: boolean
    setPermission: any
    handleSubmitForm: any
    handleCloseModal: any
}

const AddUsers: React.FC<AddUsersProps> = ({ phone,setPhone,permission,setPermission,handleSubmitForm,handleCloseModal}) => {

    return (
        <View style={styles.contentContainer}>
        <Text>Enter the phone number with you want to share 🎉</Text>
        <View style={styles.centeredView}>
            <View style={styles.modalView}>
                <View>
                    <Text>Share with:</Text>
                    <TextInput
                        style={styles.input}
                        value={phone}
                        onChangeText={(text) => setPhone(text)}
                    />
                </View>
                <View style={styles.permissionInput}>
                    <Text style={styles.allowEditText}>Allow editing:</Text>
                    <Switch value={permission} onValueChange={() => setPermission(!permission)} />
                </View>
                <TouchableOpacity onPress={handleSubmitForm}>
                    <ButtonElement title="Submit" />
                </TouchableOpacity>
                <TouchableOpacity onPress={handleSubmitForm}>
                    <ButtonElement title="Close" onPress={handleCloseModal} />
                </TouchableOpacity>

            </View>
        </View>
    </View>
    )
}

export default AddUsers

const styles = StyleSheet.create({
    addButton: {
        borderRadius: 100,
        paddingHorizontal: 20,
        paddingVertical: 10,
        backgroundColor: COLORS.primary,
        marginVertical: 2,
        width: '100%'
    },
    buttonText: {
        color: COLORS.white,
        textAlign: 'center',
        fontSize: 12,
    },
    contentContainer: {
        flex: 1,
        alignItems: 'center',
    },
    centeredView: {
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        bottom: 0,
        justifyContent: "center",
        alignSelf: "center",
        width: '100%'
    },
    input: {
        height: 40,
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 10,
        width: '100%',
    },
    permissionInput: {
        color: '#000',
        padding: 5
    },
    allowEditText: {
        color: '#000',
    },
    modalView: {
        margin: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        width: '90%'
    },
})