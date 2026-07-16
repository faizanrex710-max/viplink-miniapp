document.addEventListener("DOMContentLoaded", async () => {

  const container = document.querySelector(".container");

  try {

    const res = await fetch("./posts.json");
    const posts = await res.json();

    let html = `
      <input type="text" class="search" placeholder="🔍 Search Videos...">
      <div class="category">
        <button>🔥 Trending</button>
        <button>😂 Funny</button>
        <button>🎬 Movies</button>
        <button>❤️ Status</button>
      </div>
    `;

    posts.forEach(post => {

      html += `
      <div class="card">
        <img src="${post.image}" alt="${post.title}">

        <div class="content">
          <div class="title">${post.title}</div>

          <div class="desc">
            👁️ ${post.views} • ⏰ ${post.time}
          </div>

          <button onclick="window.open('${post.link}','_blank')">
            📥 Download Now
          </button>
        </div>
      </div>
      `;

    });

    container.innerHTML = html;

  } catch (e) {
    container.innerHTML = "<h3>Posts loading failed.</h3>";
    console.error(e);
  }

});
