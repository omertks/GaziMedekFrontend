import React from "react";
import { Link } from "react-router-dom";
import Slider from "../components/Slider";
import "bootstrap/dist/css/bootstrap.min.css";

export default function Home() {
  const imageUrls = [
    "https://webupload.gazi.edu.tr/upload/736/2023/11/27/0c250f47-ed2c-4bd4-a69d-211e8a08eff3-misyon-vizyon.jpg",
    "https://webupload.gazi.edu.tr/upload/736/2024/5/24/0a60dfb6-9276-4dca-a506-62c72530e1d4-4.jpg",
    "https://webupload.gazi.edu.tr/upload/736/2024/5/24/f885c721-c428-4293-96ca-dcd7e7e8c2df-5.jpg"
  ];

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h2 className="text-center text-primary mb-4">Gazi Üniversitesi</h2>

        {/* Slider */}
        <div className="mb-4">
          <Slider images={imageUrls} />
        </div>

        {/* Giriş Yap Butonu */}
        <div className="text-center">
          <Link to="/login">
            <button className="btn btn-success btn-lg px-4">Giriş Yap</button>
          </Link>
        </div>
      </div>
    </div>
  );
}
