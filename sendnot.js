import fetch from "node-fetch";

const EXPO_PUSH_TOKEN = "ExponentPushToken[QJkkc5DRJsi0tNAV9jpzWJ]";

async function sendNotification() {
  const message = {
    to: EXPO_PUSH_TOKEN,
    sound: "default",
    title: "💌 Surprise Message",
    body: "Good morning Sylvia ❤️ Just wanted to remind you you're loved.",
  };

  await fetch("https://exp.host/--/api/v2/push/send", {
    method: "POST",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(message),
  });

  console.log("Notification sent 🚀");
}

sendNotification();
