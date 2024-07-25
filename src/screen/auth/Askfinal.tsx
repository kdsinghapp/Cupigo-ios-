
  import React from 'react';
  import { View, Text, Image, TouchableOpacity, StyleSheet, Platform } from 'react-native';
  import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
  import { colors } from '../../configs/utils/colors';
  import { image, mHeight, mWidth } from '../../configs/utils/utils';
  import { TextInput } from 'react-native-gesture-handler';
  import LinearGradient from 'react-native-linear-gradient';
  import PhoneSvg from '../../assets/svg/Phone.svg'; 
  import { useNavigation } from '@react-navigation/native';
  import { Screen } from 'react-native-screens';
  import ScreenNameEnum from '../../routes/screenName.enum';
  
  export default function Askfinal() {
    const navigation = useNavigation()
    return (
      <LinearGradient
      colors={['#BD0DF4', '#FA3EBA']}
      style={{flex:1,paddingTop:Platform.OS == 'ios'?20:5,alignItems:'center'}}
    >
        <View style={{ marginTop: hp(5), justifyContent: 'center', marginBottom: 30 }}>
        <Image source={image.whiteLogo} style={{ width: 100, height: 100 }} />
      </View>
      <View style={styles.progressBar}>
        <View style={styles.progressIndicator} />
      </View>
        <View
     style={styles.contentContainer}>
      
            <View style={styles.greetingContainer}>
            
            <Text style={styles.greetingText}>You are finally ready for your</Text>
            <Text style={styles.greetingText}> first date!</Text>
          </View>
       
        <Image source={image.check}  style={{height:100,width:100,marginVertical:30}} />
      
          <TouchableOpacity
          onPress={()=>{
            navigation.navigate(ScreenNameEnum.BOTTOM_TAB)
  
          }}
          style={styles.button}>
            <Text style={styles.buttonText}>Go To Home</Text>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }
  
  const styles = StyleSheet.create({
    progressBar: {
      backgroundColor: '#eb90e7',
      alignSelf: 'center',
      marginTop:0,
      borderRadius: 20,
      height: 20,
      width: '90%',
      marginBottom:30,
    },
    progressIndicator: {
      backgroundColor: '#794ebc',
      height: 20,
      width: '100%', // Adjust width based on completion
      borderRadius: 20,
    },
    container: {
      backgroundColor: colors.backgroundColor,
      flex: 1,
    },
    logoContainer: {
      height: hp(20),
      alignItems: 'center',
      justifyContent: 'center',

    },
    logo: {
      height: 80,
      width: 80,
    },
    contentContainer: {
      marginHorizontal:10,
      borderRadius:20,
   
  paddingHorizontal:10,
  backgroundColor:'rgba(255, 255, 255, 0.35)',
      alignItems: 'center',
      justifyContent: 'center',
  
      paddingVertical: 20,
    },
    greetingContainer: {
      
      alignItems: 'center',
      justifyContent:'center'
    },
    greetingText: {
      fontSize: 22,
      fontWeight: '700',
      color: '#fff',
      alignSelf:'center',
      fontFamily:'Lexend'
    },
    inputContainer: {
      backgroundColor: '#4D005A',
      marginTop:10,
   
      alignItems: 'center',
      justifyContent:'center',
      height: 55,
      borderRadius: 10,
      width: wp(80),
      paddingHorizontal: 10,
    },
    input: {
      fontSize: 14,
      fontWeight: '600',
      flex: 1,
    },
    button: {
      backgroundColor: colors.btnColor,
      paddingHorizontal: mWidth * 0.05,
      paddingVertical: mHeight * 0.03,
      width: mWidth * 0.4,
      justifyContent: 'center',
      alignItems: 'center',
      flexDirection: 'row',
      marginTop: mHeight * 0.05,
      borderRadius: mWidth * 0.01,
    },
    buttonText: {
      fontSize: 16,
      color: colors.white,
      fontWeight: '600',
      fontFamily:'Lexend'
    },
  });
  