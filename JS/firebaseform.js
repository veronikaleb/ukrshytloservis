  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-app.js";
  import { getFirestore, collection, addDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.4.0/firebase-firestore.js";

  const firebaseConfig = {
    apiKey: "AIzaSyCspFFtNGfS9wLghKLAu4ORMsJ1MH_YNCo",
    authDomain: "ukr-zhytlo-web.firebaseapp.com",
    projectId: "ukr-zhytlo-web",
    storageBucket: "ukr-zhytlo-web.firebasestorage.app",
    messagingSenderId: "351755151802",
    appId: "1:351755151802:web:1b317066b5f82111b49583",
    measurementId: "G-QX479THV6S"
  };

  const app = initializeApp(firebaseConfig);
  const db = getFirestore(app);

  const form = document.getElementById('feedbackForm');
  const responseDiv = document.getElementById('response');
  const submitBtn = document.getElementById('submitBtn');
  const spinner = document.getElementById('loadingSpinner');

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.name.value.trim();
    const email = form.email.value.trim();
    const message = form.message.value.trim();
    const recaptchaToken = grecaptcha.getResponse();

    if (!name || !email || !message) {
      responseDiv.textContent = "Будь ласка, заповніть всі поля!";
      return;
    }

    if (!recaptchaToken) {
      responseDiv.textContent = "Підтвердіть, що ви не робот!";
      return;
    }

    spinner.style.display = 'block';
    submitBtn.disabled = true;

    try {
      await addDoc(collection(db, 'feedback'), {
        name,
        email,
        message,
        createdAt: serverTimestamp()
      });

      responseDiv.style.color = 'green';
      responseDiv.textContent = "Дякуємо за ваш відгук!";
      form.reset();
      grecaptcha.reset();
    } catch (error) {
      responseDiv.style.color = 'red';
      responseDiv.textContent = "Помилка при відправці: " + error.message;
    } finally {
      spinner.style.display = 'none';
      submitBtn.disabled = false;
    }
  });