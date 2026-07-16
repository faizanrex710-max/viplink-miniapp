import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

window.publishPost = async function () {

  const title = document.getElementById("title").value;
  const image = document.getElementById("image").value;
  const link = document.getElementById("link").value;

  if (!title || !image || !link) {
    alert("Sabhi fields bharo");
    return;
  }

  try {

    await addDoc(collection(db, "posts"), {
      title,
      image,
      link,
      createdAt: serverTimestamp()
    });

    alert("✅ Post Publish Ho Gayi");

    document.getElementById("title").value = "";
    document.getElementById("image").value = "";
    document.getElementById("link").value = "";

  } catch (e) {
    alert("Error : " + e.message);
  }

}
