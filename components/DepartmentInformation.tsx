import { Department } from "@/data/departments";

interface DepartmentInformationProps {
  currentDepartment: Department;
}

export function DepartmentInformation({ currentDepartment }: DepartmentInformationProps) {
  return (
    <div className="bg-blue-50 text-black p-4 rounded-lg mb-4">
      <h3 className="text-lg font-semibold mb-2">{currentDepartment.name} ({currentDepartment.code})</h3>
      <div className="grid grid-cols-2 gap-2 text-sm">
        <div>
          <p className="font-medium">Prefecture:</p>
          <p>{currentDepartment.prefecture}</p>
        </div>
        <div>
          <p className="font-medium">Largest City:</p>
          <p>{currentDepartment.largestCity}</p>
        </div>
      </div>
    </div>
  );
}