import { db } from "./firebase.js";

import {
  collection,
  addDoc,
  serverTimestamp,
  getDocs,
  deleteDoc,
  doc,
  updateDoc
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
      likes: 0,
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

        <label>👁️ Views</label><br>
        <input
        id="views-${item.id}"
        type="number"
        value="${post.views || 0}"
        style="width:100%;padding:8px;margin-bottom:10px;"><br>

        <label>❤️ Likes</label><br>
        <input
        id="likes-${item.id}"
        type="number"
        value="${post.likes || 0}"
        style="width:100%;padding:8px;margin-bottom:10px;"><br>

        <button
        onclick="updatePost('${item.id}')"
        style="background:#2563eb;margin-right:10px;">
        💾 Update
        </button>

        <button
        style="background:#dc2626;"
        onclick="deletePost('${item.id}')">
        🗑️ Delete
        </button>

      </div>
    `;

  });

}

window.updatePost = async function(id){

  const views = Number(document.getElementById(`views-${id}`).value);

  const likes = Number(document.getElementById(`likes-${id}`).value);

  try{

    await updateDoc(doc(db,"posts",id),{
      views,
      likes
    });

    alert("✅ Updated");

    loadPosts();

  }catch(e){

    alert(e.message);

  }

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
