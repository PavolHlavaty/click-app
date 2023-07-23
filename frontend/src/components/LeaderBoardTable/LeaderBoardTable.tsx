import './LeaderBoardTable.scss';

import { TeamDto } from '../../api/api';

interface LeaderBoardTableProps {
  leaderBoard: TeamDto[];
  highlightTeamName?: string;
}

function LeaderBoardTable({ leaderBoard, highlightTeamName }: LeaderBoardTableProps) {
  return (
    <table className="leaderboard-table" cellSpacing="0">
      <thead>
        <tr>
          <th></th>
          <th>TEAM</th>
          <th>CLICKS</th>
        </tr>
      </thead>
      <tbody>
        {leaderBoard.map((team, index) => (
          <tr
            key={team.id}
            className={highlightTeamName === team.name ? 'highlight' : ''}
          >
            <td>{index + 1}</td>
            <td>{team.name}</td>
            <td>{team.clicks}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

export default LeaderBoardTable;
