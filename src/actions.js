export const Type = {
    User: {
        login: 'USER_LOGIN',
        logout: 'USER_LOGOUT'
    }
}
export const User = {
    login: (username, password) => ({
            type: Type.User.login,
            payload: {
                username,
                password
            }
        }),
    logout: ()=>({type:Type.User.logout})
}