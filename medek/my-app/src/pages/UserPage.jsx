import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import UserFiles from '../components/UserFiles';

import MedekApi from '../apis/MedekApi'
import UserLessons from '../components/UserLessons';

const UserPage = () => {

  const { id } = useParams();  // id parametresini al




  return (
    <div>
      <h1>User ID: {id}</h1>

      <div className="container">
        <Link to={`/mesaj/${id}`} className='btn btn-info'>Kullanıcı İle Mesajlaş</Link>
      </div>

      <UserFiles userId={id} />

      <UserLessons userId={id} />
    </div>
  );
};

export default UserPage;
