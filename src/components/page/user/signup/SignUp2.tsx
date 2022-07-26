import { useEffect } from "react";
import { useState } from "react";
import { Status } from "../../../../model/Status";
import { Prefecture } from "../../../../model/Prefecture";
import axios from "axios";
import "./SignUp.css"
import { SyntheticEvent } from "react";
import { Navigate } from "react-router-dom";
import { useCallback } from "react";
import { useCookies } from 'react-cookie';

export const SignUp2 = () => {
  const [uuid, setUuid] = useState("");
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

  const [errorMessage, setErrorMessage] = useState("");

  const [sexBoolean, setSexBoolean] = useState(true);
  const [statusRequired, setStatusRequired] = useState(true);
  const [prefectureRequired, setPrefectureRequired] = useState(true);
  const [checkedAllPrefecture, setCheckedAllPrefecture] = useState(false);

  const [userState, setUserState] = useState(false);

  const [cookies, setCookie, removeCookie] = useCookies(['scout_go_uuid']);

  /**
   * checkUserState
   * userのサインインステータスの確認
   */
  useEffect(() => {
    const checkUserState = async () => {
      // signIn状態の確認
      if (cookies.scout_go_uuid) {
        setUuid(cookies.scout_go_uuid);
      } else {
        return <Navigate to='/' />
      }
      
      // uuidからユーザー情報の登録を確認
      try {
        const { data } = await axios.get('/get_user_from_uuid', {
          params: {
            uuid: uuid
          }
        })
        if (data.status) {
          setUserState(true);
        }
        console.log('data', data);
      } catch (e: any) {
        console.error(e.message);
      }
    }
    checkUserState();
  }, [])

  /**
   * checkSex
   * 性別情報の取得
   */
  useEffect(() => {
    const checkSex = () => {
      console.log('sexboolean', sexBoolean);
      var maleStatus = document.getElementsByName("maleStatus")[0] as HTMLInputElement;
      var femaleStatus = document.getElementsByName("femaleStatus")[0] as HTMLInputElement;
      if (sexBoolean) {
        maleStatus.checked = true;
        femaleStatus.checked = false;
        setSex("male")
      } else {
        maleStatus.checked = false;
        femaleStatus.checked = true;
        setSex("female")
      }
    }
    checkSex();
  }, [sexBoolean]);

  /**
   * getStatus
   * status情報を取得
   */
  useEffect(() => {
    const getStatus = async () => {
      try {
        const { data } = await axios.get('/statuses');
        console.log(data);
        setStatus(data.data);
        if (!data.status) {
          setErrorMessage('ステータス情報の取得に失敗しました。ページを再ロードしてください。')
        }
      } catch (e: any) {
        console.error('error:', e.message);
        setErrorMessage("通信障害が発生しました。")
      }
    }
    getStatus();
  }, []);

  /**
   * requiredStatus
   * requiredの状態制御
   */
  const requiredStatus = () => {
    var status = document.getElementsByName('status-check');
    var count = 0;
    for (let i = 0; i < status.length; i++) {
      var checkedStatus = status[i] as HTMLInputElement;
      if (checkedStatus.checked) {
        count = count + 1;
        console.log('count2', count);
      }
    }
    if (count > 0) {
      setStatusRequired(false);
    } else {
      setStatusRequired(true);
    }
  }

  /**
   * getPrefecture
   * 就業可能エリア情報を取得
   */
  useEffect(() => {
    const getPrefecture = async () => {
      try {
        const { data } = await axios.get('/prefectures');
        console.log(data);
        setPrefecture(data.data);
        if (!data.status) {
          setErrorMessage('就業可能エリア取得に失敗しました。ページを再ロードしてください。')
        }
      } catch (e: any) {
        console.log('error:', e.message);
        setErrorMessage("通信障害が発生しました。")
      }
    }
    getPrefecture();
  }, []);

  useEffect(() => {
    checkAllPrefecture();
    requiredPrefecture();
  }, [checkedAllPrefecture])

  /**
   * checkAllPrefecture
   * 都道府県の全選択全解除
   */
  const checkAllPrefecture = () => {
    var checkPrefectures = document.getElementsByName("prefecture-check");
    for (let i = 0; i < checkPrefectures.length; i++) {
      var checkedPrefecture = checkPrefectures[i] as HTMLInputElement;
      checkedPrefecture.checked = checkedAllPrefecture;
    }
  }

  /**
   * requiredPrefecture
   * requiredの状態制御
   */
  const requiredPrefecture = () => {
    console.log("required prefecture");
    var prefecture = document.getElementsByName("prefecture-check");
    var count = 0;
    for (let i = 0; i < prefecture.length; i++) {
      var checkedPrefecture = prefecture[i] as HTMLInputElement;
      if (checkedPrefecture.checked) {
        count = count + 1;
        console.log('count2', count);
      }
    }
    if (count > 0) {
      setPrefectureRequired(false);
    } else {
      setPrefectureRequired(true);
    }
  }

  /**
   * submit
   * ユーザー情報作成
   */
  const submit = useCallback(async (e: SyntheticEvent) => {
    e.preventDefault();

    try {
      // 選択されたステータスの配列の生成
      var statuses = document.getElementsByName("status-check");
      var checkedStatus = [] as number[];
      for (var i = 0; i < statuses.length; i++) {
        var checkedStatusResult = statuses[i] as HTMLInputElement;
        if (checkedStatusResult.checked === true) {
          checkedStatus.push(parseInt(checkedStatusResult.value));
        }
      }

      // 選択された就業可能エリアの配列の生成
      var prefectures = document.getElementsByName("prefecture-check");
      var checkedPrefecture = [] as number[];
      for (let i = 0; i < prefectures.length; i++) {
        var checkedPrefectureResult = prefectures[i] as HTMLInputElement;
        if (checkedPrefectureResult.checked == true) {
          checkedPrefecture.push(parseInt(checkedPrefectureResult.value));
        }
      }

      console.log(checkedStatus, checkedPrefecture)

      // user情報の登録
      const { data } = await axios.post('/users', {
        uuid: uuid,
        last_name: lastName,
        last_name_kana: lastNameKana,
        first_name: firstName,
        first_name_kana: firstNameKana,
        nickname: nickname,
        birth_Year: birthYear,
        birth_month: birthMonth,
        birth_day: birthDay,
        sex: sex,
        statuses: checkedStatus,
        prefectures: checkedPrefecture,
      });
      console.log('apiResult:', data);
      if (data.status) {
        setUserState(true);
      } else {
        setErrorMessage('ユーザー情報の登録に失敗しました。入力情報をご確認ください。');
      }
    } catch (e: any) {
      console.error('error:', e.message, e.config.url)
      setErrorMessage('ユーザー情報登録時にエラーが発生しました。')
    }
  }, [lastName, lastNameKana, firstName, firstNameKana, nickname, birthYear, birthMonth, birthDay, sex]);

  if (userState) {
    return <Navigate to='/' />
  }

  return (
    <>
      <div className="signup-form">
        <form className="container" onSubmit={submit}>
          <h2 className="h3 mb-3 fw-normal">Create Account</h2>
          {
            errorMessage === ''
              ? <div></div>
              : <div className="alert alert-danger" role="alert">{errorMessage}</div>
          }
          <div className="form-group">
          <label>氏名</label>
            <input type="text" className="form-control input-lg" placeholder="山田" required
              onChange={e => setLastName(e.target.value)}
            />
            <input type="text" className="form-control input-lg" placeholder="太郎" required
              onChange={e => setFirstName(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>氏名カナ</label>
            <input type="text" className="form-control input-lg" placeholder="ヤマダ" required
              pattern="^[\u30A0-\u30FF]+$" title="全角カタカナ"
              onChange={e => setLastNameKana(e.target.value)}
            />
            <input type="text" className="form-control input-lg" placeholder="タロウ" required
              pattern="^[\u30A0-\u30FF]+$" title="全角カタカナ"
              onChange={e => setFirstNameKana(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>ニックネーム</label>
            <input type="text" className="form-control input-lg" placeholder="nickname" required
              pattern="^[0-9a-zA-Z]*$" title="半角英大文字・半角英小文字・半角数字"
              onChange={e => setNickname(e.target.value)}
            />
          </div>

          <div className="form-group">
            <label>誕生日</label>
            <input type="text" step="1" className="form-control input-lg" placeholder="2000" required
              pattern="[0-9]{4}" title="半角数字4桁"
              onChange={e => setBirthYear(parseInt(e.target.value))}
            />
            <input type="text" step="1" className="form-control input-lg" placeholder="3" required
              pattern="[0-9]{1,2}" title="半角数字1〜2桁"
              onChange={e => setBirthMonth(parseInt(e.target.value))}
            />
            <input type="text" step="1" className="form-control input-lg" placeholder="19" required
              pattern="[0-9]{1,2}" title="半角数字1〜2桁"
              onChange={e => setBirthDay(parseInt(e.target.value))}
            />
          </div>

          <div className="form-group">
            <label>性別</label>
            <div className="col-sm-10">
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" name="maleStatus" placeholder="性別"
                  value={"male"}
                  onChange={e => setSexBoolean(!sexBoolean)}
                />
                <label className="form-check-label">男性</label>
              </div>
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" name="femaleStatus" placeholder="性別"
                  value={"female"}
                  onChange={e => setSexBoolean(!sexBoolean)}
                />
                <label className="form-check-label">女性</label>
              </div>
            </div>
          </div>

          <div className="form-group">
            <label>ステータス</label>
            <div className="col-sm-10">
              {status.map((s: Status) => {
                return (
                  <div className="form-check form-check-inline" key={s.id}>
                    <input className="form-check-input" type="checkbox" placeholder="ステータス" name="status-check" required={statusRequired}
                      value={s.id}
                      onChange={e => requiredStatus()}
                    />
                    <label className="form-check-label">{s.name}</label>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="form-group">
            <label>就業可能エリア</label>
            <div className="col-sm-10">
              <div className="form-check form-check-inline">
                <input className="form-check-input" type="checkbox" placeholder="全て" name="prefecture-all-check" checked={checkedAllPrefecture} required={prefectureRequired}
                  value="全て"
                  onChange={() => setCheckedAllPrefecture(!checkedAllPrefecture)}
                />
                <label className="form-check-label">全て</label>
              </div>
            </div>
            <div className="col-sm-10">
              {prefecture.map((p: Prefecture) => {
                return (
                  <div className="form-check form-check-inline" key={p.id}>
                    <input className="form-check-input" type="checkbox" placeholder="都道府県" name="prefecture-check" required={prefectureRequired}
                      value={p.id}
                      onChange={e => requiredPrefecture()}
                    />
                    <label className="form-check-label">{p.name}</label>
                  </div>
                );
              })}
            </div>
          </div>

          <div className="form-group">
            <button className="btn btn-success btn-lg btn-block signup-btn" type="submit">Submit</button>
          </div>
        </form>
      </div>
    </>
  );
}