import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import SchoolApi from "../apis/SchoolApi"; // Burada SchoolApi çağrılıyor
import "bootstrap/dist/css/bootstrap.min.css";

export default function CreateLesson() {
    const { userId } = useParams(); // URL'den TeacherId çekiliyor
    const [formData, setFormData] = useState({
        name: "",
        code: "",
        academicYear: "",
        teacherId: 0,
        departmentId:0
    });

      useEffect(() => {
    const fetchTeacher = async () => {
      try {
        const teacherData = await SchoolApi.getUserByUserId(userId)
        setFormData((prev) => ({
          ...prev,
          departmentId: teacherData.departmentId,
          teacherId: teacherData.id 
        }));
      } catch (error) {
        console.error("Departman bilgisi alınırken hata oluştu:", error);
      }
    };

    fetchTeacher();
  }, [userId]);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await SchoolApi.createLesson(formData);
            toast.success("Ders başarıyla oluşturuldu!");
            setFormData({ name: "", code: "", academicYear: "" });
        } catch (error) {
            toast.error("Ders oluşturulurken hata oluştu!");
            console.error("Hata:", error);
        }
    };

    return (
        <div className="container mt-4">
            <div className="card shadow">
                <div className="card-header bg-primary text-white">
                    <h5 className="mb-0">Yeni Ders Oluştur</h5>
                </div>
                <div className="card-body">
                    <form onSubmit={handleSubmit}>
                        {/* Ders Adı */}
                        <div className="mb-3">
                            <label className="form-label">Ders Adı</label>
                            <input
                                type="text"
                                className="form-control"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Ders Kodu */}
                        <div className="mb-3">
                            <label className="form-label">Ders Kodu</label>
                            <input
                                type="text"
                                className="form-control"
                                name="code"
                                value={formData.code}
                                onChange={handleChange}
                                required
                            />
                        </div>

                        {/* Akademik Yıl */}
                        <div className="mb-3">
                            <label className="form-label">Akademik Yıl</label>
                            <input
                                type="text"
                                className="form-control"
                                name="academicYear"
                                value={formData.academicYear}
                                onChange={handleChange}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary">Ders Oluştur</button>
                    </form>
                </div>
            </div>
        </div>
    );
}
