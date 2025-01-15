let User: {
    Username: string,
    Password: string
}

function putUser(Username: string, Password: string){
    User = {
        Username,
        Password
    }
}

export {
    putUser,
    User
}