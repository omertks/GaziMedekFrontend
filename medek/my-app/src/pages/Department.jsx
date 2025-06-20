import { useParams } from 'react-router-dom';
import { React, useState, useEffect } from 'react';

import { useNavigate } from 'react-router-dom';

import TimelineCard from '../components/TimelineCard'

import SchoolApi from '../apis/SchoolApi'
import ProccessApi from '../apis/ProccessApi'

const Department = () => {
  const { id } = useParams();  // id parametresini al

  const navigate = useNavigate()

  const role = ProccessApi.getUserRole();

  const [teachers, setTeachers] = useState([]);
  const [lessons, setLessons] = useState([]);

  useEffect(() => {
    const getTeachers = async () => {
      if (role && role === "ADMIN" || role === "MANAGER") {
        try {
          const data = await SchoolApi.getTeachersByDepartmentId(id);
          console.log(data);
          setTeachers(data);
        } catch (error) {
          console.error("Hata oluştu:", error);
        }
      }
    };

    const getLessons = async () => {
      if (role && role === "ADMIN" || role === "MANAGER") {
        try {
          const data = await SchoolApi.getLessonsByDepartmentId(id);
          setLessons(data)
        } catch (error) {
          console.error("Hata oluştu:", error);
        }
      }
    }
    getLessons()
    getTeachers()
  }, [role])

  const handleTeacherClick = (id) => {
    // Kullanıcıyı Department sayfasına yönlendir
    navigate(`/kullanici/${id}`);
  };

  return (
    <>

      <h3 className='container mt-4'>Öğretmenler: </h3>
      {teachers.map((teacher, index) => (
        <div className="container mt-4" key={teacher.userId} onClick={() => handleTeacherClick(teacher.userId)}>
          <div className="card shadow">
            <div className="card-header bg-primary text-white">
              <h5 className="mb-0">{teacher.name} {teacher.surname}</h5>
            </div>
            <div className="card-body">
              <p><strong>Rol:</strong> <span className="badge bg-success">{teacher.role}</span></p>
              <p><strong>Bölüm:</strong> {teacher.departmentName ? teacher.departmentName : "Belirtilmemiş"}</p>

              <h6 className="mt-3">Verdiği Dersler:</h6>
              {teacher.lessonNames.length > 0 ? (
                <ul className="list-group">
                  {teacher.lessonNames.map((lesson, index) => (
                    <li key={index} className="list-group-item">{lesson}</li>
                  ))}
                </ul>
              ) : (
                <p className="text-muted">Bu öğretmenin şu an eklenmiş bir dersi yok.</p>
              )}
            </div>
          </div>
        </div>
      ))}

      <h3 className='container mt-4'>Dersler: </h3>
      <div className="container">
        <div className="row">
          {lessons.length > 0 ? (
            lessons.map((lesson) => (
              <div key={lesson.id} className="col-md-6 col-lg-4 mb-3">
                <div className="card shadow">
                  <div className="card-header bg-secondary text-white">
                    <h5 className="mb-0">{lesson.name}</h5>
                  </div>
                  <div className="card-body">
                    <p><strong>Ders Kodu:</strong> {lesson.code}</p>
                    <p><strong>Akademik Yıl:</strong> {lesson.academicYear}</p>
                    <p><strong>Öğretmen:</strong> {lesson.teacherFullName || "Bilinmiyor"}</p>
                    <p><strong>Bölüm:</strong> {lesson.departmentName || "Bilinmiyor"}</p>
                    <div className="d-flex justify-content-between">
                      <button className="btn btn-danger">Sil</button>
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center">Henüz eklenmiş ders bulunmamaktadır.</p>
          )}
        </div>
      </div>

    </>
  );
};

export default Department;
