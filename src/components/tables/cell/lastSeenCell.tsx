import { Cell } from '@tanstack/react-table';
import { DynamicTableData } from '../DynamicPlotTable';
import { useEffect, useState } from 'react';

export const LastSeenCell = ({ lastSeen }: { lastSeen: Date }) => {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);
  const getTimeSinceString = (time: Date) => {
    const diff = Math.floor((currentTime.getTime() - time.getTime()) / 1000);
    if (diff < 60) {
      return `${diff} seconds ago`;
    }
    if (diff < 3600) {
      return `${Math.floor(diff / 60)} minutes ago`;
    }
    if (diff < 86400) {
      return `${Math.floor(diff / 3600)} hours ago`;
    }
    return `${Math.floor(diff / 86400)} days ago`;
  };
  return (
    <div>
      <div>{getTimeSinceString(lastSeen)}</div>
    </div>
  );
};
