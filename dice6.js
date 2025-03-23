let currentPlayer = 1;
let playerCount = 2;
let players = [];
let scores = [];
let roundScore = 0;

// Päivittää pelaajakentät pelaajamäärän mukaan
    function updatePlayerFields() {
        playerCount = parseInt(document.getElementById('playerCount').value);
        for (let i = 1; i <= 4; i++) {
            const playerInput = document.getElementById(`player${i}Name`);
            playerInput.style.display = i <= playerCount ? 'block' : 'none';
        }
    }

// Aloittaa pelin ja tallentaa pelaajien nimet
    function startGame() {
        players = [];
        scores = Array(playerCount).fill(0);
        for (let i = 1; i <= playerCount; i++) {
            const playerName = document.getElementById(`player${i}Name`).value;
            if (playerName) {
                players.push(playerName);
            } else {
                alert(`Syötä pelaaja ${i}:n nimi!`);
                return;
            }
        }
        document.getElementById('nameInput').style.display = 'none'; // Piilotetaan nimi-input
        document.getElementById('game').style.display = 'block'; // Näytetään pelinäkymä
        updatePlayerInfo();
    }

// Päivittää pelaajien pistemäärät ja nimet allekkain
    function updatePlayerInfo() {
        // Päivitetään "Pelaaja: X" ja nimi
        document.getElementById('player').textContent = currentPlayer;
        document.getElementById('playerName').textContent = players[currentPlayer - 1];

        let scoreboardHTML = '';
        for (let i = 0; i < playerCount; i++) {
            scoreboardHTML += `<p>${players[i]}: ${scores[i]} pistettä</p>`;
        }
        document.getElementById('scoreboard').innerHTML = scoreboardHTML;
    }

// Heittää noppaa
    function rollDice() {
        // Lisätään animaatio nopalle
        document.getElementById('diceImage').classList.add('rolling');
            
        // Asetetaan nopan arvo ja kuva
        const roll = Math.floor(Math.random() * 6) + 1;
        document.getElementById('diceImage').src = `img/dice${roll}.png`;
        document.getElementById('diceSound').play();

        // Poistetaan animaatio, kun heitto on valmis (noin puolen sekunnin kuluttua)
        setTimeout(() => {
            document.getElementById('diceImage').classList.remove('rolling');
        }, 500); // 500ms on sama kuin animaation kesto

        // Jos heitetään ykkönen, vuoro loppuu
        if (roll === 1) {
            roundScore = 0;
            document.getElementById('roundScore').textContent = roundScore;
            nextPlayer(); // Jos pelaaja heittää ykkösen, vuoro loppuu
        } else {
            roundScore += roll;
            document.getElementById('roundScore').textContent = roundScore;
        }
    }

    // Pidä pisteet ja siirry seuraavalle pelaajalle
    function hold() {
        scores[currentPlayer - 1] += roundScore;
        roundScore = 0;
        document.getElementById('roundScore').textContent = roundScore;
        updatePlayerInfo();

         if (scores[currentPlayer - 1] >= 100) {
            alert(`${players[currentPlayer - 1]} voitti. Paina F5 niin uusi peli alkaa.`);
            resetGame();
        } else {
            nextPlayer();
        }
    }

        // Siirtyy seuraavalle pelaajalle
        function nextPlayer() {
            currentPlayer = (currentPlayer % playerCount) + 1;
            updatePlayerInfo();
        }

        // Aloita uusi peli
        function restartGame() {
            // Nollataan kaikki pelin tiedot
            resetGame();
            
            // Piilotetaan pelin näkymä ja palautetaan pelaajien syöttökentät
            document.getElementById('nameInput').style.display = 'block';
            document.getElementById('game').style.display = 'none';

            // Tyhjennetään pelaajien nimet syöttökentistä
            for (let i = 1; i <= 4; i++) {
                document.getElementById(`player${i}Name`).value = '';
            }
            
            // Palautetaan pelaajamäärä oletukseen (2 pelaajaa)
            document.getElementById('playerCount').value = '2';
        }

        // Nollaa pelin tilat
        function resetGame() {
            currentPlayer = 1;
            roundScore = 0;
            scores = Array(playerCount).fill(0);
            updatePlayerInfo();
        }
  