import { useEffect } from "react";
import { useState } from "react";
import { Status } from "../../../../model/Status";
import { Prefecture } from "../../../../model/Prefecture"
import axios from "axios";
import "./SignUp.css"

export const SignUp2 = () => {
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
  const [autoPermission, setAutoPermission] = useState(false);
  const [status, setStatus] = useState([]);
  const [prefecture, setPrefecture] = useState([]);

  const [sexBoolean, setSexBoolean] = useState(true);

  const [selectedStatus, setSelectedStatus] = useState([] as Number[]);
  const [selectedPrefecture, setSelectedPrefecture] = useState([] as Number[]);

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
  },[sexBoolean]);

  /**
   * getStatus
   * status情報を取得
   */
  useEffect(() => {
    const getStatus = async () => {
      try {
        const {data} = await axios.get('/statuses');
        console.log(data.data);
        setStatus(data.data);
      } catch (e: any) {
        console.log('error:', e.message);
      }
    }
    getStatus();
  },[]);

  /**
   * checkStatus
   * statusのidを取得
   * @param id 
   * @returns selectedStatus
   */
  const checkStatus = (id: number) => {
    if (selectedStatus.some(s => s === id)) {
      setSelectedStatus(selectedStatus.filter(s => s !== id));
      return;
    }
    setSelectedStatus([...selectedStatus, id]);
    console.log('statuses', selectedStatus);
  }

  /**
   * getPrefecture
   * status情報を取得
   */
  useEffect(() => {
    const getPrefecture = async () => {
      try {
        const {data} = await axios.get('/prefectures');
        console.log(data.data);
        setPrefecture(data.data);
      } catch (e: any) {
        console.log('error:', e.message);
      }
    }
    getPrefecture();
  },[]);

  /**
   * checkPrefecture
   * prefectureのidを取得
   * @param id 
   * @returns selectedStatus
   */
  const checkPrefecture = (id: number) => {
    if (selectedPrefecture.some(s => s === id)) {
      setSelectedStatus(selectedPrefecture.filter(s => s !== id));
      return;
    }
    setSelectedPrefecture([...selectedPrefecture, id]);
    console.log('prefectures', selectedPrefecture);
  }

  const submit = () => {
    var uuid = localStorage.getItem('scout-go_uid')
    if (uuid) {
      setUuid(uuid);
      console.log('uuid:', uuid);
    }
    
  }

  return (
    <>
    <div className="signup-form">
      <form className="container" onSubmit={submit}>
        <h1 className="h3 mb-3 fw-normal">Create Account</h1>

        <div className="form-group">
          <label>氏名</label>
          <input type="text" className="form-control input-lg" placeholder="山田" required
            onChange={e => setLastName(e.target.value)}
          />
          <input type="text" className="form-control input-lg" placeholder="太郎" required
            onChange={e => setLastNameKana(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>氏名カナ</label>
          <input type="text" className="form-control input-lg" placeholder="ヤマダ" required
            onChange={e => setFirstName(e.target.value)}
          />
          <input type="text" className="form-control input-lg" placeholder="タロウ" required
            onChange={e => setFirstNameKana(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>ニックネーム</label>
          <input type="text" className="form-control input-lg" placeholder="nickname" required
            onChange={e => setNickname(e.target.value)}
          />
        </div>

        <div className="form-group">
          <label>誕生日</label>
          <input type="number" step="1" className="form-control input-lg" placeholder="2000" required
            onChange={e => setBirthYear(parseInt(e.target.value))}
          />
          <input type="number" step="1" className="form-control input-lg" placeholder="3" required
            onChange={e => setBirthMonth(parseInt(e.target.value))}
          />
          <input type="number" step="1" className="form-control input-lg" placeholder="19" required
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
                  <input className="form-check-input" type="checkbox" placeholder="ステータス"
                    value={s.id}
                    onChange={() => checkStatus(s.id)}
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
            {prefecture.map((p: Prefecture) => {
              return (
                <div className="form-check form-check-inline" key={p.id}>
                  <input className="form-check-input" type="checkbox" placeholder="都道府県"
                    value={p.id}
                    onChange={() => checkPrefecture(p.id)}
                  />
                  <label className="form-check-label">{p.name}</label>
                </div>
              );
            })}
          </div>
        </div>

        <button className="btn btn-success btn-lg btn-block signup-btn" type="submit">Submit</button>
      </form>
    </div>
    </>
  );
}