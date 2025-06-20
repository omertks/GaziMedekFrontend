import React, { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import MessageApi from "../apis/MessageApi";
import { Form, Button, ListGroup, Card } from "react-bootstrap";
import ProccessApi from "../apis/ProccessApi";

export default function Message() {
  const { id: receiverId } = useParams();
  const senderId = ProccessApi.getUserId();

  const [newMessage, setNewMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const [chatId, setChatId] = useState(null);
  const initialized = useRef(false); // Strict Mode guard

  // Sohbeti al veya oluştur
  const getOrCreateChat = async () => {
    if (chatId) return chatId;

    const chats = await MessageApi.getUserChats(senderId);
    const key = [senderId, receiverId].map(Number).sort().join(",");
    const existing = chats.find(c => c.userIds.map(Number).sort().join(",") === key);
    if (existing) {
      setChatId(existing.id);
      return existing.id;
    }
    const created = await MessageApi.createChat([+senderId, +receiverId]);
    setChatId(created.id);
    return created.id;
  };

  // Mesajları yükle
  const loadMessages = async () => {
    try {
      const id = await getOrCreateChat();
      const msgs = await MessageApi.getMessages(id);
      setMessages(msgs);
    } catch (err) {
      console.error("Mesaj yükleme hatası:", err);
    }
  };

  // Mesaj gönder
  const handleSendMessage = async () => {
    if (!newMessage.trim() || !chatId) return;
    try {
      await MessageApi.sendMessage(chatId, senderId, newMessage.trim());
      setNewMessage("");
      await loadMessages();
    } catch (err) {
      console.error("Mesaj gönderme hatası:", err);
    }
  };

  // İlk yüklemede sadece bir kez çalıştır
  // useEffect(() => {
  //   if (!initialized.current && receiverId && senderId) {
  //     initialized.current = true;
  //     loadMessages();
  //   }
  // }, [receiverId, senderId]);

  // İlk yükleme ve interval ile tekrar tekrar mesajları çek

  
useEffect(() => {
  let intervalId;

  const init = async () => {
    if (!receiverId || !senderId) return;

    const chatId = await getOrCreateChat();
    await loadMessages();

    intervalId = setInterval(() => {
      loadMessages();
    }, 3000); // Her 3 saniyede bir
  };

  init();

  return () => clearInterval(intervalId); // Bileşen unmount olursa interval durdur
}, [receiverId, senderId]);

  return (
    <div className="container mt-4">
      <Card>
        <Card.Header>
          <h5>Kullanıcı {receiverId} ile Mesajlaşma</h5>
        </Card.Header>
        <Card.Body>
          <ListGroup style={{ maxHeight: 300, overflowY: "auto" }} className="mb-3">
            {messages.map((msg) => (
              <ListGroup.Item
                key={msg.id}
                className={+msg.senderId === +senderId ? "text-end" : "text-start"}
              >
                <strong>{+msg.senderId === +senderId ? "Ben" : `Kullanıcı ${msg.senderId}`}</strong>: {msg.content}
              </ListGroup.Item>
            ))}
          </ListGroup>

          <Form className="d-flex gap-2">
            <Form.Control
              type="text"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Mesajınızı yazın..."
            />
            <Button onClick={handleSendMessage} disabled={!chatId || !newMessage.trim()}>
              Gönder
            </Button>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
}
