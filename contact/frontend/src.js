import { initializeApp } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-app.js";
import { getDatabase, ref, push, onChildAdded } from "https://www.gstatic.com/firebasejs/9.22.1/firebase-database.js";

const firebaseConfig = {
  apiKey: "AIzaSyBpPGU8M2hflIiE8m9KIOchNRtVZfauhh4",
  authDomain: "publix-e67d5.firebaseapp.com",
  projectId: "publix-e67d5",
  storageBucket: "publix-e67d5.firebasestorage.app",
  messagingSenderId: "1043315089353",
  appId: "1:1043315089353:web:29c5358ff908add1571218",
  measurementId: "G-5DL50H1T1F"
};

const app = initializeApp(firebaseConfig);
const db = getDatabase(app);

const form = document.getElementById('contact-form');
const chatContainer = document.getElementById('chat-container');

form.addEventListener('submit', async (e) => {
    e.preventDefault();
    
    const subject = document.getElementById('subject').value;
    const description = document.getElementById('description').value;
    const mediaFiles = document.getElementById('media').files;
    
    const mediaPromises = Array.from(mediaFiles).map(file => {
        return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onloadend = () => resolve({ type: file.type, data: reader.result });
            reader.readAsDataURL(file);
        });
    });
    
    const media = await Promise.all(mediaPromises);
    
    const message = {
        subject,
        description,
        media,
        timestamp: Date.now(),
        sender: 'user'
    };
    
    push(ref(db, 'chats'), message);
    form.reset();
});

onChildAdded(ref(db, 'chats'), (snapshot) => {
    const message = snapshot.val();
    displayMessage(message);
});

function displayMessage(message) {
    const messageElement = document.createElement('div');
    messageElement.classList.add('message', message.sender === 'user' ? 'user-message' : 'admin-message');
    
    messageElement.innerHTML = `
        <p><strong>${message.subject}</strong></p>
        <p>${message.description}</p>
    `;
    
    if (message.media && message.media.length > 0) {
        message.media.forEach(media => {
            if (media.type.startsWith('image')) {
                const img = document.createElement('img');
                img.src = media.data;
                messageElement.appendChild(img);
            } else if (media.type.startsWith('video')) {
                const video = document.createElement('video');
                video.src = media.data;
                video.controls = true;
                messageElement.appendChild(video);
            }
        });
    }
    
    chatContainer.appendChild(messageElement);
}

