import {Alert, StyleSheet, TextInput, TouchableOpacity} from 'react-native';
import { Text, View } from '../components/Themed';
import { RootTabScreenProps } from '../types';
import {useState} from "react";
import {useDispatch} from "react-redux";
import * as functions from "../functions/index";
import {authActions} from "../actions";


export default function Login({ navigation }: RootTabScreenProps<'TabOne'>) {

    const [name, setName] = useState('User');
    const [password, setPassword] = useState('parola');
    const dispatch = useDispatch();

    const handleLogin = async () => {
        const params = {
            name : name,
            password : password,
            status: 'Online'
        }

        const response  = await functions.onLogin(params);

        if(response.success) {
            dispatch(authActions.onLogin(response.data));
            navigation.navigate('Tabs');
        } else {
            Alert.alert('Error', response.data.toString() );
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.title}>Login to MyChatingApp</Text>
            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    placeholder="Name."
                    value={"User"}
                    placeholderTextColor="#003f5c"
                    onChangeText={(name) => setName(name)}
                />
            </View>

            <View style={styles.inputView}>
                <TextInput
                    style={styles.TextInput}
                    value={"parola"}
                    placeholder="Password."
                    placeholderTextColor="#003f5c"
                    secureTextEntry={true}
                    onChangeText={(password) => setPassword(password)}
                />
            </View>
            <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
                <Text style={styles.loginText}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 40,
        borderBottomWidth: 1,
        padding: 15,
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    inputView: {
        backgroundColor: "#e8e8e8",
        borderRadius: 10,
        width: "70%",
        height: 50,
        marginBottom: 20,
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },
    loginBtn:
        {
            width:"80%",
            borderRadius:25,
            height:50,
            alignItems:"center",
            justifyContent:"center",
            marginTop:40,
            backgroundColor:"#048571",
        },
    loginText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 18,
    }
});
