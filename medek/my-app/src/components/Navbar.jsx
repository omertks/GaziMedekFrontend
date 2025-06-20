import { React, useState, useEffect, use } from "react";
import { Link } from "react-router-dom";

import { logOut } from "../helpers/authHelpers";

import ProccessApi from "../apis/ProccessApi";
import "bootstrap/dist/css/bootstrap.min.css";
import { getByAltText } from "@testing-library/dom";
import SchoolApi from "../apis/SchoolApi";

export default function Navbar() {

    const [userRole, setUserRole] = useState(ProccessApi.getUserRole());

    const [userId, setUserId] = useState(ProccessApi.getUserId());

    const [teacherId, setTeacherId] = useState();
    const [managerUserId, setManagerUserId]= useState()
    const [departmentId, setDepartmentId] = useState()

    // Kullanıcı rolü değiştiğinde Navbar'ı güncelle
    useEffect(() => {
        if(!userId) return;
        
        const updateRole = () => {
            setUserRole(ProccessApi.getUserRole());
        };

        const getTeacher = async () => {
            const teacherData = await SchoolApi.getUserByUserId(userId);
            console.log(teacherData)
            setTeacherId(teacherData.id)
            setDepartmentId(teacherData.departmentId)

            if (userRole === "TEACHER" && teacherData.departmentId) {
                getManagerByTeacher(teacherData.departmentId)
            }
        }

        const getManagerByTeacher = async (departmentId) => {
            const managerData = await SchoolApi.getManagerByDepartmentId(departmentId);
            console.log(managerData);
            setManagerUserId(managerData.userId)
        } 

        getTeacher();

        window.addEventListener("storage", updateRole);
        return () => {
            window.removeEventListener("storage", updateRole);
        };
    }, []);

    // Her 3 saniyede bir localStorage kontrol et, anında güncellenmesi için
    useEffect(() => {
        const interval = setInterval(() => {
            setUserRole(ProccessApi.getUserRole());
        }, 3000);

        return () => clearInterval(interval); // Temizleme işlemi
    }, []);

    return (
        <nav className="navbar navbar-expand-lg navbar-dark bg-primary shadow">
            <div className="container-fluid">
                <Link className="navbar-brand" to="/">Gazi Üniversitesi</Link>
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav ms-auto">
                        {userRole && (
                            <>
                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/panel">Panel</Link>
                                </li>

                                <li className="nav-item">
                                    <Link className="nav-link text-white" to="/create_medek_form">Medek Formu Oluştur</Link>
                                </li>

                                {userRole === "MANAGER" && (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link text-white" to = {`/departman/${departmentId}`}>Birimimdekiler</Link>
                                        </li>
                                    </>
                                )}

                                {userRole === "TEACHER" && (
                                    <>
                                        <Link className="nav-link text-white" to={`/mesaj/${managerUserId}`}>Yöneticiye Ulaş</Link>
                                    </>
                                )}

                                {userRole === "ADMIN" && (
                                    <>
                                        <li className="nav-item">
                                            <Link className="nav-link text-white" to="/universiteler">Üniversiteler</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link text-white" to="/departmanlar">Departmanlar</Link>
                                        </li>
                                        <li className="nav-item">
                                            <Link className="nav-link text-white" to="/kullanicilar">Kullanıcılar</Link>
                                        </li>
                                    </>
                                )}

                                <li className="nav-item">
                                    <Link className="btn btn-danger nav-link text-white" onClick={() => logOut()}>Çıkış Yap</Link>
                                </li>
                            </>
                        )}
                    </ul>
                </div>
            </div>
        </nav>
    );
}
