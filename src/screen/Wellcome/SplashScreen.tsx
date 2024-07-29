import React, { useEffect } from 'react';
import { View, Image, StyleSheet,Text, ImageSourcePropType } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';
import { image } from '../../configs/utils/images';
import { useSelector } from 'react-redux';
import LinearGradient from 'react-native-linear-gradient';

interface SplashScreenProps {

}

const SplashScreen: React.FC<SplashScreenProps> = (props) => {
  const navigation = useNavigation();

  const isLogOut = useSelector((state) => state.auth.isLogOut);
  const isLogin = useSelector((state) => state.auth.isLogin);


  const isFocused = useIsFocused();


  useEffect(() => {
    const timer = setTimeout(() => {
      navigation.navigate(ScreenNameEnum.WELLCOME_SCREEN);
    }, 1000); // 3 seconds

    // Cleanup function to clear the timeout if the component unmounts or dependencies change
    return () => clearTimeout(timer);
  }, [isFocused, isLogOut]);



  return (
    <LinearGradient
    colors={['#BD0DF4', '#FA3EBA']}
    style={styles.background}
  >
      <Text style={styles.shadowText}>Welcome to Cupigo!</Text>
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  background: {
    flex: 1,
    paddingHorizontal:40,
justifyContent:'center',
    alignItems: 'center',
  },
  shadowText: {
    fontSize: 50,
    fontWeight: '800',
    color: '#ff9bd9',
    textShadowColor: '#FF00FF',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
    fontFamily:'LeagueSpartan-SemiBold'
  },
});

export default SplashScreen;
