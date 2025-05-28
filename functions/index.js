const functions = require('firebase-functions');
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

exports.submitFeedback = functions.https.onCall(async (data, context) => {
  const { name, email, message } = data;

  if (!name || !email || !message) {
    throw new functions.https.HttpsError('invalid-argument', 'Всі поля мають бути заповнені.');
  }

  if (message.length < 10) {
    throw new functions.https.HttpsError('invalid-argument', 'Повідомлення надто коротке.');
  }

  // Перевірка часу останньої відправки цього email
  const feedbacksRef = db.collection('feedback');
  const recentFeedbacks = await feedbacksRef
    .where('email', '==', email)
    .orderBy('createdAt', 'desc')
    .limit(1)
    .get();

  if (!recentFeedbacks.empty) {
    const lastFeedback = recentFeedbacks.docs[0].data();
    const lastTimestamp = lastFeedback.createdAt.toMillis();
    const now = Date.now();

    if (now - lastTimestamp < 5 * 60 * 1000) { // 5 хвилин
      throw new functions.https.HttpsError('resource-exhausted', 'Ви вже надсилали відгук за останні 5 хвилин.');
    }
  }

  // Все добре — додаємо відгук
  await feedbacksRef.add({
    name,
    email,
    message,
    createdAt: admin.firestore.FieldValue.serverTimestamp()
  });

  return { success: true };
});
