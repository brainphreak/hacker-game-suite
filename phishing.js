
        document.addEventListener('DOMContentLoaded', () => {
            const emails = [
                {
                    subject: "URGENT: Account Security Alert",
                    from: "security@yourbank.com",
                    body: `Dear Customer,<br><br>We have detected suspicious activity on your account. For your protection, we have temporarily suspended your account. Please login immediately to verify your identity and restore access.<br><br><a href="#" class="email-link" data-real-url="http://yourbank-security-real.com/login">http://yourbank.com/login-secure</a><br><br>Thank you,<br>Your Bank Security Team`,
                    isPhishing: false
                },
                {
                    subject: "You've Won a FREE iPhone!",
                    from: "winner@luckydraw.com",
                    body: `Congratulations! You have been selected as a winner of our weekly promotion. To claim your brand new iPhone, please provide your shipping details and a small processing fee.<br><br><a href="#" class="email-link" data-real-url="http://phishing-site.com/claim-prize">Click here to claim your prize!</a><br><br>Hurry, this offer is only valid for 24 hours!`,
                    isPhishing: true
                },
                {
                    subject: "Invoice #12345 Due",
                    from: "billing@trusted-vendor.com",
                    body: `Dear Customer,<br><br>Your invoice #12345 for $50.00 is due. Please review the attached invoice and make a payment at your earliest convenience.<br><br><a href="#" class="email-link" data-real-url="http://trusted-vendor.com/invoices/12345">View Invoice</a><br><br>Thank you,<br>Trusted Vendor Inc.`,
                    isPhishing: false
                },
                {
                    subject: "Action Required: Verify Your Email Address",
                    from: "support@your-email-provider.com",
                    body: `To continue using our service, you must verify your email address. Failure to do so within 48 hours will result in account termination.<br><br><a href="#" class="email-link" data-real-url="http://phishing-site.com/verify-email">Click here to verify now.</a><br><br>Thank you,<br>Support Team`,
                    isPhishing: true
                },
                {
                    subject: "Your order has shipped!",
                    from: "shipping@major-retailer.com",
                    body: `Great news! Your order #98765 has shipped. You can track your package using the link below.<br><br><a href="#" class="email-link" data-real-url="http://major-retailer.com/tracking/98765">Track Package</a><br><br>We hope you enjoy your purchase!`,
                    isPhishing: false
                },
                {
                    subject: "Password Reset Request",
                    from: "noreply@social-media-site.com",
                    body: `We received a request to reset your password. If you did not make this request, please ignore this email. Otherwise, you can reset your password using the link below.<br><br><a href="#" class="email-link" data-real-url="http://phishing-site.com/reset-password">Reset Your Password</a><br><br>This link will expire in 1 hour.`,
                    isPhishing: true
                }
            ];

            let currentEmailIndex = 0;
            let score = 0;
            let correctCount = 0;
            let incorrectCount = 0;
            let gameActive = false;

            const startScreen = document.getElementById('start-screen');
            const gameScreen = document.getElementById('game-screen');
            const startBtn = document.getElementById('start-btn');
            const emailContainer = document.getElementById('email-container');
            const resultEl = document.getElementById('result');
            const scoreEl = document.getElementById('score-value');
            const correctEl = document.getElementById('correct-value');
            const incorrectEl = document.getElementById('incorrect-value');
            const progress = document.getElementById('progress');
            const gameOverScreen = document.getElementById('game-over');
            const finalScoreEl = document.getElementById('final-score');
            const hackerRankEl = document.getElementById('hacker-rank');
            const restartBtn = document.getElementById('restart-btn');
            const scanLine = document.querySelector('.scan-line');

            startBtn.addEventListener('click', startGame);
            restartBtn.addEventListener('click', startGame);
            document.getElementById('delete-btn').addEventListener('click', () => handleAction(false));
            document.getElementById('phish-btn').addEventListener('click', () => handleAction(true));

            function startGame() {
                startScreen.style.display = 'none';
                gameOverScreen.style.display = 'none';
                gameScreen.style.display = 'block';
                gameActive = true;
                currentEmailIndex = 0;
                score = 0;
                correctCount = 0;
                incorrectCount = 0;
                shuffleArray(emails);
                updateStats();
                loadEmail();
            }

            function loadEmail() {
                if (currentEmailIndex >= emails.length) {
                    endGame();
                    return;
                }

                const email = emails[currentEmailIndex];
                document.getElementById('email-subject').textContent = email.subject;
                document.getElementById('email-from').textContent = `From: ${email.from}`;
                document.getElementById('email-body').innerHTML = email.body;
                resultEl.textContent = '';
                scanLine.style.display = 'block';
                scanLine.style.animation = 'none';
                void scanLine.offsetWidth; // Trigger reflow
                scanLine.style.animation = `scan ${2 + Math.random() * 2}s linear infinite`;
                
                setupLinkPreviews();
            }

            function handleAction(isPhishingGuess) {
                if (!gameActive) return;

                const correct = emails[currentEmailIndex].isPhishing === isPhishingGuess;
                if (correct) {
                    resultEl.textContent = "Correct! Analysis complete.";
                    resultEl.className = 'result correct flashing';
                    score += 100;
                    correctCount++;
                } else {
                    resultEl.textContent = "Incorrect! System integrity compromised.";
                    resultEl.className = 'result incorrect flashing';
                    score -= 50;
                    incorrectCount++;
                }

                updateStats();
                currentEmailIndex++;
                gameActive = false;

                setTimeout(() => {
                    resultEl.classList.remove('flashing');
                    if (currentEmailIndex < emails.length) {
                        gameActive = true;
                        loadEmail();
                    } else {
                        endGame();
                    }
                }, 2000);
            }

            function updateStats() {
                scoreEl.textContent = score;
                correctEl.textContent = correctCount;
                incorrectEl.textContent = incorrectCount;
                const progressPercentage = (currentEmailIndex / emails.length) * 100;
                progress.style.width = `${progressPercentage}%`;
            }

            function endGame() {
                gameActive = false;
                gameScreen.style.display = 'none';
                gameOverScreen.style.display = 'block';
                finalScoreEl.textContent = score;
                hackerRankEl.textContent = getHackerRank(score);
            }

            function getHackerRank(finalScore) {
                if (finalScore >= 500) return "Master Hacker";
                if (finalScore >= 300) return "Elite Hacker";
                if (finalScore >= 100) return "Net Runner";
                if (finalScore >= 0) return "Script Kiddie";
                return "Lamer";
            }

            function shuffleArray(array) {
                for (let i = array.length - 1; i > 0; i--) {
                    const j = Math.floor(Math.random() * (i + 1));
                    [array[i], array[j]] = [array[j], array[i]];
                }
            }
            
            function setupLinkPreviews() {
                const links = document.querySelectorAll('.email-link');
                let previewEl = document.querySelector('.link-preview');
                if (!previewEl) {
                    previewEl = document.createElement('div');
                    previewEl.className = 'link-preview';
                    document.body.appendChild(previewEl);
                }
                previewEl.style.display = 'none';

                links.forEach(link => {
                    link.addEventListener('mouseenter', (e) => {
                        const realUrl = link.dataset.realUrl;
                        previewEl.textContent = `Link points to: ${realUrl}`;
                        previewEl.style.display = 'block';
                    });
                    link.addEventListener('mousemove', (e) => {
                        previewEl.style.left = `${e.pageX + 15}px`;
                        previewEl.style.top = `${e.pageY + 15}px`;
                    });
                    link.addEventListener('mouseleave', () => {
                        previewEl.style.display = 'none';
                    });
                });
            }
        });
    