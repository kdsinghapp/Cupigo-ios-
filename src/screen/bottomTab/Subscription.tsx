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

  console.log(myPlan?.plan_id,id);
  
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
          <View style={[styles.contentContainer,]}>
            <View style={[styles.imageContainer,[{borderWidth:myPlan?.plan_id == id ?5:0,borderColor:'#00FF00'}]]}>
              <Image source={image.Sub_b} resizeMode='cover' style={styles.image} />
              <View style={styles.subscriptionDetails}>
                {logo && <Image source={logo} resizeMode='contain' style={styles.logo} />}
                <View style={styles.lineContainer}>
                  <Line />
                </View>
                <Text style={styles.price}>{currency_symbole}{price}</Text>
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
            {myPlan.is_active === 'ACTIVE' ? (
              <TouchableOpacity onPress={handleUpgrade}>
                <LinearGradient
                  colors={['#00FF00', '#00FF00']} // Adjust gradient colors for upgrade button
                  start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} style={styles.linearGradient}>
                  <Text style={[styles.buttonText,{fontWeight:'700'}]}>Upgrade Subscription</Text>
                </LinearGradient>
              </TouchableOpacity>
            ) : (
              <TouchableOpacity onPress={Stripe_api}>
                <LinearGradient
                  colors={['#BD0DF4', '#FA3EBA']}
                  start={{ x: 1, y: 0 }} end={{ x: 0, y: 0 }} style={styles.linearGradient}>
                  <Text style={styles.buttonText}>Choose this type of subscription</Text>
                </LinearGradient>
              </TouchableOpacity>
            )}
          </View>
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
  },
  live: {
    fontSize: 20,
    fontWeight: '900',
    color: '#fff',
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
    fontSize: 18,
    textAlign: 'center',
    margin: 10,
    color: '#ffffff',
    backgroundColor: 'transparent',
    fontWeight: '600',
  },
});