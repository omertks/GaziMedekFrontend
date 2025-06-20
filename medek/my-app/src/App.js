import logo from './logo.svg';
import './App.css';

import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import { ToastContainer } from 'react-toastify';

import Login from "./pages/Login"
import Help from "./pages/Help"
import Home from './pages/Home'
import Panel from './pages/Panel'

import NotFound from './pages/NotFound'

import PrivateRoute from './components/PrivateRoute'
import CreateMedekForm from './pages/CreateMedekForm';
import Navbar from './components/Navbar';
import Messages from './pages/Messages';
import Message from './pages/Message'

import University from './pages/University'
import Universities from './pages/Universities'
import Department from './pages/Department'
import Departments from './pages/Departments'

import CreateDepartment from './pages/CreateDepartment'
import CreateUniversity from './pages/CreateUniversity'
import CreateUserPage from './pages/CreateUserPage';

import UsersPage from './pages/UsersPage'
import UserPage from './pages/UserPage'
import CreateLesson from './pages/CreateLesson';

function App() {
  const token = localStorage.getItem("token");
  return (
    <>
      <Router>

      <Navbar/>

      {/* Feedback */}
      <ToastContainer
          position="top-right"
          autoClose={4000}
          theme='light' />

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/help" element={<Help />} />

          {/* Private Routes */}
          <Route path="/kullanici-olustur" element={<PrivateRoute element={<CreateUserPage />} />} />
          <Route path="/kullanicilar" element={<PrivateRoute element={<UsersPage />} />} />
          <Route path="/kullanici/:id" element={<PrivateRoute element={<UserPage />} />} />

          <Route path="/panel" element={<PrivateRoute element={<Panel />} />} />
          <Route path="/create_medek_form" element={<PrivateRoute element={<CreateMedekForm />} />} />

          <Route path="/mesajlar" element={<PrivateRoute element={<Messages />} />} />
          <Route path="/mesaj/:id" element={<PrivateRoute element={<Message />} />} />


          <Route path="/universite/:id" element={<PrivateRoute element={<University />} />} />
          <Route path="/universiteler" element={<PrivateRoute element={<Universities />} />} />
          <Route path="/universite-olustur" element={<PrivateRoute element={<CreateUniversity />} />} />

          <Route path="/departman/:id" element={<PrivateRoute element={<Department />} />} />
          <Route path="/departmanlar" element={<PrivateRoute element={<Departments />} />} />
          <Route path="/departman-olustur" element={<PrivateRoute element={<CreateDepartment />} />} />

          <Route path="/ders-olustur/:userId" element={<PrivateRoute element={<CreateLesson />} />} />

          
          {/* Sayfa Bulunamadı */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </Router>
    </>
  );
};

export default App;
