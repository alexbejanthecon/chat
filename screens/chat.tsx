import {
    ActivityIndicator,
    Alert, Image, Linking,
    Modal,
    Platform,
    ScrollView,
    StyleSheet,
    TextInput,
    TouchableOpacity
} from 'react-native';
import {Text, View} from '../components/Themed';
import {useDispatch, useSelector} from "react-redux";
import {chatSelect, userSelect} from "../selectors";
import {useEffect, useState} from "react";
import {Ionicons} from '@expo/vector-icons';
import {Entypo} from '@expo/vector-icons';
import {AntDesign} from '@expo/vector-icons';
import * as actions from "../actions/index";
import {useFocusEffect} from "@react-navigation/native";
import * as ImagePicker from 'expo-image-picker';

export default function Chat({navigation, route}: any) {
    const emptyArray: Array<any> = [];
    const user = useSelector(userSelect);
    const chats = useSelector(chatSelect).chats;
    const [chat, setChat] = useState(
        {
            chatType: '',
            chatName: '',
            receivers: emptyArray,
            messages: emptyArray,
            id: '',
        }
    );
    const [message, setMessage] = useState('');
    const [chatName, setChatName] = useState('');
    const [newChatName, setNewChatName] = useState('');
    const [modalVisibility, setModalVisibility] = useState(false);
    const lastScreen = route.params.previous_screen;
    let receivers = route.params.receivers;
    let chatId = route.params.chatId;
    const dispatch = useDispatch();

    useFocusEffect(() => {
        if (lastScreen === 'users') {
            setChat(chats.find((chat: any) => chat.receivers.length === 1 && chat.receivers[0] === receivers[0]));
        } else if (lastScreen === 'chats') {
            setChat(chats.find((chat: any) => chat.id === chatId));
            setNewChatName(chats.find((chat: any) => chat.id === chatId).chatName)
        }
    })

    function submitMessage() {
        let newChat = chat;
        let newMessagesArray = [];

        newChat.messages.push({
            text: message,
            author: user.name
        })

        newMessagesArray.push({
            text: message,
            author: user.name
        })

        chat.receivers.forEach((receiver: any) => {
            newChat.messages.push({
                text: message + "♥️",
                author: receiver
            })

            newMessagesArray.push({
                text: message + "♥️",
                author: receiver
            })
        })

        dispatch(actions.chatActions.onSendMessage(newMessagesArray, chat.id));
        setChat(newChat);
        setMessage('');
    }


    const AddReceivers = () => {
        return (
            <View style={styles.addReceiveBtn}>
                <TouchableOpacity style={styles.sendBtn} onPress={() => {
                    onAddReceivers()
                }}>
                    <AntDesign name="adduser" size={18} color="#fff"/>
                </TouchableOpacity>
            </View>
        );
    }

    const EditChatName = () => {
        return (
            <View style={styles.addReceiveBtn}>
                <TouchableOpacity style={styles.toggleModalButton} onPress={() => setModalVisibility(!modalVisibility)}>
                    <Entypo name="edit" size={16} color="black"/>
                </TouchableOpacity>
            </View>
        );
    }

    function onAddReceivers() {
        navigation.navigate('Contacts', {
            previous_screen: 'groupChat',
            chatId: chatId
        })
    }

    function onSetChatName() {
        setNewChatName(chatName);
        dispatch(actions.chatActions.onSetChatName(chatName, chat.id));
    }

    /** Image Picker */
    async function pickImage() {
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            allowsEditing: true,
            aspect: [16, 9],
            quality: 1,
        });

        if (!result.cancelled) {
            let newChat = chat;
            let newMessagesArray = [];
            let image = {
                imageUrl: result.uri,
                author: user.name
            }
            newChat.messages.push(image);
            newMessagesArray.push(image);

            dispatch(actions.chatActions.onSendMessage(newMessagesArray, chat.id));
            setChat(newChat);
            setMessage('');
        }
    }

    /** Permission Function */
    async function permissionRequest() {
        if (Platform.OS !== 'web') {
            const {status} = await ImagePicker.requestMediaLibraryPermissionsAsync();
            if (status !== 'granted') {
                Alert.alert(
                    'Acces nepermis',
                    'Permite aplicatiei sa acceseze continutul Galerie pentru a alege o imagine de profil!',
                    [{
                        text: 'Inapoi',
                    }, {
                        text: 'Setari', onPress: () => {
                            Linking.openSettings()
                        }
                    }]
                )
            } else {
                await pickImage();
            }
        }
    }

    if (chat) {
        return (
            <View style={styles.container}>

                <Modal visible={modalVisibility}>
                    <View style={styles.container}>
                        <Text style={styles.title}>Edit Chat Name</Text>
                        <View style={styles.controls}>
                            <View style={styles.inputView}>
                                <TextInput
                                    style={styles.TextInput}
                                    placeholder="Enter a chat name!"
                                    placeholderTextColor="#003f5c"
                                    value={chatName}
                                    onChangeText={(message) => setChatName(message)}
                                    onSubmitEditing={() => {
                                        onSetChatName();
                                        setModalVisibility(!modalVisibility);
                                    }}
                                />
                            </View>
                            <TouchableOpacity style={styles.sendBtn} onPress={() => {
                                onSetChatName();
                                setModalVisibility(!modalVisibility);
                            }}>
                                <AntDesign name="check" size={18} color="#fff"/>
                            </TouchableOpacity>
                        </View>

                        <TouchableOpacity style={[styles.closeBtn]} onPress={() => {
                            setModalVisibility(!modalVisibility);
                        }}>
                            <AntDesign name="close" size={24} color="#fff"/>
                        </TouchableOpacity>

                    </View>
                </Modal>

                <View style={styles.chatHeader}>
                    {chat.chatType === 'simple' ?
                        <Text style={styles.title}>{chat.receivers[0]}</Text> :
                        <View style={styles.chatNameContainer}>
                            <Text style={styles.title}>{newChatName}</Text>
                            <EditChatName/>
                        </View>
                    }
                    {chat.chatType === 'group' ? <AddReceivers/> : null}
                </View>
                <View style={{width: "90%", flex: 1,}}>
                    <ScrollView style={styles.msgList}>
                        {chat.messages.length ? chat.messages.map((item: any, index: number) => {
                            return (
                                <View
                                    style={item.author === user.name ? styles.ownMessage : styles.guestMessage}
                                    key={index}
                                >
                                    {item.imageUrl ?
                                        <Image style={{width: 150, height: 150}} source={{uri: item.imageUrl }} /> :
                                        <View style={styles.msgContainer}>
                                            <Text style={styles.msgAuthor}>
                                                {item.author}
                                            </Text>
                                            <Text style={styles.msgContent}>
                                                {item.text}
                                            </Text>
                                        </View>}
                                </View>
                            )
                        }) : null}
                    </ScrollView>
                </View>

                <View style={styles.controls}>

                    <TouchableOpacity style={styles.sendBtn} onPress={() => permissionRequest()}>
                        <Entypo name="images" size={18} color="#fff"/>
                    </TouchableOpacity>

                    <View style={styles.inputView}>
                        <TextInput
                            style={styles.TextInput}
                            placeholder="Write a message :)"
                            placeholderTextColor="#003f5c"
                            value={message}
                            onChangeText={(message) => setMessage(message)}
                            onSubmitEditing={submitMessage}
                        />
                    </View>
                    <TouchableOpacity style={styles.sendBtn} onPress={submitMessage}>
                        <Ionicons name="send" size={18} color="#fff"/>
                    </TouchableOpacity>
                </View>
            </View>
        );
    } else {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="small" color="#b8b9ba"/>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    chatHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        width: "100%",
        paddingHorizontal: 20
    },
    chatNameContainer: {
        flexDirection: "row",
    },
    msgList: {
        flex: 1,
    },
    controls: {
        flexDirection: "row",
        justifyContent: "space-evenly",
        width: "100%"
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 40,
        padding: 15,
    },
    chatName: {},
    separator: {
        marginVertical: 30,
        height: 1,
        width: '80%',
    },
    inputView: {
        backgroundColor: "#e8e8e8",
        borderRadius: 10,
        width: "60%",
        height: 50,
        marginBottom: 20,
    },
    TextInput: {
        height: 50,
        flex: 1,
        padding: 10,
        marginLeft: 20,
    },
    sendBtn: {
        width: 50,
        borderRadius: 25,
        height: 50,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#048571",
    },
    closeBtn: {
        width: 50,
        borderRadius: 25,
        height: 50,
        marginTop: 40,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f27938",
    },
    toggleModalButton: {
        height: 40,
        alignItems: "center",
        justifyContent: "center",
    },
    addReceiveBtn: {
        marginTop: 10,
    },
    loginText: {
        color: "#fff",
        fontWeight: "600",
        fontSize: 18,
    },
    ownMessage: {
        alignSelf: "flex-start",
        alignItems: "flex-start",
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10,
        backgroundColor: "rgba(4, 133, 113, 0.2)",
        marginBottom: 5,
    },
    guestMessage: {
        alignSelf: "flex-end",
        alignItems: "flex-end",
        paddingHorizontal: 10,
        paddingVertical: 15,
        borderRadius: 10,
        backgroundColor: "rgba(232, 232, 232, 0.2)",
        marginBottom: 5,
    },
    msgContainer: {
      backgroundColor: "transparent"
    },
    msgAuthor: {
        marginBottom: 5,
        fontSize: 16,
        fontWeight: "600"
    },
    msgContent: {
        fontSize: 14,
    }
});
