        document.addEventListener('DOMContentLoaded', function() {
            // Game elements
            const startScreen = document.getElementById('start-screen');
            const gameScreen = document.getElementById('game-screen');
            const startBtn = document.getElementById('start-btn');
            const scoreElement = document.getElementById('score');
            const levelElement = document.getElementById('level');
            const livesElement = document.getElementById('lives');
            const timeElement = document.getElementById('time');
            const progressElement = document.getElementById('progress');
            const scanLine = document.getElementById('scan-line');
            const emailSubject = document.getElementById('email-subject');
            const emailFrom = document.getElementById('email-from');
            const emailBody = document.getElementById('email-body');
            const emailFooter = document.getElementById('email-footer');
            const resultElement = document.getElementById('result');
            const legitBtn = document.getElementById('legit-btn');
            const phishBtn = document.getElementById('phish-btn');
            const gameOverScreen = document.getElementById('game-over');
            const finalScoreElement = document.getElementById('final-score');
            const hackerRankElement = document.getElementById('hacker-rank');
            const restartBtn = document.getElementById('restart-btn');
            
            // Game state
            let score = 0;
            let level = 1;
            let lives = 3;
            let timeLeft = 60;
            let gameActive = false;
            let currentEmail = null;
            let timer;
            let usedEmailIndices = [];
            
            // Email database
            const emails = [
                // Level 1 - Basic phishing indicators
                {
                    subject: "Your Amazon Order Confirmation",
                    from: "no-reply@amazon.com",
                    body: `
                        <p>Hello Jane,</p>
                        <p>Thank you for your order! Your order #114-6920354-1234567 has been confirmed.</p>
                        <p>Expected delivery: Thursday, October 12</p>
                        <p>You can track your package <a href="#" class="email-link" data-url="https://www.amazon.com/gp/your-account/order-history">here</a>.</p>
                        <p>Thank you for shopping with Amazon!</p>
                    `,
                    footer: "Amazon.com, 410 Terry Ave N, Seattle, WA 98109",
                    isPhishing: false,
                    difficulty: 1
                },
                {
                    subject: "URGENT: Your PayPal Account Limited",
                    from: "service@paypal-security.com",
                    body: `
                        <p>Dear PayPal User,</p>
                        <p>We've detected suspicious activity on your PayPal account. To protect your account, we've temporarily limited access.</p>
                        <p>You must <span class="highlight">verify your account information</span> within 24 hours to avoid permanent suspension.</p>
                        <p>Click <a href="#" class="email-link" data-url="http://paypal-security-verify.com/login">here</a> to restore your account access now.</p>
                        <p>Sincerely,<br>PayPal Security Team</p>
                    `,
                    footer: "Please do not reply to this email",
                    isPhishing: true,
                    difficulty: 1
                },
                {
                    subject: "Netflix Payment Issue",
                    from: "info@netflix.com",
                    body: `
                        <p>Hello,</p>
                        <p>We're having trouble with your current billing information. We'll try again in 24 hours, but in the meantime you may experience interruption to your service.</p>
                        <p>To update your payment method, please visit your <a href="#" class="email-link" data-url="https://www.netflix.com/YourAccount">Account page</a>.</p>
                        <p>If you have any questions, please contact customer service.</p>
                        <p>- The Netflix Team</p>
                    `,
                    footer: "Netflix, 100 Winchester Circle, Los Gatos, CA 95032, USA",
                    isPhishing: false,
                    difficulty: 1
                },
                {
                    subject: "Apple ID Locked for Security Reasons",
                    from: "support@appleid.secure-service.com",
                    body: `
                        <p>Dear Apple User,</p>
                        <p>Your Apple ID has been locked for security reasons. We detected unusual activity that may indicate your account has been compromised.</p>
                        <p>To unlock your account, you must <span class="highlight">verify your identity</span> immediately.</p>
                        <p><a href="#" class="email-link" data-url="http://appleid-secure-service.com/verify">Click here to verify your Apple ID</a></p>
                        <p>Apple Support</p>
                    `,
                    footer: "Copyright © 2023 Apple Inc. All rights reserved.",
                    isPhishing: true,
                    difficulty: 1
                },
                
                // Level 2 - More subtle phishing attempts
                {
                    subject: "Microsoft Account Unusual Sign-In Activity",
                    from: "account-security-noreply@microsoft.com",
                    body: `
                        <p>Hi John,</p>
                        <p>We noticed a new sign-in to your Microsoft account on a Windows device. If this was you, you can disregard this message.</p>
                        <p>If this wasn't you, your account may have been compromised. Please <a href="#" class="email-link" data-url="https://account.live.com/activity">review your recent activity</a> and secure your account.</p>
                        <p>Thanks,<br>The Microsoft account team</p>
                    `,
                    footer: "Microsoft Corporation, One Microsoft Way, Redmond, WA 98052",
                    isPhishing: false,
                    difficulty: 2
                },
                {
                    subject: "Google: New sign-in from Windows device",
                    from: "google-noreply@accounts.google.com",
                    body: `
                        <p>Hi there,</p>
                        <p>A new sign-in from a Windows device was detected on your Google Account.</p>
                        <p>If this was you, you can ignore this alert. If you don't recognize this activity, please secure your account.</p>
                        <p>Check activity: <a href="#" class="email-link" data-url="https://myaccount.google.com/notifications">https://myaccount.google.com/notifications</a></p>
                        <p>Thanks,<br>The Google Accounts team</p>
                    `,
                    footer: "This email can't receive replies. For more information, visit the Google Accounts Help Center.",
                    isPhishing: false,
                    difficulty: 2
                },
                {
                    subject: "Your Facebook Friend Request",
                    from: "notification@facebookmail.com",
                    body: `
                        <p>You have a new friend request on Facebook.</p>
                        <p>David Smith sent you a friend request.</p>
                        <p>To confirm this friend request, follow the link below:</p>
                        <p><a href="#" class="email-link" data-url="https://www.facebook.com/friends/request">https://www.facebook.com/friends/request</a></p>
                        <p>Thanks,<br>The Facebook Team</p>
                    `,
                    footer: "Facebook, 1 Hacker Way, Menlo Park, CA 94025",
                    isPhishing: false,
                    difficulty: 2
                },
                {
                    subject: "Facebook: Confirm Your Friend Request",
                    from: "notification@face-book.com",
                    body: `
                        <p>You have a new friend request on Facebook.</p>
                        <p>Sarah Johnson sent you a friend request.</p>
                        <p>To confirm this friend request, follow the link below:</p>
                        <p><a href="#" class="email-link" data-url="http://fa.ce-book.com/friends/confirm">https://www.facebook.com/friends/confirm</a></p>
                        <p>Thanks,<br>The Facebook Team</p>
                    `,
                    footer: "Facebook, 1 Hacker Way, Menlo Park, CA 94025",
                    isPhishing: true,
                    difficulty: 2
                },
                
                // Level 3 - Advanced phishing with subtle domain spoofing
                {
                    subject: "Bank of America: Security Alert",
                    from: "alerts@bankofamerica.com",
                    body: `
                        <p>Dear Bank of America Customer,</p>
                        <p>We've detected a login to your Bank of America account from a new device.</p>
                        <p>If this was you, you don't need to do anything. If this wasn't you, please secure your account immediately.</p>
                        <p><a href="#" class="email-link" data-url="https://www.bankofamerica.com/security-center/">Click here to review account activity</a></p>
                        <p>Sincerely,<br>Bank of America Security Center</p>
                    `,
                    footer: "Please do not reply to this message",
                    isPhishing: false,
                    difficulty: 3
                },
                {
                    subject: "Bank of America: Security Alert",
                    from: "alerts@bankofamerica.security.com",
                    body: `
                        <p>Dear Bank of America Customer,</p>
                        <p>We've detected a login to your Bank of America account from a new device.</p>
                        <p>If this was you, you don't need to do anything. If this wasn't you, please <span class="highlight">secure your account immediately</span>.</p>
                        <p><a href="#" class="email-link" data-url="http://bankofamerica.security-verify.com/login">Click here to verify your account</a></p>
                        <p>Sincerely,<br>Bank of America Security Center</p>
                    `,
                    footer: "Please do not reply to this message",
                    isPhishing: true,
                    difficulty: 3
                },
                {
                    subject: "Microsoft: Action Required on Your Account",
                    from: "microsoft.support@micros0ft.com",
                    body: `
                        <p>Dear Microsoft User,</p>
                        <p>We've noticed unusual activity in your Microsoft account. To protect your account, we need you to verify your identity.</p>
                        <p>Please click the link below to complete the verification process:</p>
                        <p><a href="#" class="email-link" data-url="http://micros0ft-support.com/verify">Verify Your Microsoft Account</a></p>
                        <p>If you don't verify your account within 48 hours, your account will be suspended.</p>
                        <p>Thank you,<br>Microsoft Support Team</p>
                    `,
                    footer: "Microsoft Corporation, One Microsoft Way, Redmond, WA 98052",
                    isPhishing: true,
                    difficulty: 3
                },
                {
                    subject: "LinkedIn: You have a new connection request",
                    from: "linkedin@e.linkedin.com",
                    body: `
                        <p>Hi there,</p>
                        <p>You have a new connection request from Jennifer Martinez, Recruiter at Tech Solutions Inc.</p>
                        <p>To view this request and respond, visit your LinkedIn inbox:</p>
                        <p><a href="#" class="email-link" data-url="https://www.linkedin.com/inbox">https://www.linkedin.com/inbox</a></p>
                        <p>Best,<br>The LinkedIn Team</p>
                    `,
                    footer: "This email was intended for John Smith. © 2023 LinkedIn Corporation, 1000 W Maude Avenue, Sunnyvale, CA 94085.",
                    isPhishing: false,
                    difficulty: 3
                },
                
                // Level 4 - Very subtle phishing attempts
                {
                    subject: "Twitter: Login Verification Code",
                    from: "info@twitter.com",
                    body: `
                        <p>Hi John,</p>
                        <p>Your Twitter verification code is: 849327</p>
                        <p>Enter this code to complete your login. This code will expire in 20 minutes.</p>
                        <p>If you didn't request this code, you can safely ignore this email or <a href="#" class="email-link" data-url="https://help.twitter.com/security">learn more</a> about keeping your account secure.</p>
                        <p>Thanks,<br>The Twitter Team</p>
                    `,
                    footer: "This email was sent by Twitter, Inc. 1355 Market Street, Suite 900, San Francisco, CA 94103",
                    isPhishing: false,
                    difficulty: 4
                },
                {
                    subject: "Twitter: Login Verification Code",
                    from: "info@twltter.com",
                    body: `
                        <p>Hi John,</p>
                        <p>Your Twitter verification code is: 736491</p>
                        <p>Enter this code to complete your login. This code will expire in 20 minutes.</p>
                        <p>If you didn't request this code, you can safely ignore this email or <a href="#" class="email-link" data-url="http://twltter-help.com/security">learn more</a> about keeping your account secure.</p>
                        <p>Thanks,<br>The Twitter Team</p>
                    `,
                    footer: "This email was sent by Twitter, Inc. 1355 Market Street, Suite 900, San Francisco, CA 94103",
                    isPhishing: true,
                    difficulty: 4
                },
                {
                    subject: "Instagram: New Login to Your Account",
                    from: "security@mail.instagram.com",
                    body: `
                        <p>Hi Jane,</p>
                        <p>We noticed a new login to your Instagram account from Chrome on Windows.</p>
                        <p>If this was you, you can disregard this message. If this wasn't you, we recommend you <a href="#" class="email-link" data-url="https://www.instagram.com/accounts/password/change/">change your password</a> immediately.</p>
                        <p>The Instagram Team</p>
                    `,
                    footer: "Instagram, 1 Hacker Way, Menlo Park, CA 94025",
                    isPhishing: false,
                    difficulty: 4
                },
                {
                    subject: "Instagram: New Login to Your Account",
                    from: "security@instagram.help.com",
                    body: `
                        <p>Hi Jane,</p>
                        <p>We noticed a new login to your Instagram account from Chrome on Windows.</p>
                        <p>If this was you, you can disregard this message. If this wasn't you, we recommend you <a href="#" class="email-link" data-url="http://instagram.help-secure.com/password">change your password</a> immediately.</p>
                        <p>The Instagram Team</p>
                    `,
                    footer: "Instagram, 1 Hacker Way, Menlo Park, CA 94025",
                    isPhishing: true,
                    difficulty: 4
                },
                {
                    subject: "eBay: Your item has sold!",
                    from: "ebay@ebay.com",
                    body: `
                        <p>Congratulations! Your item has sold.</p>
                        <p>Your PlayStation 5 has sold for $450.00.</p>
                        <p>Please ship the item within 3 business days to complete the sale.</p>
                        <p>View sale details and print a shipping label: <a href="#" class="email-link" data-url="https://k2b-bulk.ebay.com/ws/eBayISAPI.dll?PrintShippingLabel">Print Shipping Label</a></p>
                        <p>Thank you for selling on eBay!</p>
                    `,
                    footer: "eBay Inc, 2025 Hamilton Avenue, San Jose, CA 95125",
                    isPhishing: false,
                    difficulty: 4
                },
                {
                    subject: "eBay: Your item has sold!",
                    from: "ebay@ebay-secure.com",
                    body: `
                        <p>Congratulations! Your item has sold.</p>
                        <p>Your iPhone 14 Pro has sold for $750.00.</p>
                        <p>Please confirm your payment details to receive your funds.</p>
                        <p>View sale details and confirm payment: <a href="#" class="email-link" data-url="http://ebay-secure-payment.com/confirm">Confirm Payment Details</a></p>
                        <p>Thank you for selling on eBay!</p>
                    `,
                    footer: "eBay Inc, 2025 Hamilton Avenue, San Jose, CA 95125",
                    isPhishing: true,
                    difficulty: 4
                }
            ];
            
            // Start game when button is clicked
            startBtn.addEventListener('click', function() {
                startScreen.style.display = 'none';
                gameScreen.style.display = 'block';
                initGame();
            });
            
            // Initialize game
            function initGame() {
                score = 0;
                level = 1;
                lives = 3;
                timeLeft = 60;
                gameActive = true;
                usedEmailIndices = [];
                
                scoreElement.textContent = score;
                levelElement.textContent = level;
                livesElement.textContent = lives;
                timeElement.textContent = timeLeft;
                progressElement.style.width = '0%';
                
                gameOverScreen.style.display = 'none';
                resultElement.textContent = '';
                
                loadRandomEmail();
                startTimer();
            }
            
            // Load a random email
            function loadRandomEmail() {
                // Filter emails by current level and exclude used ones
                const availableEmails = emails.filter((email, index) => 
                    email.difficulty <= level && !usedEmailIndices.includes(index)
                );
                
                // If no emails available for current level, use any unused email
                if (availableEmails.length === 0) {
                    const allUnused = emails.filter((email, index) => 
                        !usedEmailIndices.includes(index)
                    );
                    
                    if (allUnused.length === 0) {
                        // All emails used, reset used list
                        usedEmailIndices = [];
                        loadRandomEmail();
                        return;
                    }
                    
                    const randomIndex = Math.floor(Math.random() * allUnused.length);
                    currentEmail = allUnused[randomIndex];
                    
                    // Find the original index
                    const originalIndex = emails.findIndex(email => email === currentEmail);
                    usedEmailIndices.push(originalIndex);
                } else {
                    const randomIndex = Math.floor(Math.random() * availableEmails.length);
                    currentEmail = availableEmails[randomIndex];
                    
                    // Find the original index
                    const originalIndex = emails.findIndex(email => email === currentEmail);
                    usedEmailIndices.push(originalIndex);
                }
                
                emailSubject.textContent = currentEmail.subject;
                emailFrom.textContent = `From: ${currentEmail.from}`;
                emailBody.innerHTML = currentEmail.body;
                emailFooter.textContent = currentEmail.footer;
                
                // Add link preview functionality
                const links = emailBody.querySelectorAll('.email-link');
                links.forEach(link => {
                    link.addEventListener('mouseover', showLinkPreview);
                    link.addEventListener('mouseout', hideLinkPreview);
                });
                
                // Show scanning animation
                scanLine.style.display = 'block';
                setTimeout(() => {
                    scanLine.style.display = 'none';
                }, 3000);
            }
            
            // Show link preview
            function showLinkPreview(e) {
                const url = e.target.getAttribute('data-url');
                const preview = document.createElement('div');
                preview.className = 'link-preview';
                preview.textContent = `Link destination: ${url}`;
                preview.style.left = `${e.pageX + 10}px`;
                preview.style.top = `${e.pageY + 10}px`;
                preview.id = 'link-preview';
                document.body.appendChild(preview);
            }
            
            // Hide link preview
            function hideLinkPreview() {
                const preview = document.getElementById('link-preview');
                if (preview) {
                    preview.remove();
                }
            }
            
            // Start the game timer
            function startTimer() {
                clearInterval(timer);
                timer = setInterval(() => {
                    if (gameActive) {
                        timeLeft--;
                        timeElement.textContent = timeLeft;
                        progressElement.style.width = `${(60 - timeLeft) / 60 * 100}%`;
                        
                        if (timeLeft <= 0) {
                            endGame();
                        }
                    }
                }, 1000);
            }
            
            // Handle user choice
            function handleChoice(userChoice) {
                if (!gameActive) return;
                
                const isPhishing = currentEmail.isPhishing;
                let isCorrect = false;
                
                if ((userChoice === 'phish' && isPhishing) || 
                    (userChoice === 'legit' && !isPhishing)) {
                    // Correct choice
                    isCorrect = true;
                    score += 10 * level;
                    scoreElement.textContent = score;
                    resultElement.textContent = 'CORRECT - PHISHING ATTACK IDENTIFIED';
                    resultElement.className = 'result correct';
                    
                    // Level up every 50 points
                    if (score >= level * 50) {
                        level++;
                        levelElement.textContent = level;
                        resultElement.textContent = 'LEVEL UP! INCREASING DIFFICULTY';
                        timeLeft += 10; // Bonus time
                    }
                } else {
                    // Incorrect choice
                    lives--;
                    livesElement.textContent = lives;
                    resultElement.textContent = isPhishing ? 
                        'INCORRECT - THAT WAS A PHISHING EMAIL' : 
                        'INCORRECT - THAT EMAIL WAS LEGITIMATE';
                    resultElement.className = 'result incorrect';
                    
                    if (lives <= 0) {
                        endGame();
                        return;
                    }
                }
                
                // Flash the result
                resultElement.classList.add('flashing');
                setTimeout(() => {
                    resultElement.classList.remove('flashing');
                }, 1000);
                
                // Load next email after a delay
                setTimeout(() => {
                    if (gameActive) {
                        loadRandomEmail();
                        resultElement.textContent = '';
                    }
                }, 2000);
            }
            
            // End the game
            function endGame() {
                gameActive = false;
                clearInterval(timer);
                
                finalScoreElement.textContent = score;
                
                // Determine hacker rank
                let rank = "SCRIPT KIDDIE";
                if (score >= 200) rank = "ELITE HACKER";
                else if (score >= 150) rank = "SECURITY ANALYST";
                else if (score >= 100) rank = "PENTESTER";
                else if (score >= 50) rank = "CYBER APPRENTICE";
                
                hackerRankElement.textContent = `RANK: ${rank}`;
                gameOverScreen.style.display = 'block';
            }
            
            // Event listeners
            legitBtn.addEventListener('click', () => handleChoice('legit'));
            phishBtn.addEventListener('click', () => handleChoice('phish'));
            restartBtn.addEventListener('click', function() {
                gameOverScreen.style.display = 'none';
                initGame();
            });
        });