import React, {useState} from 'react';
import {
  Modal,
  Text,
  View,
  TextInput,
  Switch,
  Button,
  StyleSheet,
} from 'react-native';

interface ModalFormProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (formData: FormData) => void;
}

interface FormData {
  phone: string;
  permission: boolean;
}

const EnterPhoneNumberModal: React.FC<ModalFormProps> = ({
  isOpen,
  onClose,
  onSubmit,
}) => {
  const [phone, setPhone] = useState('');
  const [permission, setPermission] = useState(false);

  const handleSubmit = () => {
    // You can perform validation here if needed
    // and then send data to the API
    onSubmit({phone, permission});
    // Close the modal after submitting
    onClose();
  };

  return (
    <Modal animationType="slide" transparent={true} visible={isOpen}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <View>
            <Text>Share with:</Text>
            <TextInput
              style={styles.input}
              value={phone}
              onChangeText={text => setPhone(text)}
            />
          </View>
          <View style={styles.permissionInput}>
            <Text style={styles.allowEditText}>Allow editing:</Text>
            <Switch
              value={permission}
              onValueChange={() => setPermission(!permission)}
            />
          </View>
          <Button title="Submit" onPress={handleSubmit} />
          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'center',
    alignSelf: 'center',
    width: '100%',
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    width: '90%',
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
    padding: 5,
  },
  allowEditText: {
    color: '#000',
  },
});

export default EnterPhoneNumberModal;
