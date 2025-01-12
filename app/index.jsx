
import { Text, View, StyleSheet, TouchableOpacity, StatusBar } from "react-native";
import { useNavigation } from '@react-navigation/native';


export default function Index() {
    const navigation = useNavigation();

    const handlePress = () => {
        navigation.navigate('Home');
    };

    return (
        <View style={styles.container}>
        <StatusBar barStyle="light-content" backgroundColor="#FF7366" />
            <View style={styles.onboarding}>
                <Text style={styles.logo}>Wallpaper</Text>
            </View>
            <View style={styles.bottom}>
                    <TouchableOpacity style={styles.button} onPress={handlePress}>
                        <Text style={styles.buttonText}>Explore</Text>
                    </TouchableOpacity>
            </View>
        </View>
    );
}

  const styles = StyleSheet.create({
    container: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      backgroundColor:'#FF7366'
    },
      onboarding: {
          flex: 1,
          justifyContent: "center",
          alignItems: "center",
      },
      bottom: {
          height: 200,
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          backgroundColor:'transparent'
      },
      button:{
          backgroundColor:'white',
          display:'flex',
          justifyContent:'center',
          alignItems:'center',
          padding:20,
          width:300,
          borderRadius:10,
      },
      buttonText:{
          fontSize:20,
          color:'#FF7366',
          fontWeight:'bold'
      },
      logo:{
          fontSize:60,
          color:'white',
          fontWeight:'bold',
          textShadowColor: 'rgba(0, 0, 0, 0.3)',
          textShadowOffset: { width: 2, height: 2 }, 
          textShadowRadius: 5, 
      }
  });
  