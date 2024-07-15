import React, { useEffect } from 'react';
import { View, StyleSheet, Image, Text, TouchableOpacity, Platform } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { getNearBy, get_profile } from '../../redux/feature/featuresSlice';
import Loading from '../../configs/Loader';
import { image } from '../../configs/utils/images';
import { get_profile as getProfile } from '../../redux/feature/authSlice';

const Distance = () => {
  const navigation = useNavigation();
  const dispatch = useDispatch();
  const user = useSelector(state => state.auth.User);
  const isLoading = useSelector(state => state.feature.isLoading);
  const NearByUser = useSelector(state => state.feature.NearByUser);
  const isFocused = useIsFocused();
  const Profile_data = useSelector(state => state.auth.user_profile);

  useEffect(() => {
    get_user_profile();
  }, [user]);

  const get_user_profile = () => {
    const params = {
      user_id: user?.id
    };
    dispatch(getProfile(params));
  };

  useEffect(() => {
    if (isFocused) {
      get_User();
    }
  }, [isFocused]);

  const get_User = async () => {
    const params = {
      lat: 22.7513427,
      lon: 75.895245
    };
    await dispatch(getNearBy(params));
  };

  const handleBackPress = () => {
    navigation.goBack();
  };

  return (
    <View style={styles.container}>
      <View style={{ height: Platform.OS == 'android' ?5 :50 ,}} />
      <View style={{justifyContent:'center',height:60,alignItems:'center'}}>
      <Text style={styles.title}>Distance</Text>
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
     
      {isLoading ? <Loading /> :
        <MapView
          style={styles.map}
          initialRegion={{
            latitude: 22.7513427,
            longitude: 75.867380,
            latitudeDelta: 0.01,
            longitudeDelta: 0.01,
          }}
        >
          {NearByUser.map(user => (
            <Marker key={user.id} coordinate={{ latitude: 22.7513427, longitude: 75.867380 }}>
              <TouchableOpacity style={styles.marker}>
                <Image source={image.img} style={styles.image} />
              </TouchableOpacity>
            </Marker>
          ))}
        </MapView>
      }
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFE6F3',
    paddingVertical: 5,
    height:60
  },
  backButton: {
position:'absolute',
left:10,top:50
   
  },
  backIcon: {
    width: 35,
    height: 35,

  },
  headerText: {
    flex: 1,
    textAlign: 'center',
    fontSize: 20,
    fontWeight: 'bold',
    color: '#33196B',
    marginLeft: -50,
  },
  map: {
    flex: 1,
  },
  marker: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 10,
    borderColor: '#fff',
    backgroundColor: '#ff69b4',
  },
  image: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#800080',
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default Distance;
