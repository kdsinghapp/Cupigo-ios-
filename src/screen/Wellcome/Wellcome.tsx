import React, { useEffect } from 'react';
import { View, Text, StyleSheet, StatusBar, Image } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import { image } from '../../configs/utils/images';
import { heightPercentageToDP as hp, widthPercentageToDP as wp} from 'react-native-responsive-screen';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useSelector } from 'react-redux';
import ScreenNameEnum from '../../routes/screenName.enum';

const Welcome = () => {
  const navigation = useNavigation();

  const isLogOut = useSelector((state) => state.auth.isLogOut);
  const isLogin = useSelector((state) => state.auth.isLogin);
  const isFoucs = useIsFocused();

  const checkLogout = () => {
    console.log('================checkLogout===========isLogOut=========', isLogOut);
    console.log('================checkLogout===========isLogin=========', isLogin);
    if (!isLogOut && !isLogin || isLogOut && !isLogin) {
      console.log('================Login====================');
      navigation.navigate(ScreenNameEnum.SIGNUP_METHOD);
    }
    if (!isLogOut && isLogin) {
      console.log('================HomeTab====================');
      navigation.navigate(ScreenNameEnum.BOTTOM_TAB);
    }
  }

  const isFocused = useIsFocused();


  useEffect(() => {
    const timer = setTimeout(() => {
      checkLogout();
    },3000); // 3 seconds

    // Cleanup function to clear the timeout if the component unmounts or dependencies change
    return () => clearTimeout(timer);
  }, [isFocused, isLogOut]);


  return (
    <View style={styles.container}>
      <StatusBar barStyle="light-content" />
      <LinearGradient
        colors={['#BD0DF4', '#FA3EBA']}
        style={styles.background}
      >
        <View style={styles.content}>
        <Image
        resizeMode='contain'
        source={image.heartLogo}
        style={styles.logo}
      />
          
        </View>
        <View style={{position:'absolute',bottom:30,left:20}}>
        <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.brandName}>Cupigo!</Text>
        </View>
        <View style={{position:'absolute',bottom:20,right:0}}>
        <Image
        resizeMode='contain'
        source={image.logoLine}
        style={{height:hp(18),width:wp(60)}}
      />
        </View>
      </LinearGradient>
    </View>
  );
};

const styles = StyleSheet.create({
  logo: {
    height:hp(40),
   width:170
  },
  container: {
    flex: 1,
  },
  background: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    alignItems: 'center',
  },
  
  welcomeText: {
    fontSize:40,
    color: '#FFF',
    marginTop: 20,
    fontWeight:'600',
    fontFamily:'Lexend'
  },
  brandName: {
    fontSize:40,
    color: '#FFF',
    fontWeight: 'bold',
    fontFamily:'Lexend'
  },
});

export default Welcome;
