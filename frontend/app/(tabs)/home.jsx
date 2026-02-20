import { StyleSheet, View, Text, FlatList, ActivityIndicator, Image, Pressable } from "react-native";
import { SafeAreaView } from 'react-native-safe-area-context';


const HomeScreen = () => {
    return (
        <View style={styles.container}>
            <Text style={styles.text}>Welcome Home again</Text>

        </View>
    );
};
export default HomeScreen;

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: '#FAFBF5',
    },
    text: {
        fontSize: 40,
        fontFamily: 'confortaa',
        color: '#81827C',
        marginBottom: 8,
        textAlign: 'center',
    }
})