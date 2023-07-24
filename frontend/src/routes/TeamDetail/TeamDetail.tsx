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

  const { teamName } = useParams<{ teamName: string }>();

  useEffect(() => {
    fetchLeaderBoard();
  }, []);

  const fetchLeaderBoard = async () => {
    try {
      const data = await getLeaderBoard();
      setLeaderBoard(data);
    } catch (error) {
      console.error(error);
      // TODO show error message
    }
  };

  useEffect(() => {
    fetchTeamDetail();
  }, [teamName]);

  const fetchTeamDetail = async () => {
    try {
      // we use this component only as a Route component, so we can safely assume that teamName is not undefined
      const data = await getTeamDetail(teamName!);
      setTeamDetail(data);
    } catch (error) {
      console.error(error);
      // TODO show error message
    }
  };

  const handleClick = async () => {
    try {
      // we render button only when teamDetail is not null, so we can safely assume that teamDetail is not null
      await addClick(teamDetail!.id);
      // refetch data
      fetchTeamDetail();
      fetchLeaderBoard();
    } catch (error) {
      console.error(error);
      // TODO show error message
    }
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
