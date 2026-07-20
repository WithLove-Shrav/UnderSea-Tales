# 🌊 UnderSea Tales — Reef Reading Adventure

> **A gamified English reading adventure for Grade 5 students**

[![React](https://img.shields.io/badge/React-19-61DAFB?logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-latest-646CFF?logo=vite)](https://vitejs.dev/)
[![TailwindCSS](https://img.shields.io/badge/TailwindCSS-4-06B6D4?logo=tailwindcss)](https://tailwindcss.com/)
[![Framer Motion](https://img.shields.io/badge/Framer_Motion-latest-0055FF)](https://www.framer.com/motion/)

---

## 🐢 About

**UnderSea Tales** is an immersive, gamified English reading comprehension game designed for Grade 5 students (ages 10–11). Players become underwater explorers on a mission to collect **4 magical pearls** by understanding a comic strip — *Sherman's Lagoon* by Jim Toomey.

> **"I'm playing a game."** — NOT — **"I'm taking an English test."**

Inspired by Pixar, Nintendo, Duolingo, Pokémon, and Disney-level polish.

---

## ✨ Features

| Screen | Description |
|---|---|
| 🏠 **Home Screen** | Animated ocean, Tully the Turtle swims in with dialogue |
| 🐠 **Character Intro** | Meet the Shark and Crab characters |
| 📖 **Comic Reader** | Panel-by-panel navigation of all 8 comic panels |
| 🫧 **Q1 — Complete the Comic** | Tap floating speech bubbles to predict the crab's next line |
| 🌊 **Q2 — What Would Happen Instead?** | Open a package to unlock illustrated wife-reaction cards |
| 🐚 **Q3 — Treasure Chest Sort** | Open chests to find which sentence uses "present" the same way |
| ✨ **Q4 — Emotion Waves** | Match the "Oh, well" feeling from floating shells |
| 🏆 **Results Screen** | Certificate, star rating, pearl showcase & celebration |

---

## 🎮 Game Mechanics

- **No timers. No penalties. No stress.**
- Wrong answers give encouraging hints, never "Incorrect"
- Students can retry each question
- Comic is always visible/accessible during questions
- Pearl collection with glowing animations on each correct answer
- Full confetti + reef celebration on completion

---

## 🧠 Educational Goals

| Pearl | Skill Assessed |
|---|---|
| 🫧 Pearl of Prediction | Predicting the next action/event |
| 🌊 Pearl of Possibilities | Alternative outcomes when one event changes |
| 🐚 Pearl of Meaning | Context-based vocabulary inference |
| ✨ Pearl of Feelings | Identifying mood and tone |

---

## 🛠 Tech Stack

- **React 19** + **TypeScript**
- **Vite** (build tooling)
- **TailwindCSS v4** (styling)
- **Framer Motion** (animations throughout)
- **Google Fonts** — Fredoka One + Nunito
- React Context API (state management)

---

## 🚀 Getting Started

```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Build for production
npm run build
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

---

## 🎨 Art Direction

- **Theme:** Bright underwater fantasy
- **Inspired by:** Finding Nemo, Moana, Animal Crossing, Club Penguin
- **Colour Palette:** Ocean Blue · Turquoise · Seafoam Green · Coral Pink · Soft Yellow · Purple Coral
- **Animated:** Bubbles · Fish · Jellyfish · Seaweed · Sun rays · Crabs · Corals

---

## 📁 Project Structure

```
src/
  assets/          # Comic strip and character images
  components/
    ocean/         # OceanBackground (animated)
    characters/    # TurtleGuide
    ui/            # PearlBadge
    screens/       # HomeScreen, ComicReader, QuestionLayout, ResultsScreen
    games/         # SpeechBubbleChoice, ReactionCards, TreasureChestSort, EmotionShellGame
    rewards/       # PearlReward
  context/         # GameContext (state)
  data/            # comicPanels.ts, questions.ts
```

---

## 👩‍🏫 Designed For

**Grade 5 students · Ages 10–11 · English Reading Comprehension**

Comic: *Sherman's Lagoon* by Jim Toomey

---

*Built with ❤️ for young readers everywhere* 🌊
