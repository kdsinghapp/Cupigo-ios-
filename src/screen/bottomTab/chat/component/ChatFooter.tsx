import React, { useState, useEffect } from 'react';
import { View, TextInput, StyleSheet, TouchableOpacity, ActivityIndicator } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';
import Send from '../../../assets/svg/send.svg';

export default function ChatFooter({ item, onMessageSent }) {
  const user = useSelector(state => state.auth.userData);
  const [messageText, setMessageText] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log('User mobile:', user?.mobile); // Log user mobile whenever messageText changes
  }, [messageText, user?.mobile]);

  const onSend = async () => {
    setLoading(true);
    if (messageText.trim() === '') {
      setLoading(false); // Reset loading state
      return;
    }

    try {
      const messageData = {
        text: messageText,
        createdAt: firestore.FieldValue.serverTimestamp(),
        mobile: user?.mobile,
        sender_id: user?.id,
        reciver_id: item?.id
      };

      setMessageText('');
      await sendMessage(messageData);
      onMessageSent(); // Trigger refresh in parent component (ChatBody)
    } catch (error) {
      console.error('Error sending message: ', error);
      setLoading(false); // Reset loading state
    }
  };

  const sendMessage = async (messageData) => {
    await firestore()
      .collection('chats')
      .doc('' + user?.id + item?.id)
      .collection('message')
      .add(messageData);

    setLoading(false); // Reset loading state
  };

  const sendImage = async () => {
    setLoading(true);

    try {
      const image = await ImagePicker.openPicker({
        mediaType: 'photo',
        cropping: true,
      });

      if (image && image.path) {
        const messageData = {
          image: image.path,
          createdAt: firestore.FieldValue.serverTimestamp(),
          mobile: user?.mobile,
        };

        await sendMessage(messageData);
        onMessageSent(); // Trigger refresh in parent component (ChatBody)
      }
    } catch (error) {
      console.error('Error selecting image: ', error);
      setLoading(false); // Reset loading state
    }
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Type..."
        placeholderTextColor="#A8A8A8"
        style={styles.input}
        value={messageText}
        onChangeText={setMessageText}
      />
      {/* Uncomment to add image picker button */}
      {/* <TouchableOpacity style={styles.iconButton} onPress={sendImage}>
        <Gallery />
      </TouchableOpacity> */}
      <TouchableOpacity onPress={onSend} style={styles.iconButton}>
        {loading ? <ActivityIndicator size={20} color={'skyblue'} /> : <Send />}
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  inputContainer: {
    marginHorizontal: 5,
    paddingHorizontal: 20,
    bottom: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#F6F6F6',
    height: 60,
    borderRadius: 30,
    paddingLeft: 20,
  },
  iconButton: {
    marginHorizontal: 5,
  },
  input: {
    width: '60%',
    marginLeft: 10,
  },
});
