import React, { useEffect, useState } from 'react';
import { Button, Table } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import UserApi from '../apis/UserApi'; // API'den üniversiteleri alacağız

export default function Universities() {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  // Sayfa yüklendiğinde üniversiteleri al
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const data = await UserApi.getUsers(); // API çağrısı yapıyoruz
        console.log(data)
        setUsers(data);
      } catch (error) {
        console.error('Üniversiteler alınırken hata oluştu:', error);
      }
    };

    fetchUsers();
  }, []);

  // Yeni üniversite oluşturma sayfasına yönlendirme
  const handleCreateUser = () => {
    navigate('/kullanici-olustur');
  };

    const handleUserClick = (id) => {
    // Kullanıcıyı Department sayfasına yönlendir
    navigate(`/kullanici/${id}`);
  };

    return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Kullanıcı Listesi</h2>  
      <Link to={"/kullanici-olustur"} className='btn btn-info mb-3'>Kullanıcı Oluştur</Link>
      <div className="row">
        {users.map((user) => (
          <div key={user.id} className="col-md-6 col-lg-4 mb-3" onClick={() => handleUserClick(user.id)}>
            <div className="card shadow">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">{user.firstName} {user.lastName}</h5>
              </div>
              <div className="card-body">
                <p><strong>Email:</strong> {user.email}</p>
                <p><strong>Rol:</strong> <span className={`badge bg-${user.role === "ADMIN" ? "danger" : user.role === "MANAGER" ? "success" : "secondary"}`}>{user.role}</span></p>
                <p><strong>ID:</strong> {user.id}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
