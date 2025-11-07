document.addEventListener('DOMContentLoaded', function() {
    const matrixRain = document.getElementById('matrixRain');
    const canvas = document.createElement('canvas');
    matrixRain.appendChild(canvas);
    
    const ctx = canvas.getContext('2d');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    
    const chars = "01010101010101010101ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
    const charArray = chars.split("");
    const fontSize = 14;
    const columns = canvas.width / fontSize;
    const drops = [];
    
    for (let x = 0; x < columns; x++) {
        drops[x] = 1;
    }
    
    function drawMatrix() {
        ctx.fillStyle = "rgba(0, 0, 0, 0.04)";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = "#0F0";
        ctx.font = fontSize + "px courier";
        
        for (let i = 0; i < drops.length; i++) {
            const text = charArray[Math.floor(Math.random() * charArray.length)];
            ctx.fillText(text, i * fontSize, drops[i] * fontSize);
            
            if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
                drops[i] = 0;
            }
            
            drops[i]++;
        }
    }





    
    setInterval(drawMatrix, 35);
    
    // Handle window resize
    window.addEventListener('resize', function() {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
    });



    
    // LINUX DESKTOP FUNCTIONALITY
    const terminal = document.getElementById('linuxTerminal');
    const terminalBody = document.getElementById('terminalBody');
    const terminalHeader = document.getElementById('terminalHeader');
    const terminalTitle = document.getElementById('terminalTitle');
    const minimizeBtn = document.getElementById('minimizeBtn');
    const maximizeBtn = document.getElementById('maximizeBtn');
    const closeBtn = document.getElementById('closeBtn');
    const terminalApp = document.getElementById('terminalApp');
    
    const musicPlayer = document.getElementById('musicPlayer');
    const playerHeader = document.getElementById('playerHeader');
    const playerMinimizeBtn = document.getElementById('playerMinimizeBtn');
    const playerCloseBtn = document.getElementById('playerCloseBtn');
    const musicApp = document.getElementById('musicApp');
    
    const taskbarTime = document.getElementById('taskbarTime');
    const currentTime = document.getElementById('currentTime');
    const currentDate = document.getElementById('currentDate');
    
    // Audio elements for Music player
    const audioPlayer = new Audio();
    let isPlaying = false;
    let currentTrack = 0;
    let isShuffle = false;
    let isRepeat = false;
    
    // Your server MP3 playlist
    const playlist = [
        {
            title: "Twenty Minutes - edIT",
            url: "/mp3/06%20Twenty%20Minutes.mp3"
        },
        {   
            title: "Tr0jans - The Alg0rithm",
            url: "/mp3/THE%20ALGORITHM%20-%20Trojans.mp3"
        },
        {
            title: "Tendon - Igorrr",
            url: "/mp3/02_igorrr-tendon.mp3"
        },
        {
            title: "MSDOS.SYS - Master Boot Record",
            url: "/mp3/02%20-%20MSDOS.SYS.mp3"
        },
        {
            title: "Access Granted - The Alg0rithm",
            url: "/mp3/THE%20ALGORITHM%20-%20Access%20Granted.mp3"
        },
        {
            title: "Dex - edIT",
            url: "/mp3/05%20Dex.mp3"
        },
        {
            title: "CONFIG.SYS - Master Boot Record",
            url: "/mp3/04%20-%20CONFIG.SYS.mp3"
        }
    ];

    // Populate the playlist UI
    function populatePlaylist() {
        const playlistElement = document.getElementById('playerPlaylist');
        playlistElement.innerHTML = '';
        
        playlist.forEach((track, index) => {
            const item = document.createElement('div');
            item.className = 'playlist-item';
            if (index === currentTrack) {
                item.classList.add('active');
            }
            item.textContent = `[${(index + 1).toString().padStart(2, '0')}] ${track.title}`;
            item.addEventListener('click', function() {
                currentTrack = index;
                updateSongDisplay();
                if (isPlaying) {
                    playAudio();
                }
            });
            playlistElement.appendChild(item);
        });
    }
    
    // Update taskbar time and date
    function updateTaskbarTime() {
        const now = new Date();
        const hours = now.getHours().toString().padStart(2, '0');
        const minutes = now.getMinutes().toString().padStart(2, '0');
        const month = now.toLocaleString('en', { month: 'short' });
        const day = now.getDate();
        const year = now.getFullYear();
        
        currentTime.textContent = `${hours}:${minutes}`;
        currentDate.textContent = `${month} ${day}, ${year}`;
    }
    
    setInterval(updateTaskbarTime, 1000);
    updateTaskbarTime();
    
    // MUSIC PLAYER FUNCTIONALITY
    musicApp.addEventListener('click', function() {
        if (musicPlayer.classList.contains('player-hidden')) {
            openMusicPlayer();
        } else if (playerIsMinimized) {
            restoreMusicPlayer();
        } else {
            minimizeMusicPlayer();
        }
    });
    
    let playerIsMinimized = false;
    let playerPosition = { left: '150px', top: '150px' };
    let playerSize = { width: '275px', height: '116px' };

    function isMobileDevice() {
        return window.innerWidth <= 768; // Example breakpoint for mobile
    }
    
    function openMusicPlayer() {
        musicPlayer.classList.remove('player-hidden');
        musicApp.classList.add('active');

        if (isMobileDevice()) {
            musicPlayer.style.position = 'fixed';
            musicPlayer.style.top = '0'; // Position at the top
            musicPlayer.style.left = '0';
            musicPlayer.style.right = '0';
            musicPlayer.style.width = '100%';
            musicPlayer.style.height = 'auto'; // Let content define height
            musicPlayer.style.transform = 'translateY(0)'; // Reset any drag transforms
        } else {
            musicPlayer.style.position = 'fixed'; // Ensure it's fixed for desktop too
            musicPlayer.style.left = playerPosition.left;
            musicPlayer.style.top = playerPosition.top;
            musicPlayer.style.width = playerSize.width;
            musicPlayer.style.height = playerSize.height;
        }
        playerIsMinimized = false;
        updateSongDisplay();
    }
    
    function minimizeMusicPlayer() {
        musicPlayer.classList.add('player-hidden');
        musicApp.classList.add('active');
        playerIsMinimized = true;
    }
    
    function restoreMusicPlayer() {
        musicPlayer.classList.remove('player-hidden');
        musicApp.classList.add('active');
        if (isMobileDevice()) {
            musicPlayer.style.position = 'fixed';
            musicPlayer.style.top = '0';
            musicPlayer.style.left = '0';
            musicPlayer.style.right = '0';
            musicPlayer.style.width = '100%';
            musicPlayer.style.height = 'auto';
        } else {
            musicPlayer.style.left = playerPosition.left;
            musicPlayer.style.top = playerPosition.top;
            musicPlayer.style.width = playerSize.width;
            musicPlayer.style.height = playerSize.height;
        }
        playerIsMinimized = false;
    }
    
    function closeMusicPlayer() {
        musicPlayer.classList.add('player-hidden');
        musicApp.classList.remove('active');
        stopAudio();
        playerIsMinimized = false;
    }
    
    // Music player controls
    playerMinimizeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        minimizeMusicPlayer();
    });
    
    playerCloseBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        closeMusicPlayer();
    });
    
    // Make Music Player draggable
    let isPlayerDragging = false;
    let playerDragOffsetX, playerDragOffsetY;
    
    playerHeader.addEventListener('mousedown', function(e) {
        if (!isMobileDevice()) {
            isPlayerDragging = true;
            playerDragOffsetX = e.clientX - musicPlayer.getBoundingClientRect().left;
            playerDragOffsetY = e.clientY - musicPlayer.getBoundingClientRect().top;
            musicPlayer.classList.add('drag-mode');
        }
    });
    
    document.addEventListener('mousemove', function(e) {
        if (isPlayerDragging) {
            musicPlayer.style.left = (e.clientX - playerDragOffsetX) + 'px';
            musicPlayer.style.top = (e.clientY - playerDragOffsetY) + 'px';
            playerPosition.left = musicPlayer.style.left;
            playerPosition.top = musicPlayer.style.top;
        }
    });
    
    document.addEventListener('mouseup', function() {
        isPlayerDragging = false;
        musicPlayer.classList.remove('drag-mode');
    });
    
        
    
        // Audio player functionality
    
        function playAudio() {
    
            audioPlayer.src = playlist[currentTrack].url;
    
            audioPlayer.play().then(() => {
    
                isPlaying = true;
    
                document.getElementById('playBtn').style.background = 'linear-gradient(to bottom, #777 0%, #555 100%)';
    
                document.getElementById('currentSong').textContent = playlist[currentTrack].title;
    
                startVisualizer();
    
            }).catch(error => {
    
                console.error("Error playing audio:", error);
    
                document.getElementById('currentSong').textContent = "Error playing file";
    
            });
    
        }
    
        
    
        function pauseAudio() {
    
            audioPlayer.pause();
    
            isPlaying = false;
    
            document.getElementById('playBtn').style.background = 'linear-gradient(to bottom, #555 0%, #333 100%)';
    
            stopVisualizer();
    
        }
    
        
    
        function stopAudio() {
    
            audioPlayer.pause();
    
            audioPlayer.currentTime = 0;
    
            isPlaying = false;
    
            document.getElementById('playBtn').style.background = 'linear-gradient(to bottom, #555 0%, #333 100%)';
    
            document.getElementById('songTime').textContent = "0:00 / 0:00";
    
            stopVisualizer();
    
        }
    
        
    
        function nextTrack() {
    
            if (isShuffle) {
    
                currentTrack = Math.floor(Math.random() * playlist.length);
    
            } else {
    
                currentTrack = (currentTrack + 1) % playlist.length;
    
            }
    
            updateSongDisplay();
    
            if (isPlaying) {
    
                playAudio();
    
            }
    
        }
    
        
    
        function prevTrack() {
    
            if (isShuffle) {
    
                currentTrack = Math.floor(Math.random() * playlist.length);
    
            }
    
            else {
    
                currentTrack = (currentTrack - 1 + playlist.length) % playlist.length;
    
            }
    
            updateSongDisplay();
    
            if (isPlaying) {
    
                playAudio();
    
            }
    
        }
    
        
    
        function updateSongDisplay() {
    
            document.getElementById('currentSong').textContent = playlist[currentTrack].title;
    
            
    
            // Update playlist highlights
    
            document.querySelectorAll('.playlist-item').forEach((item, index) => {
    
                item.classList.remove('active');
    
                if (index === currentTrack) {
    
                    item.classList.add('active');
    
                }
    
            });
    
        }
    
        
    
        // Format time from seconds to MM:SS
    
        function formatTime(seconds) {
    
            if (isNaN(seconds)) return "0:00";
    
            const min = Math.floor(seconds / 60);
    
            const sec = Math.floor(seconds % 60);
    
            return `${min}:${sec.toString().padStart(2, '0')}`;
    
        }
    
        
    
        // Visualizer animation
    
        let visualizerInterval;
    
        function startVisualizer() {
    
            stopVisualizer();
    
            visualizerInterval = setInterval(() => {
    
                const bars = document.querySelectorAll('.visualizer-bar');
    
                bars.forEach(bar => {
    
                    const height = Math.floor(Math.random() * 100);
    
                    bar.style.height = `${height}%`;
    
                });
    
            }, 100);
    
        }
    
        
    
        function stopVisualizer() {
    
            if (visualizerInterval) {
    
                clearInterval(visualizerInterval);
    
                const bars = document.querySelectorAll('.visualizer-bar');
    
                bars.forEach(bar => {
    
                    bar.style.height = '0%';
    
                });
    
            }
    
        }
    
        
    
        // Music player button event listeners
    
        document.getElementById('playBtn').addEventListener('click', function() {
    
            if (!isPlaying) {
    
                playAudio();
    
            }
    
        });
    
        
    
        document.getElementById('pauseBtn').addEventListener('click', function() {
    
            if (isPlaying) {
    
                pauseAudio();
    
            }
    
        });
    
        
    
        document.getElementById('stopBtn').addEventListener('click', function() {
    
            stopAudio();
    
        });
    
        
    
        document.getElementById('nextBtn').addEventListener('click', function() {
    
            nextTrack();
    
        });
    
        
    
        document.getElementById('prevBtn').addEventListener('click', function() {
    
            prevTrack();
    
        });
    
        
    
        document.getElementById('shuffleBtn').addEventListener('click', function() {
    
            isShuffle = !isShuffle;
    
            this.style.background = isShuffle ? 
    
                'linear-gradient(to bottom, #777 0%, #555 100%)' :
    
                'linear-gradient(to bottom, #555 0%, #333 100%)';
    
        });
    
        
    
        document.getElementById('repeatBtn').addEventListener('click', function() {
    
            isRepeat = !isRepeat;
    
            this.style.background = isRepeat ? 
    
                'linear-gradient(to bottom, #777 0%, #555 100%)' :
    
                'linear-gradient(to bottom, #555 0%, #333 100%)';
    
        });
    
    
    
                // New playlist toggle button in header
    
    
    
                document.getElementById('playerTogglePlaylistBtn').addEventListener('click', function(e) {
    
    
    
                    e.stopPropagation();
    
    
    
                    const playlistElement = document.getElementById('playerPlaylist');
    
    
    
                    const playerHeaderHeight = 116; // Approximate height of the player header
    
    
    
                    const playlistItemHeight = 20; // Approximate height of each playlist item
    
    
    
                    const playlistPadding = 10; // Additional padding for the playlist container
    
    
    
            
    
    
    
                    if (playlistElement.style.display === 'block') {
    
    
    
                        playlistElement.style.display = 'none';
    
    
    
                        musicPlayer.style.height = playerSize.height; // Revert to original player height
    
    
    
                    } else {
    
    
    
                        playlistElement.style.display = 'block';
    
    
    
                        const numberOfTracks = playlist.length;
    
    
    
                        const calculatedPlaylistHeight = (numberOfTracks * playlistItemHeight) + playlistPadding;
    
    
    
                        musicPlayer.style.height = `${playerHeaderHeight + calculatedPlaylistHeight}px`;
    
    
    
                    }
    
    
    
                });
    
    
    
            
    
    
    
                // PL button in playback controls to toggle playlist
    
    
    
                document.getElementById('playerControlPlaylistBtn').addEventListener('click', function(e) {
    
    
    
                    e.stopPropagation();
    
    
    
                    const playlistElement = document.getElementById('playerPlaylist');
    
    
    
                    const playerHeaderHeight = 116; // Approximate height of the player header
    
    
    
                    const playlistItemHeight = 20; // Approximate height of each playlist item
    
    
    
                    const playlistPadding = 10; // Additional padding for the playlist container
    
    
    
            
    
    
    
                    if (playlistElement.style.display === 'block') {
    
    
    
                        playlistElement.style.display = 'none';
    
    
    
                        musicPlayer.style.height = playerSize.height; // Revert to original player height
    
    
    
                    } else {
    
    
    
                        playlistElement.style.display = 'block';
    
    
    
                        const numberOfTracks = playlist.length;
    
    
    
                        const calculatedPlaylistHeight = (numberOfTracks * playlistItemHeight) + playlistPadding;
    
    
    
                        musicPlayer.style.height = `${playerHeaderHeight + calculatedPlaylistHeight}px`;
    
    
    
                    }
    
    
    
                });
    
    // Update audio progress for real audio files
    audioPlayer.addEventListener('loadedmetadata', function() {
        document.getElementById('songTime').textContent = 
            `0:00 / ${formatTime(audioPlayer.duration)}`;
    });
    
    audioPlayer.addEventListener('timeupdate', function() {
        if (isPlaying) {
            document.getElementById('songTime').textContent = 
                `${formatTime(audioPlayer.currentTime)} / ${formatTime(audioPlayer.duration)}`;
            
            // Auto-advance to next track when song ends
            if (audioPlayer.currentTime >= audioPlayer.duration - 0.5) {
                if (isRepeat) {
                    // Restart current track
                    audioPlayer.currentTime = 0;
                    audioPlayer.play();
                } else {
                    nextTrack();
                }
            }
        }
    });
    
    // Initialize the playlist
    populatePlaylist();

    // TERMINAL FUNCTIONALITY - FULL IMPLEMENTATION
    let isMinimized = false;
    let isMaximized = false;
    let commandHistory = [];
    let historyIndex = -1;
    let currentDirectory = '/home/root';
    let previousDirectory = '/home/root';
    let currentInput = null;
    let terminalPosition = { left: '100px', top: '100px' };
    let terminalSize = { width: '600px', height: '400px' };

    const filesystem = {
        '/': {
            type: 'directory',
            contents: {
                'home': {
                    type: 'directory',
                    contents: {
                        'root': {
                            type: 'directory',
                            contents: {
                                'Documents': {
                                    type: 'directory',
                                    contents: {
                                        'passwords.txt': {
                                            type: 'file',
                                            content: `root:password123
admin:admin123
user:letmein`
                                        },
                                        'notes.md': {
                                            type: 'file',
                                            content: `# Project Notes
- Implement new encryption algorithm
- Test network security
- Update firewall rules`
                                        }
                                    }
                                },
                                'Downloads': {
                                    type: 'directory',
                                    contents: {
                                        'nmap_scan.txt': {
                                            type: 'file',
                                            content: `Starting Nmap 7.80
Nmap scan report for 192.168.1.1
PORT     STATE SERVICE
22/tcp   open  ssh
80/tcp   open  http
443/tcp  open  https`
                                        }
                                    }
                                },
                                '.bashrc': {
                                    type: 'file',
                                    content: `# .bashrc
# User specific aliases and functions
alias ll='ls -la'
alias cls='clear'

# Source global definitions
if [ -f /etc/bashrc ]; then
	. /etc/bashrc
fi`,
                                    hidden: true
                                },
                                '.bash_history': {
                                    type: 'file',
                                    content: `ls
cd Documents
cat notes.md
nmap 192.168.1.1
ping google.com
whoami
pwd`,
                                    hidden: true
                                }
                            }
                        }
                    }
                },
                'etc': {
                    type: 'directory',
                    contents: {
                        'passwd': {
                            type: 'file',
                            content: `root:x:0:0:root:/root:/bin/bash
daemon:x:1:1:daemon:/usr/sbin:/usr/sbin/nologin
bin:x:2:2:bin:/bin:/usr/sbin/nologin
sys:x:3:3:sys:/dev:/usr/sbin/nologin
sync:x:4:65534:sync:/bin:/bin/sync`
                        },
                        'hosts': {
                            type: 'file',
                            content: `127.0.0.1\tlocalhost
127.0.1.1\tblackpacket

# The following lines are desirable for IPv6 capable hosts
::1     localhost ip6-localhost ip6-loopback
ff02::1 ip6-allnodes
ff02::2 ip6-allrouters`
                        },
                        'shadow': {
                            type: 'file',
                            content: `root:$6$rounds=656000$V5h3b8Kf8L9j8M2n$Fh8r8cK9j8M2nV5h3b8Kf8L9j8M2nV5h3b8Kf8L9j8M2nV5h3b8Kf8L9j8M2nV5h3b8Kf8L9j8M2n/::0:99999:7::: 
daemon:*:18375:0:99999:7::: 
bin:*:18375:0:99999:7:::`
                        }
                    }
                },
                'var': {
                    type: 'directory',
                    contents: {
                        'log': {
                            type: 'directory',
                            contents: {
                                'auth.log': {
                                    type: 'file',
                                    content: `Jan 10 14:23:01 blackpacket sshd[1234]: Accepted password for root from 192.168.1.100 port 22
Jan 10 14:25:43 blackpacket sudo:     root : TTY=pts/0 ; PWD=/home/root ; USER=root ; COMMAND=/bin/ls
Jan 10 14:26:12 blackpacket systemd[1]: Started User Manager for UID 0.`
                                },
                                'syslog': {
                                    type: 'file',
                                    content: `Jan 10 14:20:01 blackpacket systemd[1]: Starting Daily apt download activities...\nJan 10 14:20:02 blackpacket systemd[1]: Started Daily apt download activities.\nJan 10 14:30:01 blackpacket systemd[1]: Starting Daily apt upgrade and clean activities...`
                                }
                            }
                        }
                    }
                },
                'usr': {
                    type: 'directory',
                    contents: {
                        'bin': {
                            type: 'directory',
                            contents: {
                                'ls': { type: 'file', content: 'ELF executable' },
                                'cd': { type: 'file', content: 'ELF executable' },
                                'pwd': { type: 'file', content: 'ELF executable' },
                                'cat': { type: 'file', content: 'ELF executable' },
                                'echo': { type: 'file', content: 'ELF executable' },
                                'clear': { type: 'file', content: 'ELF executable' },
                                'whoami': { type: 'file', content: 'ELF executable' },
                                'date': { type: 'file', content: 'ELF executable' },
                                'uname': { type: 'file', content: 'ELF executable' },
                                'ping': { type: 'file', content: 'ELF executable' },
                                'nmap': { type: 'file', content: 'ELF executable' },
                                'w': { type: 'file', content: 'ELF executable' },
                                'who': { type: 'file', content: 'ELF executable' },
                                'ps': { type: 'file', content: 'ELF executable' },
                                'top': { type: 'file', content: 'ELF executable' },
                                'ifconfig': { type: 'file', content: 'ELF executable' },
                                'netstat': { type: 'file', content: 'ELF executable' },
                                'ssh': { type: 'file', content: 'ELF executable' },
                                'scp': { type: 'file', content: 'ELF executable' },
                                'curl': { type: 'file', content: 'ELF executable' },
                                'wget': { type: 'file', content: 'ELF executable' },
                                'grep': { type: 'file', content: 'ELF executable' },
                                'find': { type: 'file', content: 'ELF executable' },
                                'chmod': { type: 'file', content: 'ELF executable' },
                                'chown': { type: 'file', content: 'ELF executable' },
                                'tar': { type: 'file', content: 'ELF executable' },
                                'gzip': { type: 'file', content: 'ELF executable' },
                                'apt': { type: 'file', content: 'ELF executable' },
                                'dpkg': { type: 'file', content: 'ELF executable' },
                                'history': { type: 'file', content: 'ELF executable' },
                                'route': { type: 'file', content: 'ELF executable' },
                                'whois': { type: 'file', content: 'ELF executable' },
                                'nslookup': { type: 'file', content: 'ELF executable' },
                                'iptables': { type: 'file', content: 'ELF executable' },
                                'hostname': { type: 'file', content: 'ELF executable' },
                                'traceroute': { type: 'file', content: 'ELF executable' },
                                'tcpdump': { type: 'file', content: 'ELF executable' },
                                'more': { type: 'file', content: 'ELF executable' },
                                'less': { type: 'file', content: 'ELF executable' },
                                'touch': { type: 'file', content: 'ELF executable' }
                            }
                        }
                    }
                },
                'proc': {
                    type: 'directory',
                    contents: {
                        'version': {
                            type: 'file',
                            content: 'Linux version 5.4.0-42-generic (buildd@lgw01-amd64-039) (gcc version 9.3.0 (Ubuntu 9.3.0-10ubuntu2)) #46-Ubuntu SMP Fri Jul 10 00:24:02 UTC 2020'
                        },
                        'cpuinfo': {
                            type: 'file',
                            content: `processor\t: 0
vendor_id\t: GenuineIntel
cpu family\t: 6
model\t\t: 142
model name\t: Intel(R) Core(TM) i7-8565U CPU @ 1.80GHz
stepping\t: 12
microcode\t: 0xea
cpu MHz\t\t: 1992.002
cache size\t: 8192 KB`
                        },
                        'meminfo': {
                            type: 'file',
                            content: `MemTotal:        8032452 kB
MemFree:         5216548 kB
MemAvailable:    6543210 kB
Buffers:          123456 kB
Cached:          1543210 kB`
                        },
                        'loadavg': {
                            type: 'file',
                            content: '0.12 0.15 0.18 1/456 12345'
                        }
                    }
                },
                'dev': {
                    type: 'directory',
                    contents: {
                        'null': { type: 'device', content: 'Character special file' },
                        'zero': { type: 'device', content: 'Character special file' },
                        'random': { type: 'device', content: 'Character special file' },
                        'urandom': { type: 'device', content: 'Character special file' },
                        'tty': { type: 'device', content: 'Character special file' },
                        'console': { type: 'device', content: 'Character special file' },
                        'sda': { type: 'device', content: 'Block special file' },
                        'sda1': { type: 'device', content: 'Block special file' },
                        'sda2': { type: 'device', content: 'Block special file' }
                    }
                },
                'tmp': {
                    type: 'directory',
                    contents: {}
                },
                'opt': {
                    type: 'directory',
                    contents: {
                        'blackpacket': {
                            type: 'directory',
                            contents: {
                                'tools': {
                                    type: 'directory',
                                    contents: {
                                        'scanner.py': {
                                            type: 'file',
                                            content: `#!/usr/bin/env python3
# Network scanner tool
import socket
import sys

print("Black Packet Network Scanner v1.0")`
                                        }
                                    }
                                }
                            }
                        }
                    }
                }
            }
        }
    };

    // CORRECTED FILESYSTEM NAVIGATION FUNCTIONS
    function getDirectory(path) {
        if (path === '/') {
            return filesystem['/'];
        }
        
        const parts = path.split('/').filter(p => p !== '');
        let current = filesystem['/'];
        
        for (const part of parts) {
            if (current.contents && current.contents[part] && current.contents[part].type === 'directory') {
                current = current.contents[part];
            } else {
                return false;
            }
        }
        
        return current;
    }

    function getFile(path) {
        if (path === '/') {
            return false; // Root is a directory, not a file
        }
        
        const parts = path.split('/').filter(p => p !== '');
        const fileName = parts.pop();
        let dirPath = '/' + parts.join('/');
        if (dirPath === '') dirPath = '/';
        
        const dir = getDirectory(dirPath);
        if (dir === false || !dir.contents || !dir.contents[fileName]) {
            return false;
        }
        
        return dir.contents[fileName];
    }

    function listDirectory(path, showHidden = false) {
        const dir = getDirectory(path);
        if (dir === false || dir.type !== 'directory') {
            return `ls: cannot access '${path}': No such file or directory`;
        }
        
        let contents = Object.keys(dir.contents || {});
        if (!showHidden) {
            contents = contents.filter(name => !dir.contents[name].hidden);
        }
        return contents.join('  ');
    }

    function changeDirectory(path) {
        let targetPath;
        
        if (path.startsWith('/')) {
            targetPath = path;
        } else if (path === '..') {
            const parts = currentDirectory.split('/').filter(p => p !== '');
            parts.pop();
            targetPath = '/' + parts.join('/');
            if (targetPath === '') targetPath = '/';
        } else if (path === '.') {
            targetPath = currentDirectory;
        } else if (path === '~') {
            targetPath = '/home/root';
        } else {
            targetPath = currentDirectory === '/' ? `/${path}` : `${currentDirectory}/${path}`;
        }
        
        // Normalize path (remove double slashes, etc.)
        targetPath = targetPath.replace(/\/+/g, '/').replace(/\/$/, '') || '/';
        
        const dir = getDirectory(targetPath);
        if (dir === false || dir.type !== 'directory') {
            return false;
        }
        
        return targetPath;
    }

    function readFile(path) {
        let filePath;
        
        if (path.startsWith('/')) {
            filePath = path;
        } else if (path.startsWith('~')) {
            filePath = '/home/root' + path.substring(1);
        } else {
            filePath = currentDirectory === '/' ? `/${path}` : `${currentDirectory}/${path}`;
        }
        
        // Normalize path
        filePath = filePath.replace(/\/+/g, '/').replace(/\/$/, '') || '/';
        
        const file = getFile(filePath);
        if (file === false || file.type !== 'file') {
            return false;
        }
        
        return file.content;
    }

    function createFile(filename, content, append = false) {
        let filePath;
        
        if (filename.startsWith('/')) {
            filePath = filename;
        } else {
            filePath = currentDirectory === '/' ? `/${filename}` : `${currentDirectory}/${filename}`;
        }
        
        // Normalize path
        filePath = filePath.replace(/\/+/g, '/').replace(/\/$/, '');
        
        const parts = filePath.split('/').filter(p => p !== '');
        const fileName = parts.pop();
        let dirPath = '/' + parts.join('/');
        if (dirPath === '') dirPath = '/';
        
        const dir = getDirectory(dirPath);
        if (dir === false || dir.type !== 'directory') {
            return false;
        }
        
        if (append && dir.contents[fileName]) {
            dir.contents[fileName].content += content;
        } else {
            dir.contents[fileName] = {
                type: 'file',
                content: content
            };
        }
        
        return true;
    }

    function resolvePath(path) {
        if (path.startsWith('/')) {
            return path;
        } else if (path.startsWith('~')) {
            return '/home/root' + path.substring(1);
        } else {
            return currentDirectory === '/' ? `/${path}` : `${currentDirectory}/${path}`;
        }
    }

    function updateBashHistory(cmd) {
        const bashHistoryPath = '/home/root/.bash_history';
        const bashHistory = getFile(bashHistoryPath);
        if (bashHistory) {
            bashHistory.content += '\n' + cmd;
        }
    }
    
    // Update terminal title
    function updateTerminalTitle() {
        const displayPath = getDisplayPath(currentDirectory);
        terminalTitle.textContent = `root@blackpacket:${displayPath}`;
    }
    
    // Helper function for display path
    function getDisplayPath(path) {
        if (path === '/home/root') return '~';
        if (path.startsWith('/home/root/')) return '~' + path.substring('/home/root'.length);
        return path;
    }
    
    // Terminal app functionality
    terminalApp.addEventListener('click', function() {
        if (terminal.classList.contains('terminal-hidden')) {
            openTerminal();
        } else if (isMinimized) {
            restoreTerminal();
        } else {
            minimizeTerminal();
        }
    });
    
    function openTerminal() {
        terminal.classList.remove('terminal-hidden');
        terminalApp.classList.add('active');

        if (isMobileDevice()) {
            terminal.style.position = 'fixed';
            terminal.style.width = '100%';
            terminal.style.left = '0';
            terminal.style.right = '0';
            // Calculate top position based on music player visibility
            const musicPlayer = document.getElementById('musicPlayer');
            if (!musicPlayer.classList.contains('player-hidden')) {
                // If music player is open, position terminal below it
                terminal.style.top = musicPlayer.offsetHeight + 'px';
                terminal.style.height = `calc(100vh - ${musicPlayer.offsetHeight}px - 40px)`; // Adjust for taskbar
            } else {
                // If music player is closed, position terminal at the top
                terminal.style.top = '0';
                terminal.style.height = 'calc(100vh - 40px)'; // Adjust for taskbar
            }
        } else {
            terminal.style.left = terminalPosition.left;
            terminal.style.top = terminalPosition.top;
            terminal.style.width = terminalSize.width;
            terminal.style.height = terminalSize.height;
        }
        addInputLine();
        updateTerminalTitle();
        isMinimized = false;
    }
    
    function minimizeTerminal() {
        terminal.classList.add('terminal-hidden');
        terminalApp.classList.add('active');
        isMinimized = true;
    }
    
    function restoreTerminal() {
        terminal.classList.remove('terminal-hidden');
        terminalApp.classList.add('active');
        if (isMobileDevice()) {
            terminal.style.position = 'fixed';
            terminal.style.width = '100%';
            terminal.style.left = '0';
            terminal.style.right = '0';
            const musicPlayer = document.getElementById('musicPlayer');
            if (!musicPlayer.classList.contains('player-hidden')) {
                terminal.style.top = musicPlayer.offsetHeight + 'px';
                terminal.style.height = `calc(100vh - ${musicPlayer.offsetHeight}px - 40px)`;
            } else {
                terminal.style.top = '0';
                terminal.style.height = 'calc(100vh - 40px)';
            }
        } else {
            terminal.style.left = terminalPosition.left;
            terminal.style.top = terminalPosition.top;
            terminal.style.width = terminalSize.width;
            terminal.style.height = terminalSize.height;
        }
        isMinimized = false;
    }
    
    function closeTerminal() {
        terminal.classList.add('terminal-hidden');
        terminalApp.classList.remove('active');
        // Clear terminal contents for fresh session
        terminalBody.innerHTML = '';
        const welcome1 = document.createElement('div');
        welcome1.className = 'terminal-output';
        welcome1.textContent = 'Welcome to The Black Packet Linux Terminal v1.0';
        const welcome2 = document.createElement('div');
        welcome2.className = 'terminal-output';
        welcome2.textContent = 'Type \'help\' for available commands';
        terminalBody.appendChild(welcome1);
        terminalBody.appendChild(welcome2);
        terminalBody.appendChild(document.createElement('div'));
        
        // Reset state
        commandHistory = [];
        historyIndex = -1;
        currentDirectory = '/home/root';
        previousDirectory = '/home/root';
        updateTerminalTitle();
        isMinimized = false;
    }
    
    // Terminal controls
    minimizeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        minimizeTerminal();
    });
    
    maximizeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        isMaximized = !isMaximized;
        if (isMaximized) {
            // Store current position and size
            terminalPosition.left = terminal.style.left;
            terminalPosition.top = terminal.style.top;
            terminalSize.width = terminal.style.width;
            terminalSize.height = terminal.style.height;
            
            terminal.style.width = '90%';
            terminal.style.height = '80%';
            terminal.style.left = '5%';
            terminal.style.top = '5%';
        } else {
            terminal.style.width = terminalSize.width;
            terminal.style.height = terminalSize.height;
            terminal.style.left = terminalPosition.left;
            terminal.style.top = terminalPosition.top;
        }
    });
    
    closeBtn.addEventListener('click', function(e) {
        e.stopPropagation();
        closeTerminal();
    });
    
    // Make terminal draggable
    let isDragging = false;
    let dragOffsetX, dragOffsetY;
    
    terminalHeader.addEventListener('mousedown', function(e) {
        if (!isMobileDevice()) {
            isDragging = true;
            dragOffsetX = e.clientX - terminal.getBoundingClientRect().left;
            dragOffsetY = e.clientY - terminal.getBoundingClientRect().top;
            terminal.classList.add('drag-mode');
        }
    });
    
    document.addEventListener('mousemove', function(e) {
        if (isDragging) {
            terminal.style.left = (e.clientX - dragOffsetX) + 'px';
            terminal.style.top = (e.clientY - dragOffsetY) + 'px';
            // Store position for restore
            terminalPosition.left = terminal.style.left;
            terminalPosition.top = terminal.style.top;
        }
    });
    
    document.addEventListener('mouseup', function() {
        isDragging = false;
        terminal.classList.remove('drag-mode');
    });
    
    // Focus on input when clicking anywhere in terminal body
    terminalBody.addEventListener('mousedown', function(e) {
        // Don't focus if user is selecting text or dragging
        if (window.getSelection().toString().length === 0 && !isDragging) {
            if (currentInput) {
                currentInput.focus();
                // Move cursor to end of input
                currentInput.setSelectionRange(currentInput.value.length, currentInput.value.length);
            } else {
                // If no input line exists, create one
                addInputLine();
            }
        }
    });
    
    // Terminal command processing
    function addInputLine() {
        const inputLine = document.createElement('div');
        inputLine.className = 'terminal-input-line';
        
        const prompt = document.createElement('span');
        prompt.className = 'terminal-prompt';
        prompt.textContent = `root@blackpacket:${getDisplayPath(currentDirectory)}$ `;
        
        const input = document.createElement('input');
        input.className = 'terminal-input';
        input.type = 'text';
        input.autofocus = true;
        
        inputLine.appendChild(prompt);
        inputLine.appendChild(input);
        terminalBody.appendChild(inputLine);
        
        currentInput = input;
        input.focus();
        
        // Handle command input
        input.addEventListener('keydown', function(e) {
            if (e.key === 'Enter') {
                processCommand(input.value.trim());
            } else if (e.key === 'ArrowUp') {
                e.preventDefault();
                if (historyIndex < commandHistory.length - 1) {
                    historyIndex++;
                    input.value = commandHistory[historyIndex];
                }
            } else if (e.key === 'ArrowDown') {
                e.preventDefault();
                if (historyIndex > 0) {
                    historyIndex--;
                    input.value = commandHistory[historyIndex];
                } else if (historyIndex === 0) {
                    historyIndex = -1;
                    input.value = '';
                }
            } else if (e.key === 'Tab') {
                e.preventDefault();
                handleTabCompletion(input);
            } else if (e.ctrlKey && e.key === 'c') {
                e.preventDefault();
                // Just add a new line, don't clear the current command
                addInputLine();
            }
        });
        
        // Scroll to bottom when new input line is added
        terminalBody.scrollTop = terminalBody.scrollHeight;
    }
    
    function handleTabCompletion(input) {
        const partial = input.value;
        const dir = getDirectory(currentDirectory);
        if (dir && dir.contents) {
            const matches = Object.keys(dir.contents).filter(name => name.startsWith(partial));
            if (matches.length === 1) {
                input.value = matches[0];
            } else if (matches.length > 1) {
                // Show possible completions
                const output = document.createElement('div');
                output.className = 'terminal-output';
                output.textContent = matches.join('  ');
                terminalBody.appendChild(output);
                addInputLine();
            }
        }
    }
    
    async function processCommand(cmd) {
        if (cmd === '') {
            addInputLine();
            return;
        }
        
        // Add to command history
        commandHistory.unshift(cmd);
        historyIndex = -1;
        
        // Update .bash_history file
        updateBashHistory(cmd);
        
        // Process command
        const args = cmd.split(' ').filter(arg => arg !== '');
        const command = args[0];
        
        // Handle output redirection
        let outputFile = null;
        let appendMode = false;
        const outputIndex = args.findIndex(arg => arg === '>' || arg === '>>');
        if (outputIndex !== -1) {
            if (args[outputIndex] === '>') {
                outputFile = args[outputIndex + 1];
            } else if (args[outputIndex] === '>>') {
                outputFile = args[outputIndex + 1];
                appendMode = true;
            }
            args.splice(outputIndex, 2);
        }
        
        // Create output element
        const output = document.createElement('div');
        output.className = 'terminal-output';
        
        let outputText = '';
        
        switch (command) {
            case 'help':
                outputText = 'Available commands: ls, cd, pwd, cat, echo, clear, whoami, date, uname, ping, nmap, w, who, ps, top, ifconfig, netstat, ssh, history, route, whois, nslookup, iptables, hostname, traceroute, tcpdump, more, less, touch, grep, find, curl, wget, chmod, chown, tar, gzip, apt, dpkg, scp, help';
                break;
            
            case 'ls':
                let lsPath = currentDirectory;
                let showHidden = false;
                
                // Check for flags
                for (let i = 1; i < args.length; i++) {
                    if (args[i].startsWith('-')) {
                        if (args[i].includes('a')) showHidden = true;
                        if (args[i].includes('l')) showHidden = true; // -l implies -a for simplicity
                        args.splice(i, 1);
                        i--;
                    }
                }
                
                // Get path if provided
                if (args.length > 1) {
                    lsPath = resolvePath(args[1]);
                }
                
                outputText = listDirectory(lsPath, showHidden);
                break;
            
            case 'cd':
                if (args.length > 1) {
                    if (args[1] === '-') {
                        // Go to previous directory
                        const temp = currentDirectory;
                        currentDirectory = previousDirectory;
                        previousDirectory = temp;
                    } else if (args[1] === '~') {
                        // Go to home directory
                        previousDirectory = currentDirectory;
                        currentDirectory = '/home/root';
                    } else {
                        const newDir = changeDirectory(args[1]);
                        if (newDir === false) {
                            outputText = `cd: ${args[1]}: No such file or directory`;
                        } else {
                            previousDirectory = currentDirectory;
                            currentDirectory = newDir;
                        }
                    }
                } else {
                    previousDirectory = currentDirectory;
                    currentDirectory = '/home/root';
                }
                updateTerminalTitle();
                break;
            
            case 'pwd':
                outputText = currentDirectory;
                break;
            
            case 'cat':
                if (args.length > 1) {
                    const content = readFile(args[1]);
                    if (content === false) {
                        outputText = `cat: ${args[1]}: No such file or directory`;
                    } else {
                        outputText = content;
                    }
                } else {
                    outputText = 'cat: missing file operand';
                }
                break;
            
            case 'more':
            case 'less':
                if (args.length > 1) {
                    const content = readFile(args[1]);
                    if (content === false) {
                        outputText = `${command}: ${args[1]}: No such file or directory`;
                    } else {
                        // Simulate paging by showing first few lines
                        const lines = content.split('\n');
                        const visibleLines = Math.min(20, lines.length);
                        outputText = lines.slice(0, visibleLines).join('\n');
                        if (lines.length > visibleLines) {
                            outputText += `\n\n--- ${lines.length - visibleLines} more lines --- (Press space for more)`;
                        }
                    }
                } else {
                    outputText = `Usage: ${command} <file>`;
                }
                break;
            
            case 'echo':
                outputText = args.slice(1).join(' ');
                break;
            
            case 'clear':
                terminalBody.innerHTML = '';
                addInputLine();
                return;
            
            case 'whoami':
                outputText = 'root';
                break;
            
            case 'date':
                outputText = new Date().toString().replace(/202[0-4]/, '2025');
                break;
            
            case 'uname':
                outputText = 'Linux blackpacket 5.4.0-42-generic #46-Ubuntu SMP Fri Jul 10 00:24:02 UTC 2020 x86_64 x86_64 x86_64 GNU/Linux';
                break;
            
            case 'ping':
                if (args.length > 1) {
                    const target = args[1];
                    terminalBody.appendChild(output);
                    await generatePingOutput(target, output);
                    addInputLine();
                    return;
                } else {
                    outputText = 'Usage: ping <hostname or IP>';
                }
                break;
            
            case 'nmap':
                if (args.length > 1) {
                    const target = args[1];
                    outputText = generateNmapOutput(target);
                } else {
                    outputText = 'Usage: nmap <hostname or IP>';
                }
                break;
            
            case 'w':
            case 'who':
                outputText = generateWhoOutput();
                break;
            
            case 'ps':
                outputText = generatePsOutput();
                break;
            
            case 'top':
                outputText = generateTopOutput();
                break;
            
            case 'ifconfig':
                outputText = generateIfconfigOutput();
                break;
            
            case 'netstat':
                outputText = generateNetstatOutput();
                break;
            
            case 'ssh':
                if (args.length > 1) {
                    outputText = `ssh: connect to host ${args[1]} port 22: Connection refused`;
                } else {
                    outputText = 'Usage: ssh <user@host>';
                }
                break;
            
            case 'history':
                outputText = commandHistory.slice().reverse().map((cmd, i) => `${i + 1}  ${cmd}`).join('\n');
                break;
            
            case 'route':
                outputText = generateRouteOutput();
                break;
            
            case 'whois':
                if (args.length > 1) {
                    outputText = generateWhoisOutput(args[1]);
                } else {
                    outputText = 'Usage: whois <domain>';
                }
                break;
            
            case 'nslookup':
                if (args.length > 1) {
                    outputText = generateNslookupOutput(args[1]);
                } else {
                    outputText = 'Usage: nslookup <domain>';
                }
                break;
            
            case 'iptables':
                outputText = generateIptablesOutput();
                break;
            
            case 'hostname':
                outputText = 'blackpacket';
                break;
            
            case 'traceroute':
                if (args.length > 1) {
                    const target = args[1];
                    await generateTracerouteOutput(target);
                    addInputLine();
                    return;
                } else {
                    outputText = 'Usage: traceroute <hostname or IP>';
                }
                break;
            
            case 'tcpdump':
                outputText = await generateTcpdumpOutput(args);
                break;
            
            case 'touch':
                if (args.length > 1) {
                    const filename = args[1];
                    if (createFile(filename, '')) {
                        outputText = '';
                    } else {
                        outputText = `touch: cannot create file '${filename}': Permission denied`;
                    }
                } else {
                    outputText = 'Usage: touch <filename>';
                }
                break;
            
            case 'grep':
                if (args.length > 2) {
                    outputText = `grep: ${args[2]}: No such file or directory`;
                } else {
                    outputText = 'Usage: grep <pattern> <file>';
                }
                break;
            
            case 'find':
                outputText = '/home/root\n/home/root/Documents\n/home/root/Downloads';
                break;
            
            case 'curl':
            case 'wget':
                outputText = `${command}: Could not resolve host: ${args[1] || 'example.com'}`;
                break;
            
            case 'chmod':
            case 'chown':
                outputText = '';
                break;
            
            case 'tar':
            case 'gzip':
                outputText = `${command}: Cannot open: No such file or directory`;
                break;
            
            case 'apt':
            case 'dpkg':
                outputText = `E: Could not open lock file /var/lib/dpkg/lock-frontend - open (13: Permission denied)\nE: Unable to acquire the dpkg frontend lock (/var/lib/dpkg/lock-frontend), are you root?`;
                break;
            
            case 'scp':
                outputText = `ssh: connect to host ${args[1] || 'example.com'} port 22: Connection refused`;
                break;
            
            default:
                outputText = `bash: ${command}: command not found`;
        }
        
        // Handle output redirection
        if (outputFile) {
            if (outputText) {
                if (createFile(outputFile, outputText, appendMode)) {
                    outputText = '';
                } else {
                    outputText = `bash: ${outputFile}: Permission denied`;
                }
            }
        }
        
        if (outputText) {
            output.textContent = outputText;
            terminalBody.appendChild(output);
        }
        
        addInputLine();
    }
    
    // Command output generators
    async function generatePingOutput(target, outputElement) {
        // Generate consistent but fake ping results based on target
        let hash = 0;
        for (let i = 0; i < target.length; i++) {
            hash = ((hash << 5) - hash) + target.charCodeAt(i);
            hash = hash & hash; // Convert to 32bit integer
        }
        
        // Use hash to generate consistent but fake results
        const baseTime = 20 + Math.abs(hash % 50);
        const ipSuffix = Math.abs(hash % 254) + 1;
        
        outputElement.textContent = `PING ${target} (192.168.1.${ipSuffix}) 56(84) bytes of data.`;
        
        // Generate ping replies with delays
        for (let i = 1; i <= 4; i++) {
            await new Promise(resolve => setTimeout(resolve, 1000));
            
            // Randomize time slightly for each ping
            const timeVariation = (Math.random() * 6 - 3).toFixed(1);
            const pingTime = Math.max(1, (baseTime + parseFloat(timeVariation))).toFixed(1);
            
            const pingLine = document.createElement('div');
            pingLine.className = 'terminal-output';
            pingLine.textContent = `64 bytes from ${target} (192.168.1.${ipSuffix}): icmp_seq=${i} ttl=64 time=${pingTime} ms`;
            terminalBody.appendChild(pingLine);
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
        
        // Add statistics
        await new Promise(resolve => setTimeout(resolve, 500));
        const stats1 = document.createElement('div');
        stats1.className = 'terminal-output';
        stats1.textContent = '';
        terminalBody.appendChild(stats1);
        
        const stats2 = document.createElement('div');
        stats2.className = 'terminal-output';
        stats2.textContent = `--- ${target} ping statistics ---`;
        terminalBody.appendChild(stats2);
        
        const stats3 = document.createElement('div');
        stats3.className = 'terminal-output';
        stats3.textContent = `4 packets transmitted, 4 received, 0% packet loss, time 3005ms`;
        terminalBody.appendChild(stats3);
        
        const stats4 = document.createElement('div');
        stats4.className = 'terminal-output';
        stats4.textContent = `rtt min/avg/max/mdev = ${(baseTime - 3).toFixed(3)}/${(baseTime + 0.5).toFixed(3)}/${(baseTime + 4).toFixed(3)}/1.234 ms`;
        terminalBody.appendChild(stats4);
    }
    
    async function generateTracerouteOutput(target) {
        let hash = 0;
        for (let i = 0; i < target.length; i++) {
            hash = ((hash << 5) - hash) + target.charCodeAt(i);
            hash = hash & hash;
        }
        
        const output = document.createElement('div');
        output.className = 'terminal-output';
        output.textContent = `traceroute to ${target} (192.168.1.${Math.abs(hash % 254) + 1}), 30 hops max, 60 byte packets`;
        terminalBody.appendChild(output);
        
        const numHops = 8 + Math.abs(hash % 7);
        
        for (let i = 1; i <= numHops; i++) {
            await new Promise(resolve => setTimeout(resolve, 800));
            
            const hopLine = document.createElement('div');
            hopLine.className = 'terminal-output';
            
            if (i < numHops) {
                const times = [];
                for (let j = 0; j < 3; j++) {
                    times.push((10 + i * 5 + Math.random() * 10).toFixed(1));
                }
                hopLine.textContent = ` ${i}  10.${i}.${Math.abs(hash % 254)}.1  ${times[0]} ms  ${times[1]} ms  ${times[2]} ms`;
            } else {
                hopLine.textContent = ` ${i}  192.168.1.${Math.abs(hash % 254) + 1}  *  *  *`;
            }
            
            terminalBody.appendChild(hopLine);
            terminalBody.scrollTop = terminalBody.scrollHeight;
        }
    }
    
    async function generateTcpdumpOutput(args) {
        let output = '';
        
        if (args.includes('-w')) {
            const filenameIndex = args.indexOf('-w') + 1;
            if (filenameIndex < args.length) {
                const filename = args[filenameIndex];
                if (createFile(filename, 'TCPDUMP_CAPTURE_DATA\nMultiple packets captured\nTimestamp data would be here')) {
                    output = `tcpdump: listening on eth0, link-type EN10MB (Ethernet), capture size 262144 bytes\n`;
                    output += `Got 5 packets captured to file ${filename}\n`;
                    output += `5 packets received by filter\n0 packets dropped by kernel`;
                } else {
                    output = `tcpdump: ${filename}: Permission denied`;
                }
            }
        } else if (args.includes('-i') && args.includes('eth0')) {
            output = `tcpdump: verbose output suppressed, use -v or -vv for full protocol decode\n`;
            output += `listening on eth0, link-type EN10MB (Ethernet), capture size 262144 bytes\n`;
            output += `14:25:36.123456 IP 192.168.1.100.22 > 192.168.1.101.54321: Flags [P.], seq 123:456, ack 789, win 29200, length 333\n`;
            output += `14:25:36.123789 IP 192.168.1.101.54321 > 192.168.1.100.22: Flags [.], ack 456, win 65535, length 0\n`;
            output += `14:25:36.124123 IP 192.168.1.100.22 > 192.168.1.101.54321: Flags [P.], seq 456:789, ack 789, win 29200, length 333\n`;
            output += `^C\n3 packets captured\n3 packets received by filter\n0 packets dropped by kernel`;
        } else {
            output = 'tcpdump: eth0: You don\'t have permission to capture on that device';
        }
        
        return output;
    }
    
    function generateNmapOutput(target) {
        let hash = 0;
        for (let i = 0; i < target.length; i++) {
            hash = ((hash << 5) - hash) + target.charCodeAt(i);
            hash = hash & hash;
        }
        
        const ipSuffix = Math.abs(hash % 254) + 1;
        const openPorts = [];
        
        // Determine which ports are "open" based on hash
        if (hash % 3 === 0) openPorts.push(22);
        if (hash % 5 === 0) openPorts.push(80);
        if (hash % 7 === 0) openPorts.push(443);
        if (hash % 11 === 0) openPorts.push(21);
        if (hash % 13 === 0) openPorts.push(25);
        if (hash % 17 === 0) openPorts.push(53);
        if (hash % 19 === 0) openPorts.push(110);
        if (hash % 23 === 0) openPorts.push(143);
        if (hash % 29 === 0) openPorts.push(993);
        if (hash % 31 === 0) openPorts.push(995);
        
        // Always have at least one port open
        if (openPorts.length === 0) openPorts.push(22);
        
        openPorts.sort((a, b) => a - b);
        
        let output = `Starting Nmap 7.80 ( https://nmap.org ) at ${new Date().toISOString().replace('T', ' ').substring(0, 19)}\n`;
        output += `Nmap scan report for ${target} (192.168.1.${ipSuffix})\n`;
        output += `Host is up (0.00${Math.abs(hash % 9) + 1}s latency).\n`;
        output += 'Not shown: 995 closed ports\n';
        output += 'PORT    STATE SERVICE\n';
        
        for (const port of openPorts) {
            let service = 'unknown';
            switch(port) {
                case 21: service = 'ftp'; break;
                case 22: service = 'ssh'; break;
                case 25: service = 'smtp'; break;
                case 53: service = 'domain'; break;
                case 80: service = 'http'; break;
                case 110: service = 'pop3'; break;
                case 143: service = 'imap'; break;
                case 443: service = 'https'; break;
                case 993: service = 'imaps'; break;
                case 995: service = 'pop3s'; break;
            }
            output += `${port}/tcp  open  ${service}\n`;
        }
        
        output += '\nNmap done: 1 IP address (1 host up) scanned in 1.25 seconds';
        
        return output;
    }
    
    function generateWhoOutput() {
        const now = new Date();
        const oneDayAgo = new Date(now);
        oneDayAgo.setDate(oneDayAgo.getDate() - 1);
        
        const formatDate = (date) => {
            const month = (date.getMonth() + 1).toString().padStart(2, '0');
            const day = date.getDate().toString().padStart(2, '0');
            const hours = date.getHours().toString().padStart(2, '0');
            const minutes = date.getMinutes().toString().padStart(2, '0');
            return `${month}-${day} ${hours}:${minutes}`;
        };
        
        return `root     pts/0        ${formatDate(now)} (192.168.1.100)\nroot     pts/1        ${formatDate(oneDayAgo)} (192.168.1.101)\ntheblackpacket pts/2        ${formatDate(now)} (192.168.1.102)`;
    }
    
    function generatePsOutput() {
        return `  PID TTY          TIME CMD\n 1234 pts/0    00:00:00 bash\n 5678 pts/0    00:00:00 ps\n 4321 ?        00:00:01 sshd\n 8765 ?        00:00:00 systemd`;
    }
    
    function generateTopOutput() {
        return `top - 14:35:01 up 1 day,  2:30,  3 users,  load average: 0.12, 0.15, 0.18\nTasks: 125 total,   1 running, 124 sleeping,   0 stopped,   0 zombie\n%Cpu(s):  2.3 us,  1.2 sy,  0.0 ni, 96.5 id,  0.0 wa,  0.0 hi,  0.0 si,  0.0 st\nMiB Mem :   7844.2 total,   5216.5 free,   1543.2 used,   1084.5 buff/cache\nMiB Swap:   2048.0 total,   2048.0 free,      0.0 used.   6543.2 avail Mem\n\n  PID USER      PR  NI    VIRT    RES    SHR S  %CPU  %MEM     TIME+ COMMAND\n 4321 root      20   0   92320   6544   4321 S   2.3   0.1   0:01.23 sshd\n 1234 root      20   0   12345   3456   2345 S   0.0   0.0   0:00.05 bash`;
    }
    
    function generateIfconfigOutput() {
        return `eth0: flags=4163<UP,BROADCAST,RUNNING,MULTICAST>  mtu 1500\n        inet 192.168.1.100  netmask 255.255.255.0  broadcast 192.168.1.255\n        inet6 fe80::a00:27ff:fe4e:66a1  prefixlen 64  scopeid 0x20<link>\n        ether 08:00:27:4e:66:a1  txqueuelen 1000  (Ethernet)\n        RX packets 123456  bytes 123456789 (123.4 MB)\n        RX errors 0  dropped 0  overruns 0  frame 0\n        TX packets 98765  bytes 98765432 (98.7 MB)\n        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0\n\nlo: flags=73<UP,LOOPBACK,RUNNING>  mtu 65536\n        inet 127.0.0.1  netmask 255.0.0.0\n        inet6 ::1  prefixlen 128  scopeid 0x10<host>\n        loop  txqueuelen 1000  (Local Loopback)\n        RX packets 1234  bytes 123456 (123.4 KB)\n        RX errors 0  dropped 0  overruns 0  frame 0\n        TX packets 1234  bytes 123456 (123.4 KB)\n        TX errors 0  dropped 0 overruns 0  carrier 0  collisions 0`;
    }
    
    function generateNetstatOutput() {
        return `Active Internet connections (servers and established)\nProto Recv-Q Send-Q Local Address           Foreign Address         State\ntcp        0      0 0.0.0.0:22              0.0.0.0:*               LISTEN\ntcp        0      0 127.0.0.1:631           0.0.0.0:*               LISTEN\ntcp        0      0 192.168.1.100:22        192.168.1.101:43210     ESTABLISHED\ntcp6       0      0 :::22                   :::*                    LISTEN\n\nActive UNIX domain sockets (servers and established)\nProto RefCnt Flags       Type       State         I-Node   Path\nunix  2      [ ACC ]     STREAM     LISTENING     12345    /var/run/dbus/system_bus_socket\nunix  3      [ ]         STREAM     CONNECTED     23456    /var/run/acpid.socket`;
    }
    
    function generateRouteOutput() {
        return `Kernel IP routing table\nDestination     Gateway         Genmask         Flags Metric Ref    Use Iface\ndefault         192.168.1.1     0.0.0.0         UG    100    0        0 eth0\n192.168.1.0     *               255.255.255.0   U     100    0        0 eth0`;
    }
    
    function generateWhoisOutput(domain) {
        return `Domain Name: ${domain}\nRegistry Domain ID: D123456789-LROR\nRegistrar WHOIS Server: whois.example-registrar.com\nRegistrar URL: http://www.example-registrar.com\nUpdated Date: 2024-01-15T10:20:30Z\nCreation Date: 2020-03-10T15:30:45Z\nRegistry Expiry Date: 2026-03-10T15:30:45Z\nRegistrar: Example Registrar, Inc.\nName Server: NS1.EXAMPLE-DNS.COM\nName Server: NS2.EXAMPLE-DNS.COM`;
    }
    
    function generateNslookupOutput(domain) {
        return `Server:         192.168.1.1\nAddress:        192.168.1.1#53\n\nNon-authoritative answer:\nName:   ${domain}\nAddress: 192.168.1.${Math.abs(domain.length % 254) + 1}`;
    }
    
    function generateIptablesOutput() {
        return `Chain INPUT (policy ACCEPT)\ntarget     prot opt source               destination\nACCEPT     all  --  anywhere             anywhere\nACCEPT     tcp  --  anywhere             anywhere             tcp dpt:ssh\n\nChain FORWARD (policy ACCEPT)\ntarget     prot opt source               destination\n\nChain OUTPUT (policy ACCEPT)\ntarget     prot opt source               destination`;
    }

    // SPA Navigation
    const container = document.querySelector('.container');

    function loadContent(path) {
        let fetchPath = path;
        if (path === '/' || path === '/index.html') {
            fetchPath = '/home.html';
        } else if (path.endsWith('/')) {
            fetchPath = path + 'index.html';
        }

        fetch(fetchPath)
            .then(response => {
                if (!response.ok) throw new Error(`Failed to load ${fetchPath}`);
                return response.text();
            })
            .then(html => {
                const parser = new DOMParser();
                const doc = parser.parseFromString(html, 'text/html');
                const newContainer = doc.querySelector('.container');
                if (newContainer) {
                    container.innerHTML = newContainer.innerHTML;

                    document.querySelectorAll('[data-page-script="true"], [data-page-style="true"]').forEach(el => el.remove());

                    doc.querySelectorAll('link[rel="stylesheet"]').forEach(originalLink => {
                        if (originalLink.href.includes('desktop-style.css')) return;
                        const newLink = document.createElement('link');
                        newLink.setAttribute('data-page-style', 'true');
                        newLink.rel = 'stylesheet';
                        newLink.href = new URL(originalLink.href, doc.baseURI).href;
                        document.head.appendChild(newLink);
                    });

                    doc.querySelectorAll('style').forEach(originalStyle => {
                        const newStyle = document.createElement('style');
                        newStyle.setAttribute('data-page-style', 'true');
                        newStyle.textContent = originalStyle.textContent;
                        document.head.appendChild(newStyle);
                    });

                    doc.querySelectorAll('script').forEach(originalScript => {
                        const processAndExecute = (scriptContent, isExternal = false, src = '') => {
                            const redirectRegex = /if\s*\(\s*window\.self\s*===\s*window\.top\s*\)\s*\{[^}]*window\.location\.href\s*=\s*['"]\/desktop\.html#['"][^}]*\}/m;
                            if (redirectRegex.test(scriptContent)) {
                                return;
                            }
                            // Check for an inlined version of the main script
                            if (scriptContent.includes('const terminal = document.getElementById(\'linuxTerminal\');')) {
                                return;
                            }

                            const domContentLoadedRegex = /document\.addEventListener\('DOMContentLoaded',\s*function\(\)\s*\{([\s\S]*)\}\s*\);?/m;
                            const match = scriptContent.match(domContentLoadedRegex);
                            const codeToRun = match ? match[1] : scriptContent;

                            const newScript = document.createElement('script');
                            newScript.setAttribute('data-page-script', 'true');
                            newScript.textContent = codeToRun;
                            
                            // Use a timeout to ensure the DOM is ready before script execution
                            setTimeout(() => {
                                document.body.appendChild(newScript);
                                try {
                                    new Function(codeToRun)(); // Execute the code
                                } catch (e) {
                                    console.error("Error executing dynamically loaded script:", e);
                                }
                            }, 0);
                        };

                        if (originalScript.src) {
                            if (originalScript.src.includes('desktop-main.js')) return;
                            const absoluteSrc = new URL(originalScript.src, doc.baseURI).href;
                            fetch(absoluteSrc)
                                .then(response => response.ok ? response.text() : Promise.reject(`Failed to fetch ${absoluteSrc}`))
                                .then(fetchedCode => processAndExecute(fetchedCode, true, absoluteSrc))
                                .catch(err => console.error('Error processing external script:', err));
                        } else {
                            processAndExecute(originalScript.textContent, false);
                        }
                    });

                    attachNavLinks();
                    setActiveLinkByPath(path);
                }
            })
            .catch(console.error);
    }

    function attachNavLinks() {
        document.querySelectorAll('a:not([data-spa-attached])').forEach(link => {
            link.dataset.spaAttached = 'true';
            const href = link.getAttribute('href');
            if (href && !href.startsWith('http') && !href.startsWith('#') && !link.hasAttribute('download')) {
                link.addEventListener('click', e => {
                    e.preventDefault();
                    const newPath = new URL(href, window.location.href).pathname;
                    if (window.location.pathname !== newPath) {
                        history.pushState({ path: newPath }, '', newPath);
                    }
                    loadContent(newPath);
                });
            }
        });
    }

    function setActiveLinkByPath(path) {
        document.querySelectorAll('.nav-link').forEach(navLink => {
            navLink.classList.remove('active');
            const linkPath = navLink.getAttribute('href');
            // Check if the current path starts with the link's path.
            // The link path must be more than just '/' to avoid highlighting all links.
            if (linkPath && linkPath !== '/' && path.startsWith(linkPath)) {
                navLink.classList.add('active');
            } else if (linkPath === path) {
                // For exact matches like the home page.
                navLink.classList.add('active');
            }
        });

        // Special case for home, if no other link is active
        const homeLink = document.querySelector('.nav-link[href="/home.html"]');
        const anyActive = document.querySelector('.nav-link.active');
        if (!anyActive && homeLink) {
            homeLink.classList.add('active');
        }
    }

    window.addEventListener('popstate', e => {
        if (e.state && e.state.path) {
            loadContent(e.state.path);
        }
    });

    function initialLoad() {
        attachNavLinks();
        const initialPath = window.location.pathname === '/desktop.html' ? '/' : window.location.pathname;
        history.replaceState({ path: initialPath }, '', initialPath);
        loadContent(initialPath);
    }





    // Initial Load
    function initialLoad() {
        attachNavLinks(); // Attach to links present on initial page load
        let initialPath = window.location.hash.substring(1);
        
        if (initialPath) {
            // If there is a hash, load that content.
            loadContent(initialPath);
        } else {
            // No hash, load home page by default.
            initialPath = '/';
            history.replaceState({ path: initialPath }, '', initialPath);
            loadContent(initialPath);
        }
    }

    initialLoad();
});
