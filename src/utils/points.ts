// Daily points depend on the current day of the season.
// Seasons: Winter (Dec-Feb), Spring (Mar-May), Summer (Jun-Aug), Autumn (Sep-Nov)
// Day 1 -> 2 points, Day 2 -> 3 points
// Day 3+ -> 100% of the day-before-previous + 60% of previous day
import { kFormat } from "./format";

function getSeasonStart(date: Date): Date {
  const y = date.getFullYear();
  const m = date.getMonth(); // 0..11
  if (m >= 11 || m <= 1) {
    // Winter
    const year = m === 11 ? y : y - 1; // if Jan/Feb, winter started previous Dec
    return new Date(year, 11, 1);
  }
  if (m >= 2 && m <= 4) return new Date(y, 2, 1); // Spring Mar 1
  if (m >= 5 && m <= 7) return new Date(y, 5, 1); // Summer Jun 1
  return new Date(y, 8, 1); // Autumn Sep 1
}

function getSeasonDay(date: Date): number {
  const start = getSeasonStart(date);
  const diff = date.getTime() - start.getTime();
  return Math.floor(diff / (24 * 60 * 60 * 1000)) + 1;
}

export function calculateTodayPoints(date = new Date()): number {
  const day = getSeasonDay(date);
  if (day <= 0) return 0;
  if (day === 1) return 2;
  if (day === 2) return 3;

  let d1 = 2; 
  let d2 = 3; 
  if (day === 3) return Math.round(d1 + 0.6 * d2);
  for (let i = 3; i <= day; i += 1) {
    const next = Math.round(d1 + 0.6 * d2);
    d1 = d2;
    d2 = next;
  }
  return d2;
}

export function calculateTodayPointsK(date = new Date()): string {
  return kFormat(calculateTodayPoints(date));
}
