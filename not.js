import * as Notifications from "expo-notifications";
import { Platform } from "react-native";

/* =========================
   GLOBAL HANDLER
========================= */
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});

/* =========================
   ANDROID CHANNEL SETUP
========================= */
export async function setupAndroidChannel() {
  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("tasks", {
      name: "Task Reminders",
      importance: Notifications.AndroidImportance.MAX,
      sound: true,
      vibrationPattern: [0, 250, 250, 250],
      lockscreenVisibility:
        Notifications.AndroidNotificationVisibility.PUBLIC,
    });
  }
}

/* =========================
   PERMISSION REQUEST
========================= */
export async function requestPermission() {
  const { status } = await Notifications.requestPermissionsAsync();
  return status === "granted";
}

/* =========================
   SINGLE NOTIFICATION
========================= */
export async function sendNotification(task) {
  return await Notifications.scheduleNotificationAsync({
    content: {
      title: "⏰ Task Reminder",
      body: task,
      sound: true,
    },
    trigger: null, // immediate
  });
}

/* =========================
   DELAYED NOTIFICATION
========================= */
export async function scheduleNotification(task, seconds = 10) {
  return await Notifications.scheduleNotificationAsync({
    content: {
      title: "📌 Reminder",
      body: task,
      sound: true,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds,
      repeats: false,
    },
  });
}

/* =========================
   INSISTENT MODE (REPEATING)
========================= */
export async function persistentReminder(task, seconds = 60) {
  return await Notifications.scheduleNotificationAsync({
    content: {
      title: "🚨 URGENT TASK",
      body: task,
      sound: true,
      priority: Notifications.AndroidNotificationPriority.MAX,
    },
    trigger: {
      type: Notifications.SchedulableTriggerInputTypes.TIME_INTERVAL,
      seconds,
      repeats: true,
    },
  });
}

/* =========================
   CANCEL ALL NOTIFICATIONS
========================= */
export async function clearAllReminders() {
  await Notifications.cancelAllScheduledNotificationsAsync();
}
