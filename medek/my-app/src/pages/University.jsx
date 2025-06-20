import { useParams } from 'react-router-dom';

const University = () => {
  const { id } = useParams();  // id parametresini al

  return (
    <div>
      <h1>Uni ID: {id}</h1>
      {/* Burada id ile ilgili işlemleri yapabilirsiniz */}
    </div>
  );
};

export default University;
