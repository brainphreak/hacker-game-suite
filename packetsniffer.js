        document.addEventListener('DOMContentLoaded', function() {
            // DOM Elements
            const packetDisplay = document.getElementById('packet-display');
            const packetHeader = document.getElementById('packet-header');
            const waitingMessage = document.getElementById('waiting-message');
            const hexDump = document.getElementById('hex-dump');
            const decodeInput = document.getElementById('decode-input');
            const answerInput = document.getElementById('answer-input');
            const decodeBtn = document.getElementById('decode-btn');
            const submitBtn = document.getElementById('submit-btn');
            const startBtn = document.getElementById('start-btn');
            const hintBtn = document.getElementById('hint-btn');
            const resetBtn = document.getElementById('reset-btn');
            const autoFillBtn = document.getElementById('auto-fill-btn');
            const hintBox = document.getElementById('hint-box');
            const messageLog = document.getElementById('message-log');
            const packetsDecoded = document.getElementById('packets-decoded');
            const currentPacket = document.getElementById('current-packet');
            const hintsUsed = document.getElementById('hints-used');
            const decodeProgress = document.getElementById('decode-progress');
            const progressText = document.getElementById('progress-text');
            const difficultyBtns = document.querySelectorAll('.difficulty-btn');
            const toolBtns = document.querySelectorAll('.tool-btn');
            const keyInputGroup = document.getElementById('key-input-group');
            const cipherKeyInput = document.getElementById('cipher-key');
            const applyKeyBtn = document.getElementById('apply-key-btn');
            
            // Game State
            let gameActive = false;
            let currentDifficulty = "noob";
            let decodedPackets = 0;
            let totalPackets = 5;
            let currentPacketNum = 0;
            let hintsUsedCount = 0;
            let currentEncodedMessage = "";
            let currentDecodingTool = "";
            let currentPacketData = null;
            let currentHexData = "";
            let currentCipherKey = "";
            let currentCaesarShift = 3; // Default shift

            // Packet database
            const packetDatabase = {
                noob: [
                    {
                        hexData: "57 65 6c 63 6f 6d 65 20 74 6f 20 54 68 65 42 6c 61 63 6b 50 61 63 6b 65 74 21",
                        encoded: "57656c636f6d6520746f20546865426c61636b5061636b657421",
                        method: "hex",
                        answer: "Welcome to TheBlackPacket!",
                        hint: "This is simple hexadecimal encoding. Convert each byte pair to ASCII."
                    },
                    {
                        hexData: "52 33 4a 6c 5a 58 52 70 62 6d 64 7a 49 47 68 68 59 32 74 6c 63 67 3d 3d",
                        encoded: "52334a6c5a585270626d647a494768685932746c63673d3d",
                        method: "base64", 
                        answer: "Greetings hacker",
                        hint: "Convert the hex to text first, then use Base64 decoder on that result."
                    },
                    {
                        hexData: "47 75 72 20 63 6e 66 66 6a 62 65 71 20 76 66 20 66 62 79 69 72 71 21",
                        encoded: "47757220636e66666a6265712076662066627969727121",
                        method: "rot13",
                        answer: "The password is solved!",
                        hint: "First convert hex to text, then apply ROT13 cipher to the result."
                    },
                    {
                        hexData: "41 63 63 65 73 73 20 67 72 61 6e 74 65 64 20 74 6f 20 72 6f 6f 74",
                        encoded: "01000001 01100011 01100011 01100101 01110011 01110011 00100000 01100111 01110010 01100001 01101110 01110100 01100101 01100100 00100000 01110100 01101111 00100000 01110010 01101111 01101111 01110100",
                        method: "binary",
                        answer: "Access granted to root",
                        hint: "This is binary encoding. Convert each 8-bit group to ASCII."
                    },
                    {
                        hexData: "04 2b 30 27 35 23 2e 2e 62 20 3b 32 23 31 31",
                        encoded: "042b302735232e2e62203b32233131",
                        method: "xor",
                        answer: "Firewall bypass",
                        hint: "Convert hex to text first, then apply XOR with key 0x42 to each character."
                    }
                ],
                pro: [
                    {
                        hexData: "56 47 68 6c 51 6d 78 68 59 32 74 51 59 57 4e 72 5a 58 51 3d",
                        encoded: "5647686c516d78685932745159574e725a58513d",
                        method: "base64",
                        answer: "TheBlackPacket",
                        hint: "Convert hex to text first, then use Base64 decoder."
                    },
                    {
                        hexData: "4b 64 66 6e 68 75 20 46 6f 64 71 20 51 68 77 7a 72 75 6e 21",
                        encoded: "4b64666e687520466f6471205168777a72756e21",
                        method: "caesar",
                        answer: "Hacker Clan Network!",
                        hint: "Convert hex to text first, then apply Caesar cipher with shift 3 (only shift letters A-Z and a-z)."
                    },
                    {
                        hexData: "16 2A 27 62 12 23 21 29 27 36 31 62 04 2E 2D 35",
                        encoded: "162A27621223212927363162042E2D35",
                        method: "xor",
                        answer: "The Packets Flow",
                        hint: "Convert hex to text first, then apply XOR with key 0x42."
                    },
                    {
                        hexData: "56 32 55 67 59 58 4A 6C 49 48 64 68 64 47 4E 6F 61 57 35 6E",
                        encoded: "5632556759584A6C4948646864474E6F6157356E",
                        method: "multi",
                        answer: "We are watching",
                        hint: "Convert hex to text first, then use Base64 decoder."
                    },
                    {
                        hexData: "4E 6C 71 6A 20 72 69 20 46 6C 73 6B 68 75",
                        encoded: "4E6C716A20726920466C736B6875",
                        method: "multi", 
                        answer: "King of Cipher",
                        hint: "Convert hex to text, then decode string as caesar cipher with shift of 3"
                    }
                ],
                elite: [
                    {
                        hexData: "30 31 30 30 31 31 30 31 30 31 31 30 30 30 30 31 30 31 31 31 30 30 31 31 30 31 31 31 30 31 30 30 30 31 31 30 30 31 30 31 30 31 31 31 30 30 31 30 30 30 31 30 30 30 30 30 30 31 31 30 31 31 31 31 30 31 31 30 30 31 31 30 30 30 31 30 30 30 30 30 30 31 30 31 30 30 30 30 30 31 31 30 30 30 30 31 30 31 31 30 30 30 31 31 30 31 31 30 31 30 31 31 30 31 31 30 30 31 30 31 30 31 31 31 30 31 30 30 30 31 31 31 30 30 31 31",
                        encoded: "30313030313130313031313030303031303131313030313130313131303130303031313030313031303131313030313030303130303030303031313031313131303131303031313030303130303030303031303130303030303131303030303130313130303031313031313031303131303131303031303130313131303130303031313130303131",
                        method: "multi",
                        answer: "Master of Packets",
                        hint: "Convert hex to text first, then use binary decoder then use Base64 decoder"
                    },
                    {
                        hexData: "47 75 72 4F 79 6E 70 78 43 6E 70 78 72 67",
                        encoded: "4775724F796E7078436E70787267",
                        method: "hex",
                        answer: "TheBlackPacket",
                        hint: "Convert hex to text first, then decode with Rot-13"
                    },
                    {
                        hexData: "30 31 30 31 30 30 31 31 30 31 31 31 30 31 30 30 30 31 31 30 30 31 30 31 30 31 31 30 30 30 30 31 30 31 31 30 31 31 30 30 30 31 31 31 30 31 30 30 30 31 31 30 31 30 30 30 30 30 31 30 30 30 30 30 30 31 30 30 31 31 30 31 30 31 31 30 31 31 31 31 30 31 31 30 30 31 30 30 30 31 31 30 30 31 30 31",
                        encoded: "303130313030313130313131303130303031313030313031303131303030303130313130313130303031313130313030303131303130303030303130303030303031303031313031303131303131313130313130303130303031313030313031",
                        method: "multi",
                        answer: "Stealth Mode",
                        hint: "Convert hex to text first, then decode the binary numbers to ASCII characters."
                    },
                    {
                        hexData: "53 64 66 6E 68 77 6C 63 68 20 4C 77",
                        encoded: "5364666E68776C6368204C77",
                        method: "multi", 
                        answer: "Packetize It",
                        hint: "Convert hex to text first, then decode with caesar cipher with a shift of 3."
                    },
                    {
                        hexData: "41 41 53 41 41 65 41 41 63 41 41 72 41 41 65 41 41 74 41 41 20 41 41 50 41 41 61 41 41 73 41 41 73 41 41 77 41 41 6f 41 41 72 41 41 64",
                        encoded: "41415341416541416341417241416541417441412041415041416141417341417341417741416f414172414164",
                        method: "multi",
                        answer: "Secret Password",
                        hint: "Convert hex to text first, then remove all instances of 'AA'."
                    }
                ]
            };
            
            // Initialize game
            function initGame() {
                gameActive = true;
                decodedPackets = 0;
                currentPacketNum = 1;
                hintsUsedCount = 0;
                
                packetsDecoded.textContent = `0/${totalPackets}`;
                currentPacket.textContent = "1";
                hintsUsed.textContent = "0";
                decodeProgress.style.width = "0%";
                progressText.textContent = "DECODING IN PROGRESS...";
                
                // Hide waiting message
                waitingMessage.style.display = 'none';
                
                // Clear message log and add startup message
                messageLog.innerHTML = '';
                addLogEntry("[SYSTEM] Packet sniffer activated. Beginning capture...", "system");
                addLogEntry("[SYSTEM] Difficulty level: " + currentDifficulty.toUpperCase(), "system");
                
                // Load first packet
                loadPacket(currentPacketNum);
                
                // Enable inputs
                decodeInput.disabled = false;
                answerInput.disabled = false;
                decodeBtn.disabled = false;
                submitBtn.disabled = false;
                hintBtn.disabled = false;
                autoFillBtn.disabled = false;
            }
            
            function loadPacket(packetNum) {
                const packets = packetDatabase[currentDifficulty];
                currentPacketData = packets[packetNum - 1];
                currentHexData = currentPacketData.hexData;
                
                // Update display
                packetHeader.textContent = `CAPTURED PACKET #${packetNum} - ${currentDifficulty.toUpperCase()} DIFFICULTY`;
                
                // Generate hex dump
                generateHexDump(currentHexData);
                
                // Clear the decode input - don't pre-fill with encoded text
                decodeInput.value = "";
                
                // Update hint
                hintBox.innerHTML = `<strong>HINT:</strong> ${currentPacketData.hint}`;
                
                // Log packet capture
                addLogEntry(`[CAPTURE] Packet #${packetNum} intercepted. ${currentHexData.split(' ').length} bytes.`, "system");
            }
            
            function generateHexDump(hexData) {
                const bytes = hexData.split(' ');
                let html = '';
                
                for (let i = 0; i < bytes.length; i += 16) {
                    const lineBytes = bytes.slice(i, i + 16);
                    const offset = i.toString(16).padStart(4, '0').toUpperCase();
                    
                    let hexBytes = '';
                    
                    lineBytes.forEach(byte => {
                        hexBytes += byte + ' ';
                    });
                    
                    // Pad hex bytes to fixed width
                    hexBytes = hexBytes.padEnd(48, ' ');
                    
                    html += `
                        <div class="hex-line">
                            <div class="offset">0x${offset}</div>
                            <div class="hex-bytes">${hexBytes}</div>
                        </div>
                    `;
                }
                
                hexDump.innerHTML = html;
            }
            
            function autoFillHex() {
                if (!gameActive) return;
                
                // Convert the hex data to the encoded string format (no spaces)
                const hexString = currentHexData.replace(/ /g, '');
                decodeInput.value = hexString;
                addLogEntry(`[SYSTEM] Auto-filled hex data: ${hexString}`, "system");
            }
            
            function checkAnswer() {
                const userAnswer = answerInput.value.trim();
                
                if (userAnswer.toLowerCase() === currentPacketData.answer.toLowerCase()) {
                    // Correct answer
                    decodedPackets++;
                    packetsDecoded.textContent = `${decodedPackets}/${totalPackets}`;
                    
                    const progressPercent = (decodedPackets / totalPackets) * 100;
                    decodeProgress.style.width = `${progressPercent}%`;
                    
                    addLogEntry(`[SUCCESS] Packet #${currentPacketNum} decoded: "${currentPacketData.answer}"`, "success");
                    
                    if (decodedPackets >= totalPackets) {
                        // Mission complete
                        endGame(true);
                    } else {
                        // Load next packet
                        currentPacketNum++;
                        currentPacket.textContent = currentPacketNum.toString();
                        loadPacket(currentPacketNum);
                        answerInput.value = "";
                    }
                } else {
                    // Incorrect answer
                    addLogEntry(`[ERROR] Incorrect decoding for packet #${currentPacketNum}`, "error");
                }
            }
            
            function endGame(success) {
                gameActive = false;
                
                if (success) {
                    progressText.textContent = "MISSION ACCOMPLISHED - ALL PACKETS DECODED!";
                    addLogEntry("[SYSTEM] MISSION SUCCESS: All packets successfully decoded!", "success");
                    addLogEntry("[SYSTEM] TheBlackPacket network is secure.", "system");
                } else {
                    progressText.textContent = "MISSION FAILED - UNABLE TO DECODE PACKETS";
                    addLogEntry("[SYSTEM] MISSION FAILED: Could not decode all packets.", "error");
                }
                
                // Disable inputs
                decodeInput.disabled = true;
                answerInput.disabled = true;
                decodeBtn.disabled = true;
                submitBtn.disabled = true;
                hintBtn.disabled = true;
                autoFillBtn.disabled = true;
            }
            
            function addLogEntry(message, type) {
                const entry = document.createElement('div');
                entry.className = `log-entry ${type}`;
                entry.textContent = message;
                messageLog.appendChild(entry);
                messageLog.scrollTop = messageLog.scrollHeight;
            }
            
            function useHint() {
                if (!gameActive) return;
                
                hintsUsedCount++;
                hintsUsed.textContent = hintsUsedCount.toString();
                
                addLogEntry(`[HINT] Hint requested for packet #${currentPacketNum}`, "warning");
            }
            
            function decodeWithTool() {
                if (!gameActive) return;
                
                const input = decodeInput.value.trim();
                let output = "";
                
                switch(currentDecodingTool) {
                    case "hex":
                        output = hexToString(input);
                        break;
                    case "base64":
                        try {
                            // Check if input looks like hex
                            let textToDecode = input;
                            if (/^[0-9a-fA-F]+$/.test(input)) {
                                textToDecode = hexToString(input);
                            }
                            output = atob(textToDecode);
                        } catch (e) {
                            output = "Invalid Base64";
                        }
                        break;
                    case "rot13":
                        let textForRot13 = input;
                        if (/^[0-9a-fA-F]+$/.test(input)) {
                            textForRot13 = hexToString(input);
                        }
                        output = rot13(textForRot13);
                        break;
                    case "binary":
                        output = binaryToString(input);
                        break;
                    case "xor":
                        let textForXor = input;
                        if (/^[0-9a-fA-F]+$/.test(input)) {
                            textForXor = hexToString(input);
                        }
                        // Use the user-provided key, default to 0x42
                        const xorKey = parseInt(currentCipherKey || "42", 16);
                        if (isNaN(xorKey)) {
                            output = "Invalid XOR key";
                        } else {
                            output = xorDecode(textForXor, xorKey);
                        }
                        break;
                    case "caesar":
                        let textForCaesar = input;
                        if (/^[0-9a-fA-F]+$/.test(input)) {
                            textForCaesar = hexToString(input);
                        }
                        // Use the user-provided shift, default to 3
                        output = caesarDecode(textForCaesar, currentCaesarShift || 3);
                        break;
                    default:
                        output = "Select a decoding tool first";
                }
                
                addLogEntry(`[DECODE] ${currentDecodingTool}: "${input}" → "${output}"`, "system");
            }
            
            // Decoding functions
            function hexToString(hex) {
                // Remove any spaces and ensure even length
                const cleanHex = hex.replace(/ /g, '');
                if (cleanHex.length % 2 !== 0) {
                    return "Invalid hex: odd number of characters";
                }
                
                let str = '';
                for (let i = 0; i < cleanHex.length; i += 2) {
                    const hexByte = cleanHex.substr(i, 2);
                    const charCode = parseInt(hexByte, 16);
                    if (isNaN(charCode)) {
                        return "Invalid hex character";
                    }
                    str += String.fromCharCode(charCode);
                }
                return str;
            }
            
            function rot13(str) {
                return str.replace(/[a-zA-Z]/g, function(c) {
                    return String.fromCharCode((c <= 'Z' ? 90 : 122) >= (c = c.charCodeAt(0) + 13) ? c : c - 26);
                });
            }
            
            function binaryToString(binary) {
                // Remove spaces and split into 8-bit chunks
                const cleanBinary = binary.replace(/\s/g, '');
                if (cleanBinary.length % 8 !== 0) {
                    return "Invalid binary: not multiple of 8 bits";
                }
                
                let str = '';
                for (let i = 0; i < cleanBinary.length; i += 8) {
                    const byte = cleanBinary.substr(i, 8);
                    str += String.fromCharCode(parseInt(byte, 2));
                }
                return str;
            }
            
            function xorDecode(str, key) {
                let result = '';
                for (let i = 0; i < str.length; i++) {
                    result += String.fromCharCode(str.charCodeAt(i) ^ key);
                }
                return result;
            }
            
            function caesarDecode(str, shift) {
                return str.replace(/[a-zA-Z]/g, function(c) {
                    const base = c <= 'Z' ? 65 : 97;
                    return String.fromCharCode((c.charCodeAt(0) - base - shift + 26) % 26 + base);
                });
            }
            
            function resetGame() {
                gameActive = false;
                
                // Clear displays
                hexDump.innerHTML = '';
                decodeInput.value = '';
                answerInput.value = '';
                messageLog.innerHTML = '';
                hintBox.innerHTML = '<strong>HINT:</strong> Select a difficulty level and start sniffing to see hints.';
                
                // Reset stats
                packetsDecoded.textContent = `0/${totalPackets}`;
                currentPacket.textContent = "-";
                hintsUsed.textContent = "0";
                decodeProgress.style.width = "0%";
                progressText.textContent = "SELECT DIFFICULTY AND START SNIFFING";
                
                // Show waiting message
                waitingMessage.style.display = 'block';
                packetHeader.textContent = 'PACKET SNIFFER READY';
                
                // Disable inputs
                decodeInput.disabled = true;
                answerInput.disabled = true;
                decodeBtn.disabled = true;
                submitBtn.disabled = true;
                hintBtn.disabled = true;
                autoFillBtn.disabled = true;
                
                addLogEntry("[SYSTEM] Packet sniffer reset. Select difficulty to begin.", "system");
            }
            
            // Event listeners
            startBtn.addEventListener('click', function() {
                if (!gameActive) {
                    initGame();
                }
            });
            
            hintBtn.addEventListener('click', useHint);
            
            resetBtn.addEventListener('click', resetGame);
            
            decodeBtn.addEventListener('click', decodeWithTool);
            
            submitBtn.addEventListener('click', checkAnswer);
            
            autoFillBtn.addEventListener('click', autoFillHex);
            
            answerInput.addEventListener('keyup', function(event) {
                if (event.key === 'Enter' && gameActive) {
                    checkAnswer();
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
            
            // Tool buttons
            toolBtns.forEach(btn => {
                btn.addEventListener('click', function() {
                    toolBtns.forEach(b => b.classList.remove('active'));
                    this.classList.add('active');
                    currentDecodingTool = this.getAttribute('data-tool');
                    
                    // Show key input for XOR and Caesar ciphers
                    if (currentDecodingTool === 'xor' || currentDecodingTool === 'caesar') {
                        keyInputGroup.style.display = 'flex';
                        if (currentDecodingTool === 'xor') {
                            cipherKeyInput.placeholder = "Enter XOR key (hex, e.g., 42)";
                            cipherKeyInput.value = currentCipherKey || "42";
                        } else {
                            cipherKeyInput.placeholder = "Enter Caesar shift (e.g., 3)";
                            cipherKeyInput.value = currentCaesarShift.toString();
                        }
                    } else {
                        keyInputGroup.style.display = 'none';
                    }
                });
            });
            
            // Apply key button
            applyKeyBtn.addEventListener('click', function() {
                const keyInput = cipherKeyInput.value;
                
                if (currentDecodingTool === 'xor') {
                    currentCipherKey = keyInput;
                    addLogEntry(`[SYSTEM] XOR key set to: 0x${keyInput}`, "system");
                } else if (currentDecodingTool === 'caesar') {
                    const shift = parseInt(keyInput);
                    if (!isNaN(shift)) {
                        currentCaesarShift = shift;
                        addLogEntry(`[SYSTEM] Caesar shift set to: ${shift}`, "system");
                    } else {
                        addLogEntry(`[ERROR] Invalid shift value: ${keyInput}`, "error");
                    }
                }
            });
            
            // Initialize
            resetGame();
        });