import { useState } from "react";
import { useRive, useViewModel } from "@rive-app/react-webgl2";
import "./App.css";
import UnsupportedRow from "./RiveRows/UnsupportedRow";
import NumberRow from "./RiveRows/NumberRow";

export default function App() {
  const [riveSrc, setRiveSrc] = useState(null);
  const [key, setKey] = useState(0);

  const { rive, RiveComponent } = useRive({
    src: riveSrc,
    autoplay: true,
    autoBind: true,
  });

  const viewModelInstance = rive?.viewModelInstance;
  const viewModelStruct = useViewModel(rive);

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setRiveSrc(URL.createObjectURL(file));
      setKey((prevKey) => prevKey + 1); // Increment key to force re-render
    }
  };

  return (
    <div className="App">
      <h1>Rive Animation Playground</h1>

      <input type="file" accept=".riv" onChange={handleFileUpload} />

      {riveSrc && (
        <RiveComponent key={key} style={{ width: "600px", height: "600px" }} />
      )}

      <hr className="section-break" />

      <h2>View Model Properties</h2>

      {viewModelStruct?.properties?.length ? (
        <table className="data-table">
          <thead>
            <tr>
              <th>Property Name</th>
              <th>Type</th>
            </tr>
          </thead>
          <tbody>
            {viewModelStruct.properties.map((item, index) => {
              if (item.type === "number") {
                return <NumberRow key={index} viewModelInstance={viewModelInstance} name={item.name} />;
              } else {
                return <UnsupportedRow key={index} name={item.name} type={item.type} />;
              }
            })}
          </tbody>
        </table>
      ) : (
        <h2 className="status-text">No view model found</h2>
      )}
    </div>
  );
}