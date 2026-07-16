import { db } from "./firebase.js";

import {
collection,
getDocs,
query,
orderBy,
doc,
updateDoc,
increment
} from "https://www.gstatic.com/firebasejs/12.0.0/firebase-firestore.js";

const container=document.getElementById("posts");
const postCount=document.getElementById("postCount");

let allPosts=[];
let savedPosts=JSON.parse(localStorage.getItem("savedPosts"))||[];

async function loadPosts(){

const q=query(
collection(db,"posts"),
orderBy("createdAt","desc")
);

const snapshot=await getDocs(q);

allPosts=[];

snapshot.forEach(docSnap=>{

allPosts.push({
id:docSnap.id,
...docSnap.data()
});

});

postCount.innerHTML=`${allPosts.length} posts`;

renderPosts(allPosts);

}

function renderPosts(posts){

container.innerHTML="";

posts.forEach(post=>{

const isSaved=savedPosts.includes(post.id);

container.innerHTML+=`

<div class="card">

<img src="${post.image}" alt="">

<div class="content">

<div class="title">
${post.title}
</div>

<div class="views">
👁️ ${post.views||0} Views
</div>

<button
class="download-btn"
onclick="openVideo('${post.id}','${post.link}')">
📥 Open Post
</button>

<div class="post-actions">

<button
class="action-btn"
onclick="likePost('${post.id}')">
❤️ Like
</button>

<button
class="action-btn"
onclick="savePost('${post.id}')">
${isSaved ? "✅ Saved" : "🔖 Saved"}
</button>

<button
class="action-btn"
onclick="sharePost('${post.link}')">
📤 Share
</button>

</div>

</div>

</div>

`;

});

}

window.openVideo = async(id,link)=>{

try{

await updateDoc(doc(db,"posts",id),{
views:increment(1)
});

}catch(e){}

window.open(link,"_blank");

};

// ❤️ Like
window.likePost=(id)=>{

alert("❤️ Liked");

};

// 🔖 Save
window.savePost=(id)=>{

savedPosts=JSON.parse(localStorage.getItem("savedPosts"))||[];

if(savedPosts.includes(id)){

savedPosts=savedPosts.filter(x=>x!==id);

}else{

savedPosts.push(id);

}

localStorage.setItem("savedPosts",JSON.stringify(savedPosts));

renderPosts(allPosts);

};

// 📤 Share
window.sharePost=(link)=>{

if(navigator.share){

navigator.share({
title:"Daily Viral Videos",
url:link
});

}else{

navigator.clipboard.writeText(link);
alert("📋 Link Copied");

}

};

// Search

const searchInput=document.getElementById("searchInput");

if(searchInput){

searchInput.addEventListener("input",()=>{

const value=searchInput.value.toLowerCase();

const filtered=allPosts.filter(post=>
(post.title||"").toLowerCase().includes(value)
);

renderPosts(filtered);

});

}

// Tabs

const tabs=document.querySelectorAll(".tabs button");

// 📂 All Posts
tabs[0].onclick=()=>{

tabs[0].classList.add("active");
tabs[1].classList.remove("active");

renderPosts(allPosts);

};

// 🔖 Saved Posts
tabs[1].onclick=()=>{

tabs[1].classList.add("active");
tabs[0].classList.remove("active");

// हर बार LocalStorage से नया डेटा पढ़ो
savedPosts=JSON.parse(localStorage.getItem("savedPosts"))||[];

const saved=allPosts.filter(post=>
savedPosts.includes(post.id)
);

if(saved.length>0){

renderPosts(saved);

}else{

container.innerHTML=`

<div class="saved-empty">

<h2>🔖 Saved Posts</h2>

<p>No saved posts yet.</p>

</div>

`;

}

};

// Load Posts

loadPosts().catch(console.error);
