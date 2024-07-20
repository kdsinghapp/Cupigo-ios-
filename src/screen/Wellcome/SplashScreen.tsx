import React, { useEffect } from 'react';
import { View, Image, StyleSheet, ImageSourcePropType } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';
import { image } from '../../configs/utils/images';
import { useSelector } from 'react-redux';

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
    <View style={styles.container}>
      <Image
        source={image.appLogo}
        style={styles.logo}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#ffe4fa',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    height: 100,
    width: 100,
  },
});

export default SplashScreen;
