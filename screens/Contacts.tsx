import {StatusBar} from 'expo-status-bar';
import {Platform, StyleSheet, TouchableOpacity} from 'react-native';
import * as functions from '../functions/index'
import {Text, View} from '../components/Themed';
import {useEffect, useState} from "react";
import {useDispatch, useSelector} from "react-redux";
import {chatSelect} from "../selectors/";
import * as actions from "../actions/index";

export default function Contacts({navigation, route}: any) {

    const [users, setUsers] = useState([{}]);
    const [newChat, setNewChat] = useState(Object)
    const chats = useSelector(chatSelect).chats;
    const previousScreen = route.params.previous_screen;
    const chatId = route.params.chatId;
    const dispatch = useDispatch();

    useEffect(() => {
        const response = functions.onGetUsers();
        if (response.success) {
            setUsers(response.data);
        }
    }, [])

    const generateRandomNumber = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    async function onSelectContact(userName: string) {
        if (chats.find((chat: any) => chat.receivers.length === 1 && chat.receivers[0] === userName)) {
            navigation.navigate("Chat", {
                receivers: [userName],
                previous_screen: 'users'
            });
        } else {
            dispatch(actions.chatActions.onStartChat({
                id: generateRandomNumber(1, 100000).toString(),
                receivers: [userName],
                messages: [],
                chatType: "simple"
            }))

            navigation.navigate("Chat", {
                receivers: [userName],
                previous_screen: 'users'
            });
        }
    }

    async function addContactToGroupChat(username: string) {
        dispatch(actions.chatActions.onAddReceiver(username, chatId));
        navigation.goBack();
    }


    return (
        <View style={styles.container}>
            <Text style={styles.title}>{previousScreen === 'groupChat' ? 'Select a contact:' : 'Start a chat'}</Text>
            <Text
                style={styles.description}>{previousScreen === 'groupChat' ? 'Select a contact to add it to the group chat.' :
                'To start a chat select one of the users bellow:'} </Text>
            <View style={styles.list}>
                {users.map((item: any, index: number) => {
                    return (
                        <TouchableOpacity
                            style={styles.listItem}
                            onPress={() => {
                                if(previousScreen === 'groupChat') {
                                    addContactToGroupChat(item.name)
                                } else {
                                    onSelectContact(item.name)
                                }
                            }}
                            key={index}
                        >
                            <View style={item.status === 'Online' ? styles.online : styles.offline}></View>
                            <Text style={styles.userName}>{item.name}</Text>
                        </TouchableOpacity>
                    );
                })}
            </View>
            {/* Use a light status bar on iOS to account for the black space above the modal */}
            <StatusBar style={Platform.OS === 'ios' ? 'light' : 'auto'}/>
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
        marginBottom: 20,
    },
    description: {
        fontSize: 14,
        marginBottom: 40,
        borderBottomWidth: 1,
        paddingBottom: 10
    },
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    list: {
        width: "80%",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center"
    },
    listItem: {
        flexDirection: "row",
        marginBottom: 10,
        backgroundColor: "#e8e8e8",
        borderWidth: 1,
        borderRadius: 20,
        borderColor: "#b8b9ba",
        width: "70%",
        padding: 10,
        alignItems: "center"
    },
    userName: {
        fontSize: 18,
    },
    online: {
        width: 10,
        height: 10,
        borderRadius: 50,
        marginRight: 10,
        backgroundColor: '#048571',
    },
    offline: {
        width: 10,
        height: 10,
        marginRight: 10,
        borderRadius: 50,
        backgroundColor: '#ab2f02',
    },
});
