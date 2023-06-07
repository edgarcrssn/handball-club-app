import { ReactNode, useEffect, useState } from 'react';
import { DashboardSkeleton } from '../components/DashboardSkeleton/DashboardSkeleton';
import { Card } from 'antd';
import styles from './Home.module.scss';

enum Role {
  ADMIN = 'admin',
  CONTRIBUTOR = 'contributor',
  COACH = 'COACH',
  PLAYER = 'PLAYER',
  MEMBER = 'MEMBER',
}

interface Player {
  firstName: string;
  lastName: string;
  email: string;
  role: Role;
}

interface Match {
  id: number;
  opponent: string;
  teamScore: number;
  opponentScore: number;
  date: string;
  players: Player[];
}

const gridStyle: React.CSSProperties = {
  width: '25%',
  textAlign: 'center',
};

export const Home = () => {
  const [matches, setMatches] = useState<Match[]>([]);

  useEffect(() => {
    fetch('http://localhost:3002/matches', {
      method: 'GET',
    })
      .then((response) => response.json())
      .then((data: { matches: Match[] }) => {
        setMatches(data.matches);
      });
  }, []);

  const getResult = (teamScore: number, opponentScore: number): ReactNode => {
    if (teamScore > opponentScore)
      return <span style={{ color: 'green' }}>Victory!</span>;
    else if (opponentScore > teamScore)
      return <span style={{ color: 'red' }}>Defeat...</span>;
    return <span style={{ color: 'blue' }}>Draw</span>;
  };

  return (
    <DashboardSkeleton>
      <Card title="Matches">
        {matches.map((match) => (
          <Card.Grid key={match.id} style={gridStyle}>
            <Card title={`vs ${match.opponent}`} actions={[]}>
              <article className={styles.content}>
                {match.teamScore} - {match.opponentScore}
                {getResult(match.teamScore, match.opponentScore)}
              </article>
            </Card>
          </Card.Grid>
        ))}
      </Card>
    </DashboardSkeleton>
  );
};
