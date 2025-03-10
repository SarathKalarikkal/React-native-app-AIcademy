import { Image, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Colors from "../constant/Colors";
import { useRouter } from "expo-router";
import { onAuthStateChanged } from "firebase/auth";
import { auth, db } from "./../config/firebaseConfig";
import { doc, getDoc } from "firebase/firestore";
import { useContext } from "react";
import { UserDetailContext } from "./../context/UserDetailContext";


export default function Index() {
  const router = useRouter();
  const { userDetail, setUserDetail,courseList } = useContext(UserDetailContext);
  

  onAuthStateChanged(auth, async (user) => {
    if (user) {
      const result = await getDoc(doc(db, "users", user?.email));
      setUserDetail(result.data());
      // if(courseList.length == 0){
      //   router.push("/noCourse");
      // }else{
      //   router.replace("/(tabs)/home");
      // }
     
    }
  });

  return (
    <View style={[styles.container,{backgroundColor: Colors.DARK_BG}]}>
      <Image source={require("./../assets/images/landing.png")} style={styles.image} />

      <View style={[styles.card,{backgroundColor: Colors.CARD_BG,}]}>
        <Text style={[styles.title,{color: Colors.WHITE}]}>Welcome to AIcademy </Text>
        <Text style={[styles.subtitle,{color: Colors.TEXT_LIGHT}]}>
          Transform your ideas into engaging educational content effortlessly with AI
        </Text>

        <TouchableOpacity style={[styles.primaryButton,{backgroundColor: Colors.PRIMARY,shadowColor: Colors.ACCENT}]} onPress={() => router.push("/auth/signUp")}> 
          <Text style={[styles.primaryButtonText,{color: Colors.WHITE}]}>Get Started</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={[styles.secondaryButton,{borderColor: Colors.WHITE}]} onPress={() => router.push("/auth/loginIn")}> 
          <Text style={[styles.secondaryButtonText,{color: Colors.WHITE}]}>Already have an account?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  image: {
    width: "100%",
    height: 250,
    marginTop: 0,
  },
  card: {
    padding: 25,
    // borderTopLeftRadius: 35,
    // borderTopRightRadius: 35,
    width: "100%",
    height: '100%',
    alignItems: "center",
    elevation: 5,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: -5 },
  },
  title: {
    fontSize: 32,
    fontWeight: "bold",
    textAlign: "center",
    fontFamily: "outfit-bold",
  },
  subtitle: {
    fontSize: 18,
  
    marginTop: 15,
    textAlign: "center",
    fontFamily: "outfit",
  },
  primaryButton: {
    padding: 15,
    marginTop: 25,
    borderRadius: 12,
    width: "90%",
    alignItems: "center",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 4 },
  },
  primaryButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
  secondaryButton: {
    padding: 15,
    backgroundColor: "transparent",
    marginTop: 15,
    borderRadius: 12,
    borderWidth: 1,
    width: "90%",
    alignItems: "center",
  },
  secondaryButtonText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});
