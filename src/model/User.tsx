export class  User {
  constructor(
    public id = 0,
    public last_name = '',
    public last_name_kana = '',
    public first_name = '',
    public first_name_kana = '',
    public nickname = '',
    public sex = '',
    public birth_year = Number,
    public birth_month = Number,
    public birth_day = Number,
  ){
  }
}