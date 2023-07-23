import './TeamDetail.scss';

import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import {
  addClick,
  getLeaderBoard,
  GetLeaderBoardResponseDto,
  getTeamDetail,
  GetTeamDetailResponseDto,
} from '../../api/team/team.api';
import LeaderBoardTable from '../../components/LeaderBoardTable/LeaderBoardTable';

function TeamDetail() {
  const [leaderBoard, setLeaderBoard] = useState<GetLeaderBoardResponseDto>([]);
  const [teamDetail, setTeamDetail] = useState<GetTeamDetailResponseDto | null>(null);
  const [refresh, setRefresh] = useState<boolean>(false);

  const { teamName } = useParams<{ teamName: string }>();

  useEffect(() => {
    getLeaderBoard()
      .then((data) => {
        setLeaderBoard(data);
      })
      .catch((error) => {
        console.error(error);
        // TODO show error message
      });
  }, [refresh]);

  useEffect(() => {
    // we use this component only as a Route component, so we can safely assume that teamName is not undefined
    getTeamDetail(teamName!)
      .then((data) => {
        setTeamDetail(data);
      })
      .catch((error) => {
        console.error(error);
        // TODO show error message
      });
  }, [teamName, refresh]);

  const handleClick = () => {
    // we render button only when teamDetail is not null, so we can safely assume that teamDetail is not null
    addClick(teamDetail!.id)
      .then(() => {
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.error(error);
        // TODO show error message
      });
  };

  return (
    <div>
      <p id="clicking-for-team">
        Clicking for team <b>{teamName}</b>
      </p>
      <p id="link-text">
        Too lazy to click? Let your pals click for you:{' '}
        <span>{window.location.href}</span>
      </p>
      {teamDetail && (
        <div className="content-wrapper team-detail-wrapper">
          <button className="click-button" onClick={handleClick}>
            CLICK!
          </button>
          <div className="counters-wrapper">
            <div>
              <span>Your clicks:</span>
              <span>{teamDetail.usersClickCount}</span>
            </div>
            <div>
              <span>Team clicks:</span>
              <span>{teamDetail.totalClicks}</span>
            </div>
          </div>
          <LeaderBoardTable leaderBoard={leaderBoard} highlightTeamName={teamName} />
          <p className="motivation-text">Want to be top? STFU and click!</p>
        </div>
      )}
    </div>
  );
}

export default TeamDetail;
