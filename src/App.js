import { useRive, useViewModelInstanceBoolean, useViewModelInstanceNumber } from "@rive-app/react-webgl2";

export default function App() {
  const { rive, RiveComponent } = useRive({
    src: "/shufflingboxes.riv",
    artboard: "TV - 1",
    stateMachines: "State Machine 1",
    autoBind: true, // Auto-binding enabled
  });

  const viewModelInstance = rive?.viewModelInstance;

  // Bind properties
  const { value: readyToOpen } = useViewModelInstanceBoolean("readyToOpen", viewModelInstance);
  const { value: winningBox } = useViewModelInstanceNumber("winningBox", viewModelInstance);
  const { value: shuffleNumber } = useViewModelInstanceNumber("shuffleNumber", viewModelInstance);
  const { value: winner } = useViewModelInstanceBoolean("winner", viewModelInstance);

  return (
    <div className="App">
      <h1>Game State</h1>
      <RiveComponent style={{ width: "600px", height: "600px" }} />
      <p>Ready to Open: {readyToOpen ? "Yes" : "No"}</p>
      <p>Winning Box: {winningBox}</p>
      <p>Shuffle Number: {shuffleNumber}</p>
      <p>Winner: {winner ? "Yes" : "No"}</p>
    </div>
  );
}
