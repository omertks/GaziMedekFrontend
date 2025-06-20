import React, { useState } from "react";

import { useEffect } from 'react';

import axios from "axios";


import { toast } from 'react-toastify';

import { useNavigate } from "react-router-dom";
import FileInput from "../components/FileInput";

import SchoolApi from '../apis/SchoolApi'
import ProccessApi from '../apis/ProccessApi'


export default function CreateMedekForm() {

    const navigate = useNavigate();

    const userId = ProccessApi.getUserId();
    const [teacherId, setTeacherId] = useState();

    const [icindekilerFiles, setIcindekilerFiles] = useState([]);
    const [aktsFormlariFiles, setAktsFormlariFiles] = useState([]);
    const [sinavImzaCizelgeleriFiles, setSinavImzaCizelgeleriFiles] = useState([]);
    const [sinavIstatistikleriFiles, setSinavIstatistikleriFiles] = useState([]);
    const [vizeSorulariFiles, setVizeSorulariFiles] = useState([]);
    const [vizeSinavNotlariFiles, setVizeSinavNotlariFiles] = useState([]);
    const [finalSorulariFiles, setFinalSorulariFiles] = useState([]);
    const [finalSinavNotlariFiles, setFinalSinavNotlariFiles] = useState([]);
    const [butSorulariFiles, setButSorulariFiles] = useState([]);
    const [resmiNotCizelgesiFiles, setResmiNotCizelgesiFiles] = useState([]);
    const [devamCizelgesiFiles, setDevamCizelgesiFiles] = useState([]);
    const [degerlendirmeAnketleriFiles, setDegerlendirmeAnketleriFiles] = useState([]);


    const [lessons, setLessons] = useState([]);
    const [isLessonIsCombobox, setIsLessonIsCombobox] = useState(true)

    const [selectedLessonName, setSelectedLessonName] = useState('');
    const [selectedLessonCode, setSelectedLessonCode] = useState('');

    const [teacherName, setTeacherName] = useState();
    const [teacherSurname, setTeacherSurname] = useState();
    
    const [departmentName, setDepartmentName] = useState();
    const [name, setName] = useState();
    const [year, setYear] = useState();

    const medekServiceUrl = process.env.REACT_APP_MEDEK_SERVICE_URL;

    useEffect(() => {
        const getTeacher = async ()=> {
            const teacherData = await SchoolApi.getUserByUserId(userId);
            setTeacherId(teacherData.id)
        }

        // Sayfa açıldığında çalışacak kod buraya
        getTeacher()
    }, [userId]);

    useEffect(() => {
        if (teacherId) {
            getLessonByTeacher(teacherId); // State güncellenince metod çalıştırılacak
        }
    }, [teacherId]);

    const getLessonByTeacher = async () => {

        const data = await SchoolApi.getLessonsByTeacherId(teacherId)

        console.log(data)
        setLessons(data)
        toast.info("Öğretmenin Dersleri Başarılı Bir Şekilde Geldi")

    }


    const handleLessonChange = (e) => {
        if (isLessonIsCombobox) {
            if (e.target.value == "order") {
                setIsLessonIsCombobox(false)
                
                // Bu kısım null da olabilir
                setSelectedLessonName("");
                setSelectedLessonCode("");
                return;
            }

            console.log("Seçili Ders Adı: " + e.target.selectedOptions[0].dataset.name)
            console.log("Seçili Ders Kodu: " + e.target.value)

            setSelectedLessonName(e.target.selectedOptions[0].dataset.name);
            setSelectedLessonCode(e.target.value);
        }
    }

    const handleLessonNameChange = (e) => {
        setSelectedLessonName(e.target.value)
        console.log("Seçili Ders Adı: " + e.target.value)
    }

    const handleLessonCodeChange = (e) => {
        setSelectedLessonCode(e.target.value)
        console.log("Seçili Ders Kodu: " + e.target.value)

    }

    const handleTeacherNameChange = (e) => {
        setTeacherName(e.target.value)
        console.log("Öğretmenin Adı: " + e.target.value)
    }
    const handleTeacherSurnameChange = (e) => {
        setTeacherSurname(e.target.value)
        console.log("Öğretmenin Soyadı: " + e.target.value)
    }

    const handleDepartmentNameChange = (e) => {
        setDepartmentName(e.target.value)
        console.log("Okul Adı: " + e.target.value)
    }

    const handleNameChange = (e) => {
        setName(e.target.value)
        console.log("Kayıt Adı: " + e.target.value)
    }

    const handleYearChange = (e) => {
        setYear(e.target.value)
        console.log("Yıl: " + e.target.value)
    }



    const handleFileChange = (event) => {
        const { name, files } = event.target;
        const fileArray = Array.from(files); // ✅ tüm dosyaları al


        console.log(name, fileArray);


        switch (name) {
            case "icindekiler":
                setIcindekilerFiles(fileArray);
                break;
            case "aktsFormlari":
                setAktsFormlariFiles(fileArray);
                break;
            case "sinavImzaCizelgeleri":
                setSinavImzaCizelgeleriFiles(fileArray);
                break;
            case "sinavIstatistikleri":
                setSinavIstatistikleriFiles(fileArray);
                break;
            case "vizeSorulari":
                setVizeSorulariFiles(fileArray);
                break;
            case "vizeSinavNotlari":
                setVizeSinavNotlariFiles(fileArray);
                break;
            case "finalSorulari":
                setFinalSorulariFiles(fileArray);
                break;
            case "finalSinavNotlari":
                setFinalSinavNotlariFiles(fileArray);
                break;
            case "butSorulari":
                setButSorulariFiles(fileArray);
                break;
            case "resmiNotCizelgesi":
                setResmiNotCizelgesiFiles(fileArray);
                break;
            case "devamCizelgesi":
                setDevamCizelgesiFiles(fileArray);
                break;
            case "degerlendirmeAnketleri":
                setDegerlendirmeAnketleriFiles(fileArray);
                break;
            default:
                break;
        }
    };



    const createMedekForm = async () => {

        const token = ProccessApi.getJwtToken();

        const headers = {
            "Content-Type": "multipart/form-data",
            "accept": '*/*',
            "Authorization": token ? `Bearer ${token}` : "",
        };

        const formData = new FormData();

        if (icindekilerFiles &&
            aktsFormlariFiles &&
            sinavImzaCizelgeleriFiles &&
            sinavIstatistikleriFiles &&
            vizeSorulariFiles &&
            vizeSinavNotlariFiles &&
            finalSorulariFiles &&
            finalSinavNotlariFiles &&
            butSorulariFiles &&
            resmiNotCizelgesiFiles &&
            devamCizelgesiFiles &&
            degerlendirmeAnketleriFiles &&

            selectedLessonName !== '' && selectedLessonCode !== '' &&
            teacherName !== '' && teacherSurname !== '' && departmentName !== '' && name !== ''&& year !== ''
        ) {
            // Burada hem giriş yapmış olan kullanıcı olabilecek hemde farklı bir ad

            formData.append("LessonName", selectedLessonName);

            formData.append("LessonCode", selectedLessonCode);

            formData.append("TeacherName", teacherName);

            formData.append("TeacherSurname", teacherSurname);

            formData.append("FakulteName", departmentName);

            formData.append("Name", name);

            formData.append("Year", year)

            const userId = localStorage.getItem("userId")
            
            formData.append("UserId", userId);

            for (let i = 0; i < icindekilerFiles.length; i++) {
                formData.append("Icindekiler", icindekilerFiles[i]);
            }

            for (let i = 0; i < aktsFormlariFiles.length; i++) {
                formData.append("AktsEctsFormlari", aktsFormlariFiles[i]);
            }

            for (let i = 0; i < sinavImzaCizelgeleriFiles.length; i++) {
                formData.append("SinavImzaCizergeleri", sinavImzaCizelgeleriFiles[i]);
            }

            for (let i = 0; i < sinavIstatistikleriFiles.length; i++) {
                formData.append("SinavIstatistikleri", sinavIstatistikleriFiles[i]);
            }

            for (let i = 0; i < vizeSorulariFiles.length; i++) {
                formData.append("VizeSorulari", vizeSorulariFiles[i]);
            }

            for (let i = 0; i < vizeSinavNotlariFiles.length; i++) {
                formData.append("VizeSinavDusukOrtaYuksekNotlar", vizeSinavNotlariFiles[i]);
            }

            for (let i = 0; i < finalSorulariFiles.length; i++) {
                formData.append("FinalSorulari", finalSorulariFiles[i]);
            }

            for (let i = 0; i < finalSinavNotlariFiles.length; i++) {
                formData.append("FinalSinavDusukOrtaYuksekNotlar", finalSinavNotlariFiles[i]);
            }

            for (let i = 0; i < butSorulariFiles.length; i++) {
                formData.append("ButSorulari", butSorulariFiles[i]);
            }

            for (let i = 0; i < resmiNotCizelgesiFiles.length; i++) {
                formData.append("ResmiNotCizergesi", resmiNotCizelgesiFiles[i]);
            }

            for (let i = 0; i < devamCizelgesiFiles.length; i++) {
                formData.append("DersDevamCizergesi", devamCizelgesiFiles[i]);
            }

            for (let i = 0; i < degerlendirmeAnketleriFiles.length; i++) {
                formData.append("DegerlendirmeAnketleri", degerlendirmeAnketleriFiles[i]);
            }
        }
        else {
            alert("Lütfen Tüm Dosyaları Doğru Bir Şekilde Ekleyin!!!! Ve Dersi Seçin")
            return;
        }

        for (var pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }

        try {
            const response = await axios.post(medekServiceUrl + "/Pdf/medek", formData, {
                headers: headers,
                responseType: "blob"
            });

            console.log("Sunucuyla Bağlantı Kuruldu");

            // Burasını Daha Sonra Düzelt
            const blob = new Blob([response.data], { type: 'application/pdf' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement("a");
            link.href = url;
            link.download = "rapor.pdf";
            document.body.appendChild(link);
            link.click();
            link.remove();
            window.URL.revokeObjectURL(url);

            
            toast.success("Medek Formu Başarılı Bir Şekilde Oluşturuldu !!")

        } catch (error) {
            if (error.response && error.response.data) {
                // Blob’u JSON’a çevir ve hatayı detaylı şekilde göster
                error.response.data.text().then((text) => {
                    console.error("Hata Detayları:", JSON.parse(text));
                });
            } else {
                console.error("İstek başarısız:", error.message);
    }
        }
    }


    // token'ın süresinin geçme olayıyla ilgilen

    return (


        <div className="form">

            <div>
                <label>Kayıt Adı: Not bu kısım Yöneticiniz tarafından anlaşılabilir bir şekilde yazılsın.</label>
                <input type="text" onChange={handleNameChange} className="form-control" />
            </div>

            <div>
                <label>Departman Adı: Not bu kısım belgenin en üstünde yazacaktır bu yüzden üniversitenizin adınıda başına ekleyiniz</label>
                <input type="text" onChange={handleDepartmentNameChange} className="form-control" />
            </div>

            <div>
                <label>Yıl- Dönem:</label>
                <input type="text" onChange={handleYearChange} className="form-control" />
            </div>

            <div>
                <label>Öğretmen Adı: </label>
                <input type="text" onChange={handleTeacherNameChange} className="form-control" />

                <label>Öğretmen Soyadı: </label>
                <input type="text" onChange={handleTeacherSurnameChange} className="form-control" />
            </div>

            {isLessonIsCombobox && (
                <select onChange={handleLessonChange}>
                    <option value="">-- Ders Seçiniz --</option>
                    {lessons.map(lesson => (
                        // burada id yi valueyede koyabilirsin
                        <option key={lesson.id} data-name={lesson.name} value={lesson.code}>
                            {lesson.name + " - " + lesson.code}
                        </option>
                    ))}
                    <option value="order">Başka bir Seçenek Gir</option>
                </select>
            )}

            {!isLessonIsCombobox && (
                <div>
                    <label>Ders Kodu: </label>
                    <input type="text" onChange={handleLessonCodeChange} className="form-control" />

                    <label>Ders Adı: </label>
                    <input type="text" onChange={handleLessonNameChange} className="form-control" />
                </div>
            )}


            <FileInput text={"İçindekiler: "} id={"icindekiler"} name={"icindekiler"} onChange={handleFileChange} />

            <FileInput text={"Akts Formları: "} id={"aktsFormlari"} name={"aktsFormlari"} onChange={handleFileChange} />

            <FileInput text={"Sınav İmza Çizelgeleri: "} id={"sinavImzaCizelgeleri"} name={"sinavImzaCizelgeleri"} onChange={handleFileChange} />

            <FileInput text={"Sınav İstatistikleri: "} id={"sinavIstatistikleri"} name={"sinavIstatistikleri"} onChange={handleFileChange} />

            <FileInput text={"Vize Soruları: "} id={"vizeSorulari"} name={"vizeSorulari"} onChange={handleFileChange} />

            <FileInput text={"Vize Sınavı Notları: "} id={"vizeSinavNotlari"} name={"vizeSinavNotlari"} onChange={handleFileChange} />

            <FileInput text={"Final Soruları: "} id={"finalSorulari"} name={"finalSorulari"} onChange={handleFileChange} />

            <FileInput text={"Final Sınavı Notları: "} id={"finalSinavNotlari"} name={"finalSinavNotlari"} onChange={handleFileChange} />

            <FileInput text={"Büt Soruları: "} id={"butSorulari"} name={"butSorulari"} onChange={handleFileChange} />

            <FileInput text={"Resmi Not Çizelgesi: "} id={"resmiNotCizelgesi"} name={"resmiNotCizelgesi"} onChange={handleFileChange} />

            <FileInput text={"Ders Devam Çizelgesi: "} id={"devamCizelgesi"} name={"devamCizelgesi"} onChange={handleFileChange} />

            <FileInput text={"Değerlendirme Anketleri: "} id={"degerlendirmeAnketleri"} name={"degerlendirmeAnketleri"} onChange={handleFileChange} />



            <div className="">
                <button className="btn btn-success" onClick={createMedekForm}>Oluştur</button>
                <button className="btn btn-danger" onClick={() => navigate(-1)}>Geri</button>
            </div>
        </div>
    );

}