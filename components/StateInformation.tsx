import {State} from "@/data/states";

interface Props {
  currentState: State;
}

export function StateInformation({ currentState }: Props) {
  return (
    <div className="bg-gray-100 p-4 rounded-lg mb-4">
      <h3 className="text-lg font-semibold mb-2 flex flex-col text-black">State Information</h3>

      <div className="mb-3 flex justify-around">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={`/flags/Flag_of_${currentState.name.replaceAll(" ", "_")}.svg.png`}
          alt={`Flag of ${currentState.name}`}
          className="h-50 border border-gray-300 shadow-lg my-2"
        />
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div>
          <div className="text-sm text-gray-600 mb-1">Capital:</div>
          <div className="font-medium text-black">{currentState.capital}</div>
        </div>

        <div>
          <div className="text-sm text-gray-600 mb-1">Largest City:</div>
          <div className="font-medium text-black">{currentState.largestCity}</div>
        </div>
      </div>
    </div>
  );
}