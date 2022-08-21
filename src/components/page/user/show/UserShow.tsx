import axios from "axios";
import { useState, useEffect } from "react"
import { Navigate, useParams } from "react-router-dom";
import { auth } from "../../../../utils/firebase";

export const UserShow = () => {

  const [uuid, setUuid] = useState("")
  const [errorMessage, setErrorMessage] = useState("");

  const {id} = useParams();
  const getId = () => {
    return id;
  }

  /**
   * getUserShow
   * ユーザーの詳細情報を取得
   */
  useEffect(() => {
    // signIn状態の確認
    console.log('signIn状態の確認')
    auth.onAuthStateChanged(user => {
      if (user) {
        console.log('user signed in');
        setUuid(user.uid);
        getUserShow();
      } else {
        console.log('user not signed in');
        return <Navigate to='/' />
      }
    })
  }, []);

  const getUserShow = async () => {
    try {
      console.log('here')
      const id = getId();
      const { data } = await axios.get(`users/${id}`, {
        params: {
          uuid: uuid
        }
      })
      console.log(data);
      
    } catch (e: any) {
      console.error('error:', e.message);
      setErrorMessage("通信障害が発生しました。");
    }
  }

  return (
    <>
      <h1>User詳細</h1>
    </>
  );
}