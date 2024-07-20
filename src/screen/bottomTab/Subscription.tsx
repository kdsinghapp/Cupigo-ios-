import React, { useEffect, useState } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Alert } from 'react-native';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import { image } from '../../configs/utils/images'; // Import logos
import Line from '../../assets/svg/line.svg';
import LinearGradient from 'react-native-linear-gradient';
import { useDispatch, useSelector } from 'react-redux';
import { Payment_api, create_subscription, get_Plans, my_plan } from '../../redux/feature/featuresSlice';
import Loading from '../../configs/Loader';
import { useIsFocused } from '@react-navigation/native';
import { WebView } from 'react-native-webview';
import Header from '../../configs/Header';
import { errorToast } from '../../configs/customToast';

const getLogo = (title) => {
  switch (title) {
    case 'SILVER':
      return image.silver;
    case 'GOLD':
      return image.gold;
    case 'PLATINUM':
      return image.platinum;
    default:
      return null;
  }
};
function calculateDaysToEndDate(endDateString) {
  // Get the current date
  const currentDate = new Date();
  
  // Parse the end date
  const endDate = new Date(endDateString);

  // Calculate the difference in milliseconds
  const diffInMilliseconds = endDate - currentDate;

  // Convert milliseconds to days
  const millisecondsInADay = 1000 * 60 * 60 * 24;
  const daysToEndDate = Math.ceil(diffInMilliseconds / millisecondsInADay);

  return daysToEndDate;
}
export default function Subscription() {
  const [currentSubscription, setCurrentSubscription] = useState(0);
  const dispatch = useDispatch();
  const [checkoutUrl, setCheckoutUrl] = useState(false);
  const PayMentStatus = useSelector(state => state.feature.PayMentStatus);
  const [isLoading, setIsLoading] = useState(false);

  const handleLeftPress = () => {
    setCurrentSubscription((prev) => (prev > 0 ? prev - 1 : subscriptions.length - 1));
  };

  const handleRightPress = () => {
    setCurrentSubscription((prev) => (prev < subscriptions.length - 1 ? prev + 1 : 0));
  };

  const subscriptions = useSelector(state => state.feature.SubscriptionPlan);
  const myPlan = useSelector(state => state.feature.myPlan);
  const user = useSelector(state => state.auth.User);
  const isFocused = useIsFocused();

  console.log('myPlan',myPlan);
  
  useEffect(() => {
    get_subscription();
  }, [isFocused]);

  const get_subscription = async () => {
    const params = {
      user_id: user?.id
    };
    await dispatch(get_Plans());
    await dispatch(my_plan(params));
  };

  if (!subscriptions || subscriptions.length === 0) {
    return null; // Handle case where subscriptions are not yet loaded
  }

  const { title, price, lives, roses, currency_symbole, id } = subscriptions[currentSubscription];
  const logo = getLogo(title);

  const Stripe_api = () => {
    let data = new FormData();
    data.append('price', price);
    data.append('email', 'anu@gmail.com');
    const params = {
      data: data
    };

    dispatch(Payment_api(params)).then(res => {
      setCheckoutUrl(true);
    });
  };

  const handleNavigationStateChange = async (navState) => {
    try {
      const currentUrl = navState.url;
      console.log('Current URL:', currentUrl);

      // Trim and clean the URL
      const cleanUrl = currentUrl.trim();

      if (cleanUrl.includes('handle-checkout-success')) {
        console.log('Success URL detected.');
        setCheckoutUrl(false);

        try {
          const response = await fetch(cleanUrl);
          const result = await response.json();

          console.log('Fetch response:', result);

          if (result?.session?.payment_intent) {
            console.log('Payment Intent:', result.session.payment_intent);
            purchase_subscription(result.session.payment_intent);
          } else {
            console.log('Error: Payment intent not found in response', result);
          }
        } catch (fetchError) {
          console.error('Error fetching payment intent:', fetchError);
        }
      } else if (cleanUrl.includes('cancel-stripe')) {
        console.log('Cancel URL detected.');
        setCheckoutUrl(false);
      }
    } catch (error) {
      console.error('Error handling navigation state change:', error);
    }
  };

  const purchase_subscription = async (intent) => {
    const params = {
      user_id: user?.id,
      plan_id: id,
      price: price,
      payment_status: 'Paid',
      payment_intent: intent
    };

    dispatch(create_subscription(params));
  };

  const handleError = (error) => {
    console.error('WebView Error:', error);
    Alert.alert('Error', 'Failed to load payment page. Please try again later.');
    setCheckoutUrl(false);
  };

  const handleUpgrade = () => {
    
    Alert.alert(
      'Upgrade Subscription',
      'Do you want to Chnage your current plan?',
      [
        {
          text: 'Cancel',
          style: 'cancel'
        },
        {
          text: 'Upgrade',
          onPress: () => Stripe_api()
        }
      ],
      { cancelable: false }
    );
  };
console.log(new Date());

  function formatDate(dateString) {
    // Create a new Date object from the provided date string
    const date = new Date(dateString);
  
    // Define options for formatting the date
    const options = { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    };
  
    // Format the date using toLocaleDateString with the defined options
    const formattedDate = date.toLocaleDateString('en-US', options);
  
    return formattedDate;
  }
  
  return (
    <View style={styles.container}>
      {isLoading ? <Loading /> : null}
      {checkoutUrl ? (
        <WebView
          source={{ uri: PayMentStatus?.url }}
          onNavigationStateChange={handleNavigationStateChange}
          onLoadStart={() => setIsLoading(true)}
          onLoadEnd={() => setIsLoading(false)}
          onError={handleError}
          style={styles.webView}
        />
      ) : (
        <>
          <Header title='Subscription' />
        
        {!myPlan?.plan_id ? <View style={[styles.contentContainer,]}>
    
            <View style={[styles.imageContainer,[{}]]}>
              <Image source={image.Sub_b} resizeMode='cover' style={{height:hp(20)}} />
              <View style={styles.subscriptionDetails}>
                {logo && <Image source={logo} resizeMode='contain' style={styles.logo} />}
                <View style={styles.lineContainer}>
                  <Line />
                </View>
                <Text style={styles.price}>{price}{currency_symbole}</Text>
                <Text style={styles.live}>{lives} Lives</Text>
              </View>
              <View style={styles.roseContainer}>
                <Text style={styles.roseText}>{roses} Roses</Text>
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity onPress={handleLeftPress}>
                    <Image source={image.left} style={styles.arrowButton} />
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleRightPress}>
                    <Image source={image.right} style={styles.arrowButton} />
                  </TouchableOpacity>
                </View>
                <Text style={styles.detailText}>CUSTOMIZABLE WALL</Text>
                <Text style={styles.detailText}>LEAVE THE CHAT AT ANY TIME</Text>
                <Text style={styles.detailText}>WITHOUT PENALTY</Text>
                <Text style={styles.detailText}>ADD MULTIPLE PHOTOS</Text>
              </View>
            </View>
      
              <TouchableOpacity onPress={Stripe_api}>
                <LinearGradient
                  colors={['#BD0DF4', '#FA3EBA']}
                  start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} style={styles.linearGradient}>
                  <Text style={styles.buttonText}>Choose this type of subscription</Text>
                </LinearGradient>
              </TouchableOpacity>
            {/* )} */}
          </View>
        : 
        
        <>
          <View style={{width:'90%',
          borderRadius:20,
          backgroundColor:'#fff',height:hp(16),
          marginTop:20,justifyContent:'center',
          alignSelf:'center'}}>
 <Image source={image.Buy} resizeMode='cover' style={{height:hp(16),
  position:'absolute',
  width:'50%',}} />
  <View style={{flexDirection:'row',justifyContent:'space-between'}}>
    <View style={{marginLeft:20,marginTop:-25}}>
            {logo && <Image source={getLogo(myPlan?.title)} resizeMode='contain' style={{height:80,width:80}} />}
            <View style={{marginTop:-20}}>
              <Line width={60} />
            </View>
            <Text style={{fontSize:30,color:'#fff',fontWeight:'700',marginTop:5}}>{myPlan?.price}{currency_symbole}</Text>
            <Text style={{fontSize:16,color:'#fff',fontWeight:'800'}}>{myPlan?.plan_details[0]?.lives} EXTRA LIVES</Text>
          </View>

          <View style={{width:'60%',alignItems:'center',justifyContent:'center'}}>
            <Image source={image.c_sub}  
            resizeMode='contain'
            style={{height:120,width:120}} />
               </View>
          </View>
         

          <View   style={{position:'absolute',right:20,flexDirection:'row',alignItems:'center',justifyContent:'space-between',
        bottom:10}} >
          
         
          <View>

          <Text style={{fontSize:12,color:'#777777',fontWeight:'800'}}>Validity {calculateDaysToEndDate(myPlan?.end_date)} days</Text>
          </View>
          </View>
          </View>
        <View style={[styles.contentContainer,]}>

        <View style={[styles.imageContainer,[{height:hp(45),width:'70%'}]]}>
          <Image source={image.Sub_b} resizeMode='cover' style={{height:hp(20),width:'100%',position:'absolute',}} />
          <View style={styles.subscriptionDetails}>
            {logo && <Image source={logo} resizeMode='contain' style={{height:80,width:80}} />}
            <View style={{marginTop:-20}}>
              <Line />
            </View>
            <Text style={{fontSize:18,color:'#fff',fontWeight:'700',marginTop:5}}>{price}{currency_symbole}</Text>
            <Text style={{fontSize:18,color:'#fff',fontWeight:'800'}}>{lives} Lives</Text>
          </View>
          <View style={{alignItems:'center',marginTop:5}}>
            <Text style={[styles.roseText,{fontSize:18,}]}>{roses} Roses</Text>
            <View style={styles.buttonsContainer}>
              <TouchableOpacity onPress={handleLeftPress}>
                <Image source={image.left} style={[styles.arrowButton,{height:30,width:30}]} />
              </TouchableOpacity>
              <TouchableOpacity onPress={handleRightPress}>
              <Image source={image.right} style={[styles.arrowButton,{height:30,width:30}]} />
              </TouchableOpacity>
            </View>
            <Text style={[styles.detailText,{fontSize:12}]}>CUSTOMIZABLE WALL</Text>
            <Text style={[styles.detailText,{fontSize:12}]}>LEAVE THE CHAT AT ANY TIME</Text>
            <Text style={[styles.detailText,{fontSize:12}]}>WITHOUT PENALTY</Text>
            <Text style={[styles.detailText,{fontSize:12}]}>ADD MULTIPLE PHOTOS</Text>
          </View>
        </View>
        
          <TouchableOpacity onPress={()=>{
            if(myPlan?.plan_id == id){
errorToast('You Alredy Purchase this Subscription')
            }
            else{
              Stripe_api()
            }
          }}>
           {myPlan?.plan_id != id && <LinearGradient
              colors={['#BD0DF4', '#FA3EBA']}
              start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} style={styles.linearGradient}>
              <Text style={styles.buttonText}>{myPlan?.plan_details?'Update Subscription':'Choose this type of subscription'}</Text>
            </LinearGradient>}
          </TouchableOpacity>
        {/* )} */}
      </View>  
    </>    }
        </>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  webView: {
    flex: 1
  },
  container: {
    flex: 1,
    backgroundColor: '#ffe4fa',
  },
  contentContainer: {
    flex: 1,
    alignItems: 'center',
  },
  imageContainer: {
    backgroundColor: '#fff',
    marginTop: 30,
    height: hp(63),
    borderRadius: 20,
    width: wp(90),
    overflow: 'hidden',
    position: 'relative',
  },
  image: {
    height: hp(37),
    width: '100%',
    position: 'absolute',
    top: -20,
    left: 0,
  },
  subscriptionDetails: {
    alignItems: 'center',
    marginTop: 20,
  },
  logo: {
    height: 20,
    marginBottom: 10, // Adjust as necessary
  },
  lineContainer: {
    marginTop: 15,
  },
  price: {
    fontSize: 50,
    fontWeight: '900',
    color: '#fff',
    fontFamily:'Lexend'
  },
  live: {
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
    fontFamily:'Lexend'
  },
  roseContainer: {
    alignItems: 'center',
    marginTop: hp(10),
  },
  roseText: {
    fontSize: 30,
    fontWeight: '900',
    color: '#BD0DF4',
    marginTop: 30,
    fontFamily:'Lexend'
  },
  buttonsContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'center',
    justifyContent: 'space-between',
    width: '90%',
    marginTop: 15,
  },
  arrowButton: {
    height: 35,
    width: 35,
  },
  detailText: {
    fontSize: 18,
    fontWeight: '900',
    color: '#FA3EBA',
    marginTop: 10,
    fontFamily:'Lexend'
  },
  linearGradient: {
    marginTop: 20,
    borderRadius: 10,
    height: 55,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  buttonText: {
    fontFamily:'Lexend',
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
    fontWeight: '600',
  },
});
