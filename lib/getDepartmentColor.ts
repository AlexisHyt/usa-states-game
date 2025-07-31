import {Department} from "@/data/departments";
import {GameStatus} from "@/components/DepartmentGuessingGame";

export const defaultColor = '#C630FD';
export const selectedColor = '#3D009C';
export function getDepartmentColor(currentDepartment: Department, gameStatus: GameStatus, lookupDepartmentCode: string): string {
  return (currentDepartment.code === lookupDepartmentCode) && (gameStatus !== 'playing') ? selectedColor : defaultColor
}