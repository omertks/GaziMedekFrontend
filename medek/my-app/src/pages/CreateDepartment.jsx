import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SchoolApi from '../apis/SchoolApi';
import ProccessApi from '../apis/ProccessApi';
import { toast } from 'react-toastify';

export default function CreateDepartment() {
  const [role, setRole] = useState(null);
  const [universities, setUniversities] = useState([]);
  const [departmentName, setDepartmentName] = useState('');
  const [universityId, setUniversityId] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const currentRole = ProccessApi.getUserRole();
        if (currentRole !== 'ADMIN') {
          navigate('/');
          return;
        }
        setRole(currentRole);

        const universityList = await SchoolApi.getAllUniversities();
        console.log(universities)
        setUniversities(universityList);
      } catch (error) {
        console.error('Yetkilendirme veya veri çekme hatası:', error);
        navigate('/');
      }
    };

    fetchData();
  }, [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await SchoolApi.createDepartment({
        departmentName,
        universityId,
      });
      toast.success("Departman Oluşturuldu")
      navigate('/departmanlar');
    } catch (error) {
      console.error('Departman oluşturulamadı:', error);
      alert("Bir hata oluştu. Lütfen tekrar deneyin.");
    }
  };

  if (role === null) return <div className="container mt-5">Yükleniyor...</div>;

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Yeni Departman Oluştur</h2>

      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="departmentName" className="form-label">Departman Adı</label>
          <input
            type="text"
            id="departmentName"
            className="form-control"
            value={departmentName}
            onChange={(e) => setDepartmentName(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label htmlFor="universitySelect" className="form-label">Üniversite</label>
          <select
            id="universitySelect"
            className="form-select"
            value={universityId}
            onChange={(e) => setUniversityId(e.target.value)}
            required
          >
            <option value="">Bir üniversite seçin</option>
            {universities.map((u) => (
              <option key={u.id} value={u.id}>
                {u.universityName}
              </option>
            ))}
          </select>
        </div>

        <button type="submit" className="btn btn-primary">
          Oluştur
        </button>
      </form>
    </div>
  );
}
