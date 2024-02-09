export class ChangePasswordDto {
  email: string;
  password: string;
  newPassword: string;

  constructor(newPassword: string, email: string, password: string) {
    this.newPassword = newPassword;
    this.email = email;
    this.password = password;
  }
}
