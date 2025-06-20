import { useParams } from 'react-router-dom';
import {React,useState,useEffect} from 'react';

import { useNavigate } from 'react-router-dom';

import TimelineCard from '../components/TimelineCard'

import SchoolApi from '../apis/SchoolApi'
import ProccessApi from '../apis/ProccessApi'
import { toast } from 'react-toastify';

const Department = () => {
  const { id } = useParams();  // id parametresini al

  const navigate = useNavigate()

  const role = ProccessApi.getUserRole();

  const [medekForms, setMedekForms] = useState([]);

  useEffect(() => {
    const getMedekForms = async () => {
      
    };

    getMedekForms()
  }, [role])

  const handleMedekFormsClick = (id)=> {
    toast.warning("Şuanda indirilemiyor")
  }

  return (
    <>
      <h1>Department ID: {id}</h1>

      <TimelineCard title="Medek Formları"
        onSeeAll={() => {
          alert("Medek Formları İçin tümünü gör  !!!!")
        }}
        children={
          <ul class="list-group">
            {medekForms.map((item, index) => (
              <li key={item.id} class="list-group-item" onClick={() => handleTeacherClick(item.id)}>{item.name + " " + item.surname}</li>
            ))}
          </ul>
        }
      />
    </>
  );
};

export default Department;
