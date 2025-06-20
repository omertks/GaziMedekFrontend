import {Roles} from "../enums/UserRoles"

export const logOut = (navigate) => {
    
    // burada sor emin mi diye

    const isConfirm = window.confirm("Çıkış Yapmak İstediğinizden Emin Misiniz ?");

    if(isConfirm){
        localStorage.removeItem("token");
        localStorage.removeItem("teacherId");
        localStorage.removeItem("userId");
        localStorage.removeItem("role")
        
        navigate("/");
    }
  };



  export const getUserRole = () => {
    return localStorage.getItem("role") || Roles.GUEST;
  }