import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SchoolApi from '../apis/SchoolApi'; // API'den üniversiteleri alacağız

export default function Universities() {
  const [universities, setUniversities] = useState([]);
  const navigate = useNavigate();

  // Sayfa yüklendiğinde üniversiteleri al
  useEffect(() => {
    const fetchUniversities = async () => {
      try {
        const data = await SchoolApi.getAllUniversities(); // API çağrısı yapıyoruz
        setUniversities(data);
      } catch (error) {
        console.error('Üniversiteler alınırken hata oluştu:', error);
      }
    };

    fetchUniversities();
  }, []);

  // Yeni üniversite oluşturma sayfasına yönlendirme
  const handleCreateUniversity = () => {
    navigate('/universite-olustur');
  };

    const handleUniversityClick = (id) => {
    // Kullanıcıyı Department sayfasına yönlendir
    navigate(`/universite/${id}`);
  };

  return (
    <div className="container mt-5">
      <h2>Üniversiteler</h2>

      {/* Yeni üniversite oluşturma butonu */}
      <Button onClick={handleCreateUniversity} className="mb-3">
        Yeni Üniversite Oluştur
      </Button>

      {/* Üniversiteler Tablosu */}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Üniversite Adı</th>
          </tr>
        </thead>
        <tbody>
          {universities.map((university, index) => (
            <tr key={university.id}  onClick={() => handleUniversityClick(university.id)}>
              <td>{index + 1}</td>
              <td>{university.universityName}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
