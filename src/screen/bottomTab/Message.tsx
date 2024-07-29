// import React, { useState, useEffect } from 'react';
// import { View, Text, StyleSheet, Image, TextInput, FlatList, TouchableOpacity, Platform } from 'react-native';
// import LinearGradient from 'react-native-linear-gradient';
// import Search from '../../assets/svg/search.svg';
// import { useIsFocused, useNavigation } from '@react-navigation/native';
// import ScreenNameEnum from '../../routes/screenName.enum';
// import firestore from '@react-native-firebase/firestore';
// import { useSelector } from 'react-redux';

// const Message = () => {
//   const navigation = useNavigation();
//   const [searchQuery, setSearchQuery] = useState('');
//   const [matches, setMatches] = useState([]);
//   const [filteredMatches, setFilteredMatches] = useState([]);
//   const user = useSelector(state => state.auth.User);
// const isFocuse =useIsFocused()
  
//   useEffect(() => {
//     const fetchMatches = async () => {
//       try {
//         // Assuming you have a way to get the current user's ID
//         const currentUserId = user?.id; // Replace with actual method to get user ID
    
//         // Fetch the current user's document from Firestore
//         const userDoc = await firestore().collection('matches').doc(currentUserId).get();
        
//         if (userDoc.exists) {
//           const userContacts = userDoc.data().contacts || [];
    
//           // Transform contacts data
//           const matchesData = userContacts.map(contact => ({
//             id: contact.id,
//             image: contact.userImage,
//             name: contact.userName,
//             message: contact.message || '', // Assuming `message` might not be part of `contacts`
//             time: contact.time || '', // Assuming `time` might not be part of `contacts`
//             unread: contact.unread || 0, // Assuming `unread` might not be part of `contacts`
//           }));
    
//           setMatches(matchesData);
//           setFilteredMatches(matchesData); // Set initial filtered matches
//         } else {
//           console.log('No matches found for the current user.');
//         }
//       } catch (error) {
//         console.error('Error fetching matches:', error);
//       }
//     };
    

//     fetchMatches();
//   }, [user,isFocuse]);

//   useEffect(() => {
//     if (searchQuery) {
//       const filtered = matches.filter(match =>
//         match.name.toLowerCase().includes(searchQuery.toLowerCase())
//       );
//       setFilteredMatches(filtered);
//     } else {
//       setFilteredMatches(matches);
//     }
//   }, [searchQuery, matches]);

//   return (
//     <View style={styles.container}>
//       <View style={{ height: Platform.OS === 'ios' ? 32 : 0 }} />
//       <Text style={styles.headerText}>Message</Text>

//       <View style={styles.searchInput}>
//         <Search />
//         <TextInput
//           placeholder="Search"
//           style={{ marginLeft: 10 }}
//           value={searchQuery}
//           onChangeText={text => setSearchQuery(text)}
//         />
//       </View>

//       {filteredMatches.length > 0 ? (
//         <>
//           <Text style={styles.sectionTitle}>New Matches</Text>
//           <View style={styles.matchesContainer}>
//             <FlatList
//               horizontal
//               data={filteredMatches}
//               renderItem={({ item }) => (
//                 <TouchableOpacity
//                   onPress={() => navigation.navigate(ScreenNameEnum.CHAT_SCREEN, { item: item })}
//                   style={styles.matchImage}
//                 >
//                   <Image source={{ uri: item.image }} resizeMode="contain" style={styles.matchImageContent} />
//                   <View style={styles.onlineIndicator} />
//                 </TouchableOpacity>
//               )}
        
//               showsHorizontalScrollIndicator={false}
//             />
//           </View>

//           <Text style={styles.sectionTitle}>Messages</Text>
//           <FlatList
//             data={filteredMatches}
//             renderItem={({ item }) => (
//               <TouchableOpacity
//                 onPress={() => navigation.navigate(ScreenNameEnum.CHAT_SCREEN, { item: item })}
//                 style={styles.messageItem}
//               >
//                 <TouchableOpacity onPress={() => navigation.navigate(ScreenNameEnum.UserProfile)}>
//                   <Image source={{ uri: item.image }} style={styles.userImage} />
//                 </TouchableOpacity>
//                 <View style={styles.messageLeft}>
//                   <Text style={styles.userName}>{item.name}</Text>
//                   <Text style={styles.userMessage}>{item.message}</Text>
//                 </View>
//                 <View style={styles.messageRight}>
//                   <Text style={styles.messageTime}>{item.time}</Text>
//                   {item.unread > 0 && (
//                     <LinearGradient colors={['#BD0DF4', '#FA3EBA']} style={styles.unreadBadge}>
//                       <Text style={styles.unreadText}>{item.unread}</Text>
//                     </LinearGradient>
//                   )}
//                 </View>
//               </TouchableOpacity>
//             )}
//             keyExtractor={item => item.id}
//             showsVerticalScrollIndicator={false}
//           />
//         </>
//       ) : (
//         <View style={styles.noContactsContainer}>
//           <Text style={styles.noContactsText}>No Contact Found</Text>
//         </View>
//       )}
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: '#ffe4fa',
//     padding: 20,
//   },
//   headerText: {
//     fontSize: 24,
//     fontWeight: 'bold',
//     textAlign: 'center',
//     marginBottom: 20,
//     color: '#5A2D82',
//     fontFamily: 'Lexend',
//   },
//   searchInput: {
//     backgroundColor: 'white',
//     borderRadius: 15,
//     paddingHorizontal: 15,
//     flexDirection: 'row',
//     alignItems: 'center',
//     marginBottom: 20,
//     height: 45,
//   },
//   sectionTitle: {
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#000',
//     marginBottom: 10,
//     fontFamily: 'Lexend',
//   },
//   matchesContainer: {
//     height: 80,
//   },
//   matchImage: {
//     width: 55,
//     height: 55,
//     borderRadius: 27.5,
//     marginRight: 10,
//     borderWidth: 2,
//     borderColor: '#fff',
//   },
//   matchImageContent: {
//     height: 50,
//     width: 50,
//     borderRadius: 25,
//   },
//   onlineIndicator: {
//     height: 8,
//     width: 8,
//     borderRadius: 4,
//     right: 0,
//     top: 5,
//     backgroundColor: '#BFFF6F',
//     position: 'absolute',
//   },
//   messageItem: {
//     flexDirection: 'row',
//     justifyContent: 'space-between',
//     alignItems: 'center',
//     marginBottom: 20,
//   },
//   messageLeft: {
//     flexDirection: 'row',
//     alignItems: 'center',
//     width: '80%',
//   },
//   userImage: {
//     width: 50,
//     height: 50,
//     borderRadius: 25,
//     marginRight: 10,
//   },
//   userName: {
//     fontFamily: 'Lexend',
//     fontSize: 16,
//     fontWeight: 'bold',
//     color: '#000',
//   },
//   userMessage: {
//     fontFamily: 'Lexend',
//     fontSize: 14,
//     color: 'gray',
//   },
//   messageRight: {
//     alignItems: 'flex-end',
//   },
//   messageTime: {
//     fontSize: 12,
//     color: 'gray',
//     fontFamily: 'Lexend',
//   },
//   unreadBadge: {
//     backgroundColor: '#5A2D82',
//     borderRadius: 15,
//     paddingVertical: 2,
//     paddingHorizontal: 5,
//     marginTop: 5,
//   },
//   unreadText: {
//     color: 'white',
//     fontSize: 12,
//     fontFamily: 'Lexend',
//   },
//   noContactsContainer: {
//     flex: 1,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },
//   noContactsText: {
//     color: '#000',
//   },
// });

// export default Message;


import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, TextInput, FlatList, TouchableOpacity, Platform } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Search from '../../assets/svg/search.svg';
import { useIsFocused, useNavigation } from '@react-navigation/native';
import ScreenNameEnum from '../../routes/screenName.enum';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import useUserPresence from './userOnline';


const Message = () => {
  const navigation = useNavigation();
  const [searchQuery, setSearchQuery] = useState('');
  const [matches, setMatches] = useState([]);
  const [filteredMatches, setFilteredMatches] = useState([]);
  const user = useSelector(state => state.auth.User);
  const isFocused = useIsFocused();


  useUserPresence()

  useEffect(() => {
    const fetchMatches = async () => {
      if (!user || !user.id) {
        console.error('Current user is not defined or invalid');
        return;
      }
  
      try {
        const currentUserId = user.id;
        const userDocRef = firestore().collection('matches').doc(currentUserId);
        const userDoc = await userDocRef.get();
  
        if (!userDoc.exists) {
          console.log('No matches found for the current user.');
          setMatches([]);
          setFilteredMatches([]);
          return;
        }
  
        const userContacts = userDoc.data().contacts || [];
        const matchesData = await Promise.all(userContacts.map(async contact => {
          try {
            const statusDocRef = firestore().doc(`users/${contact.id}`);
            const statusDoc = await statusDocRef.get();
            const status = statusDoc.exists ? statusDoc.data().status : { state: 'offline' };
  
            return {
              id: contact.id,
              image: contact.userImage,
              name: contact.userName,
              message: contact.message || '',
              time: contact.time || '',
              unread: contact.unread || 0,
              status: status.state,
            };
          } catch (statusError) {
            console.error(`Error fetching status for contact ${contact.id}:`, statusError);
            return {
              id: contact.id,
              image: contact.userImage,
              name: contact.userName,
              message: contact.message || '',
              time: contact.time || '',
              unread: contact.unread || 0,
              status: 'offline',
            };
          }
        }));
  
        setMatches(matchesData);
        setFilteredMatches(matchesData);
        console.log('matchesData', matchesData);
  
      } catch (error) {
        console.error('Error fetching matches:', error);
        setMatches([]);
        setFilteredMatches([]);
      }
    };
  
    fetchMatches();
  }, [user, isFocused]);
  

  useEffect(() => {
    if (searchQuery) {
      const filtered = matches.filter(match =>
        match.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredMatches(filtered);
    } else {
      setFilteredMatches(matches);
    }
  }, [searchQuery, matches]);

  return (
    <View style={styles.container}>
      <View style={{ height: Platform.OS === 'ios' ? 32 : 0 }} />
      <Text style={styles.headerText}>Message</Text>

      <View style={styles.searchInput}>
        <Search />
        <TextInput
          placeholder="Search"
          style={{ marginLeft: 10 }}
          value={searchQuery}
          onChangeText={text => setSearchQuery(text)}
        />
      </View>

      {filteredMatches.length > 0 ? (
        <>
          <Text style={styles.sectionTitle}>New Matches</Text>
          <View style={styles.matchesContainer}>
            <FlatList
              horizontal
              data={filteredMatches}
              renderItem={({ item }) => (
                <TouchableOpacity
                  onPress={() => navigation.navigate(ScreenNameEnum.CHAT_SCREEN, { item: item })}
                  style={styles.matchImage}
                >
                  <Image source={{ uri: item.image }} resizeMode="contain" style={styles.matchImageContent} />
                  {item.status === 'online' && <View style={styles.onlineIndicator} />}
                </TouchableOpacity>
              )}
              keyExtractor={item => item.id}
              showsHorizontalScrollIndicator={false}
            />
          </View>

          <Text style={styles.sectionTitle}>Messages</Text>
          <FlatList
            data={filteredMatches}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={() => navigation.navigate(ScreenNameEnum.CHAT_SCREEN, { item: item })}
                style={styles.messageItem}
              >
                <TouchableOpacity onPress={() => navigation.navigate(ScreenNameEnum.UserProfile)}>
                  <Image source={{ uri: item.image }} style={styles.userImage} />
                  {item.status === 'online' && <View style={styles.onlineIndicator} />}
                </TouchableOpacity>
                <View style={styles.messageLeft}>
                  <Text style={styles.userName}>{item.name}</Text>
                  <Text style={styles.userMessage}>{item.message}</Text>
                </View>
                <View style={styles.messageRight}>
                  <Text style={styles.messageTime}>{item.time}</Text>
                  {item.unread > 0 && (
                    <LinearGradient colors={['#BD0DF4', '#FA3EBA']} style={styles.unreadBadge}>
                      <Text style={styles.unreadText}>{item.unread}</Text>
                    </LinearGradient>
                  )}
                </View>
              </TouchableOpacity>
            )}
            keyExtractor={item => item.id}
            showsVerticalScrollIndicator={false}
          />
        </>
      ) : (
        <View style={styles.noContactsContainer}>
          <Text style={styles.noContactsText}>No Contact Found</Text>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffe4fa',
    padding: 20,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20,
    color: '#5A2D82',
    fontFamily: 'Lexend',
  },
  searchInput: {
    backgroundColor: 'white',
    borderRadius: 15,
    paddingHorizontal: 15,
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
    height: 45,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 10,
    fontFamily: 'Lexend',
  },
  matchesContainer: {
    height: 80,
  },
  matchImage: {
    width: 55,
    height: 55,
    borderRadius: 27.5,
    marginRight: 10,
    borderWidth: 2,
    borderColor: '#fff',
  },
  matchImageContent: {
    height: 50,
    width: 50,
    borderRadius: 25,
  },
  onlineIndicator: {
    height: 8,
    width: 8,
    borderRadius: 4,
    right: 0,
    top: 5,
    backgroundColor: '#BFFF6F',
    position: 'absolute',
  },
  messageItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  messageLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '80%',
  },
  userImage: {
    width: 50,
    height: 50,
    borderRadius: 25,
    marginRight: 10,
  },
  userName: {
    fontFamily: 'Lexend',
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000',
  },
  userMessage: {
    fontFamily: 'Lexend',
    fontSize: 14,
    color: 'gray',
  },
  messageRight: {
    alignItems: 'flex-end',
  },
  messageTime: {
    fontSize: 12,
    color: 'gray',
    fontFamily: 'Lexend',
  },
  unreadBadge: {
    backgroundColor: '#5A2D82',
    borderRadius: 15,
    paddingVertical: 2,
    paddingHorizontal: 5,
    marginTop: 5,
  },
  unreadText: {
    color: 'white',
    fontSize: 12,
    fontFamily: 'Lexend',
  },
  noContactsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noContactsText: {
    color: '#000',
  },
});

export default Message;
