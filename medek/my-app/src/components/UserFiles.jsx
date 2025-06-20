import React from 'react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import MedekApi from '../apis/MedekApi'
import { toast } from 'react-toastify';

export default function UserFiles({ userId }) {

  const [medekForms, setMedekForms] = useState([]);

  const [updateForms,setUpdateForms] = useState(false)

  useEffect(() => {
    const getFormsByUser = async () => {
      const data = await MedekApi.getFormsByUser(userId);
      setMedekForms(data)
      console.log(data)
    }

    getFormsByUser()
  }, [updateForms])

  const handleDownloadMedekForm = async (medekFormId) => {
    const data = await MedekApi.downloadForm(medekFormId);

    const blob = new Blob([data], { type: 'application/pdf' });
    const url = window.URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = "medek.pdf";
    document.body.appendChild(link);
    link.click();
    link.remove();
    window.URL.revokeObjectURL(url);

    toast.success("Medek Formu Başarılı Bir Şekilde İndirildi !!")
  }

  const handleDeleteMedekForm = async (medekFormId) => {
    try {
      const data = await MedekApi.deleteForm(medekFormId);
      setUpdateForms(!updateForms)
      toast.success("Başarılı Bir Şekilde Silindi")
    } catch (error) {
      toast.error("Silme İşlemi gerçekleşemedi")
      console.log("Hata: " + error)
    }
  }

  return (
    <div className="container mt-4">
      <h2 className="text-center mb-4">Medek Formları</h2>
      <div className="row">
        {medekForms.map((form) => (
          <div key={form.id} className="col-md-6 col-lg-4 mb-3">
            <div className="card shadow">
              <div className="card-header bg-primary text-white">
                <h5 className="mb-0">{form.name}</h5>
              </div>
              <div className="card-body">
                <p><strong>Kullanıcı ID:</strong> {form.userId}</p>
                <p><strong>Oluşturulma Tarihi:</strong> {new Date(form.createdAt).toLocaleString()}</p>
                <button className="btn btn-danger" onClick={()=> handleDeleteMedekForm(form.id)}>Sil</button>
                <button className="btn btn-success ms-2" onClick={() => handleDownloadMedekForm(form.id)}>İndir</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};