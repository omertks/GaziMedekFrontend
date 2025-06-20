import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SchoolApi from '../apis/SchoolApi'; // API'den departmanları alacağız

export default function Departments() {
  const [departments, setDepartments] = useState([]);
  const navigate = useNavigate();

  // Sayfa yüklendiğinde departmanları al
  useEffect(() => {
    const fetchDepartments = async () => {
      try {
        const data = await SchoolApi.getAllDepartments(); // API çağrısı yapıyoruz
        setDepartments(data);
      } catch (error) {
        console.error('Departmanlar alınırken hata oluştu:', error);
      }
    };

    fetchDepartments();
  }, []);

  // Yeni departman oluşturma sayfasına yönlendirme
  const handleCreateDepartment = () => {
    navigate('/departman-olustur');
  };

    const handleDepartmentClick = (id) => {
    // Kullanıcıyı Department sayfasına yönlendir
    navigate(`/departman/${id}`);
  };

  return (
    <div className="container mt-5">
      <h2>Departmanlar</h2>

      {/* Yeni departman oluşturma butonu */}
      <Button onClick={handleCreateDepartment} className="mb-3">
        Yeni Departman Oluştur
      </Button>

      {/* Departmanlar Tablosu */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Departman Adı</th>
            <th>Üniversite Adı</th>
          </tr>
        </thead>
        <tbody>
          {departments.map((department, index) => (
            <tr key={department.id} onClick={() => handleDepartmentClick(department.id)}>
              <td>{index + 1}</td>
              <td>{department.departmentName}</td>
              <td>{department.universityName || 'Bilinmiyor'}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
