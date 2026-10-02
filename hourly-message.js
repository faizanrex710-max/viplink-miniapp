const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN;

const FIREBASE_PROJECT_ID = process.env.FIREBASE_PROJECT_ID;
const FIREBASE_API_KEY = process.env.FIREBASE_API_KEY;

async function sendMessage(chatId) {
  const url = `https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      chat_id: chatId,

      text: `🚀 Kyaa appne ab tk video dekh li

👁️ Latest viral videos ready hain.

👇 Niche button dabao aur seedha post par pahunch jao.`,

      reply_markup: {
        inline_keyboard: [
          [
            {
              text: "📱 Open Channel",
              web_app: {
                url: "https://viplink-miniapp2.vercel.app"
              }
            }
          ]
        ]
      }
    })
  });

  return response.json();
}

async function main() {
  if (!TELEGRAM_BOT_TOKEN) {
    throw new Error("TELEGRAM_BOT_TOKEN missing");
  }

  const firestoreUrl =
    `https://firestore.googleapis.com/v1/projects/${FIREBASE_PROJECT_ID}/databases/(default)/documents/users?key=${FIREBASE_API_KEY}`;

  const response = await fetch(firestoreUrl);
  const data = await response.json();

  if (!response.ok) {
    throw new Error(JSON.stringify(data));
  }

  const users = data.documents || [];

  let sent = 0;
  let failed = 0;

  for (const document of users) {
    const chatId = document.fields?.chatId?.integerValue;

    if (!chatId) continue;

    try {
      const result = await sendMessage(chatId);

      if (result.ok) {
        sent++;
      } else {
        failed++;
      }
    } catch (error) {
      failed++;
      console.log("Failed:", chatId);
    }
  }

  console.log(`Sent: ${sent} | Failed: ${failed}`);
}

main().catch(error => {
  console.error(error);
  process.exit(1);
});
