import {Button, ScrollView, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, View} from '../components/Themed';
import {useDispatch, useSelector} from "react-redux";
import {chatSelect} from "../selectors";
import * as actions from "../actions";
import {useState} from "react";

export default function TabTwoScreen({navigation}: any) {
    const dispatch = useDispatch();
    const chats = useSelector(chatSelect).chats;
    const [newId, setNewId] = useState('');

    const generateRandomNumber = (min: number, max: number) => {
        return Math.floor(Math.random() * (max - min + 1) + min);
    }

    const onSelectChat = (chatId: any) => {
        navigation.navigate('Chat', {
            chatId: chatId,
            previous_screen: 'chats'
        })
    }

    async function createGroupChat() {
        await setNewId(generateRandomNumber(1, 100000).toString());
        dispatch(actions.chatActions.onStartChat({
            id: newId,
            receivers: [],
            messages: [],
            chatType: "group"
        }))

        navigation.navigate("Chat", {
            chatId: newId,
            previous_screen: 'chats',
        });
    }

    return (
        <View style={styles.container}>
            <View style={{width: "90%", flex: 1,}}>
                <ScrollView contentContainerStyle={styles.chatList}>
                    {chats ? chats.map((item: any, index: number) => {
                        return (
                            <TouchableOpacity
                                key={index}
                                onPress={() => onSelectChat(item.id)}
                            >
                                <View style={styles.chatContainer}>
                                    <Text style={styles.chatTitle}>
                                        {item.chatType === "simple" ? item.receivers[0] : item.chatName}
                                    </Text>
                                    <Text style={styles.lastMsg}>
                                        - {item.messages.length ? item.messages[item.messages.length - 1].text ? item.messages[item.messages.length - 1].text : 'Image' : 'Empty Chat!'}
                                    </Text>
                                </View>
                                <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
                            </TouchableOpacity>
                        );
                    }) : null}
                </ScrollView>
            </View>
            <View style={styles.separator} lightColor="#eee" darkColor="rgba(255,255,255,0.1)"/>
            <View style={styles.buttonList}>
                <TouchableOpacity style={styles.btn}
                                  onPress={() => navigation.navigate('Contacts', {previous_screen: 'allChats'})}>
                    <Text style={styles.btnText}>Create simple chat!</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.btn} onPress={() => createGroupChat()}>
                    <Text style={styles.btnText}>Create group chat!</Text>
                </TouchableOpacity>
            </View>
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
    },
    separator: {
        marginVertical: 10,
        height: 1,
        width: '890%',
    },
    buttonList: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        marginBottom: 10,
    },
    btn: {
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        marginLeft: 10,
        marginRight: 10,
        paddingLeft: 5,
        paddingRight: 5,
        backgroundColor: "#048571",
    },
    btnText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 12,
        marginLeft: 10,
        marginRight: 10,
        paddingLeft: 5,
        paddingRight: 5,
    },
    chatList: {
        flex: 1,
    },
    chatContainer: {
        backgroundColor: "#e8e8e8",
        paddingHorizontal: 15,
        paddingVertical: 20,
        borderRadius: 20,
    },
    chatElement: {
        backgroundColor: "#e8e8e8",
    },
    chatTitle: {
        fontSize: 18
    },
    lastMsg: {
        fontSize: 12,
        marginLeft: 5,
        color: "#b8b9ba"
    }
});
