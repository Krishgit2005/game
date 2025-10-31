import { useState, useEffect } from 'react';
import { Button } from './ui/button';
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Score {
  username: string;
  points: number;
  date?: string;  // Changed from createdAt to date to match backend
}

export function LeaderBoard() {
  const [scores, setScores] = useState<Score[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [timeframe, setTimeframe] = useState<'all' | 'today' | 'week'>('all');

  useEffect(() => {
    fetchScores();
  }, [timeframe]);

  const fetchScores = async () => {
    try {
      setIsLoading(true);
      setError(null);
      const response = await fetch(`http://localhost:4000/api/scores?timeframe=${timeframe}`);
      if (!response.ok) throw new Error('Failed to fetch scores');
      const data = await response.json();
      setScores(data);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to load leaderboard');
      console.error('Leaderboard fetch error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return '';
    const date = new Date(dateString);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString('en-US', { hour12: false });
  };

  return (
    <div className="rounded-lg border bg-card p-4 w-full max-w-3xl mx-auto">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-2xl font-bold text-primary">Leaderboard</h2>
        <div className="flex gap-2">
          <Button 
            variant={timeframe === 'all' ? 'default' : 'outline'}
            onClick={() => setTimeframe('all')}
          >
            All Time
          </Button>
          <Button 
            variant={timeframe === 'today' ? 'default' : 'outline'}
            onClick={() => setTimeframe('today')}
          >
            Today
          </Button>
          <Button 
            variant={timeframe === 'week' ? 'default' : 'outline'}
            onClick={() => setTimeframe('week')}
          >
            This Week
          </Button>
        </div>
      </div>

      {isLoading ? (
        <div className="flex justify-center items-center py-8">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin" />
        </div>
      ) : error ? (
        <div className="text-red-500 text-center py-4">{error}</div>
      ) : (
        <Table>
          <TableCaption>Top player scores in PolyDash</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[100px]">Rank</TableHead>
              <TableHead>Player</TableHead>
              <TableHead className="text-right">Score</TableHead>
              <TableHead className="text-right">Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {scores.map((score, index) => (
              <TableRow key={index} className={index === 0 ? "bg-primary/10" : ""}>
                <TableCell className="font-medium">
                  {index + 1}{index === 0 ? " 👑" : ""}
                </TableCell>
                <TableCell>{score.username}</TableCell>
                <TableCell className="text-right font-mono">{score.points}</TableCell>
                <TableCell className="text-right text-muted-foreground">
                  {formatDate(score.date)}
                </TableCell>
              </TableRow>
            ))}
            {scores.length === 0 && (
              <TableRow>
                <TableCell colSpan={4} className="text-center text-muted-foreground py-8">
                  No scores yet. Be the first to play!
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </div>
  );
}