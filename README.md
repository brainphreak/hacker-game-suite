# Hacker Game Suite

A collection of interactive web-based games designed to teach and test cybersecurity skills in a fun and engaging way. This suite is perfect for beginners looking to understand core cybersecurity concepts and for enthusiasts wanting to sharpen their skills.

## Live Demo

Experience the Hacker Game Suite at: [https://www.brainphreak.net/code/hacker-game-suite/](https://www.brainphreak.net/code/hacker-game-suite/)

## Features

- **Four Engaging Games:** Dive into different aspects of cybersecurity with unique challenges.
- **Web-Based:** Easily accessible through any modern web browser, no installation required.
- **Educational:** Each game focuses on a specific cybersecurity domain, providing practical learning experiences.

## Games

### 1. Identity Theft (OSINT Investigation)

An open-source intelligence (OSINT) game where players investigate targets by piecing together information from various simulated social media profiles and forum posts.

- **Objective:** Answer questions about a target's personal life and background using publicly available information.
- **Skills Developed:** OSINT techniques, data correlation, critical thinking, and privacy awareness.

### 2. Phishing Expedition (Phishing Detection)

A fast-paced game designed to hone your ability to identify malicious emails. You must distinguish phishing attempts from legitimate communications within a strict time limit.

- **Objective:** Correctly classify as many emails as possible as either "phishing" or "legitimate."
- **Skills Developed:** Phishing detection, email analysis, attention to detail, and understanding common social engineering tactics.

### 3. Packet Sniffer (Network Forensics)

A network forensics puzzle where you intercept and decode hidden messages from captured network packets. This game introduces players to the basics of network traffic analysis.

- **Objective:** Decode a series of network packets to uncover hidden messages and complete the mission.
- **Skills Developed:** Network analysis fundamentals, data decoding (Hex, Base64, ROT13, etc.), pattern recognition, and understanding data encapsulation.

### 4. Firewall Breach (Command Line Typing)

A typing game that challenges your speed and accuracy in typing cybersecurity-related commands. Breach the firewall by executing commands correctly and swiftly.

- **Objective:** Type a series of cybersecurity commands accurately before the time runs out to simulate breaching a firewall.
- **Skills Developed:** Typing speed and accuracy, familiarity with common command-line interfaces and cybersecurity tools/commands.

## Technologies Used

The Hacker Game Suite is built entirely with front-end web technologies:

- **HTML5:** For structuring the content of the games and the main interface.
- **CSS3:** For styling and creating an engaging visual experience.
- **JavaScript (ES6+):** For interactive game logic and dynamic content.

## Project Structure

The project is organized as follows:

```
.
├── dox.css             # Styles for the Identity Theft game
├── dox.html            # HTML for the Identity Theft game
├── dox.js              # JavaScript logic for the Identity Theft game
├── firewall.css        # Styles for the Firewall Breach game
├── firewall.html       # HTML for the Firewall Breach game
├── firewall.js         # JavaScript logic for the Firewall Breach game
├── index.css           # Global styles or main menu styles
├── index.html          # Main entry point and game selection menu
├── matrix.js           # JavaScript for background effects or shared utilities
├── packetsniffer.css   # Styles for the Packet Sniffer game
├── packetsniffer.html  # HTML for the Packet Sniffer game
├── packetsniffer.js    # JavaScript logic for the Packet Sniffer game
├── phishing.css        # Styles for the Phishing Expedition game
├── phishing.html       # HTML for the Phishing Expedition game
├── phishing.js         # JavaScript logic for the Phishing Expedition game
├── README.md           # This file
└── .gitignore          # Specifies intentionally untracked files to ignore
```

## How to Play

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/brainphreak/hacker-game-suite.git
    ```
2.  **Navigate to the project directory:**
    ```bash
    cd hacker-game-suite
    ```
3.  **Open `index.html`:**
    Simply open the `index.html` file in your preferred web browser. This will load the main menu, from which you can select any of the games to play.

## Contributing

Contributions are welcome! If you have suggestions for new games, improvements to existing ones, or bug fixes, please feel free to:

1.  Fork the repository.
2.  Create a new branch (`git checkout -b feature/YourFeature`).
3.  Make your changes.
4.  Commit your changes (`git commit -m 'Add new feature'`).
5.  Push to the branch (`git push origin feature/YourFeature`).
6.  Open a Pull Request.


