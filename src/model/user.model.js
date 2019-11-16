class User{
    constructor(userId, fullname, email, password, PhoneNumber, username, role = 'citizen'){
        this.userId = userId;
        this.fullname = fullname;
        this.email = email;
        this.password = password;
        this.PhoneNumber = PhoneNumber;
        this.username = username;
        this.role = role;
    }
}
export default User;