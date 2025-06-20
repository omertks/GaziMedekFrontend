import React from "react";
import { useForm } from "react-hook-form";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";
import UserApi from "../apis/UserApi"; // API

export default function LoginForm() {
  const { register, handleSubmit, formState: { errors } } = useForm();
  const navigate = useNavigate();

  const onSubmit = async (data) => {
    try {
      const response = await UserApi.login(data.email, data.password);

      localStorage.setItem("token", response.data.token);
      localStorage.setItem("userId", response.data.userId);
      localStorage.setItem("teacherId", response.data.teacherId);
      localStorage.setItem("role", response.data.role);

      toast.success("Başarıyla giriş yapıldı.");
      navigate("/panel");
    } catch (err) {
      if (err.response?.status === 401) {
        toast.error("E-posta veya şifre hatalı.");
      } else {
        toast.error("Bir hata oluştu. Lütfen tekrar deneyin.");
        console.error(err);
      }
    }
  };

  return (
    <div className="container d-flex align-items-center justify-content-center min-vh-100">
      <div className="card shadow p-4" style={{ width: "100%", maxWidth: "400px" }}>
        <h3 className="text-center mb-4">Giriş Yap</h3>

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {/* Email */}
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input
              type="email"
              className={`form-control ${errors.email ? "is-invalid" : ""}`}
              {...register("email", {
                required: "Email gerekli",
                pattern: {
                  value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
                  message: "Geçerli bir email giriniz"
                }
              })}
            />
            {errors.email && <div className="invalid-feedback">{errors.email.message}</div>}
          </div>

          {/* Şifre */}
          <div className="mb-3">
            <label className="form-label">Şifre</label>
            <input
              type="password"
              className={`form-control ${errors.password ? "is-invalid" : ""}`}
              {...register("password", {
                required: "Şifre gerekli",
                minLength: {
                  value: 8,
                  message: "Şifre en az 8 karakter olmalı"
                }
              })}
            />
            {errors.password && <div className="invalid-feedback">{errors.password.message}</div>}
          </div>

          {/* Giriş Butonu */}
          <div className="d-grid mb-3">
            <button type="submit" className="btn btn-primary">
              Giriş Yap
            </button>
          </div>

          {/* Yardım Linki */}
          <div className="text-center">
            <Link to="/help" className="text-decoration-none">Sorun mu yaşıyorsunuz?</Link>
          </div>
        </form>
      </div>
    </div>
  );
}
