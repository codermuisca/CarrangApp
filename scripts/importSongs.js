require("dotenv").config();
const fs = require("fs");
const csv = require("csv-parser");
const { initializeApp } = require("firebase/app");
const { getFirestore, doc, setDoc } = require("firebase/firestore");

const firebaseConfig = {
  apiKey: process.env.EXPO_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.EXPO_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.EXPO_PUBLIC_FIREBASE_APP_ID,
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

function createSongId(title) {
  return title
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
}

fs.createReadStream("data/songs.csv")
  .pipe(csv())
  .on("data", async (row) => {
    const song = {
      title: row.title,
      author: row.author,
      rhythm: row.rhythm,
      tone: row.tone,
      lyrics: row.lyrics,
    };

    const id = createSongId(song.title);

    await setDoc(doc(db, "songs", id), song);
    console.log(`Subida: ${song.title}`);
  })
  .on("end", () => {
    console.log("Importación terminada.");
  });