import React, { useState, useEffect } from 'react';
import '@/app/output.css';

// 7pm MST = 9pm EST = 2am UTC next day
// Day 1 unlocks Dec 2 at 7pm MST (Dec 3 at 2am UTC)
// Day 12 unlocks Dec 13 at 7pm MST (Dec 14 at 2am UTC)
const YEAR = 2025;
const DAYS = 12;
const UNLOCK_HOUR_UTC = 2; // 2am UTC = 7pm MST = 9pm EST

function getUnlockTime(day: number): Date {
  // Day 1 unlocks on Dec 2, Day 2 on Dec 3, etc.
  // At 2am UTC (which is 7pm MST the previous calendar day)
  return new Date(Date.UTC(YEAR, 11, day + 1, UNLOCK_HOUR_UTC, 0, 0));
}

function isDayUnlocked(day: number, now: Date): boolean {
  return now >= getUnlockTime(day);
}

function getNextUnlockDay(now: Date): number | null {
  for (let day = 1; day <= DAYS; day++) {
    if (!isDayUnlocked(day, now)) {
      return day;
    }
  }
  return null; // All days unlocked
}

function formatTimeRemaining(ms: number): string {
  if (ms <= 0) return '00:00:00';

  const seconds = Math.floor((ms / 1000) % 60);
  const minutes = Math.floor((ms / (1000 * 60)) % 60);
  const hours = Math.floor((ms / (1000 * 60 * 60)) % 24);
  const days = Math.floor(ms / (1000 * 60 * 60 * 24));

  if (days > 0) {
    return `${days}d ${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

const AOCTimer = () => {
  const [now, setNow] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => {
      setNow(new Date());
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const nextUnlockDay = getNextUnlockDay(now);
  const nextUnlockTime = nextUnlockDay ? getUnlockTime(nextUnlockDay) : null;
  const timeRemaining = nextUnlockTime ? nextUnlockTime.getTime() - now.getTime() : 0;

  const nextDate = nextUnlockTime ? nextUnlockTime.toLocaleString('en-US', { day: 'numeric', month: 'short', year: 'numeric' }) : "";
  const nextMST = nextUnlockTime ? nextUnlockTime.toLocaleString('en-US', { hour: 'numeric', timeZone: 'MST', timeZoneName: 'short' }) : "";
  const nextEST = nextUnlockTime ? nextUnlockTime.toLocaleString('en-US', { hour: 'numeric', timeZone: 'EST', timeZoneName: 'short' }) : "";

  return (
    <div className="min-h-screen bg-[#0f0f23] text-[#cccccc] font-mono">
      <div className="max-w-2xl mx-auto px-4 py-8">
        <header className="text-center mb-8">
          <h1 className="text-4xl font-bold text-[#00cc00] mb-2">
            🎄 Advent of Code 2025 🎄
          </h1>
          <p className="text-[#009900]">Family Edition - Days 1-12</p>
        </header>

        {/* Countdown Timer */}
        <div className="text-center mb-8 p-6 border border-[#333340] rounded-lg bg-[#10101a]">
          {nextUnlockDay ? (
            <>
              <p className="text-lg text-[#009900] mb-2">Next puzzle unlocks in:</p>
              <p className="text-5xl font-bold text-[#ffff66]">
                {formatTimeRemaining(timeRemaining)}
              </p>
              <p className="text-sm text-[#666666] mt-2">
                Day {nextUnlockDay} • {nextDate} at {nextMST} / {nextEST}
              </p>
            </>
          ) : (
            <>
              <p className="text-2xl text-[#ffff66]">🎉 All puzzles unlocked! 🎉</p>
              <p className="text-sm text-[#666666] mt-2">Good luck!</p>
            </>
          )}
        </div>

        {/* Day Links */}
        <div className="grid grid-cols-3 sm:grid-cols-4 gap-4">
          {Array.from({ length: DAYS }, (_, i) => i + 1).map((day) => {
            const unlocked = isDayUnlocked(day, now);
            const href = `https://adventofcode.com/${YEAR}/day/${day}`;

            return unlocked ? (
              <a
                key={day}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center p-4 border border-[#333340] rounded-lg bg-[#10101a] hover:bg-[#1a1a2e] hover:border-[#00cc00] transition-colors"
              >
                <span className="text-2xl text-[#00cc00]">Day {day}</span>
              </a>
            ) : (
              <div
                key={day}
                className="flex items-center justify-center p-4 border border-[#333340] rounded-lg bg-[#0a0a14] opacity-50 cursor-not-allowed"
              >
                <span className="text-2xl text-[#666666]">Day {day}</span>
              </div>
            );
          })}
        </div>

        <footer className="text-center mt-8 text-[#666666] text-sm">
          <p>Puzzles unlock daily at {nextMST} / {nextEST}</p>
          <p className="mt-2">
            <a
              href="https://adventofcode.com"
              target="_blank"
              rel="noopener noreferrer"
              className="text-[#009900] hover:text-[#00cc00]"
            >
              adventofcode.com
            </a>
            <span>  &#x2014;  </span>
            <a
              href="https://adventofcode.com/2025/leaderboard/private/view/987074"
              target="-blank"
              rel="noopener noreferrer"
              className="text-[#000099] hover:text-[#0000cc]"
            >
              Leaderboard
            </a>
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AOCTimer;
