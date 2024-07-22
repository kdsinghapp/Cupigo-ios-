import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, FlatList, Image, Modal, Keyboard, Platform, KeyboardAvoidingView } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';

import firestore from '@react-native-firebase/firestore';
import storage from '@react-native-firebase/storage';
import { useSelector } from 'react-redux';
import ImagePicker from 'react-native-image-crop-picker';

import AudioRecorderPlayer from 'react-native-audio-recorder-player';


export default function ChatBody({messages}) {
  return (

  <View style={{flex:1}}>
      <FlatList
        showsVerticalScrollIndicator={false}
        data={messages}
   
        renderItem={({ item }) => (
          <View
            style={[
              styles.messageContainer,
              item.sender_id === user?.id ? styles.senderContainer : styles.receiverContainer
            ]}
          >
            <View style={styles.messageInfo}>
              <Text
                style={[
                  styles.messageSender,
                  item.sender_id === user?.id ? styles.senderName : styles.receiverName
                ]}
              >
                {item.sender_id === user?.id ? 'You' : item.name}
              </Text>
              <Text style={styles.messageTime}>{formatTime(item.createdAt)}</Text>
            </View>
            {item.text && (
              <Text
                style={[
                  styles.messageText,
                  item.sender_id === user?.id ? styles.senderText : styles.receiverText
                ]}
              >
                {item.text}
              </Text>
            )}
            {/* {item.image && (
              <Image source={{ uri: item.image }} style={styles.messageImage} />
            )}
            {item.video && (
              <Video source={{ uri: item.video }} style={styles.messageVideo} />
            )}
            {item.audio && (
              <TouchableOpacity onPress={() => audioRecorderPlayer.startPlayer(item.audio)}>
                <Text style={styles.messageAudio}>Play Audio</Text>
              </TouchableOpacity>
            )} */}
          </View>
        )}
       
      />
      </View>

  )
}

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'flex-end',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // semi-transparent background
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    alignItems: 'center',
  },
  modalItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
    width: wp(80),
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalIcon: {
    width: 24,
    height: 24,
    marginRight: 20,
  },
  modalText: {
    fontSize: 16,
    color: '#333333',
    fontFamily:'Lexend'
  },
  cancelButton: {
    paddingVertical: 15,
    width: wp(80),
    alignItems: 'center',
    marginTop: 10,
  },
  cancelButtonText: {
    fontSize: 16,
    color: '#FF4081',
    fontFamily:'Lexend'
  },
  emojiPickerContainer: {
    position: 'absolute',
    bottom: hp(10),
    width: '100%',
    backgroundColor: '#FFFFFF',
    borderTopWidth: 1,
    borderTopColor: '#e4e4e4',
    paddingVertical: 10,
    paddingHorizontal: 10,
  },
  container: {
    flex: 1,
    backgroundColor: '#ffe4fa',
  },
  header: {
  
    alignItems: 'center',
    padding: wp(5),
  },
  headerProfile: {

   alignSelf:'center',
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: wp(2),
    marginTop: 40,
  },
  profileImage: {
    width: 100,
    height: 100,
    borderRadius: 50,
  },
  profileName: {
    marginLeft: wp(2),
    fontSize: 18,
    fontWeight: 'bold',
    color: '#33196B',
    marginTop: 20,
    fontFamily:'Lexend'
  },
  messageList: {
    padding: wp(5),
  },
  messageContainer: {
    marginBottom: hp(2),
    padding: wp(3),
    borderRadius: 10,

  },
  senderContainer: {
    alignSelf: 'flex-end',
    backgroundColor: '#fff',
    borderTopLeftRadius: 30,
    borderBottomLeftRadius: 30,
    paddingHorizontal: 30,
    borderBottomRightRadius: 30,
    borderTopRightRadius: 0,
marginRight:15
  },
  receiverContainer: {
    alignSelf: 'flex-start',
    backgroundColor: '#fff1fd',
    borderTopLeftRadius: 0,
    paddingHorizontal: 30,
    borderBottomRightRadius: 30,
    borderBottomLeftRadius: 30,
    borderTopRightRadius: 30,
    marginLeft:15
  },
  messageText: {
    fontSize: 14,
    marginTop: 5,
    fontFamily:'Lexend'
  },
  senderText: {
    color: '#4635E2',
  },
  receiverText: {
    color: '#C43F8E',
    fontFamily:'Lexend'
  },
  messageInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: hp(1),
    minWidth: '20%',
  },
  messageTime: {
    fontSize: 10,
    color: '#4635E2',
    opacity: 0.5,
    marginLeft: 20,
  },
  messageSender: {
    fontSize: 12,
    fontWeight: 'bold',
    fontFamily:'Lexend'
  },
  senderName: {
    color: '#4635E2',
    fontSize: 10,
    fontFamily:'Lexend'
  },
  receiverName: {
    color: '#C43F8E',
    fontSize: 10,
    fontFamily:'Lexend'
  },
  inputContainer: {
    
    flexDirection: 'row',
    alignItems: 'center',
    padding: wp(3),
    backgroundColor: '#fff',
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    height:75
  },
  textInput: {    fontFamily:'Lexend'},
  messageImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  messageVideo: {
    width: 200,
    height: 200,
    borderRadius: 10,
    marginTop: 10,
  },
  messageAudio: {
    fontSize: 14,
    marginTop: 10,
    color: '#4635E2',
    textDecorationLine: 'underline',
    fontFamily:'Lexend'
  },
});