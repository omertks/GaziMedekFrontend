// src/pages/CreateUserPage.jsx
import React, { useState, useEffect } from "react";
import { toast } from "react-toastify"; // Eğer toast mesajı kullanacaksanız
import UserApi from "../apis/UserApi";
import SchoolApi from "../apis/SchoolApi"

export default function CreateUserPage() {

  const [departments, setDepartments] = useState([])

  const [authorized, setAuthorized] = useState(false);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    password: "",
    role: "",
    departmentId: ""
  });

  useEffect(() => {

    const getAllDepartments = async () => {
      const data = await SchoolApi.getAllDepartments();
      console.log(data)
      setDepartments(data)

    }

    // Sayfa yüklendiğinde localStorage'den role bilgisi okunuyor.
    const role = localStorage.getItem("role");
    if (role === "ADMIN" || role === "MANAGER") {
      setAuthorized(true);

      getAllDepartments();
    }
    setLoading(false);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      // UserApi.saveUser, token'ı header üzerinden göndererek backend'e istek yapacak
      const response = await UserApi.saveUser(formData);
      console.log(response)
      toast.success("Kullanıcı başarıyla oluşturuldu!");
      // Formu sıfırlayabilirsiniz
      setFormData({
        name: "",
        surname: "",
        email: "",
        password: "",
        role: "",
        departmentId: ""
      });
    } catch (error) {
      console.error("Kullanıcı oluşturulurken hata:", error);
      toast.error("Kullanıcı oluşturulma işlemi başarısız.");
    }
    setSubmitting(false);
  };

  if (loading) {
    return (
      <div className="container mt-4 text-center">
        <p>Yükleniyor...</p>
      </div>
    );
  }

  if (!authorized) {
    return (
      <div className="container mt-4">
        <div className="alert alert-danger" role="alert">
          Bu sayfayı görüntüleme yetkiniz bulunmuyor!
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <div className="card shadow">
        <div className="card-header bg-primary text-white">
          Kullanıcı Oluşturma İşlemleri
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit}>
            {/* İsim */}
            <div className="mb-3">
              <label className="form-label">Ad</label>
              <input
                type="text"
                className="form-control"
                name="name"
                value={formData.name}
                onChange={handleChange}
                required
              />
            </div>
            {/* Soyad */}
            <div className="mb-3">
              <label className="form-label">Soyad</label>
              <input
                type="text"
                className="form-control"
                name="surname"
                value={formData.surname}
                onChange={handleChange}
                required
              />
            </div>
            {/* Email */}
            <div className="mb-3">
              <label className="form-label">Email</label>
              <input
                type="email"
                className="form-control"
                name="email"
                value={formData.email}
                onChange={handleChange}
                required
              />
            </div>
            {/* Şifre */}
            <div className="mb-3">
              <label className="form-label">Şifre</label>
              <input
                type="password"
                className="form-control"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
              />
            </div>
            {/* Rol Seçimi */}
            <div className="mb-3">
              <label className="form-label">Rol</label>
              <select
                className="form-control"
                name="role"
                value={formData.role}
                onChange={handleChange}
                required
              >
                <option value="">Rol Seçin</option>
                <option value="ADMIN">ADMIN</option>
                <option value="MANAGER">MANAGER</option>
                <option value="TEACHER">TEACHER</option>
              </select>
            </div>

            {/* Departman ID */}
            {/* <div className="mb-3">
              <label className="form-label">Departman ID</label>
              <input
                type="number"
                className="form-control"
                name="departmentId"
                value={formData.departmentId}
                onChange={handleChange}
                required
              />
            </div> */}

            {/* Departman Seçimi */}
            <div className="mb-3">
              <label className="form-label">Departman</label>
              <select
                className="form-control"
                name="departmentId"
                value={formData.departmentId}
                onChange={handleChange}
                required
              >
                <option value="">Departman Seçin</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id}>
                    {dept.departmentName}
                  </option>
                ))}
              </select>
            </div>


            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? "Gönderiliyor..." : "Kullanıcı Oluştur"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
