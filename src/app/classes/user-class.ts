export class UserClass {
  id: string;
  userName: string;
  email: string;
  userType: number;

  constructor(id: string, userName: string, email: string, userType: number) {
    this.id = id;
    this.userName = userName;
    this.email = email;
    this.userType = userType;
  }
}
