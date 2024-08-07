import { useEffect, useState } from 'react';
import './styles/scoreBoard.css';
import axios from 'axios';

export default function ScoreBoard() {
  const [scores, setScores] = useState([]);
  const [playerScore, setPlayerScore] = useState(null);
  const [formInput, setFormInput] = useState('');
  const [hideForm, setHideForm] = useState(false);
  const [error, setError] = useState(false);
  const gameId = localStorage.getItem('gameId');

  function handleFormSubmit() {
    axios
      .post(
        `https://where-is-character-back-end-production.up.railway.app/scores?gameId=${gameId}`,
        {
          name: formInput,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
          withCredentials: true,
        }
      )
      .then((response) => {
        const updatedScores = response.data.scores;
        setScores(updatedScores);
      })
      .catch((err) => {
        setError(true);
        console.error(err.response);
      });
  }

  useEffect(() => {
    const controller = new AbortController();

    axios
      .get(
        `https://where-is-character-back-end-production.up.railway.app/results?gameId=${gameId}`,
        {
          signal: controller.signal,
          withCredentials: true,
        }
      )
      .then((response) => {
        setScores(response.data.scores);
        setPlayerScore(response.data.playerScore);
        console.log(response.data.scores);
      })
      .catch((error) => {
        console.error(
          'Failed to fetch score results please try again later',
          error
        );
      });
    return () => controller.abort();
  }, [gameId]);

  return (
    <div className="modal">
      <div className="modal-content">
        <h2 className="modal-header">
          Your score was {playerScore} Congratulations!
        </h2>
        <h2 className="modal-header">Top 10 scores: </h2>
        <ul className="list">
          {scores.length > 0 ? (
            scores.map((score, index) => (
              <li className="list-item" key={score._id}>
                <span className="position">{index + 1}.</span>{' '}
                <span>{score.name}:</span> <span>{score.score}</span>
              </li>
            ))
          ) : (
            <p>Scoreboard is empty, be the first one!</p>
          )}
        </ul>
        {error && <p>Something went wrong during submitting the score</p>}
        {hideForm && !error && (
          <p style={{ textAlign: 'center' }}>
            Thank you for playing! That&apos;s it, you can leave now...
          </p>
        )}
        <form
          hidden={hideForm}
          className="form-container"
          onSubmit={(e) => {
            e.preventDefault();
            setHideForm(true);
            handleFormSubmit();
          }}
        >
          <div>
            <label htmlFor="name">Name: </label>
            <input
              type="text"
              id="name"
              placeholder="Charles..."
              value={formInput}
              onChange={(e) => {
                setFormInput(e.target.value);
              }}
              required
              maxLength={10}
            />
          </div>
          <button type="submit">Add your score</button>
        </form>
      </div>
    </div>
  );
}
