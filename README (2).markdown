# Global Fart Tracker

A technical website to track global farts in real-time, play Fart Clicker, and chat with FartBot about fart facts!

## Features
- **Fart Counter**: Estimates global farts per second.
- **Fart Clicker**: Click an animated Elon Musk to earn Fart Currency (FC), buy upgrades, and unlock achievements.
- **FartBot**: Chatbot to answer fart-related questions.
- **Contact Form**: Send messages via Formspree.

## Setup
1. **Clone the Repository**:
   ```
   git clone https://github.com/volumetaker/Global-Fart-Tracker-2.git
   cd Global-Fart-Tracker-2
   ```
2. **Add Assets**:
   - `elon-musk.png`: Animated Elon Musk character (cartoonish, spiky hair, large eyes, hoodie).
   - `fart-sound.mp3`: Fart sound effect (source from freesound.org).
   - `fartcoin-meme1.png`: Fartcoin Logo with Elon Musk Farting.
   - `fartcoin-meme2.png`: Fartcoin Chart Going Up with Fart Clouds.
3. **Update Formspree**:
   - Replace `https://formspree.io/f/your_form_id` in `index.html` with your Formspree endpoint.
4. **Deploy to GitHub Pages**:
   - Push to `main` branch:
     ```
     git add .
     git commit -m "Initial commit"
     git push origin main
     ```
   - Enable GitHub Pages in Settings > Pages > Source > Branch: main, Folder: / (root).
5. **Access**:
   - Visit `https://volumetaker.github.io/Global-Fart-Tracker-2/`.

## Local Testing
- Use a static server:
  ```
  npx serve .
  ```
- Access: `http://localhost:3000`.