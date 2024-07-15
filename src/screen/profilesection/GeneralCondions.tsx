
import React, { useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, FlatList, Platform } from 'react-native';
import { image } from '../../configs/utils/images';
import { heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { colors } from '../../configs/utils/colors';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { useDispatch, useSelector } from 'react-redux';
import { get_general_conditions } from '../../redux/feature/featuresSlice';
import Loading from '../../configs/Loader';

const GeneralCondions = () => {
  const navigation = useNavigation();
  const user = useSelector(state => state.auth.User);
  const isLoading = useSelector(state => state.feature.isLoading);
  const general_conditions = useSelector(state => state.feature.general_conditions);
  const dispatch = useDispatch();
  const isFocuse = useIsFocused();


  useEffect(() => {
    get_conditions();
  }, [isFocuse]);

  const get_conditions = async () => {
    await dispatch(get_general_conditions());
  };


  console.log(user?.id);
  
  return (
    <ScrollView style={styles.container}>
      
      {isLoading?<Loading />:null}
      <View style={{height:Platform.OS == 'ios'?20:0}} />
      <View style={{justifyContent:'center',height:60}}>
      <Text style={styles.title}>General conditions</Text>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={{
          position: 'absolute',
          top: 0,
          left: 0
        }}
      >
        <Image source={image.left} style={{ height: 40, width: 40 }} />
      </TouchableOpacity>
     </View>
      <View style={styles.iconContainer}>
        <Image
          source={image.genral}
          style={styles.icon}
          resizeMode='contain'
        />
      </View>
   

      <FlatList data={general_conditions}
        renderItem={({ item }) => (



          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{item.title}</Text>
            <Text style={styles.sectionText}>
              {item.description}
            </Text>
          </View>
        )}

      />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.backgroundColorLight,
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#800080',
    marginBottom: 20,
    textAlign: 'center',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 20,
    height: hp(20),

    justifyContent: 'center'
  },
  icon: {
    width: '80%',
    height: '80%',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ff00ff',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 16,
    color: '#800080',
    lineHeight: 22,
  },
});

export default GeneralCondions;
