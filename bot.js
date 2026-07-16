const TelegramBot = require("node-telegram-bot-api");
const { db } = require("./firebase-admin");

const token = "8783557560:AAEDmW0wh98PD4tkC8DqVqjq_k2VYXS7c2Y";

const bot = new TelegramBot(token, {
  polling: true
});

// START COMMAND
bot.onText(/\/start/, async (msg) => {

  try {
    await db.collection("users").doc(String(msg.chat.id)).set({
      chatId: msg.chat.id,
      username: msg.from.username || "",
      firstName: msg.from.first_name || "",
      joinedAt: new Date()
    }, { merge: true });

    console.log("✅ User Saved:", msg.chat.id);

  } catch (err) {
    console.log(err);
  }

  bot.sendMessage(
    msg.chat.id,
`👋 Welcome!

Aap @VIPVIRALVIDEOS_BOT pe pohche hain.

📺 Latest videos dekhne ke liye niche button click karo:

✨ Features:
• HD photos & videos
• Smart search
• Likes & view counts
• Smooth infinite scroll

👇`,
{
reply_markup:{
inline_keyboard:[
[
{
text:"📢 Join Channel",
web_app:{
url:"https://viplink-miniapp2.vercel.app/"
}
}
],
[
{
text:"🔗 Share Bot",
url:"https://t.me/share/url?url=https://t.me/VIPVIRALVIDEOS_BOT"
}
]
]
}
}
);

});


// ==============================
// AUTO MESSAGE EVERY 1 HOUR
// ==============================

async function sendAutoMessage(){

try{

const snapshot = await db.collection("users").get();

snapshot.forEach(async(doc)=>{

const user = doc.data();

try{

await bot.sendMessage(
user.chatId,

`🚀 Kyaa appne ab tk video dekh li

👁️ Latest viral videos ready hain.

👇 Niche button dabao aur seedha post par pahunch jao.`,

{
reply_markup:{
inline_keyboard:[
[
{
text:"📱 Open Channel",
web_app:{
url:"https://viplink-miniapp2.vercel.app/"
}
}
]
]
}
}
);

}catch(e){

console.log("Skip:",user.chatId);

}

});

}catch(err){

console.log(err);

}

}

// 1 Hour = 3600000 ms
setInterval(sendAutoMessage,3600000);

console.log("✅ Bot Started");
