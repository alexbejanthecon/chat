export const login = (params: any) => {
    if(params.name === '' || params.password === '') {
        return({
            success: false,
            data: 'Login fields cannot be empty!'
        })
    } else if(params.name != "User" && params.password != "parola") {
        return({
            success: false,
            data: 'Incorrect email or password. Please check and try again!'
        })
    } else {
        return ({
            success: true,
            data: {
                name: 'User',
                status: params.status
            }
        })
    }
}
