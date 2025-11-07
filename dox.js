        document.addEventListener('DOMContentLoaded', function() {
            // Game elements
            const startScreen = document.getElementById('start-screen');
            const gameScreen = document.getElementById('game-screen');
            const gameOverScreen = document.getElementById('game-over');
            const startBtn = document.getElementById('start-btn');
            const restartBtn = document.getElementById('restart-btn');
            const scoreElement = document.getElementById('score');
            const questionsCompletedElement = document.getElementById('questions-completed');
            const timeElement = document.getElementById('time');
            const progressElement = document.getElementById('progress');
            const finalScoreElement = document.getElementById('final-score');
            const hackerRankElement = document.getElementById('hacker-rank');
            const scanLine = document.getElementById('scan-line');
            const targetNumberElement = document.getElementById('target-number');
            const targetsCompletedElement = document.getElementById('targets-completed');
            const targetNameElement = document.getElementById('target-name');
            const sourcesContainer = document.getElementById('sources-container');
            const questionsContainer = document.getElementById('questions-container');
            
            // Game state
            let score = 0;
            let questionsCompleted = 0;
            let targetsCompleted = 0;
            let timeLeft = 300; // 5 minutes
            let gameActive = false;
            let timer;
            let currentTargetIndex = 0;
            let usedTargets = [];
            
            // Targets database - 6 different targets
            const targets = [
                {
                    id: 1,
                    name: "Jason Smith",
                    sources: {
                        facebook: [
                            {
                                avatar: "JS",
                                username: "Jason Smith",
                                timestamp: "March 12, 2023",
                                content: "Can't believe it's been 5 years since I started at TechCorp! Time flies when you're solving interesting problems. Shoutout to my manager Mark for being an amazing mentor since day one!"
                            },
                            {
                                avatar: "JS",
                                username: "Jason Smith",
                                timestamp: "February 14, 2023",
                                content: "Happy Valentine's Day to my amazing wife Sarah! 7 years together and every one has been better than the last. Our first date at Mario's Pizza will always be special. Here's to many more years!"
                            },
                            {
                                avatar: "JS",
                                username: "Jason Smith",
                                timestamp: "January 3, 2023",
                                content: "Back from our annual ski trip to Aspen! Max (our golden retriever) wasn't happy about being left with the sitter, but he'll get over it. Already planning next year's trip - maybe Colorado again?"
                            },
                            {
                                avatar: "JS",
                                username: "Jason Smith",
                                timestamp: "December 25, 2022",
                                content: "Merry Christmas everyone! Celebrating with Sarah, our daughter Emma (3), and our son Noah (1). So grateful for family this holiday season."
                            }
                        ],
                        twitter: [
                            {
                                avatar: "JS",
                                username: "@jason_codes",
                                timestamp: "April 5, 2023",
                                content: "Just adopted the cutest golden retriever puppy! Named him Max after my childhood dog. #NewPuppy #GoldenRetriever"
                            },
                            {
                                avatar: "JS",
                                username: "@jason_codes",
                                timestamp: "March 28, 2023",
                                content: "Working on a new Python automation script for work. Nothing like a fresh pot of coffee and some good code. #Python #Automation #DeveloperLife"
                            },
                            {
                                avatar: "JS",
                                username: "@jason_codes",
                                timestamp: "February 20, 2023",
                                content: "Celebrating 5 years at TechCorp today! Started as a junior dev and now leading the automation team. Grateful for the journey and excited for what's next! #WorkAnniversary #TechCorp"
                            },
                            {
                                avatar: "JS",
                                username: "@jason_codes",
                                timestamp: "August 15, 2022",
                                content: "Happy birthday to me! 32 years young. Celebrating with family at our favorite Italian restaurant."
                            }
                        ],
                        instagram: [
                            {
                                avatar: "JS",
                                username: "jason_smith_photos",
                                timestamp: "April 10, 2023",
                                content: "Max's first birthday! Can't believe our little guy is already 1 year old. He definitely enjoyed his special dog-friendly cake. #GoldenRetriever #DogBirthday #MaxTurns1"
                            },
                            {
                                avatar: "JS",
                                username: "jason_smith_photos",
                                timestamp: "March 22, 2023",
                                content: "Throwback to our wedding day 5 years ago. Best decision I ever made saying yes to this amazing woman. #Anniversary #Throwback #MyWife"
                            },
                            {
                                avatar: "JS",
                                username: "jason_smith_photos",
                                timestamp: "January 15, 2023",
                                content: "Beautiful day for hiking in the Blue Ridge Mountains. The views never get old. #Hiking #BlueRidgeMountains #Nature"
                            }
                        ],
                        linkedin: [
                            {
                                avatar: "JS",
                                username: "Jason Smith",
                                timestamp: "Current",
                                content: "Senior Automation Engineer at TechCorp - Leading a team of 5 engineers developing automation solutions for enterprise clients. Skills: Python, JavaScript, SQL, DevOps, Team Leadership. Education: BS Computer Science, University of Washington (Graduated 2016)"
                            },
                            {
                                avatar: "JS",
                                username: "Jason Smith",
                                timestamp: "March 15, 2023",
                                content: "Excited to share that I'll be speaking at the DevOps Conference next month about our team's work on CI/CD pipeline optimization! #DevOps #Automation #TechCorp"
                            }
                        ],
                        forum: [
                            {
                                avatar: "JS",
                                username: "CodeWizard42",
                                timestamp: "April 2, 2023",
                                content: "Anyone have experience with Selenium for web automation? Running into issues with dynamic content loading. Specifically trying to automate a dashboard that uses React components. The elements keep changing IDs."
                            },
                            {
                                avatar: "JS",
                                username: "CodeWizard42",
                                timestamp: "February 8, 2023",
                                content: "Just finished building a home NAS using an old PC and TrueNAS. Total cost under $200 and works like a charm! Now I can finally backup all our family photos properly. Next project: home automation with Home Assistant."
                            },
                            {
                                avatar: "JS",
                                username: "CodeWizard42",
                                timestamp: "December 20, 2022",
                                content: "My golden retriever Max chewed through my Ethernet cable again. Third time this month! Anyone have pet-proof cable management solutions that actually work?"
                            },
                            {
                                avatar: "JS",
                                username: "CodeWizard42",
                                timestamp: "July 10, 2022",
                                content: "Looking for recommendations for a good high school reunion venue in Seattle. Lincoln High class of 2012 - can't believe it's been 10 years!"
                            }
                        ]
                    },
                    questions: [
                        "What is Jason's pet's name and breed?",
                        "How many children does Jason have and what are their names?",
                        "What high school did Jason attend?",
                        "What is Jason's birthday month?",
                        "What is Jason's wife's name?"
                    ],
                    answers: [
                        "max golden retriever",
                        "2 emma noah",
                        "lincoln high",
                        "august",
                        "sarah"
                    ]
                },
                {
                    id: 2,
                    name: "Maya Rodriguez",
                    sources: {
                        facebook: [
                            {
                                avatar: "MR",
                                username: "Maya Rodriguez",
                                timestamp: "May 15, 2023",
                                content: "Just moved into my new apartment in Brooklyn! So excited to finally have a place with a balcony for my plants. Luna (my cat) seems to love watching the birds from up here."
                            },
                            {
                                avatar: "MR",
                                username: "Maya Rodriguez",
                                timestamp: "April 22, 2023",
                                content: "Happy Earth Day! Spent the afternoon volunteering with the NYC Parks Department. Nothing like getting your hands dirty for a good cause. #EarthDay #Volunteering"
                            },
                            {
                                avatar: "MR",
                                username: "Maya Rodriguez",
                                timestamp: "March 8, 2023",
                                content: "Celebrating 2 years at GreenTech Solutions today! So grateful to work with such an amazing team making sustainable technology more accessible. #WorkAnniversary #GreenTech"
                            },
                            {
                                avatar: "MR",
                                username: "Maya Rodriguez",
                                timestamp: "November 5, 2022",
                                content: "Happy 30th birthday to me! Celebrating with close friends at that new rooftop bar in Manhattan. So grateful for another year of growth and adventures."
                            }
                        ],
                        twitter: [
                            {
                                avatar: "MR",
                                username: "@eco_maya",
                                timestamp: "June 5, 2023",
                                content: "Just finished my morning yoga session. Nothing better than starting the day with some sun salutations! #Yoga #MorningRoutine #Wellness"
                            },
                            {
                                avatar: "MR",
                                username: "@eco_maya",
                                timestamp: "May 28, 2023",
                                content: "My sourdough starter 'Doughbie' is thriving! Nothing beats fresh homemade bread on a Sunday morning. #Sourdough #Baking #Homemade"
                            },
                            {
                                avatar: "MR",
                                username: "@eco_maya",
                                timestamp: "April 10, 2023",
                                content: "Excited to start my urban gardening course at the Brooklyn Botanic Garden next week! Ready to turn my balcony into a mini farm. #UrbanGardening #Sustainability"
                            }
                        ],
                        instagram: [
                            {
                                avatar: "MR",
                                username: "maya_creates",
                                timestamp: "June 12, 2023",
                                content: "Finished my latest watercolor painting of the Brooklyn Bridge at sunset. Really happy with how the colors turned out! #Watercolor #Art #Brooklyn"
                            },
                            {
                                avatar: "MR",
                                username: "maya_creates",
                                timestamp: "May 20, 2023",
                                content: "My cat Luna being her usual majestic self. She definitely knows she's the queen of this apartment. #CatOfInstagram #Luna #SiameseCat"
                            },
                            {
                                avatar: "MR",
                                username: "maya_creates",
                                timestamp: "April 5, 2023",
                                content: "Visited the MET today and spent hours in the European paintings section. So inspiring! #MET #ArtHistory #Museum"
                            },
                            {
                                avatar: "MR",
                                username: "maya_creates",
                                timestamp: "January 15, 2023",
                                content: "Throwback to my high school days at Brooklyn Tech! Can't believe it's been 12 years since graduation. #Throwback #HighSchool"
                            }
                        ],
                        linkedin: [
                            {
                                avatar: "MR",
                                username: "Maya Rodriguez",
                                timestamp: "Current",
                                content: "Sustainability Project Manager at GreenTech Solutions - Managing projects that implement renewable energy solutions for urban environments. Skills: Project Management, Sustainability Consulting, Data Analysis, Public Speaking. Education: MA Environmental Policy, Columbia University (Graduated 2019)"
                            },
                            {
                                avatar: "MR",
                                username: "Maya Rodriguez",
                                timestamp: "May 5, 2023",
                                content: "Thrilled to announce that our team's solar panel initiative has helped 500+ households reduce their carbon footprint! #Sustainability #GreenTech #SolarEnergy"
                            }
                        ],
                        forum: [
                            {
                                avatar: "MR",
                                username: "GreenThumb88",
                                timestamp: "June 8, 2023",
                                content: "Having trouble with aphids on my balcony tomato plants. Tried neem oil but they keep coming back. Any organic solutions that actually work for urban gardening?"
                            },
                            {
                                avatar: "MR",
                                username: "GreenThumb88",
                                timestamp: "April 18, 2023",
                                content: "Just built a DIY composting system for my apartment using two 5-gallon buckets. So far it's working great and reducing my food waste significantly!"
                            },
                            {
                                avatar: "MR",
                                username: "GreenThumb88",
                                timestamp: "March 25, 2023",
                                content: "My Siamese cat Luna keeps knocking over my seedlings! Anyone have cat-proof solutions for indoor gardening?"
                            },
                            {
                                avatar: "MR",
                                username: "GreenThumb88",
                                timestamp: "December 10, 2022",
                                content: "Looking to adopt a second cat to keep Luna company. Any recommendations for rescue organizations in Brooklyn that specialize in Siamese cats?"
                            }
                        ]
                    },
                    questions: [
                        "What is Maya's pet's name and breed?",
                        "What is Maya's birthday month?",
                        "What high school did Maya attend?",
                        "How many pets does Maya have?",
                        "What neighborhood does Maya live in?"
                    ],
                    answers: [
                        "luna siamese cat",
                        "november",
                        "brooklyn tech",
                        "1",
                        "brooklyn"
                    ]
                },
                {
                    id: 3,
                    name: "Alex Chen",
                    sources: {
                        facebook: [
                            {
                                avatar: "AC",
                                username: "Alex Chen",
                                timestamp: "July 10, 2023",
                                content: "Just got back from an amazing hiking trip in Yosemite! The Half Dome cables were challenging but absolutely worth it for the view. Already planning my next adventure to Zion National Park."
                            },
                            {
                                avatar: "AC",
                                username: "Alex Chen",
                                timestamp: "June 18, 2023",
                                content: "Happy Father's Day to the best dad! Thanks for teaching me how to fix everything around the house and for all the camping trips growing up. Miss you every day."
                            },
                            {
                                avatar: "AC",
                                username: "Alex Chen",
                                timestamp: "May 25, 2023",
                                content: "Celebrating my 30th birthday today! Feeling grateful for amazing friends and family. Special shoutout to my sister Lisa for organizing the surprise party!"
                            },
                            {
                                avatar: "AC",
                                username: "Alex Chen",
                                timestamp: "March 15, 2023",
                                content: "Adopted two rescue dogs today! Meet Rocky (German Shepherd mix) and Bella (Labrador mix). They're already best friends and settling in nicely."
                            }
                        ],
                        twitter: [
                            {
                                avatar: "AC",
                                username: "@alex_wanders",
                                timestamp: "August 5, 2023",
                                content: "Just finished reading 'The Three-Body Problem' - mind completely blown! Any recommendations for similar hard sci-fi books? #SciFi #Books #Reading"
                            },
                            {
                                avatar: "AC",
                                username: "@alex_wanders",
                                timestamp: "July 22, 2023",
                                content: "Learning to play 'Blackbird' on guitar. Those fingerpicking patterns are tricky but so satisfying when you get them right! #Guitar #Music #Learning"
                            },
                            {
                                avatar: "AC",
                                username: "@alex_wanders",
                                timestamp: "June 30, 2023",
                                content: "One year at DataFlow Analytics today! So grateful to work with such brilliant people solving interesting data problems. #WorkAnniversary #DataScience"
                            }
                        ],
                        instagram: [
                            {
                                avatar: "AC",
                                username: "alex.adventures",
                                timestamp: "August 12, 2023",
                                content: "Sunrise from Angels Landing in Zion National Park. Worth every step of that terrifying hike! #ZionNationalPark #Hiking #Sunrise"
                            },
                            {
                                avatar: "AC",
                                username: "alex.adventures",
                                timestamp: "July 28, 2023",
                                content: "My trusty hiking companion - the 2015 Subaru Outback that's been with me through countless adventures. Just hit 150,000 miles! #Subaru #Outback #AdventureMobile"
                            },
                            {
                                avatar: "AC",
                                username: "alex.adventures",
                                timestamp: "June 15, 2023",
                                content: "Friday night board games with friends. Nothing beats Catan with good company and craft beer! #BoardGames #Catan #Friends"
                            },
                            {
                                avatar: "AC",
                                username: "alex.adventures",
                                timestamp: "April 2, 2023",
                                content: "Throwback to my high school graduation from Westview High! 12 years ago but feels like yesterday. #Throwback #HighSchool"
                            }
                        ],
                        linkedin: [
                            {
                                avatar: "AC",
                                username: "Alex Chen",
                                timestamp: "Current",
                                content: "Senior Data Scientist at DataFlow Analytics - Developing machine learning models for predictive analytics in healthcare. Skills: Python, R, Machine Learning, Statistical Analysis, SQL. Education: MS Data Science, Stanford University (Graduated 2018)"
                            },
                            {
                                avatar: "AC",
                                username: "Alex Chen",
                                timestamp: "July 15, 2023",
                                content: "Excited to share that our team's research on early disease detection using ML has been accepted for publication in Nature Medicine! #DataScience #Healthcare #MachineLearning"
                            }
                        ],
                        forum: [
                            {
                                avatar: "AC",
                                username: "DataTrail",
                                timestamp: "August 8, 2023",
                                content: "Working on implementing a Random Forest classifier for medical data. Anyone have experience with handling class imbalance in healthcare datasets? SMOTE vs. ADASYN?"
                            },
                            {
                                avatar: "AC",
                                username: "DataTrail",
                                timestamp: "July 5, 2023",
                                content: "Just upgraded my home server with 64GB RAM and 10TB storage. Ready for some serious data processing and media streaming! #HomeLab #Tech"
                            },
                            {
                                avatar: "AC",
                                username: "DataTrail",
                                timestamp: "June 12, 2023",
                                content: "My 2015 Subaru Outback needs new struts at 150k miles. Anyone have experience with aftermarket vs OEM parts for Subarus? Looking for the best balance of cost and quality."
                            },
                            {
                                avatar: "AC",
                                username: "DataTrail",
                                timestamp: "March 20, 2023",
                                content: "Looking for recommendations for a good dog trainer in the Bay Area. Just adopted two rescue dogs and want to make sure they get proper training from the start."
                            }
                        ]
                    },
                    questions: [
                        "What is Alex's favorite outdoor activity?",
                        "How many pets does Alex have and what are their names?",
                        "What high school did Alex attend?",
                        "What is Alex's birthday month?",
                        "What is Alex's sister's name?"
                    ],
                    answers: [
                        "hiking",
                        "2 rocky bella",
                        "westview high",
                        "may",
                        "lisa"
                    ]
                },
                {
                    id: 4,
                    name: "Sarah Johnson",
                    sources: {
                        facebook: [
                            {
                                avatar: "SJ",
                                username: "Sarah Johnson",
                                timestamp: "September 8, 2023",
                                content: "First day of school for my twins, Olivia and Ethan! Can't believe they're starting 2nd grade already. Time flies when you're having fun (and changing diapers)."
                            },
                            {
                                avatar: "SJ",
                                username: "Sarah Johnson",
                                timestamp: "August 12, 2023",
                                content: "Celebrating 10 years of marriage with my amazing husband David! We're spending the weekend at that cozy bed and breakfast in Napa where we had our honeymoon."
                            },
                            {
                                avatar: "SJ",
                                username: "Sarah Johnson",
                                timestamp: "July 4, 2023",
                                content: "Happy 4th of July! Having a backyard BBQ with family and friends. The kids are loving the sparklers (under close supervision of course)."
                            },
                            {
                                avatar: "SJ",
                                username: "Sarah Johnson",
                                timestamp: "May 30, 2023",
                                content: "My golden retriever Charlie turned 5 today! We're celebrating with a special dog-friendly cake and lots of belly rubs."
                            }
                        ],
                        twitter: [
                            {
                                avatar: "SJ",
                                username: "@sarah_writes",
                                timestamp: "October 5, 2023",
                                content: "Just submitted my latest children's book manuscript to the publisher! This one's about a magical garden and the importance of friendship. #Writing #ChildrensBooks"
                            },
                            {
                                avatar: "SJ",
                                username: "@sarah_writes",
                                timestamp: "September 18, 2023",
                                content: "My cat Whiskers has decided my keyboard is the perfect napping spot. Guess that means writing time is over for today! #Cat #WriterLife"
                            },
                            {
                                avatar: "SJ",
                                username: "@sarah_writes",
                                timestamp: "August 22, 2023",
                                content: "Working on a new picture book series about a family of squirrels. Researching squirrel behavior has been surprisingly fascinating! #WritingResearch"
                            }
                        ],
                        instagram: [
                            {
                                avatar: "SJ",
                                username: "sarah_j_photos",
                                timestamp: "October 12, 2023",
                                content: "Fall colors are starting to appear in our neighborhood. Morning walks with Charlie are even more beautiful this time of year. #Fall #GoldenRetriever #MorningWalk"
                            },
                            {
                                avatar: "SJ",
                                username: "sarah_j_photos",
                                timestamp: "September 25, 2023",
                                content: "My little garden is thriving! Tomatoes, cucumbers, and herbs are all doing well. There's something so satisfying about growing your own food. #Gardening #HomeGarden"
                            },
                            {
                                avatar: "SJ",
                                username: "sarah_j_photos",
                                timestamp: "August 30, 2023",
                                content: "Throwback to my high school graduation from Oakwood High! 15 years ago but the memories are still fresh. #Throwback #HighSchool"
                            },
                            {
                                avatar: "SJ",
                                username: "sarah_j_photos",
                                timestamp: "June 10, 2023",
                                content: "Happy birthday to me! 35 feels pretty good actually. Celebrating with family and my two favorite kids in the world."
                            }
                        ],
                        linkedin: [
                            {
                                avatar: "SJ",
                                username: "Sarah Johnson",
                                timestamp: "Current",
                                content: "Children's Book Author - Writing and illustrating engaging stories for young readers. Previously: Elementary School Teacher (8 years). Education: BA Education, University of Michigan (Graduated 2010)"
                            },
                            {
                                avatar: "SJ",
                                username: "Sarah Johnson",
                                timestamp: "September 1, 2023",
                                content: "Excited to announce that my book 'The Magical Garden' has been selected for the Children's Choice Book Awards! So grateful for all the young readers who voted. #ChildrensBooks #AuthorLife"
                            }
                        ],
                        forum: [
                            {
                                avatar: "SJ",
                                username: "StoryWeaver",
                                timestamp: "October 8, 2023",
                                content: "Looking for recommendations for a good digital drawing tablet. My old Wacom is finally giving out after 5 years of faithful service. Budget around $500."
                            },
                            {
                                avatar: "SJ",
                                username: "StoryWeaver",
                                timestamp: "August 15, 2023",
                                content: "My golden retriever Charlie keeps digging up my vegetable garden! Anyone have solutions for dog-proof gardening that actually work?"
                            },
                            {
                                avatar: "SJ",
                                username: "StoryWeaver",
                                timestamp: "July 20, 2023",
                                content: "My cat Whiskers has been extra cuddly since we got back from vacation. I think she missed us! #CatsOfTheInternet"
                            },
                            {
                                avatar: "SJ",
                                username: "StoryWeaver",
                                timestamp: "May 5, 2023",
                                content: "Working on a new children's book about a family with twins. As a mom of twins myself, I have plenty of material to work with!"
                            }
                        ]
                    },
                    questions: [
                        "How many children does Sarah have and what are their names?",
                        "How many pets does Sarah have and what are their names?",
                        "What high school did Sarah attend?",
                        "What is Sarah's birthday month?",
                        "What is Sarah's husband's name?"
                    ],
                    answers: [
                        "2 olivia ethan",
                        "2 charlie whiskers",
                        "oakwood high",
                        "june",
                        "david"
                    ]
                },
                {
                    id: 5,
                    name: "Marcus Williams",
                    sources: {
                        facebook: [
                            {
                                avatar: "MW",
                                username: "Marcus Williams",
                                timestamp: "November 12, 2023",
                                content: "Just adopted the sweetest rescue dog from the shelter! Meet Buddy, a 2-year-old Beagle mix. He's already making himself at home on the couch."
                            },
                            {
                                avatar: "MW",
                                username: "Marcus Williams",
                                timestamp: "October 25, 2023",
                                content: "Happy 3rd birthday to my daughter Chloe! We're having a unicorn-themed party in the backyard. Can't believe my little girl is growing up so fast."
                            },
                            {
                                avatar: "MW",
                                username: "Marcus Williams",
                                timestamp: "September 8, 2023",
                                content: "Celebrating 5 years with my amazing wife Jessica today! Dinner at our favorite Italian restaurant where we had our first date."
                            },
                            {
                                avatar: "MW",
                                username: "Marcus Williams",
                                timestamp: "July 4, 2023",
                                content: "Happy Independence Day! Grilling with family and friends. My cat Shadow is hiding from the fireworks as usual."
                            }
                        ],
                        twitter: [
                            {
                                avatar: "MW",
                                username: "@marcus_builds",
                                timestamp: "December 5, 2023",
                                content: "Just finished building a custom gaming PC for my brother. Ryzen 7, RTX 4070 - this thing is a beast! #PCBuild #Gaming"
                            },
                            {
                                avatar: "MW",
                                username: "@marcus_builds",
                                timestamp: "November 18, 2023",
                                content: "Working on automating my home lighting with Home Assistant. Nothing like being able to control your entire house from your phone! #SmartHome #Automation"
                            },
                            {
                                avatar: "MW",
                                username: "@marcus_builds",
                                timestamp: "October 30, 2023",
                                content: "My daughter Chloe helped me build a birdhouse today. She's a natural with a hammer (with close supervision of course)! #DIY #FatherDaughter"
                            }
                        ],
                        instagram: [
                            {
                                avatar: "MW",
                                username: "marcus_makes",
                                timestamp: "December 10, 2023",
                                content: "Finished my latest woodworking project - a custom bookshelf for Chloe's room. She helped pick out the color (purple, of course). #Woodworking #DIY"
                            },
                            {
                                avatar: "MW",
                                username: "marcus_makes",
                                timestamp: "November 22, 2023",
                                content: "My cat Shadow in her favorite spot - right in the middle of my workbench. I guess woodworking is cancelled for today! #Cat #Woodworking"
                            },
                            {
                                avatar: "MW",
                                username: "marcus_makes",
                                timestamp: "October 15, 2023",
                                content: "Throwback to my high school days at Central High! 15 years since graduation but the memories are still fresh. #Throwback #HighSchool"
                            },
                            {
                                avatar: "MW",
                                username: "marcus_makes",
                                timestamp: "August 20, 2023",
                                content: "Celebrating my 35th birthday with family! Feeling grateful for another year of health and happiness."
                            }
                        ],
                        linkedin: [
                            {
                                avatar: "MW",
                                username: "Marcus Williams",
                                timestamp: "Current",
                                content: "IT Project Manager at InnovateTech - Leading technology implementation projects for enterprise clients. Skills: Project Management, Agile Methodology, Cloud Computing, Team Leadership. Education: BS Information Technology, Georgia Tech (Graduated 2012)"
                            },
                            {
                                avatar: "MW",
                                username: "Marcus Williams",
                                timestamp: "November 1, 2023",
                                content: "Excited to share that our team successfully completed the company-wide migration to cloud infrastructure ahead of schedule! #ProjectManagement #CloudComputing"
                            }
                        ],
                        forum: [
                            {
                                avatar: "MW",
                                username: "TechBuilder",
                                timestamp: "December 8, 2023",
                                content: "Looking for recommendations for a good home security camera system. Need something that works well with Home Assistant and has good night vision."
                            },
                            {
                                avatar: "MW",
                                username: "TechBuilder",
                                timestamp: "November 5, 2023",
                                content: "My beagle Buddy keeps chewing through Ethernet cables! Third time this month. Anyone have pet-proof cable management solutions?"
                            },
                            {
                                avatar: "MW",
                                username: "TechBuilder",
                                timestamp: "October 12, 2023",
                                content: "Building a custom playhouse for my daughter Chloe. Any recommendations for child-safe outdoor wood sealants?"
                            },
                            {
                                avatar: "MW",
                                username: "TechBuilder",
                                timestamp: "August 25, 2023",
                                content: "My cat Shadow has been extra affectionate since we adopted Buddy. I think she's actually happy to have a dog brother!"
                            }
                        ]
                    },
                    questions: [
                        "How many children does Marcus have and what is her name?",
                        "How many pets does Marcus have and what are their names?",
                        "What high school did Marcus attend?",
                        "What is Marcus's birthday month?",
                        "What is Marcus's wife's name?"
                    ],
                    answers: [
                        "1 chloe",
                        "2 buddy shadow",
                        "central high",
                        "august",
                        "jessica"
                    ]
                },
                {
                    id: 6,
                    name: "Emily Parker",
                    sources: {
                        facebook: [
                            {
                                avatar: "EP",
                                username: "Emily Parker",
                                timestamp: "January 15, 2024",
                                content: "Happy New Year everyone! Starting 2024 with a new fitness goal - training for my first half marathon. Wish me luck!"
                            },
                            {
                                avatar: "EP",
                                username: "Emily Parker",
                                timestamp: "December 24, 2023",
                                content: "Merry Christmas! Celebrating with family and my two furry babies, Coco (cat) and Bailey (dog). So grateful for these moments."
                            },
                            {
                                avatar: "EP",
                                username: "Emily Parker",
                                timestamp: "November 28, 2023",
                                content: "So proud of my husband Michael for finishing his PhD! 5 years of hard work finally paid off. Celebrating with a fancy dinner tonight."
                            },
                            {
                                avatar: "EP",
                                username: "Emily Parker",
                                timestamp: "October 10, 2023",
                                content: "My golden retriever Bailey turned 3 today! We're celebrating with a trip to the dog park and a special peanut butter cake."
                            }
                        ],
                        twitter: [
                            {
                                avatar: "EP",
                                username: "@emily_runs",
                                timestamp: "February 5, 2024",
                                content: "Just completed my longest run yet - 8 miles! Training for the half marathon is going better than expected. #Running #Fitness #HalfMarathonTraining"
                            },
                            {
                                avatar: "EP",
                                username: "@emily_runs",
                                timestamp: "January 22, 2024",
                                content: "My cat Coco has decided that my yoga mat is her new favorite napping spot. I guess morning yoga will have to wait! #Cat #Yoga"
                            },
                            {
                                avatar: "EP",
                                username: "@emily_runs",
                                timestamp: "December 15, 2023",
                                content: "Just hit my 100th day of Duolingo Spanish! Puedo hablar un poco de español ahora. #Duolingo #LanguageLearning"
                            }
                        ],
                        instagram: [
                            {
                                avatar: "EP",
                                username: "emily_active",
                                timestamp: "February 12, 2024",
                                content: "Beautiful sunrise during my morning run. There's something magical about watching the city wake up. #Running #Sunrise #Fitness"
                            },
                            {
                                avatar: "EP",
                                username: "emily_active",
                                timestamp: "January 30, 2024",
                                content: "My golden retriever Bailey joined me for my cool-down walk after my run. He's the best running buddy! #GoldenRetriever #RunningBuddy"
                            },
                            {
                                avatar: "EP",
                                username: "emily_active",
                                timestamp: "December 20, 2023",
                                content: "Throwback to my high school graduation from Northside High! 10 years ago but feels like yesterday. #Throwback #HighSchool"
                            },
                            {
                                avatar: "EP",
                                username: "emily_active",
                                timestamp: "September 5, 2023",
                                content: "Celebrating my 28th birthday with a hike in the mountains. Nothing like fresh air and beautiful views to mark another year around the sun."
                            }
                        ],
                        linkedin: [
                            {
                                avatar: "EP",
                                username: "Emily Parker",
                                timestamp: "Current",
                                content: "Marketing Manager at BrightFuture Tech - Leading digital marketing campaigns and brand strategy. Skills: Digital Marketing, SEO, Content Strategy, Analytics. Education: BA Marketing, University of Texas (Graduated 2018)"
                            },
                            {
                                avatar: "EP",
                                username: "Emily Parker",
                                timestamp: "January 8, 2024",
                                content: "Excited to share that our Q4 marketing campaign resulted in a 35% increase in qualified leads! #Marketing #DigitalMarketing #Results"
                            }
                        ],
                        forum: [
                            {
                                avatar: "EP",
                                username: "ActiveLife",
                                timestamp: "February 10, 2024",
                                content: "Training for my first half marathon. Any recommendations for good running shoes for someone with flat feet? Currently looking at Brooks and Asics."
                            },
                            {
                                avatar: "EP",
                                username: "ActiveLife",
                                timestamp: "January 5, 2024",
                                content: "My cat Coco keeps attacking my feet when I try to do yoga! Anyone else have this problem with their pets during workout time?"
                            },
                            {
                                avatar: "EP",
                                username: "ActiveLife",
                                timestamp: "December 1, 2023",
                                content: "Looking for recommendations for a good dog-friendly hiking trail within 2 hours of the city. My golden retriever Bailey loves exploring new places!"
                            },
                            {
                                avatar: "EP",
                                username: "ActiveLife",
                                timestamp: "October 25, 2023",
                                content: "My cat Coco and dog Bailey are finally starting to get along! They even shared the couch peacefully today. #Pets #Progress"
                            }
                        ]
                    },
                    questions: [
                        "How many pets does Emily have and what are their names?",
                        "What high school did Emily attend?",
                        "What is Emily's birthday month?",
                        "What is Emily's husband's name?",
                        "What fitness goal is Emily currently working toward?"
                    ],
                    answers: [
                        "2 coco bailey",
                        "northside high",
                        "september",
                        "michael",
                        "half marathon"
                    ]
                }
            ];

            // Tab functionality
            const sourceTabs = document.querySelectorAll('.source-tab');
            
            sourceTabs.forEach(tab => {
                tab.addEventListener('click', () => {
                    const tabId = tab.getAttribute('data-tab');
                    
                    // Update active tab
                    sourceTabs.forEach(t => t.classList.remove('active'));
                    tab.classList.add('active');
                    
                    // Show corresponding content
                    document.querySelectorAll('.source-content').forEach(content => {
                        content.classList.remove('active');
                        if (content.id === `${tabId}-content`) {
                            content.classList.add('active');
                        }
                    });
                });
            });

            // Scoring values
            const questionPoints = 20;
            
            // Start game when button is clicked
            startBtn.addEventListener('click', function() {
                startScreen.style.display = 'none';
                gameScreen.style.display = 'block';
                initGame();
            });
            
            // Initialize game
            function initGame() {
                score = 0;
                questionsCompleted = 0;
                targetsCompleted = 0;
                timeLeft = 300;
                gameActive = true;
                usedTargets = [];
                currentTargetIndex = 0;
                
                scoreElement.textContent = score;
                questionsCompletedElement.textContent = `${questionsCompleted}/5`;
                targetsCompletedElement.textContent = `${targetsCompleted}/3`;
                timeElement.textContent = timeLeft;
                progressElement.style.width = '0%';
                
                gameOverScreen.style.display = 'none';
                
                // Load first target
                loadRandomTarget();
                startTimer();
                showScanAnimation();
            }
            
            // Load a random target
            function loadRandomTarget() {
                // Filter out used targets
                const availableTargets = targets.filter(target => !usedTargets.includes(target.id));
                
                if (availableTargets.length === 0) {
                    // All targets used, end game
                    endGame();
                    return;
                }
                
                // Select random target
                const randomIndex = Math.floor(Math.random() * availableTargets.length);
                const target = availableTargets[randomIndex];
                usedTargets.push(target.id);
                currentTargetIndex = usedTargets.length;
                
                // Update UI
                targetNameElement.textContent = target.name;
                targetNumberElement.textContent = `${currentTargetIndex}/3`;
                
                // Load sources
                loadSources(target.sources);
                
                // Load questions
                loadQuestions(target.questions, target.answers);
            }
            
            // Load sources for current target
            function loadSources(sources) {
                sourcesContainer.innerHTML = '';
                
                Object.keys(sources).forEach(platform => {
                    const sourceContent = document.createElement('div');
                    sourceContent.className = `source-content ${platform === 'facebook' ? 'active' : ''}`;
                    sourceContent.id = `${platform}-content`;
                    
                    sources[platform].forEach(post => {
                        const postElement = document.createElement('div');
                        postElement.className = 'social-post';
                        postElement.innerHTML = `
                            <div class="post-header">
                                <div class="avatar">${post.avatar}</div>
                                <div class="post-info">
                                    <div class="username">${post.username}</div>
                                    <div class="timestamp">${post.timestamp}</div>
                                </div>
                            </div>
                            <div class="post-content">
                                <p>${post.content}</p>
                            </div>
                        `;
                        sourceContent.appendChild(postElement);
                    });
                    
                    sourcesContainer.appendChild(sourceContent);
                });
                
                // Reset tabs to show Facebook first
                sourceTabs.forEach(tab => tab.classList.remove('active'));
                document.querySelector('.source-tab[data-tab="facebook"]').classList.add('active');
            }
            
            // Load questions for current target
            function loadQuestions(questions, answers) {
                questionsContainer.innerHTML = '';
                
                questions.forEach((question, index) => {
                    const questionElement = document.createElement('div');
                    questionElement.className = 'question';
                    questionElement.id = `q${index + 1}`;
                    questionElement.innerHTML = `
                        <div class="question-text">${index + 1}. ${question}</div>
                        <input type="text" class="answer-input" placeholder="Enter your answer...">
                        <button class="submit-btn" data-question="${index + 1}" data-answer="${answers[index]}">SUBMIT ANSWER</button>
                        <div class="result" id="result${index + 1}"></div>
                    `;
                    questionsContainer.appendChild(questionElement);
                });
                
                // Reattach event listeners for the new buttons
                attachAnswerHandlers();
            }
            
            // Attach event handlers to answer buttons
            function attachAnswerHandlers() {
                document.querySelectorAll('.submit-btn').forEach(button => {
                    button.addEventListener('click', function() {
                        if (!gameActive) return;
                        
                        const questionNum = this.getAttribute('data-question');
                        const correctAnswer = this.getAttribute('data-answer');
                        const input = this.parentElement.querySelector('.answer-input');
                        const result = document.getElementById(`result${questionNum}`);
                        const userAnswer = input.value.trim().toLowerCase();
                        
                        if (userAnswer === '') {
                            result.textContent = 'Please enter an answer';
                            result.className = 'result incorrect';
                            return;
                        }
                        
                        if (userAnswer === correctAnswer) {
                            // Correct answer
                            score += questionPoints;
                            questionsCompleted++;
                            scoreElement.textContent = score;
                            questionsCompletedElement.textContent = `${questionsCompleted}/5`;
                            result.textContent = 'CORRECT - Information verified';
                            result.className = 'result correct';
                            
                            // Disable this question
                            input.disabled = true;
                            this.disabled = true;
                            
                            // Check if all questions are completed for current target
                            if (questionsCompleted === 5) {
                                targetsCompleted++;
                                targetsCompletedElement.textContent = `${targetsCompleted}/3`;
                                
                                // Check if player has completed enough targets to win
                                if (targetsCompleted >= 3) {
                                    endGame();
                                } else if (usedTargets.length < targets.length) {
                                    // Load next target after a delay
                                    setTimeout(() => {
                                        loadRandomTarget();
                                        questionsCompleted = 0;
                                        questionsCompletedElement.textContent = `${questionsCompleted}/5`;
                                    }, 1500);
                                } else {
                                    // All targets completed but player hasn't reached 3 targets
                                    endGame();
                                }
                            }
                        } else {
                            // Incorrect answer
                            result.textContent = 'INCORRECT - Keep investigating';
                            result.className = 'result incorrect';
                        }
                    });
                });
                
                // Allow pressing Enter to submit answers
                document.querySelectorAll('.answer-input').forEach(input => {
                    input.addEventListener('keypress', function(e) {
                        if (e.key === 'Enter') {
                            const questionNum = this.parentElement.querySelector('.submit-btn').getAttribute('data-question');
                            document.querySelector(`.submit-btn[data-question="${questionNum}"]`).click();
                        }
                    });
                });
            }
            
            // Show scanning animation
            function showScanAnimation() {
                scanLine.style.display = 'block';
                setTimeout(() => {
                    scanLine.style.display = 'none';
                }, 3000);
            }
            
            // Start the game timer
            function startTimer() {
                clearInterval(timer);
                timer = setInterval(() => {
                    if (gameActive) {
                        timeLeft--;
                        timeElement.textContent = timeLeft;
                        progressElement.style.width = `${(300 - timeLeft) / 300 * 100}%`;
                        
                        if (timeLeft <= 0) {
                            endGame();
                        }
                    }
                }, 1000);
            }
            
            // End the game
            function endGame() {
                gameActive = false;
                clearInterval(timer);
                
                finalScoreElement.textContent = score;
                
                // Determine investigator rank
                let rank = "NOVICE INVESTIGATOR";
                if (score >= 250) rank = "ELITE OSINT ANALYST";
                else if (score >= 180) rank = "PROFESSIONAL INVESTIGATOR";
                else if (score >= 120) rank = "SKILLED RESEARCHER";
                
                hackerRankElement.textContent = `RANK: ${rank}`;
                gameScreen.style.display = 'none';
                gameOverScreen.style.display = 'block';
            }
            
            // Restart game
            restartBtn.addEventListener('click', function() {
                gameOverScreen.style.display = 'none';
                initGame();
                gameScreen.style.display = 'block';
            });
        });
