const { useState, useEffect } = React;

function ThemeToggle({ toggleTheme, isDarkMode }) {
    return (
        <button className="theme-toggle" onClick={toggleTheme}>
            {isDarkMode ? '☀️' : '🌙'}
        </button>
    );
}

const SkillGauge = ({ skill, level }) => {
    const maxLevel = 5;
    const filledWidth = (level / maxLevel) * 100;

    return (
        <div className="skill-gauge">
            <div className="skill-name">{skill}</div>
            <div className="gauge-container">
                <div className="gauge-fill" style={{ width: `${filledWidth}%` }}></div>
            </div>
            <div className="level-display">
                {level}/{maxLevel}
            </div>
        </div>
    );
};

const TicTacToe = () => {
    const [board, setBoard] = useState(Array(9).fill(null));
    const [xIsNext, setXIsNext] = useState(true);
    const [gameOver, setGameOver] = useState(false);

    const calculateWinner = (squares) => {
        const lines = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6],
        ];
        for (let i = 0; i < lines.length; i++) {
            const [a, b, c] = lines[i];
            if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
                return squares[a];
            }
        }
        return null;
    };

    const getAvailableMoves = (squares) => {
        return squares.reduce((moves, square, index) => {
            if (!square) moves.push(index);
            return moves;
        }, []);
    };

    const minimax = (squares, depth, isMaximizing) => {
        const winner = calculateWinner(squares);
        if (winner === 'O') return 10 - depth;
        if (winner === 'X') return depth - 10;
        if (getAvailableMoves(squares).length === 0) return 0;

        if (isMaximizing) {
            let bestScore = -Infinity;
            getAvailableMoves(squares).forEach(move => {
                squares[move] = 'O';
                const score = minimax(squares, depth + 1, false);
                squares[move] = null;
                bestScore = Math.max(score, bestScore);
            });
            return bestScore;
        } else {
            let bestScore = Infinity;
            getAvailableMoves(squares).forEach(move => {
                squares[move] = 'X';
                const score = minimax(squares, depth + 1, true);
                squares[move] = null;
                bestScore = Math.min(score, bestScore);
            });
            return bestScore;
        }
    };

    const findBestMove = (squares) => {
        let bestScore = -Infinity;
        let bestMove;
        getAvailableMoves(squares).forEach(move => {
            squares[move] = 'O';
            const score = minimax(squares, 0, false);
            squares[move] = null;
            if (score > bestScore) {
                bestScore = score;
                bestMove = move;
            }
        });
        return bestMove;
    };

    const makeAIMove = () => {
        const newBoard = [...board];
        const bestMove = findBestMove(newBoard);
        newBoard[bestMove] = 'O';
        setBoard(newBoard);
        setXIsNext(true);
    };

    useEffect(() => {
        if (!xIsNext && !gameOver) {
            const timer = setTimeout(() => {
                makeAIMove();
            }, 500);
            return () => clearTimeout(timer);
        }
    }, [xIsNext, gameOver]);

    const handleClick = (i) => {
        if (calculateWinner(board) || board[i] || !xIsNext || gameOver) return;
        const newBoard = board.slice();
        newBoard[i] = 'X';
        setBoard(newBoard);
        setXIsNext(false);
    };

    const renderSquare = (i) => (
        <button className="square" onClick={() => handleClick(i)}>
            {board[i] === 'X' && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                    <line x1="18" y1="6" x2="6" y2="18" />
                    <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
            )}
            {board[i] === 'O' && (
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" fill="none" stroke="currentColor" strokeWidth="2">
                    <circle cx="12" cy="12" r="8" />
                </svg>
            )}
        </button>
    );

    const winner = calculateWinner(board);
    let status;
    if (winner) {
        status = `Winner: ${winner}`;
        if (!gameOver) setGameOver(true);
    } else if (board.every(Boolean)) {
        status = "It's a draw!";
        if (!gameOver) setGameOver(true);
    } else {
        status = `Next player: ${xIsNext ? 'X (You)' : 'O (Carlo_AI)'}`;
    }

    const resetGame = () => {
        setBoard(Array(9).fill(null));
        setXIsNext(true);
        setGameOver(false);
    };

    return (
        <div className="tic-tac-toe">
            <div className="status">{status}</div>
            <div className="board">
                <div className="board-row">
                    {renderSquare(0)}
                    {renderSquare(1)}
                    {renderSquare(2)}
                </div>
                <div className="board-row">
                    {renderSquare(3)}
                    {renderSquare(4)}
                    {renderSquare(5)}
                </div>
                <div className="board-row">
                    {renderSquare(6)}
                    {renderSquare(7)}
                    {renderSquare(8)}
                </div>
            </div>
            <button className="reset-button" onClick={resetGame}>
                Reset Game
            </button>
        </div>
    );
};

function App() {
    const [activeSection, setActiveSection] = useState('about');
    const [isDarkMode, setIsDarkMode] = useState(false);
    const [message, setMessage] = useState('');

    useEffect(() => {
        document.body.className = isDarkMode ? 'dark-mode' : 'light-mode';
    }, [isDarkMode]);

    const toggleTheme = () => {
        setIsDarkMode(!isDarkMode);
    };

    const handleMessageChange = (event) => {
        setMessage(event.target.value);
    };

    const handleSubmit = () => {
        const emailSubject = encodeURIComponent("Message from your Portfolio");
        const emailBody = encodeURIComponent(message);
        window.location.href = `mailto:carloamparo22@gmail.com?subject=${emailSubject}&body=${emailBody}`;
    };

    const skills = [
        { name: "Web Programming", level: 3 },
        { name: "Software Programming", level: 3 },
        { name: "SQL Database", level: 3 },
        { name: "Computer Networking", level: 3 },
        { name: "Hardware Troubleshooting", level: 3 },
        { name: "Microsoft Office Programs", level: 3 }
    ];

    const renderContent = () => {
        switch (activeSection) {
            case 'about':
                return (
                    <div>
                        <h2>About Me</h2>
                        <p>When I'm not busy making the web a prettier place, you can find me sipping artisanal coffee and plotting my next adventure. As a programmer in the GIS Department at the Philippine Statistics Authority, I turn caffeine into code, and I do it with flair. From crafting pixel-perfect designs to ensuring seamless user experiences, my passion for tech knows no bounds. Catch me if you can – I'm always on the move, blending creativity with functionality, one keystroke at a time.</p>

                        <h2>What I'm Doing</h2>
                        <div className="grid-container">
                            <div className="grid-item">
                                <i className="fas fa-globe"></i>
                                <h3>Web Development</h3>
                                <p>Crafting beautiful, responsive websites that not only look great but also provide seamless user experiences. From front-end magic to back-end wizardry, I've got it all covered.</p>
                            </div>
                            <div className="grid-item">
                                <i className="fas fa-laptop-code"></i>
                                <h3>Software Development</h3>
                                <p>Building robust, scalable software solutions that solve real-world problems. Whether it's desktop applications or complex systems, I bring ideas to life with clean, efficient code.</p>
                            </div>
                            <div className="grid-item">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="48" height="48" fill="currentColor">
                                    <path d="M12 2L1 7v10l11 5 11-5V7L12 2zm-1 15H7v-4h4v4zm6 0h-4v-4h4v4zm-6-6H7V7h4v4zm6 0h-4V7h4v4z" />
                                </svg>
                                <h3>Mobile Legends: Bang Bang</h3>
                                <p>When I'm not coding, I'm conquering the Land of Dawn. As a skilled Mobile Legends player, I bring the same strategic thinking and quick decision-making from gaming into my development work.</p>
                            </div>
                        </div>
                    </div>
                );
            case 'resume':
                return (
                    <div>
                        <h2>Resume</h2>

                        <h3>Skills</h3>
                        <div className="skills-container">
                            {skills.map((skill, index) => (
                                <SkillGauge key={index} skill={skill.name} level={skill.level} />
                            ))}
                        </div>

                        <h3>Work Experience</h3>
                        <div className="work-experience-grid">
                            <div className="work-experience-item">
                                <div className="resume-logo">
                                    <img src="assets/psa_logo.jfif" alt="PSA logo" />
                                </div>
                                <div className="work-date">August 02, 2023 - Present</div>
                                <div className="work-position">Geographic Information Systems Specialist</div>
                                <div className="work-company">Philippine Statistics Authority Dipolog</div>
                                <div className="work-contact">(065) 212 4853</div>
                            </div>
                            <div className="work-experience-item">
                                <div className="resume-logo">
                                    <img src="assets/landers_logo.png" alt="Landers logo" />
                                </div>
                                <div className="work-date">July 01, 2022 - July 02, 2023</div>
                                <div className="work-position">IT Support</div>
                                <div className="work-company">Landers Superstore (Las Piñas)</div>
                                <div className="work-contact">recruitment @landers.ph</div>
                            </div>
                            <div className="work-experience-item">
                                <div className="resume-logo">
                                    <img src="assets/spiglobal_logo.jfif" alt="Spi Global logo" />
                                </div>
                                <div className="work-date">July 15, 2019 - March 02, 2022</div>
                                <div className="work-position">Graphics Specialist</div>
                                <div className="work-company">SPI Global</div>
                                <div className="work-contact">(02) 8855 8600</div>
                            </div>
                        </div>

                        <h3>Educational Attainment</h3>
                        <div className="resume-grid">
                            <div className="resume-item">
                                <div className="resume-logo">
                                    <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSMapHLk10bFmvItTS-qUeF3SPFDLHnN6Ti6w&s" alt="STI College logo" />
                                </div>
                                <h3>STI College (2016-2019)</h3>
                                <p>Pursued higher education at STI College, gaining comprehensive knowledge in Information Technology and developing practical skills in software development, network administration, and database management. Engaged in various IT projects and internships, preparing for a successful career in the tech industry.</p>
                            </div>
                            <div className="resume-item">
                                <div className="resume-logo">
                                    <img src="assets/pnhs_logo.jfif" alt="Polanco National High School logo" />
                                </div>
                                <h3>Polanco National High School (2010-2014)</h3>
                                <p>Completed secondary education at Polanco National High School, where a strong foundation in various subjects was built. Participated in extracurricular activities, developing leadership skills and a well-rounded personality. This period was crucial in shaping academic interests and future career aspirations.</p>
                            </div>
                            <div className="resume-item">
                                <div className="resume-logo">
                                    <img src="assets/pcs_logo.jfif" alt="Polanco Central School logo" />
                                </div>
                                <h3>Polanco Central School</h3>
                                <p>Received primary education at Polanco Central School, laying the groundwork for future academic pursuits. Developed essential skills in reading, writing, and arithmetic, while also fostering curiosity and a love for learning. Engaged in various school activities that promoted social skills and personal growth.</p>
                            </div>
                        </div>
                    </div>
                );
            case 'projects':
                return (
                    <div className="projects-section">
                        <h2>Projects</h2>
                        <div className="project-item">
                            <h3>MLBB Team Composition Analyzer Web App</h3>
                            <p>A web application that helps analyze Mobile Legends: Bang Bang team compositions.</p>
                            <a href="https://chocolatemintt1.github.io/mlbb/"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="project-link">View Project</a>
                        </div>
                        <div className="project-item">
                            <h3>Tic Tac Toe Game</h3>
                            <p>A simple yet fun Tic Tac Toe game built with React. Try it out below!</p>
                            <TicTacToe />
                        </div>
                        <div className="project-item">
                            <h3>PSA Video Project</h3>
                            <p>Check out this informative video from the Philippine Statistics Authority:</p>
                            <div className="video-container">
                                <iframe
                                    src="https://www.facebook.com/plugins/video.php?height=314&href=https%3A%2F%2Fwww.facebook.com%2FPSAgovph%2Fvideos%2F424740093877044%2F&show_text=false&width=560&t=0"
                                    width="560"
                                    height="314"
                                    style={{ border: 'none', overflow: 'hidden' }}
                                    scrolling="no"
                                    frameBorder="0"
                                    allowFullScreen={true}
                                    allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                                ></iframe>
                            </div>
                        </div>
                        <p><i>More projects coming soon...</i></p>
                    </div>
                );
            case 'vlog':
                return (
                    <div className="blog-section">
                        <h2>My YouTube Playlists</h2>
                        <div className="video-grid">
                            <div className="video-item">
                                <h3>Honor of Kings Playlist</h3>
                                <div className="video-container">
                                    <iframe
                                        src="https://www.youtube.com/embed/videoseries?si=auJs3jQs-UObduV1&amp;list=PLGNF4KPOsdlC17ZDjctGSdChtN3ZKd_vy"
                                        title="Honor of Kings Playlist"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                            <div className="video-item">
                                <h3>Mobile Legends Playlist</h3>
                                <div className="video-container">
                                    <iframe
                                        src="https://www.youtube.com/embed/videoseries?si=t6c9GgSyNmb3BZZJ&amp;list=PLGNF4KPOsdlBjgipdmbx5hxocbKa_v4j5"
                                        title="Mobile Legends Playlist"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                                        referrerPolicy="strict-origin-when-cross-origin"
                                        allowFullScreen
                                    ></iframe>
                                </div>
                            </div>
                        </div>
                    </div>
                );
            case 'contact':
                return (
                    <div className="contact-section">
                        <h2>Contact Me</h2>
                        <p>Feel free to reach out to me using the following contact information:</p>
                        <ul>
                            <li>Email: carloamparo22@gmail.com</li>
                            <li>Phone: 0942 4077 854</li>
                            <li>Location: Olingan, Dipolog City, Zamboanga Del Norte</li>
                        </ul>
                        <h3>Send me a message</h3>
                        <div className="message-box">
                            <textarea
                                value={message}
                                onChange={handleMessageChange}
                                placeholder="Type your message here..."
                                rows="5"
                            />
                            <button onClick={handleSubmit}>Send Email</button>
                        </div>
                        <h3>My Location</h3>
                        <div className="map-container">
                            <iframe
                                width="100%"
                                height="450"
                                style={{ border: 0 }}
                                loading="lazy"
                                allowFullScreen
                                src="https://www.google.com/maps/embed/v1/place?q=Dipolog+City,+Zamboanga+del+Norte,+Philippines&key=AIzaSyApdnBLqJeVW4c5tlZ32v8BzVBWyJnYlg"
                            ></iframe>
                        </div>
                    </div>
                );
            default:
                return <p>Welcome to my portfolio!</p>;
        }
    };

    return (
        <React.Fragment>
            <div className="sidebar">
                <img src="https://chocolatemintt1.github.io/carloamparo22/pfp_img.jpg" alt="img_carlo" />
                <h1>Carlo Cabale Amparo</h1>
                <h2>Geographic Information Systems Specialist</h2>
                <p><i>Philippine Statistics Authority - Dipolog</i></p>
                <p>Email: carloamparo22@gmail.com</p>
                <p>Phone: 0942 4077 854</p>
                <p>Location: Olingan, Dipolog City. Zamboanga Del Norte</p>
            </div>
            <div className="main-content">
                <nav>
                    <ul>
                        <li><a href="#" onClick={() => setActiveSection('about')}>About</a></li>
                        <li><a href="#" onClick={() => setActiveSection('resume')}>Resume</a></li>
                        <li><a href="#" onClick={() => setActiveSection('projects')}>Projects</a></li>
                        <li><a href="#" onClick={() => setActiveSection('vlog')}>Vlog</a></li>
                        <li><a href="#" onClick={() => setActiveSection('contact')}>Contact</a></li>
                    </ul>
                </nav>
                <div className="content">
                    {renderContent()}
                </div>
                <footer>
                    <a href="https://x.com/chocolatemintt1?mx=2" target="_blank"><i className="fab fa-twitter"></i></a>
                    <a href="https://www.facebook.com/smurf.carloamparo22" target="_blank"><i className="fab fa-facebook"></i></a>
                    <a href="https://www.youtube.com/@konose_1" target="_blank"><i className="fab fa-youtube"></i></a>
                </footer>
            </div>


            <ThemeToggle toggleTheme={toggleTheme} isDarkMode={isDarkMode} />
        </React.Fragment>
    );
}

ReactDOM.render(<App />, document.getElementById('root'));
