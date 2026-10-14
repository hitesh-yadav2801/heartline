# Heartline — Notifications Guide

> **📐 Reference design — not final.** This document was derived from the feature specifications to guide
> implementation. It is **not** a complete or final notification spec. During implementation, the full notification spec is designed and
> finalized feature by feature. Payloads, scheduling mechanics and type names may change; the moments users are notified about (from `FEATURES.md`) do not: tables/fields/routes may be added, renamed, split or reshaped if that serves the feature better.
> **Rules:** (1) the product behavior in `FEATURES.md` / `USER_FLOWS.md` must not change; (2) every deviation is proposed
> in the task plan and confirmed before building; (3) this doc is updated in the same branch so it always matches the code.

---

## Setup

Push notifications are handled via Firebase Cloud Messaging (FCM).
The Flutter client registers for a token on app launch.
The backend sends all notifications — the client never sends them.

FCM token is stored in `profiles.fcm_token` and refreshed on every app launch.

---

## Notification Types

| Type | Trigger | Title | Body | Deep Link |
|------|---------|-------|------|-----------|
| `heart_opened` | Partner raises a Heart | "{name} opened their heart to you" | "Tap to send a hug." | `/heart/{heartId}/resolution` |
| `hug_received` | Partner sends Hug | "{name} sent you a hug 🤍" | "They're here. Open your space." | `/heart/{heartId}/resolution` |
| `message_received` | New message in Resolution Space | "{name} replied" | Message preview (max 60 chars) | `/heart/{heartId}/resolution` |
| `heart_resolved` | Both tap "We're Good" | "💚 You two worked it out" | "This one's going in the Memory Jar." | `/memory-jar/{heartId}` |
| `mood_update` | Partner submits daily mood | "{name} checked in" | "{mood emoji} They're feeling {mood} today." | `/home` |
| `appreciation_drop` | Partner sends Appreciation Drop | "{name} left you something 💌" | Appreciation preview (max 60 chars) | `/appreciation` |
| `pulse_ready` | Sunday 9AM — Pulse questions ready | "Your weekly pulse is here" | "3 questions. 3 minutes. Opens the week right." | `/pulse` |
| `us_time_reminder` | 1 hour before scheduled Us Time | "Us Time soon 🕯" | "{title} is in 1 hour." | `/us-time/{planId}` |
| `milestone_reminder` | Day of a milestone | "Today is special 💛" | "It's your {milestone title}." | `/milestones` |

### Reminders & nudges

These are already defined in FEATURES.md and USER_FLOWS.md. Each is sent at most once per reference (de-duplicated via `notifications_log`).

| Type | Trigger | Title | Body | Deep Link |
|------|---------|-------|------|-----------|
| `hug_reminder` | Heart open 72h with no Hug | "{name}'s heart is still open" | "A hug goes a long way." | `/heart/{heartId}/resolution` |
| `were_good_reminder` | We're Good pending 24h without the partner saying it back | "{name} says you're good 💚" | "Are you? Say it back when you're ready." | `/heart/{heartId}/resolution` |
| `mood_nudge` | 8PM user-local time, no mood submitted today | "How are you feeling today?" | "{partner name} would love to know." | `/mood` |
| `cooldown_ended` | 30-minute cool-down finished *(Phase 2)* | "Ready to continue?" | "Your Resolution Space is open again." | `/heart/{heartId}/resolution` |

`type` values are backend identifiers. Titles and bodies are user-facing and follow `PRODUCT.md` terminology.

---

## Scheduling (UTC)

All scheduled sends run on UTC. To fire at a user's local time, convert using `profiles.utc_offset_minutes`:
`sendAtUtc = localTarget - utcOffsetMinutes`. For example, 8PM IST (+330) = 14:30 UTC.
A cron job runs every 15 minutes and picks up users whose local target time falls in that window.

---

## Deep Link Routing

Deep links use the format: `heartline://{path}`

GoRouter handles all deep link routing via `redirect` + path matching.
Ensure `android/app/src/main/AndroidManifest.xml` and iOS `Info.plist`
are configured with the `heartline` scheme.

---

## Do Not Disturb

The app respects the system Do Not Disturb setting.
On iOS: use `UNNotificationContent` with interruption level `passive` for mood updates.
On Android: use `NotificationCompat.PRIORITY_DEFAULT` for mood, `HIGH` for Hearts.

---

## FCM Token Refresh

```dart
// In AuthBloc or app init — refresh token on every launch

FirebaseMessaging.instance.getToken().then((token) {
  if (token != null) {
    context.read<AuthBloc>().add(FcmTokenRefreshed(token));
  }
});

FirebaseMessaging.instance.onTokenRefresh.listen((token) {
  context.read<AuthBloc>().add(FcmTokenRefreshed(token));
});
```

Backend endpoint: `PATCH /auth/fcm-token`. It updates `profiles.fcm_token` and `profiles.utc_offset_minutes`.
The event carries both values. The offset comes from `DateTime.now().timeZoneOffset.inMinutes`.

---

## Foreground Notification Handling

When the app is in the foreground, suppress the system notification and instead
show an in-app toast using a custom `HeartlineToast` widget.

```dart
FirebaseMessaging.onMessage.listen((RemoteMessage message) {
  final type = message.data['type'];
  // Show in-app toast, do not show system notification
  HeartlineToast.show(context, message);
});
```

---

## Backend Notification Send Pattern

```typescript
// Always log before sending
await supabase.from('notifications_log').insert({
  recipient_id: recipientId,
  type: 'heart_opened',
  reference_id: heartId,
});

// Then send — swallow errors, notification is non-critical
await notificationService.send({ token, title, body, data });
```
