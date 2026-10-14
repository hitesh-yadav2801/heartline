# Heartline — Product Identity

> **🔒 Product definition — fixed.** This document defines *what* Heartline is and does. Implementation tasks must not
> change, add or remove product behavior. If something here looks wrong, unclear or technically impractical, the agent
> raises it as a question during planning — only the product owner changes this file.

## What is Heartline

Heartline is a private mobile app for couples that creates a shared emotional space
for daily connection, gentle conflict resolution, and relationship rituals.

It is not a therapy tool. It is not a task manager. It is not a journaling app.
It is the digital equivalent of leaving a love note on the fridge — but with
enough structure to help couples actually hear each other.

---

## Tagline

> "Your relationship, in one place."

---

## Target Users

- Couples aged 18–40
- Both long-distance and cohabiting couples
- People who struggle to bring up small issues before they become big ones
- Partners who want more intentional daily connection
- Users who are emotionally invested in their relationship and want a tool that matches that energy

---

## Core Emotional Promise

The app should always make the user feel:
- **Safe** — sharing something vulnerable here is okay
- **Heard** — my partner will see this and respond
- **Close** — even small interactions bring us together

---

## Tone Guide

| Use | Avoid |
|-----|-------|
| Warm, gentle, intimate | Clinical, cold, transactional |
| Encouraging | Judgmental or prescriptive |
| Playful when appropriate | Sarcastic or dismissive |
| Simple, clear language | Jargon, technical terms |

The app speaks like a trusted friend, not a productivity tool.

---

## Sacred Terminology

Every user-facing string (labels, buttons, notifications, AI output shown to users) must use these terms.
Never substitute alternatives.

**Scope:** this applies to what users see. Backend code, API endpoints, DB columns, and enum values may use
technical terms such as `resolve`, `resolved`, `thread`, or `archive`. Those never reach the interface.

| Heartline Term | Never Use |
|----------------|-----------|
| Heart | Issue, Ticket, Problem, Complaint |
| Open a Heart | Raise an issue, File a report |
| Resolution Space | Thread, Chat, Conversation |
| Memory Jar | History, Archive, Log |
| Hug | Acknowledge, Confirm, React |
| We're Good | Close, Resolve, Mark done |
| Appreciation Drop | Compliment, Note, Message |
| Pulse | Check-in, Survey, Form |
| Us Time | Date, Meeting, Event |

---

## What This App Is NOT

- Not a couples therapy replacement
- Not a social media platform
- Not a general messaging app (WhatsApp already exists)
- Not a habit tracker
- Not a public or shareable experience — everything is private to the couple

---

## Success Feels Like

A couple opens the app every day not because something is wrong,
but because it has become part of how they stay close.
