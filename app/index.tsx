import { View, Text, StyleSheet, Pressable, Platform } from "react-native";
import { useEffect, useState } from "react";
import * as Notifications from "expo-notifications";
import * as Device from "expo-device";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

export default function App() {
  const [message, setMessage] = useState("Good morning ❤️");
  const [expoPushToken, setExpoPushToken] = useState("");

  const refreshMessage = () => {
    const messages = [
      "Good morning Sylvia 🌸",
      "You are doing amazing ❤️",
      "I’m proud of you 💖",
      "Take care today 🌷",
      "You are loved 💕",
    ];

    const random = messages[Math.floor(Math.random() * messages.length)];
    setMessage(random);
  };

  async function registerForPushNotificationsAsync() {
    let token;

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();

      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } =
          await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        alert("Permission not granted for notifications");
        return;
      }

      token = (await Notifications.getExpoPushTokenAsync()).data;
      setExpoPushToken(token);
    } else {
      alert("Must use physical device for push notifications");
    }
  }

  useEffect(() => {
    refreshMessage();
    registerForPushNotificationsAsync();
  }, []);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>🌸 Sylvia's Notes</Text>

      <View style={styles.card}>
        <Text style={styles.label}>Today's Message:</Text>
        <Text style={styles.message}>{message}</Text>
      </View>

      <Pressable style={styles.button} onPress={refreshMessage}>
        <Text style={styles.buttonText}>Refresh</Text>
      </Pressable>

      <View style={styles.tokenBox}>
        <Text style={styles.label}>Push Token:</Text>
        <Text style={styles.tokenText}>
          {expoPushToken ? expoPushToken : "Loading..."}
        </Text>
      </View>

      <Text style={styles.footer}>MVP v1.1</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#120018",
    alignItems: "center",
    justifyContent: "center",
    padding: 20,
  },
  title: {
    fontSize: 28,
    color: "white",
    marginBottom: 20,
    fontWeight: "bold",
  },
  card: {
    backgroundColor: "#2a0a3d",
    padding: 20,
    borderRadius: 20,
    width: "100%",
    marginBottom: 20,
  },
  label: {
    color: "#aaa",
    marginBottom: 10,
  },
  message: {
    color: "white",
    fontSize: 18,
  },
  button: {
    backgroundColor: "#ff4da6",
    padding: 12,
    borderRadius: 12,
    marginBottom: 20,
  },
  buttonText: {
    color: "white",
    fontWeight: "bold",
  },
  tokenBox: {
    backgroundColor: "#1f0a2b",
    padding: 15,
    borderRadius: 12,
    width: "100%",
  },
  tokenText: {
    color: "#0ff",
    fontSize: 10,
  },
  footer: {
    marginTop: 20,
    color: "#666",
  },
});
