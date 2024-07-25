
    import React, { useState } from 'react';
    import { View, Text, StyleSheet, FlatList, TouchableOpacity, ScrollView, Alert } from 'react-native';
import RightIcon from '../../assets/svg/Right.svg'; // Assuming you have an SVG or image for the right arrow icon
import { useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';
import AddRatingModal from '../modal/RattingModal';
import { useDispatch } from 'react-redux';
import { logoutSuccess } from '../../redux/feature/authSlice';
import AsyncStorage from '@react-native-async-storage/async-storage';
    
    const options = [
      { id: '1', title: 'Biography',screen:ScreenNameEnum.BIOGRAPHY },
      // { id: '2', title: 'Change Password' ,screen:ScreenNameEnum.ChangePassword },
      { id: '2', title: 'Change Identifier',screen:ScreenNameEnum.CHANGE_IDENTIFIER  },
      { id: '3', title: 'Distance',screen:ScreenNameEnum.DISTANCE },
      { id: '4', title: 'Privacy Policy', screen:ScreenNameEnum.PRIVACY_POLICY },
      { id: '5', title: 'Rate Cupigo!' },
      { id: '6', title: 'Contact Us', screen:ScreenNameEnum.CONTACT_US },
      // { id: '8', title: 'Subscription' ,screen:ScreenNameEnum.SUBSCRIPTION},
      { id: '7', title: 'General conditions of use',screen:ScreenNameEnum.GENERAL_CONDITIONS },
      { id: '8', title: 'Setting',screen:ScreenNameEnum.SETTINGS },
      { id: '9', title: 'Log Out',screen:ScreenNameEnum.SIGNUP_METHOD },
    ];
    
    const Profile = () => {
      const navigation = useNavigation()
      const [RattingModal,setRattingModal] = useState(false)
const dispatch =useDispatch()
const handleLogout = () => {
  Alert.alert(
    'Confirm Logout',
    'Are you sure you want to log out?',
    [
      {
        text: 'Cancel',
        style: 'cancel', // Button style for cancel
      },
      {
        text: 'OK',
        onPress: async () => {
          try {
            // Clear AsyncStorage
            await AsyncStorage.clear();

            // Dispatch logout action
            dispatch(logoutSuccess());
           
            // Navigate to the sign-up method screen
            navigation.navigate(ScreenNameEnum.SIGNUP_METHOD);
          } catch (error) {
            console.error("Error during logout: ", error);
          }
        },
      },
    ],
    { cancelable: false } // Prevents dismissing the alert by tapping outside of it
  );
};

      return (
        <View style={styles.container}>
          <Text style={styles.headerText}>Profile</Text>
          <ScrollView showsVerticalScrollIndicator={false}>
          <FlatList
          
            data={options}
            renderItem={({ item }) => (
              <TouchableOpacity
              onPress={()=>{
                if(item.title == 'Log Out'){
                
                  handleLogout()
                }
                else if(item.title == 'Rate Cupigo!'){
setRattingModal(true)
                }
                else{
                  navigation.navigate(item.screen,{profile:true})
                }
              }}
              style={styles.optionItem}>
                <Text style={styles.optionText}>{item.title}</Text>
                <RightIcon height={35} /> 
              </TouchableOpacity>
            )}
          
            showsVerticalScrollIndicator={false}
          />

          <View   style={{height:60}}/>
          </ScrollView>

          <AddRatingModal  isVisible={RattingModal}   onClose={()=>setRattingModal(false)} />
        </View>
      );
    };
    
    const styles = StyleSheet.create({
      container: {
        flex: 1,
        backgroundColor: '#F7DFFF',
        padding: 20,
      },
      headerText: {
        marginTop:25,
        fontSize: 24,
        fontWeight: 'bold',
        textAlign: 'center',
        marginBottom: 20,
        color: '#5A2D82',
        fontFamily:'Lexend'
      },
      optionItem: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        paddingVertical: 15,
        borderBottomWidth: 1,
        borderBottomColor: '#DDD',
      },
      optionText: {
        fontSize:15,
        color: '#FA3EBA',
        fontWeight:'500',
        fontFamily:'Lexend'
      },
    });
    
    export default Profile;
    