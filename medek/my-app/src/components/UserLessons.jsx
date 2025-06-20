import React from 'react';
import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import SchoolApi from "../apis/SchoolApi"
import { toast } from 'react-toastify';

export default function UserLessons({ userId }) {

    const [lessons, setLessons] = useState([]);

    useEffect(()=> {
        const getLessonsByUser = async ()=> {
            const teacherData = await SchoolApi.getUserByUserId(userId);

            const data = await SchoolApi.getLessonsByTeacherId(teacherData.id);
            console.log(data)
            setLessons(data)
        }

        getLessonsByUser()
    },[])

return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h2>Dersler</h2>
        <Link to={`/ders-olustur/${userId}`} className="btn btn-primary">Ders Ekle</Link>
      </div>

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
  );

}