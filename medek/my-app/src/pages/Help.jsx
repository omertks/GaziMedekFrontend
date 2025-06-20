import React from "react";

import LoginForm from "../components/LoginForm";
import { toast } from "react-toastify";

export default function Login() {


  const sendMessage = ()=> {
    toast.success("Yardım Talebiniz Başarılı Bir Şekilde Alındı")
  }


  return (
    <div>
      <h2>Yardım Sayfası</h2>

      <label className="form-label">Başlık</label>
      <input type="text" className="form-control" />

      <label className="form-label">İçerik</label>
      <input type="text" className="form-control" />

      <button className="btn btn-success form-control" onClick={sendMessage}>Gönder</button>

    </div>
  );
}