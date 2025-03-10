import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, Pressable } from 'react-native';
import Colors from './../../constant/Colors';
import { useRouter } from "expo-router";
import { useContext, useState } from 'react';
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from '../../config/firebaseConfig';
import { doc, setDoc } from 'firebase/firestore';
import {UserDetailContext} from "./../../context/UserDetailContext"
import { ActivityIndicator } from 'react-native-web';


export const SignUp=()=> {
    const router = useRouter();
  
    // State variables
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const[loading, setLoading] =useState(false)
    
    const { setUserDetail } = useContext(UserDetailContext);
  
    // Create Account Function
    const CreateNewAccount = async () => {
        setLoading(true)
      setErrorMessage(""); // Reset error message
  
      // Validate inputs
      if (!fullName || !email || !password) {
        setErrorMessage("All fields are required!");
        return;
      }
  
      try {
        const resp = await createUserWithEmailAndPassword(auth, email, password);
        const user = resp.user;
        console.log("User Created:", user);
  
        await SaveUser(user);
        router.replace("/noCourse");
        setLoading(false)
      } catch (error) {
        setLoading(false)
        setErrorMessage(error.message);
        console.log("Signup Error:", error.message);
      }
    };
  
    // Save User to Firestore
    const SaveUser = async (user) => {
      try {
        const data = {
          name: fullName,
          email: email,
          member: false,
          uid: user.uid,
        };
  
        await setDoc(doc(db, "users", email), data);
        setUserDetail(data);
      } catch (error) {
        console.log("Firestore Error:", error.message);
      }
    };


    return (
        <View style={[styles.container,{backgroundColor: Colors.DARK_BG}]}>
            <Image 
                source={require("./../../assets/images/logo.png")}
                style={styles.logo}
            />
            <Text style={[styles.title,{color: Colors.ACCENT}]}>Create New Account</Text>

            <TextInput 
                placeholder='Full Name' 
                placeholderTextColor={Colors.TEXT_LIGHT}
                onChangeText={(value) => setFullName(value)} 
                style={[styles.textInput,{color: Colors.TEXT_DARK,backgroundColor: Colors.CARD_BG}]} 
            />
            <TextInput 
                placeholder='Email' 
                placeholderTextColor={Colors.TEXT_LIGHT}
                onChangeText={(value) => setEmail(value)} 
                keyboardType="email-address" 
                style={[styles.textInput,{ color: Colors.TEXT_DARK,backgroundColor: Colors.CARD_BG}]} 
            />
            <TextInput 
                placeholder='Password' 
                placeholderTextColor={Colors.TEXT_LIGHT}
                onChangeText={(value) => setPassword(value)} 
                secureTextEntry={true} 
                style={[styles.textInput,{ color: Colors.TEXT_DARK,backgroundColor: Colors.CARD_BG}]} 
            />
            <TouchableOpacity onPress={CreateNewAccount} style={[styles.button,{backgroundColor: Colors.PRIMARY}]}>
                {
                     loading ?
                     <ActivityIndicator size={'large'} color={Colors.WHITE} />
                    :
                    <Text style={[styles.buttonText,{color: Colors.WHITE}]}>Create Account</Text>
                }
                
            </TouchableOpacity>

            <View style={styles.loginContainer}>
                <Text style={[styles.loginText,{color: Colors.TEXT_LIGHT}]}>Already have an account?</Text>
                <Pressable onPress={() => router.push('/auth/loginIn')}>
                    <Text style={[styles.loginLink,{color: Colors.ACCENT}]}>Sign in here</Text>
                </Pressable>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 25,
        
    },
    logo: {
        width: 150, 
        height: 150,
        marginBottom: 20
    },
    title: {
        fontSize: 24,
        fontFamily: 'outfit-bold',
        marginBottom: 20,
    },
    textInput: {
        borderWidth: 1,
        width: '100%',
        padding: 15,
        fontSize: 16,
        borderRadius: 8,
        marginBottom: 15,
        
    },
    button: {
        padding: 15,
        width: '100%',
        borderRadius: 10,
        alignItems: 'center',
        marginTop: 10,
    },
    buttonText: {
        
        fontSize: 18,
        fontFamily: 'outfit',
    },
    loginContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginTop: 15,
    },
    loginText: {
        fontFamily: 'outfit',

    },
    loginLink: {
         
        fontFamily: 'outfit-bold',
        marginLeft: 5,
    }
});

export default SignUp;
