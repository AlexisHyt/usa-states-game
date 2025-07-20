import {State} from "@/data/states";
import {GameStatus} from "@/components/StateGuessingGame";

export const defaultColor = '#C630FD';
export const selectedColor = '#3D009C';
export function getStateColor(currentState: State, gameStatus: GameStatus, lookupStateAbbr: string): string {
  return (currentState.abbreviation === lookupStateAbbr) && (gameStatus !== 'playing') ? selectedColor : defaultColor
}