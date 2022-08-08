import { signOut } from 'firebase/auth'
import { auth } from '../../utils/firebase';

export const Header = () => {
  const clickLogout = async () => {
    signOut(auth).then(()=>{
      console.log("ログアウトしました");
    })
    .catch( (error)=>{
      console.log(`ログアウト時にエラーが発生しました (${error})`);
    });
  }

  return(
    <>
      <button onClick={clickLogout}>SignOut</button>
    </>
  );
}