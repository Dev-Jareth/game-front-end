export const Type = {
    User: {
        login: 'USER_LOGIN',
        logout: 'USER_LOGOUT'
    }
}
export const User = {
    login: (username, password) => ({
        type: Type.User.login,
        payload: fetch('http://localhost:3001/users/login', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify({username, password})
        }).then(res => res.json())

    }),
    logout: () => ({type: Type.User.logout})
}