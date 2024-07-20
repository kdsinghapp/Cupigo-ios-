
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Platform } from 'react-native';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { image } from '../../configs/utils/images'; // Ensure you have this image config
import { useDispatch, useSelector } from 'react-redux';
import { get_privacy_policy } from '../../redux/feature/featuresSlice';
import Loading from '../../configs/Loader';

export default function privacypolicy() {
  const navigation = useNavigation();
  const subscriptions = useSelector(state => state.feature.SubscriptionPlan);
  const isLoading = useSelector(state => state.feature.isLoading);
  const privacy_policy = useSelector(state => state.feature.privacy_policy);
  const dispatch = useDispatch();
  const isFocuse = useIsFocused();


  useEffect(() => {
    get_subscription();
  }, [isFocuse]);

  const get_subscription = async () => {
    await dispatch(get_privacy_policy());
  };
  return (
    <View style={styles.container}>
      {isLoading?<Loading />:null}
      <View style={{ height: Platform.OS == 'android' ?5 :50 ,}} />
      <View style={{justifyContent:'center',height:60,alignItems:'center'}}>
      <Text style={styles.title}>Privacy Policy</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 10
        }}
      >
        <Image source={image.left} style={{ height: 40, width: 40 }} />
      </TouchableOpacity>
     </View>
      <ScrollView style={styles.contentContainer} showsVerticalScrollIndicator={false}>
        <Text style={[styles.title,{color:'#000'}]}>{privacy_policy?.name}</Text>
        <Text style={styles.text}>
        {privacy_policy?.description}
        </Text>
       
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize:18,
    fontWeight: 'bold',
    color: '#800080',
    marginBottom: 20,
    textAlign: 'center',
    fontFamily:'Lexend'
  },
  container: {
    flex: 1,
    backgroundColor: '#FFE6F3',
    paddingHorizontal: 5,

  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  backButton: {
    padding: 10,
  },
  backIcon: {
    width: 35,
    height: 35,
    resizeMode: 'contain',
  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginLeft: -50,
  },
  contentContainer: {

    borderRadius: 10,
    padding: 20,
    marginBottom: 20,
  },

  subtitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000',
    marginTop: 20,
    marginBottom: 10,
  },
  text: {
    fontSize:14,
    color: '#333', 
    marginBottom: 10,
    fontFamily:'Lexend'
  },
  loremText: {
    fontSize: 16,
    color: '#333',
    marginBottom: 10,
  }
});
