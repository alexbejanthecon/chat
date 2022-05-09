import {ADD_RECEIVER, MESSAGE_SENT, SET_CHAT_NAME, START_CHAT} from "../constants/actionTypes";

export function onStartChat(chat: any) {
    return {
        type: START_CHAT,
        payload: chat
    }
}

export function onSendMessage(message: any, chatId: any) {
    return {
        type: MESSAGE_SENT,
        payload: message,
        chatId: chatId,
    }
}

export function onSetChatName(name: any, chatId: any) {
    return {
        type: SET_CHAT_NAME,
        payload: name,
        chatId: chatId,
    }
}

export function onAddReceiver(receiver: any, chatId: any) {
    return {
        type: ADD_RECEIVER,
        payload: receiver,
        chatId: chatId,
    }
}
