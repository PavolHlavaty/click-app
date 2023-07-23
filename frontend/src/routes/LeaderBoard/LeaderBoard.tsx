import './LeaderBoard.scss';

import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import {
  createTeam,
  getLeaderBoard,
  GetLeaderBoardResponseDto,
} from '../../api/team/team.api';
import LeaderBoardTable from '../../components/LeaderBoardTable/LeaderBoardTable';

function LeaderBoard() {
  const [teamName, setTeamName] = useState<string>('');
  const [leaderBoard, setLeaderBoard] = useState<GetLeaderBoardResponseDto>([]);

  const navigate = useNavigate();

  useEffect(() => {
    getLeaderBoard()
      .then((data) => {
        setLeaderBoard(data);
      })
      .catch((error) => {
        console.error(error);
        // TODO show error message
      });
  }, []);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    createTeam(teamName)
      .then((data) => {
        navigate(`/${data.name}`);
      })
      .catch((error) => {
        // If team already exists, navigate to team page (409 = conflict)
        if (error.response.status === 409) {
          navigate(`/${teamName}`);
        }
        console.error(error);
        // TODO show error message
      });
  };

  return (
    <div>
      <div className="quote-wrapper">
        <p>
          &quot;It&apos;s really simple, you just need to click as fast as you can.&quot;
        </p>
        <p className="quote-author">- anonymous</p>
      </div>
      <div className="content-wrapper leader-board-wrapper">
        <form id="team-form" onSubmit={handleSubmit}>
          <div className="input-wrapper">
            <label htmlFor="team-name">Enter your team name:</label>
            <input
              name="team-name"
              value={teamName}
              onChange={(e) => setTeamName(e.target.value)}
            />
          </div>
          <button className="click-button" type="submit">
            CLICK!
          </button>
        </form>
        <h1>TOP 10 Clickers</h1>
        <LeaderBoardTable leaderBoard={leaderBoard} />
        <p className="motivation-text">Want to be top? STFU and click!</p>
      </div>
    </div>
  );
}

export default LeaderBoard;
