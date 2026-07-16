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

</div>

</div>

`;

});

}

window.openVideo=async(id,link)=>{

try{

await updateDoc(doc(db,"posts",id),{

views:increment(1)

});

}catch(e){}

window.open(link,"_blank");

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

// Saved Tab

const tabs=document.querySelectorAll(".tabs button");

tabs[0].onclick=()=>{

renderPosts(allPosts);

tabs[0].classList.add("active");
tabs[1].classList.remove("active");

};

tabs[1].onclick=()=>{

tabs[1].classList.add("active");
tabs[0].classList.remove("active");

container.innerHTML=`

<div class="saved-empty">

<h2>🔖 Saved Posts</h2>

<p>No saved posts yet.</p>

</div>

`;

};

// Load Posts

loadPosts().catch(console.error);
