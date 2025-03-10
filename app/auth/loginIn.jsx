import { useRouter } from 'expo-router'
import { StyleSheet, View, Text, Image, TextInput, TouchableOpacity, Pressable, ToastAndroid, ActivityIndicator } from 'react-native';
import Colors from './../../constant/Colors';
import { useContext, useState } from 'react';
import { auth, db } from "./../../config/firebaseConfig";
import { signInWithEmailAndPassword } from 'firebase/auth';
import { collection, doc, getDoc, getDocs, query, where } from 'firebase/firestore';
import { UserDetailContext } from "./../../context/UserDetailContext";
import Feather from '@expo/vector-icons/Feather';

const LoginIn = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    // const [courseList, setCourseList] = useState([]);

    const router = useRouter();
    const { setUserDetail,courseList, setCourseList } = useContext(UserDetailContext);

    const onSignInClick = async () => {
       
        setLoading(true);
        setCourseList([])
        try {
            
            // Step 1: Authenticate the user
            const resp = await signInWithEmailAndPassword(auth, email, password);
            const user = resp.user;
    
            // Step 2: Fetch user details
            const userDetails = await getUserDetail(email);
            console.log("userDetails",userDetails);
            

            if (!userDetails) {
                throw new Error("User details not found");
            }
            setUserDetail(userDetails);
    
            // Step 3: Fetch courses based on user email
            const courses = await getUserCourses(userDetails.email);
            console.log("courses",courses);
            setCourseList(courses);
    
            setLoading(false);
            
            // Step 4: Navigate based on courses availability
            if (courses.length == 0) {
                router.push('/noCourse')
            } else {
                router.push("/(tabs)/home");
            }
    
        } catch (error) {
            setLoading(false);
            console.error("Login Error:", error.message);
            ToastAndroid.show("Incorrect Email & Password", ToastAndroid.BOTTOM);
        }
    };
    
    // Fetch user details separately
    const getUserDetail = async (email) => {
        try {
            const userDoc = await getDoc(doc(db, "users", email));
            return userDoc.exists() ? userDoc.data() : null;
        } catch (error) {
            console.error("Error fetching user details:", error);
            return null;
        }
    };
    
    // Fetch courses separately
    const getUserCourses = async (email) => {
        try {
            const q = query(collection(db, "Courses"), where("createdBy", "==", email));
            const querySnapshot = await getDocs(q);
    
            let courses = [];
            querySnapshot.forEach((doc) => {
                courses.push(doc.data());
            });
    
            return courses;
        } catch (error) {
            console.error("Error fetching courses:", error);
            return [];
        }
    };
    

    return (
        <View style={[styles.container, { backgroundColor: Colors.DARK_BG }]}>
            <Image source={require("./../../assets/images/logo.png")} style={styles.logo} />
            <Text style={[styles.title, { color: Colors.TEXT_DARK }]}>Welcome Back!</Text>
            <Text style={[styles.subtitle, { color: Colors.TEXT_LIGHT }]}>Login to continue your learning journey</Text>

            <TextInput
                placeholder='Email'
                placeholderTextColor={Colors.TEXT_LIGHT}
                onChangeText={setEmail}
                autoCapitalize="none"
                keyboardType="email-address"
                style={[styles.textInput, { color: Colors.TEXT_DARK, backgroundColor: Colors.CARD_BG }]}
            />
            <View style={styles.inputWrapper}>
                <TextInput
                    placeholder='Password'
                    placeholderTextColor={Colors.TEXT_LIGHT}
                    onChangeText={setPassword}
                    secureTextEntry={!showPassword}
                    style={[styles.textInput, { backgroundColor: Colors.CARD_BG, color: Colors.TEXT_DARK }]}
                />
                <Pressable style={styles.eyeIcon} onPress={() => setShowPassword(!showPassword)}>
                    <Feather name={showPassword ? 'eye' : 'eye-off'} size={15} color={Colors.ACCENT} />
                </Pressable>
            </View>

            <TouchableOpacity onPress={onSignInClick} disabled={loading} style={[styles.loginButton, { backgroundColor: Colors.PRIMARY }]}>
                {loading ?
                    <ActivityIndicator size={'large'} color={Colors.WHITE} />
                    : <Text style={[styles.loginText, { color: Colors.WHITE }]}>Login</Text>
                }
            </TouchableOpacity>

            <View style={styles.registerContainer}>
                <Text style={{ color: Colors.TEXT_LIGHT }}>Don't have an account?</Text>
                <Pressable onPress={() => router.push('/auth/signUp')}>
                    <Text style={[styles.registerLink, { color: Colors.ACCENT }]}>Register here</Text>
                </Pressable>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        padding: 25,
    },
    logo: {
        width: 100,
        height: 100,
        marginBottom: 15,
        marginTop: 20
    },
    title: {
        marginTop: 20,
        fontSize: 24,
        fontWeight: 'bold',
    },
    subtitle: {
        fontSize: 13,
        marginBottom: 20,
    },
    inputWrapper: {
        width: '100%',
        position: 'relative'
    },
    eyeIcon: {
        position: 'absolute',
        right: 20,
        top: 20,
        zIndex: 999
    },
    textInput: {
        width: '100%',
        padding: 15,
        fontSize: 16,
        borderRadius: 10,
        marginBottom: 15,
    },
    loginButton: {
        width: '100%',
        padding: 15,
        borderRadius: 10,
        alignItems: 'center',
    },
    loginText: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    registerContainer: {
        flexDirection: 'row',
        marginTop: 10,
    },
    registerLink: {
        fontWeight: 'bold',
        marginLeft: 5,
    },
});

export default LoginIn;
