import * as local from "./response";

export const onGetUsers = () => {
    return local.getUsers();
}

export const onLogin = (params: any) => {
    return local.login(params);
}
