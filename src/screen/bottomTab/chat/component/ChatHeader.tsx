import { View, Text, TouchableOpacity, Image, StyleSheet, Platform } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native'
import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
  } from 'react-native-responsive-screen';
export default function ChatHeader({item}) {

    const navigation = useNavigation()


  
  return (
    <View style={styles.colorDiv}>
    <TouchableOpacity
      style={styles.backButton}
      onPress={() => navigation.goBack()}>
      <Image
        source={require('../../../assets/Cropping/Back_Nav3x.png')}
        style={styles.backIcon}
      />
    </TouchableOpacity>
    <View style={styles.headerContent}>
      <Image source={{uri:item?.image}} style={styles.headerAvatar}  resizeMode='cover'/>
      <Text style={styles.headerText}>{item?.company_name}</Text>
    </View>
  </View>
  )
}

const styles =StyleSheet.create({
    headerAvatar: {
        height: 40,
        width: 40,
        borderRadius: 20,
      },
      headerText: {
        fontWeight: '700',
        fontSize: 17,
        lineHeight: 32,
        color: '#000',
        marginLeft: 15,
      },
    headerContent: {
        flexDirection: 'row',
        alignItems: 'center',
        marginLeft: 20,
      },
    backIcon: {
        height: 20,
        width: 20,
      },
    colorDiv: {
        backgroundColor: '#edf2f2',
        height: hp(8),
       marginTop:Platform.OS == 'ios'?25:0,
        flexDirection: 'row',
        alignItems: 'center',
      
      },
    backButton: {
        marginLeft: 20,
      },
})