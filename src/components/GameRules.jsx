import PropTypes from 'prop-types';
import './styles/scoreBoard.css';
import './styles/gameRules.css';
export default function GameRules({
  displayGameRules,
  setDisplayGameRules,
  characters,
}) {
  if (!displayGameRules) return <></>;

  return (
    <div className="game-rules-modal">
      <div className="game-rules-modal-content">
        <h2>Welcome to the Character Finding Game!</h2>
        <p>
          In this game, your task is to find three characters hidden within the
          image:
        </p>
        <ul className="characters-list">
          {characters?.length > 0 &&
            characters.map((character) => (
              <li key={character._id} className="character">
                <span>
                  <img src={character.image} className="character-icon" />
                </span>
                {character.name.replace('_', ' ')}
              </li>
            ))}
        </ul>
        <p>
          You can click or tap on the image to mark the location where you think
          each character is hiding. Once you&apos;ve found all three characters,
          your score will be calculated based on the time it took you to
          complete the game.
        </p>
        <button onClick={() => setDisplayGameRules(false)}>Start Game</button>
      </div>
    </div>
  );
}

GameRules.propTypes = {
  displayGameRules: PropTypes.bool,
  setDisplayGameRules: PropTypes.func,
  characters: PropTypes.array,
};
