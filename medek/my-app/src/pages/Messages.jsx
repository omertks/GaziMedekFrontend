import React from "react";



export default function Messages() {

    const messageServiceUrl = process.env.REACT_APP_MESSAGE_SERVICE_URL;

    // Burada soket programlama ile yap

    const openMessage = (event) => {

    }

    const getMessages = () => {

    }

    return (
        <>
            <h4>Mesajlarım</h4>

            <div value="chatId" className="row" style={{backgroundColor:"gray"}} onClick={openMessage}>
                
                <b>Kullanıcı Adı</b>

                <div className="row">
                    <div className="col">
                        <p>Son Mesaj</p>
                    </div>

                    <div className="col">
                        <p>Gönderim Tarihi</p>
                    </div>
                </div>
            </div>

        </>
    );
}