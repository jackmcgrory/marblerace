import { useEffect } from "react";
import confetti from "canvas-confetti"; // Import confetti
import { useRive, useViewModelInstanceBoolean, useViewModelInstanceEnum, useViewModelInstanceNumber, useViewModelInstanceTrigger } from "@rive-app/react-webgl2";
import "./App.css"; // Adjust the path if necessary

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
  This box-shuffling game was made entirely in Rive.<br /><br />
  
  The component with the grey background includes all of the assets and logic needed to randomly assign values to the boxes and select from a set of three different shuffles.<br /><br />
  
  The values in the table above are those exposed via the view model of the animation. These values can be accessed externally, meaning the code can determine the animation's state to change text or trigger specific events.<br /><br />
  
  You can add listeners to any values—for example, triggering confetti if you win—or even access the triggers to activate them when the user clicks an external button.<br /><br />
  
  Inside the animation, there is also an <b>embedded onclick listener</b> on the shuffle button. This listener works <b>without requiring additional code</b>, making it seamlessly functional across web, iOS, and Android.<br /><br />
</p>
    </div>
  );
}
