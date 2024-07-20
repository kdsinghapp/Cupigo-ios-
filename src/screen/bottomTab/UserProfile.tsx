
    import { View, Text, TouchableOpacity, Image, StyleSheet, TextInput, ScrollView, Platform } from 'react-native';
    import React, { useEffect, useState } from 'react';
    import { colors } from '../../configs/utils/colors';
    import { image } from '../../configs/utils/images';
    import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
    import { useNavigation } from '@react-navigation/native';
    import LinearGradient from 'react-native-linear-gradient';
    import { useDispatch, useSelector } from 'react-redux';
    import { get_profile, update_profile } from '../../redux/feature/authSlice';
    import Loading from '../../configs/Loader';
    
    export default function UserProfile() {
      const navigation = useNavigation();
      const dispatch = useDispatch();
      const Profile_data = useSelector(state => state.auth.user_profile);
      const isLoading = useSelector(state => state.auth.isLoading);
      const user = useSelector(state => state.auth.User);
    const [isEdit,setisEdit] = useState(false)
      const [userName, setUserName] = useState('');
      const [gender, setGender] = useState('');
      const [dob, setDob] = useState('');
      const [address, setAddress] = useState('');
      const [city, setCity] = useState('');
      const [age, setAge] = useState('');
      const [countryCode, setCountryCode] = useState('');
      const [mobile, setMobile] = useState('');
      const [profile, setprofile] = useState('');
    
      useEffect(() => {
        get_user_profile();
      }, [user]);
    
      useEffect(()=>{
    
    
        setUserName(Profile_data?.user_name)
        setGender(Profile_data?.gender)
        setDob(Profile_data?.dob)
        setAddress(Profile_data?.address)
        setCity(Profile_data?.city)
        setAge(Profile_data?.age)
        setCountryCode(Profile_data?.country_code)
        setMobile(Profile_data?.mobile)
      },[Profile_data])
    
    
      console.log(Profile_data);
      
      const get_user_profile = () => {
        const params = {
          user_id: user?.id
        };
        dispatch(get_profile(params));
      };
      const updateProfile = (updatedSettings) => {
        
        const updatedProfile = {
    user_id:user?.id,
    user_name:userName,
    country_code:countryCode,
    mobile:mobile,
    gender:gender,
    dob:dob,
    // image:profile,
    address:address,
    age:age,
    city:city,
    // lat:Location.lat,
    // long:Location.lon,
        };
        dispatch(update_profile(updatedProfile)).then(res=>{
          if (user?.id) {
            dispatch(get_profile({ user_id: user.id }));
          }
      })
      }
      return (
    
        <View style={{ backgroundColor: colors.backgroundColorLight, flex: 1 }}>
          {isLoading ? <Loading /> : null}
          <View style={{height:Platform.OS == 'ios'?30:0}} />
          <ScrollView>
            <View style={styles.header}>
              <View style={styles.headerProfile}>
                <View style={styles.profileImage}>
                  <Image source={image.bg} style={styles.profileImageStyle} />
                </View>
                <View style={styles.profileNameContainer}>
                  <Text style={styles.profileName}>Belle Benson</Text>
                  </View>
                
           
              </View>
              <LinearGradient
                colors={['#BD0DF4', '#FA3EBA']}
                style={styles.gradient}
              />
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}
                style={styles.backButton}
              >
                <Image source={image.left} style={styles.backButtonImage} />
              </TouchableOpacity>
            </View>
    
            <View style={styles.formContainer}>
              <View style={styles.inputContainer}>
                <Text style={styles.title}>He was</Text>
              <Text style={{fontSize:14,fontFamily:'Recoleta-SemiBold',color:'#4D005A'}}>Passionate about abstract art, look for my Picasso!</Text>
        
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.title}>Relationship sought</Text>
              <Text style={{fontSize:14,fontFamily:'Recoleta-SemiBold',color:'#4D005A'}}>Operation great love</Text>
        
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.title}>Localisation</Text>
              <Text style={{fontSize:14,fontFamily:'Recoleta-SemiBold',color:'#4D005A'}}>Paris</Text>
        
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.title}>Size</Text>
              <Text style={{fontSize:14,fontFamily:'Recoleta-SemiBold',color:'#4D005A'}}>163cm</Text>
        
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.title}>Age</Text>
              <Text style={{fontSize:14,fontFamily:'Recoleta-SemiBold',color:'#4D005A'}}>21 years old</Text>
        
              </View>
              <View style={styles.inputContainer}>
                <Text style={styles.title}>Hobbies</Text>
              <Text style={{fontSize:14,fontFamily:'Recoleta-SemiBold',color:'#4D005A'}}>mode,fitness,voyage</Text>
        
              </View>
           
           
            
              
           
           
              <View style={styles.bottomSpace} />
            </View>
          </ScrollView>
        </View>
      )
    }
    
    const styles = StyleSheet.create({
      title: {
        fontSize: 18,
      
        color: '#4D005A',
        marginBottom: 5,
    
        marginTop: 10,
        fontFamily:'Recoleta-SemiBold'
        
      },
      header: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: wp(5),
      },
      headerProfile: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginLeft: wp(2),
        marginTop: 40,
      },
      profileImage: {
        width: 140,
        height: 140,
        borderRadius:70,
        padding: 5,
        backgroundColor: colors.backgroundColorLight,
        
      },
      profileImageStyle: {
        width: 130,
        height: 130,
        borderRadius:65,
      },
      profileNameContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        height: 50,
      },
      profileName: {
        marginLeft: wp(2),
        fontSize: 18,
        fontWeight: '600',
        color: '#33196B',
        marginTop: 20,
        fontFamily:'Lexend'
      },
      gradient: {
        position: 'absolute',
        right: 0,
        backgroundColor: colors.backgroundColor,
        top: 0,
        zIndex: -1,
        height: hp(20),
        width: '50%',
      },
      backButton: {
        position: 'absolute',
        top: 10,
        left: 20,
      },
      backButtonImage: {
        height: 40,
        width: 40,
      },
      formContainer: {
        flex: 1,
    
      },
      inputContainer: {
        marginBottom: 10,
        marginHorizontal:20
      },
      inputWrapper: {
        backgroundColor: '#fff',
        paddingHorizontal: 10,
        borderRadius: 30,
        height: 50,
        justifyContent:'center'
      },
      saveButton: {
        backgroundColor: colors.btnColor,
        alignItems: 'center',
        justifyContent: 'center',
        marginVertical: 20,
        height: 55,
        borderRadius: 30,
      },
      saveButtonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '600',
      },
      bottomSpace: {
        height: 40,
      },
    });
    