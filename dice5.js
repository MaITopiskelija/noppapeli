
        let scores = [0, 0, 0, 0]; 
        let roundScore = 0;
        let activePlayer = 0;
        let playerNames = ["Pelaaja 1", "Pelaaja 2", "Pelaaja 3", "Pelaaja 4"];
        let doubleCount = 0;
        let playerCount = 2; // Alustetaan pelaajamääräksi 2
        const winningScore = 100;

        function updatePlayerFields() {
            playerCount = parseInt(document.getElementById("playerCount").value);
            
            // Piilotetaan ja näytetään kentät pelaajamäärän mukaan
            for (let i = 1; i <= 4; i++) {
                const playerInput = document.getElementById(`player${i}Name`);
                if (i <= playerCount) {
                    playerInput.style.display = "block";
                } else {
                    playerInput.style.display = "none";
                }
            }
        }

        function startGame() {
            playerNames = [];
            for (let i = 1; i <= playerCount; i++) {
                const playerName = document.getElementById(`player${i}Name`).value || `Pelaaja ${i}`;
                playerNames.push(playerName);
            }

            // Päivitetään pelaajien nimet ja pisteet pelissä
            updateScoreList();

            document.getElementById('playerName').textContent = playerNames[activePlayer];
            document.getElementById('nameInput').style.display = 'none';
            document.getElementById('game').style.display = 'block';
            document.getElementById('player').textContent = `Pelaaja: ${playerNames[activePlayer]}`;
        }

        function updateScoreList() {
            const scoreList = document.getElementById('scoreList');
            scoreList.innerHTML = ""; // Tyhjennetään lista

            for (let i = 0; i < playerCount; i++) {
                const listItem = document.createElement('li');
                listItem.textContent = `${playerNames[i]}: ${scores[i]} pistettä`;
                scoreList.appendChild(listItem);
            }
        }

        function rollDice() {
            let dice1 = Math.floor(Math.random() * 6) + 1;
            let dice2 = Math.floor(Math.random() * 6) + 1;
            
            let dice1Element = document.getElementById('dice1');
            let dice2Element = document.getElementById('dice2');

            dice1Element.classList.add('rolling');
            dice2Element.classList.add('rolling');
            
            document.getElementById('diceSound').play();
            
            setTimeout(() => {
                dice1Element.src = `img/dice${dice1}.png`;
                dice2Element.src = `img/dice${dice2}.png`;
                
                dice1Element.classList.remove('rolling');
                dice2Element.classList.remove('rolling');

                if (dice1 === 1 && dice2 === 1) {
                    roundScore = 25;
                    hold();
                } else if (dice1 === dice2) {
                    doubleCount++;
                    if (doubleCount === 3) {
                        roundScore = 0;
                        switchPlayer();
                    } else {
                        roundScore += (dice1 + dice2) * 2;
                    }
                } else if (dice1 === 1 || dice2 === 1) {
                    roundScore = 0;
                    switchPlayer();
                } else {
                    roundScore += dice1 + dice2;
                }
                document.getElementById('roundScore').textContent = roundScore;
            }, 500);
        }

        function hold() {
            scores[activePlayer] += roundScore;
            updateScoreList(); // Päivitetään pistelista

            if (scores[activePlayer] >= winningScore) {
                document.getElementById('message').textContent = `${playerNames[activePlayer]} voitti pelin!`;
                document.getElementById('restartButton').style.display = 'block';
                return;
            }

            roundScore = 0;
            doubleCount = 0;
            switchPlayer(); // Pelaaja vaihdetaan
        }

        function switchPlayer() {
            roundScore = 0;
            doubleCount = 0;
            activePlayer = (activePlayer + 1) % playerCount;
            document.getElementById('roundScore').textContent = roundScore;
            document.getElementById('player').textContent = `${playerNames[activePlayer]}`; // Päivitetään pelaajan nimi
            document.getElementById('playerName').textContent = playerNames[activePlayer];
        }

        function restartGame() {
            scores = [0, 0, 0, 0];
            roundScore = 0;
            activePlayer = 0;
            doubleCount = 0;
            updateScoreList();
            document.getElementById('roundScore').textContent = "0";
            document.getElementById('player').textContent = `Pelaaja: ${playerNames[activePlayer]}`;
            document.getElementById('playerName').textContent = playerNames[activePlayer];
            document.getElementById('message').textContent = "";
            document.getElementById('restartButton').style.display = 'none';

            // Palautetaan alkuperäiset syöttökentät näkyviin
            document.getElementById('nameInput').style.display = 'block';
            document.getElementById('game').style.display = 'none';
        }
