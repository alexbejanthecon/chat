import {all, put, takeEvery} from "redux-saga/effects";
import * as actionsTypes from "../constants/actionTypes";
import * as functions from "../functions/index";

function* startChat(action: any) {
    yield put({type: actionsTypes.START_CHAT_SUCCESS, chat: action.payload});
}

function* watchStartChat() {
    yield takeEvery(actionsTypes.START_CHAT, startChat);
}

export default function* chatSagas() {
    yield all([watchStartChat()]);
}
