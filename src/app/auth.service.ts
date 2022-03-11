export class AuthService {
  loggedIn = false;

  //check the state
  isAuthenticated(){
    const promise = new Promise(
      (resolve, reject) => {
        setTimeout(() => {
          resolve(this.loggedIn);
        }, 500);
      }
    );
    return promise;
  }

  login(){
    //執行login()的時候路由守衛會判斷是否有權限可以進入此畫面，有權限的話0.5s後畫面將轉跳
    this.loggedIn = true;
  }

  logout(){
    this.loggedIn = false;
  }
}
