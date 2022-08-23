import axios from "axios";
import { useState, useEffect } from "react"
import { Navigate, useParams } from "react-router-dom";
import { Status } from "../../../../model/Status";
import { Prefecture } from "../../../../model/Prefecture";
import { School } from "../../../../model/School";
import { Work } from "../../../../model/Work";
import { License } from "../../../../model/License";
import { auth } from "../../../../utils/firebase";

export const UserShow = () => {

  // user情報のstate
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

  const [uuidFromFirebase, setUuidFromFireBase] = useState("");

  const {id} = useParams();
  const getId = () => {
    return id;
  }

  useEffect(() => {
    // signIn状態の確認
    console.log('signIn状態の確認')
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log('user signed in');
        setUuidFromFireBase(user.uid);
        getUserShow();
      } else {
        console.log('user not signed in');
        return <Navigate to='/' />
      }
    })
  }, []);

  /**
   * getUserShow
   * ユーザーの詳細情報を取得
   */
  const getUserShow = async () => {
    try {
      const id = getId();
      // user情報の取得
      const { data } = await axios.get(`users/${id}`, {
        params: {
          uuid: uuidFromFirebase
        }
      })
      console.log(data.data);
      const user = data.data;
      setUuid(user.uuid);
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
    } catch (e: any) {
      console.error('error:', e.message);
      setErrorMessage("通信障害が発生しました。");
    }
  }

  return (
    <>
      {
        uuid === uuidFromFirebase
        ? <h1>{lastName} {firstName}</h1>
        : <h1>{nickname}</h1>
      }

      {
        uuid === uuidFromFirebase
        ? status.map((s: Status) => {
            return (
              <div className="form-check form-check-inline">
                <label className="form-check-label">{s.name}</label>
              </div>
            );
          })
        : <></>
      }

      {prefecture.map((p: Prefecture) => {
        return (
          <div className="form-check form-check-inline">
            <label className="form-check-label">{p.name}</label>
          </div>
        );
      })}

      {works.map((w: Work) => {
        return (
          <div className="form-check form-check-inline">
            <label className="form-check-label">{w.name}</label>
          </div>
        );
      })}

      {schools.map((s: School) => {
        return (
          <div className="form-check form-check-inline">
            <label className="form-check-label">{s.name}</label>
          </div>
        );
      })}

      {licenses.map((l: License) => {
        return (
          <div className="form-check form-check-inline">
            <label className="form-check-label">{l.name}</label>
          </div>
        );
      })}
    </>
  );
}