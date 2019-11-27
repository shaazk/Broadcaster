class User {
  constructor(userId, fullName, email, password, phoneNumber, username, role = 'citizen') {
    this.userId = userId;
    this.fullName = fullName;
    this.email = email;
    this.password = password;
    this.phoneNumber = phoneNumber;
    this.username = username;
    this.role = role;
  }
}
export default User;
