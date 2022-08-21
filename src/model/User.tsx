export class  User {
  constructor(
    public id = 0,
    public lastName = '',
    public lastNameKana = '',
    public firstName = '',
    public firstNameKana = '',
    public nickname = '',
    public sex = '',
    public birthYear = Number,
    public birthMonth = Number,
    public birthDay = Number,
  ){
  }
}