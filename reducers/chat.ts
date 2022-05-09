import {
    START_CHAT_SUCCESS,
    MESSAGE_SENT,
    ADD_RECEIVER,
    SET_CHAT_NAME,
} from "../constants/actionTypes";


const emptyArray: Array<any> = [];

const initialState = {
    chats: emptyArray
};

const chatReducer = (state = initialState, action: any) => {
    switch (action.type) {
        case START_CHAT_SUCCESS:
            return {
                ...state,
                chats: [...state.chats, action.chat]
            }
        case MESSAGE_SENT:
            return {
                ...state,
                chats: state.chats.map((chat: any) => chat.id === action.chatId ? {
                    ...chat,
                    messages: [...chat.messages],
                } : chat)
            }
        case ADD_RECEIVER:
            console.log("receiver in reductor", action.payload);
            return {
                ...state,
                chats: state.chats.map((chat: any) => chat.id === action.chatId ? {
                    ...chat,
                    receivers: [...chat.receivers, action.payload]
                } : chat)
            }
        case SET_CHAT_NAME:
            console.log("chat name in reductor ", action.payload);
            return {
                ...state,
                chats: state.chats.map((chat: any) => chat.id === action.chatId ? {
                    ...chat,
                    chatName: action.payload
                } : chat)
            }
        default:
            return state;
    }
}
export default chatReducer;
