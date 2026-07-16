import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  deleteDoc,
  doc
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
      views: 0,
      createdAt: serverTimestamp()
    });

    alert("✅ Post Publish Ho Gayi");

    document.getElementById("title").value = "";
    document.getElementById("image").value = "";
    document.getElementById("link").value = "";

    loadPosts();

  } catch (e) {
    alert("Error : " + e.message);
  }

};

async function loadPosts() {

  const list = document.getElementById("postsList");

  if (!list) return;

  list.innerHTML = "";

  const snap = await getDocs(collection(db, "posts"));

  snap.forEach((item) => {

    const post = item.data();

    list.innerHTML += `
      <div style="
        background:#1e293b;
        padding:15px;
        border-radius:10px;
        margin-top:12px;
      ">

        <img src="${post.image}"
        style="width:100%;border-radius:10px;margin-bottom:10px;">

        <h3>${post.title}</h3>

        <p>👁️ ${post.views || 0} Views</p>

        <button
        style="background:#dc2626;margin-top:10px;"
        onclick="deletePost('${item.id}')">
        🗑️ Delete
        </button>

      </div>
    `;

  });

}

window.deletePost = async function(id){

  if(!confirm("Delete this post?")) return;

  try{

    await deleteDoc(doc(db,"posts",id));

    alert("✅ Deleted");

    loadPosts();

  }catch(e){

    alert(e.message);

  }

}

loadPosts();
