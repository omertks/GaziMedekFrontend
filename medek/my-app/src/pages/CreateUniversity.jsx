import React, { useState, useEffect } from 'react';
import { Button, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import SchoolApi from '../apis/SchoolApi';
import ProccessApi from '../apis/ProccessApi'; // Rol kontrolü için import
import { toast } from 'react-toastify';

export default function CreateUniversity() {
  const [universityName, setUniversityName] = useState('');
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const checkRole = async () => {
      try {
        const userRole = await ProccessApi.getUserRole(); // API'den kullanıcı rolünü alıyoruz
        if (userRole !== 'ADMIN') {
          navigate('/'); // Eğer rol 'ADMIN' değilse ana sayfaya yönlendir
        } else {
          setRole(userRole); // ADMIN rolü varsa, sayfada işlem yapmaya devam et
        }
      } catch (error) {
        console.error('Rol kontrolü yapılırken hata oluştu:', error);
        navigate('/'); // Hata durumunda da ana sayfaya yönlendir
      }
    };

    checkRole();
  }, [navigate]);

  const handleCreate = async () => {
    try {
      await SchoolApi.createUniversity({ universityName });
      toast.success("Üniversite Oluşturuldu")
      navigate('/universiteler'); // Üniversite oluşturulduktan sonra üniversiteler sayfasına yönlendir
    } catch (error) {
      console.error('Üniversite oluşturulurken hata oluştu:', error);
    }
  };

  if (role === null) {
    return <div>Yükleniyor...</div>; // Rol bilgisi yüklenene kadar kullanıcıyı bekletiyoruz
  }

  return (
    <div className="container mt-5">
      <h2>Yeni Üniversite Oluştur</h2>

      <Form>
        <Form.Group className="mb-3">
          <Form.Label>Üniversite Adı</Form.Label>
          <Form.Control
            type="text"
            placeholder="Üniversite adını girin"
            value={universityName}
            onChange={(e) => setUniversityName(e.target.value)}
          />
        </Form.Group>

        <Button variant="primary" onClick={handleCreate}>
          Üniversiteyi Oluştur
        </Button>
      </Form>
    </div>
  );
}
