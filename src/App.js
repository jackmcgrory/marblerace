import { useEffect } from "react";
import confetti from "canvas-confetti"; // Import confetti
import { useRive, useViewModelInstanceBoolean, useViewModelInstanceEnum, useViewModelInstanceNumber, useViewModelInstanceTrigger } from "@rive-app/react-webgl2";

export default function App() {
  const { rive, RiveComponent } = useRive({
    src: "/shufflingboxes.riv",
    artboard: "TV - 1",
    stateMachines: "State Machine 1",
    autoplay: true,
    autoBind: true, // Auto-binding enabled
  });

  const viewModelInstance = rive?.viewModelInstance;

  // Bind properties
  const { value: readyToOpen } = useViewModelInstanceBoolean("readyToOpen", viewModelInstance);
  const { value: winningBox } = useViewModelInstanceNumber("winningBox", viewModelInstance);
  const { value: shuffleNumber } = useViewModelInstanceNumber("shuffleNumber", viewModelInstance);
  const { value: winner } = useViewModelInstanceBoolean("winner", viewModelInstance);
  const { value: gameFinished } = useViewModelInstanceBoolean("gameFinished", viewModelInstance);
  const { trigger: shuffleBoxes } = useViewModelInstanceTrigger("shuffleBoxes", viewModelInstance);
  const { value: currentSetUpEnum } = useViewModelInstanceEnum("GameSetup", viewModelInstance);

  // 🎉 Trigger confetti when winner is true
  useEffect(() => {
    if (winner) {
      confetti({
        particleCount: 150,
        spread: 80,
        origin: { y: 0.6 }, 
      });
    }
  }, [winner]); 

  return (
    <div className="App">
      <h1>Game State</h1>

      <h2 className="status-text">
        {gameFinished ? "Game Over - Refresh the page to play again" : 
        readyToOpen ? "Boxes shuffled - pick your winner!":
        "Boxes assigned - time to shuffle!"}
      </h2>

      <RiveComponent style={{ width: "600px", height: "600px" }} />

      <hr className="section-break" />

      <h2>View Model Properties</h2>

      <table className="data-table">
        <thead>
          <tr>
            <th>Property</th>
            <th>Value</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Ready to Open</td>
            <td className={readyToOpen ? "green" : "red"}>{readyToOpen ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td>Winning Box</td>
            <td>{winningBox}</td>
          </tr>
          <tr>
            <td>Shuffle Number</td>
            <td>{shuffleNumber}</td>
          </tr>
          <tr>
            <td>Winner</td>
            <td className={winner ? "green" : "red"}>{winner ? "Yes" : "No"}</td>
          </tr>
          <tr>
            <td>Game Set Up Enum</td>
            <td>{currentSetUpEnum}</td>
          </tr>
        </tbody>
      </table>

      <button className="shuffle-button" onClick={shuffleBoxes}>
        Shuffle Boxes
      </button>

      <hr className="section-break" />

      <p className="blurb">
        This box shuffling game was made entirely in Rive, the component with the grey background includes all of the assets and 
        all of the logic to randomly assign values to the boxes and to randomly pick from a set of 3 different shuffles. The values in the 
        table above are those that are exposed via the viewmodel of the animation. These can be accessed externally to the rive animation
        meaning in the code you can know the state of the animation to change text or to trigger specific events. You can add listeners to any values
        such as triggering confetti if you win, or you can even access the triggers and trigger them if the user hits an external button.

        Inside the animation there is also an embedded onclick listener on the shuffle button that doesn't require any code to work,
        this also works on iOS or Android.
      </p>
    </div>
  );
}
