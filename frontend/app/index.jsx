import { StyleSheet, View, Text, TouchableOpacity, Image, Pressable } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';
import { router } from 'expo-router';
import { StatusBar } from "react-native";
import 'typeface-comfortaa';

export default function OnboardingScreen() {

    // const handleGetStarted = () => {
    //     router.replace('/(auth)');
    // };
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="Dark" backgroundColor="#fff" />

            <View style={styles.header}>
                <Text style={styles.appName}> 🍔 casaBite</Text>
                {/* <Text style={styles.title}> Welcome to CasaBite when Your Favorite Dishes, On the Go</Text>  */}
            </View>
            <View style={styles.imageContainer}>
                <Image
                    source={require('../assets/images/motor.png')}
                    style={styles.image}
                    resizeMode="contain"
                />
                <Text style={styles.title}>Good Food</Text>
                <Text style={styles.SubTitle}> Welcome to CasaBite when Your Favorite Dishes, On the Go</Text>
                <View style={styles.buttonContainer}>
                    <Pressable style={styles.PrimaryButton}
                        onPress={() => router.push('/(auth)/Register')}>
                        <Text style={styles.primaryButtonText}>Sign Up</Text>
                    </Pressable>
                    <Pressable
                        style={styles.secondaryButton}
                        onPress={() => router.push('/(auth)/Login')}>
                        <Text style={styles.secondaryButtonText}>Log In</Text>

                    </Pressable>
                </View>
            </View>
        </SafeAreaView>
    );
};
const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 24,
    },
    header: {
        alignItems: 'center',
        marginTop: 20,
    },
    appName: {
        fontSize: 30,
        fontWeight: 'bold',
        color: '#e8590c',
    },
    imageContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    image: {
        width: 300,
        height: 300,
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#333',
        textAlign: 'center',
        marginTop: 20,
        marginBottom: 10,
    },
    SubTitle: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#666',
        textAlign: 'center',
        marginBottom: 24,
        paddingHorizontal: 10,
    },
    buttonContainer: {
        width: '100%',
    },
    PrimaryButton: {
        height: 56,
        backgroundColor: '#e8590c',
        borderRadius: 14,
        alignItems: 'center',
        justifyContent: 'center',
        marginBottom: 16,
    },
    primaryButtonText: {
        color: '#f8f9fa',
        fontSize: 19,
        fontFamily: 'Comfortaa',
    },
    secondaryButton: {
        height: 56,
        borderRadius: 14,
        borderWidth: 1,
        borderColor: '#252525ff',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#f1f1f1',
    },
    secondaryButtonText: {
        color: '#e8590c',
        fontSize: 19,
        fontFamily: 'Comfortaa',
        fontWeight: '600',
    },

});