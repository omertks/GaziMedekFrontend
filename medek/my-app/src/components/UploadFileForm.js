import React, { useState } from "react";

const Form = () => {
    // Dosyalar için state oluştur
    const [files, setFiles] = useState({ file: null});

    // Dosyaların değişimini takip eden fonksiyon
    const handleFileChange = (e) => {
        const { name, files } = e.target;
        setFiles((prevFiles) => ({
            ...prevFiles,
            [name]: files[0],
        }));
    };

    // Form gönderim fonksiyonu
    const handleSubmit = async (e) => {
        e.preventDefault();

        // Dosyaları bir formData objesine ekleyin
        const formData = new FormData();
        formData.append("file", files.file);

        try {
            // API'ye POST isteği gönderin
            const response = await fetch("http://localhost:5182/api/Pdf", {
                method: "POST",
                body: formData,
            });

            if (response.ok) {
                alert("Dosyalar başarıyla yüklendi!");
            } else {
                alert("Yükleme sırasında bir hata oluştu.");
            }
        } catch (error) {
            console.error("Hata:", error);
            alert("API'ye bağlanırken bir sorun oluştu.");
        }
    };

    return (
        <form onSubmit={handleSubmit} class='form'>
            <div>
                <label class='form-control' >Dosya 1: </label>
                <input type="file" name="file" onChange={handleFileChange} class='form-control-file' />
            </div>

            <div>
                <button type="submit" class='btn btn-success'>Gönder</button>
            </div>
        </form>
    );
};

export default Form;
