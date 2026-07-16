import { db } from "./firebase.js";

import {
  collection,
  getDocs,
  query,
  orderBy
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

document.addEventListener("DOMContentLoaded", async () => {

  const container = document.querySelector(".container");

  try {

    const q = query(collection(db, "posts"), orderBy("createdAt", "desc"));
    const snapshot = await getDocs(q);

    let html = `
      <input type="text" class="search" placeholder="🔍 Search Videos...">

      <div class="category">
        <button>🔥 Trending</button>
        <button>😂 Funny</button>
        <button>🎬 Movies</button>
        <button>❤️ Status</button>
      </div>
    `;

    snapshot.forEach((doc) => {

      const post = doc.data();

      html += `
      <div class="card">

        <img src="${post.image}" alt="${post.title}">

        <div class="content">

          <div class="title">${post.title}</div>

          <button onclick="window.open('${post.link}','_blank')">
            📥 Download Now
          </button>

        </div>

      </div>
      `;

    });

    container.innerHTML = html;

  } catch (e) {
    console.error(e);
    container.innerHTML = "<h2>Error Loading Posts</h2>";
  }

});
