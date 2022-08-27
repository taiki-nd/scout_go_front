import axios from "axios";
import { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useCookies } from 'react-cookie';

export const UserMyPageEdit = (() => {
  const [uuid, setUuid] = useState("")
  const [lastName, setLastName] = useState("");
  const [lastNameKana, setLastNameKana] = useState("");
  const [firstName, setFirstName] = useState("");
  const [firstNameKana, setFirstNameKana] = useState("");
  const [nickname, setNickname] = useState("");
  const [sex, setSex] = useState("");
  const [birthYear, setBirthYear] = useState(Number);
  const [birthMonth, setBirthMonth] = useState(Number);
  const [birthDay, setBirthDay] = useState(Number);
  const [status, setStatus] = useState([]);
  const [prefecture, setPrefecture] = useState([]);
  const [schools, setSchools] = useState([]);
  const [works, setWorks] = useState([]);
  const [licenses, setLicense] = useState([]);

  const [errorMessage, setErrorMessage] = useState("");
  const [userMatch, setUserMatch] = useState(true);

  const [cookies, setCookie, removeCookie] = useCookies(['scout_go_uuid']);

  const {id} = useParams();
  const getId = () => {
    return id;
  }

  /**
   * getUserInfo
   * ユーザー情報の取得
   */
  useEffect(() => {
    // signIn状態の確認
    if (cookies.scout_go_uuid) {
      setUuid(cookies.scout_go_uuid);
    } else {
      removeCookie("scout_go_uuid");
    }

    const id = getId();
    const getUserInfo = async () => {
      const {data} = await axios.get(`/users/${id}`, {
        params: {
          uuid: cookies.scout_go_uuid
        }
      });
      console.log('userInfo', data);
      if (!data.status) {
        console.log('failed to get userInfo')
        setErrorMessage('ユーザー情報の取得に失敗しました。再度ページを読み込んでください。')
        return;
      }
      const user = data.data;
      setUuid(user.uuid);
      // サインインユーザーとマイページユーザーの一致確認
      if (user.uuid === cookies.scout_go_uuid){
        console.log('user matched');
        setUserMatch(true);
      } else {
        console.log('user not matched');
        setUserMatch(false);
      }
      setLastName(user.last_name);
      setLastNameKana(user.last_name_kana);
      setFirstName(user.first_name);
      setFirstNameKana(user.first_name_kana);
      setNickname(user.nickname);
      setSex(user.sex);
      setBirthYear(user.birth_Year);
      setBirthMonth(user.birth_month);
      setBirthDay(user.birth_day);
      // status情報の取得
      setStatus(user.statuses);
      // 就業可能エリアの取得
      setPrefecture(user.prefectures);
      // 学歴の取得
      setSchools(user.schools);
      // 職歴情報の取得
      setWorks(user.works);
      // 資格情報の取得
      setLicense(user.licenses);
    }
    getUserInfo();
  }, []);

  console.log(firstName);

  return(
    <>
      <h1>Edit MyPage</h1>
    </>
  );
})