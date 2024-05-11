import logo from "./logo.svg";
import "./App.css";
import Button from "@mui/material/Button";
import { Grid } from "@mui/material";
import { useEffect, useState } from "react";
import axios from "axios";
import TextField from "@mui/material/TextField";
import { AddCard } from "@mui/icons-material";

function App() {
  const [players, setPlayers] = useState({});
  const [gameCode, setGameCode] = useState("");
  const [input, setInput] = useState("");

  async function joinGame() {
    try {
      const response = await axios.get(
        "http://www.hyeumine.com/getcard.php?bcode=" + input
      );
      const data = response.data;
      console.log(data["card"]);
      if (data === 0) {
        alert("Invalid Code");
      } else {
        const newLength = Object.keys(players).length + 1;
        const cards = [data["card"]];
        setGameCode(input);
        setPlayers({ [newLength]: cards });
      }
    } catch (error) {
      console.error(error);
    }
  }

  async function addCard(player) {
    try {
      const response = await axios.get(
        "http://www.hyeumine.com/getcard.php?bcode=" + gameCode
      );
      const data = response.data;
      if (data === 0) {
        alert("Invalid Code");
      } else {
        console.log(player);
        console.log(players[player]);
        const newCards = [...players[player], data["card"]];
        const updatedPlayers = { ...players, [player]: newCards };
        setPlayers(updatedPlayers);
      }
    } catch (error) {
      console.error(error);
    }
  }

  const handleJoinGame = () => {
    joinGame();
  };

  const handleInput = (event) => {
    setInput(event.target.value);
  };

  const handleAddCard = (player) => {
    addCard(player);
  };

  const handleAddPlayer = () => {
    const newLength = Object.keys(players).length + 1;
    setPlayers({ ...players, [newLength]: [] });
  };

  const allPlayers = players ? Object.getOwnPropertyNames(players) : [];
  console.log(players);
  return (
    <Grid container spacing={2}>
      <Grid item xs={2} />
      <Grid item xs={10}>
        <TextField
          id="filled-basic"
          label="Enter Code"
          variant="filled"
          value={input}
          onChange={handleInput}
        />
      </Grid>
      <Grid item xs={2} />
      <Grid item xs={10}>
        <Button variant="contained" onClick={handleJoinGame}>
          Join Game
        </Button>
      </Grid>
      <Grid item xs={2} />
      <Grid item xs={10}>
        <h1>{"Game Code: " + gameCode}</h1>
      </Grid>
      {allPlayers.map((player, index) => {
        const currentPlayer = index + 1;
        return (
          <>
            <Grid item xs={2} />
            <Grid item xs={10}>
              <h1>{"Player " + (index + 1)}</h1>
            </Grid>
            {players[player].map((card, index2) => {
              const allKeys = Object.getOwnPropertyNames(card);
              return (
                <Grid container spacing={2}>
                  <Grid item xs={2} />
                  <Grid item xs={10}>
                    <h2>{"Card " + (index2 + 1)}</h2>
                  </Grid>
                  <Grid item xs={2} />
                  <Grid item xs={10}>
                    <Bingo key={allKeys[0]} number={allKeys[0]} />
                    {card["B"].map((num) => (
                      <Bingo key={num} number={num} />
                    ))}
                  </Grid>
                  <Grid item xs={2} />
                  <Grid item xs={10}>
                    <Bingo key={allKeys[1]} number={allKeys[1]} />
                    {card["I"].map((num) => (
                      <Bingo key={num} number={num} />
                    ))}
                  </Grid>
                  <Grid item xs={2} />
                  <Grid item xs={10}>
                    <Bingo key={allKeys[2]} number={allKeys[2]} />
                    {card["N"].map((num) => (
                      <Bingo key={num} number={num} />
                    ))}
                  </Grid>
                  <Grid item xs={2} />
                  <Grid item xs={10}>
                    <Bingo key={allKeys[3]} number={allKeys[3]} />
                    {card["G"].map((num) => (
                      <Bingo key={num} number={num} />
                    ))}
                  </Grid>
                  <Grid item xs={2} />
                  <Grid item xs={10}>
                    <Bingo key={allKeys[4]} number={allKeys[4]} />
                    {card["O"].map((num) => (
                      <Bingo key={num} number={num} />
                    ))}
                  </Grid>
                  <Grid item xs={12} />
                </Grid>
              );
            })}
            <Grid item xs={12} />
            <Grid item xs={2} />
            <Grid item xs={10}>
              <Button
                variant="contained"
                onClick={() => handleAddCard(currentPlayer)}
              >
                AddCard
              </Button>
            </Grid>
          </>
        );
      })}
      <Grid item xs={2} />
      <Grid item xs={10}>
        <Button variant="contained" onClick={handleAddPlayer}>
          New Player
        </Button>
      </Grid>
    </Grid>
  );
}

function Bingo({ number }) {
  const [color, setColor] = useState(() => {
    if (isNaN(number)) {
      return "#008080";
    } else {
      return "#808080";
    }
  });

  return (
    <Button
      variant="contained"
      className="bingo-numbers"
      sx={{ marginRight: 1, backgroundColor: color }}
    >
      {number}
    </Button>
  );
}

export default App;
