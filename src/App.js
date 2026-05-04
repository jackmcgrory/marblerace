import { useState, useRef } from "react";
import { useRive, useViewModel } from "rive-react";
import * as htmlToImage from "html-to-image";
import "./App.css";
import UnsupportedRow from "./RiveRows/UnsupportedRow";
import NumberRow from "./RiveRows/NumberRow";
import BooleanRow from "./RiveRows/BooleanRow";
import ColourRow from "./RiveRows/ColourRow";
import EnumRow from "./RiveRows/EnumRow";
import StringRow from "./RiveRows/StringRow";
import TriggerRow from "./RiveRows/TriggerRow";

export default function App() {
  const [riveSrc, setRiveSrc] = useState(null);
  const [key, setKey] = useState(0);

  const screenshotRef = useRef(null);

  const { rive, RiveComponent } = useRive({
    src: riveSrc,
    stateMachines: "State Machine 1",
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

  const useDefaultFile = () => {
    setRiveSrc('/marblerace/rivefullviewmodeltest.riv');
  }

  const handleShare = async () => {
    // exit if null
    if (!screenshotRef.current) return;
    try {
      const dataURL = await htmlToImage.toJpeg(screenshotRef.current);

      // convert to blob
      const response = await fetch(dataURL);
      const blob = await response.blob();
      const file = new File([blob], 'rive-exemplar.jpg', {type: 'image/jpeg'});


      // share the file
      if (navigator.canShare && navigator.canShare({ files: [file]})) {
        await navigator.share({
          files : [file],
          title : "Check out this animation screenshot!",
          text : "This has been captured by a react app and shared to my socials #wow",
        });
      }else {
        alert('Sharing is not supported on this browser or device');
      }

    } catch (err) {
      console.error("Screenshot failed", err);
    }
  }

  return (
    <div className="App">
      <h1>Rive Animation Playground</h1>

      <input type="file" accept=".riv" onChange={handleFileUpload} />

      <button onClick={useDefaultFile}>Use Sample File</button>
      <button onClick={handleShare}>Share to Social Media</button>
      {riveSrc && (
        <div ref={screenshotRef} style={{ width: "600px", height: "600px" }}>
        <RiveComponent key={key} style={{ width: "100%", height: "100%" }} />
        </div>
      )}

      <hr className="section-break" />

      <h2>View Model Properties</h2>

      {viewModelStruct?.properties?.length ? (
        <table className="data-table">
          <thead>
            <tr>
              <th>Property Name</th>
              <th>Type</th>
              <th>Current Value</th>
              <th>Change Value</th>
            </tr>
          </thead>
          <tbody>
            {viewModelStruct.properties.map((item, index) => {
              if (item.type === "number") {
                return <NumberRow key={index} viewModelInstance={viewModelInstance} name={item.name} />;
              } else if (item.type === "string") {
                return <StringRow key={index} viewModelInstance={viewModelInstance} name={item.name} />;
              } else if (item.type === "enumType") {
                return <EnumRow key={index} viewModelInstance={viewModelInstance} name={item.name} />;
              } else if (item.type === "color") {
                return <ColourRow key={index} viewModelInstance={viewModelInstance} name={item.name} />;
              } else if (item.type === "trigger") {
                return <TriggerRow key={index} viewModelInstance={viewModelInstance} name={item.name} />;
              } else if (item.type === "boolean") {
                return <BooleanRow key={index} viewModelInstance={viewModelInstance} name={item.name} />;
              }
              else {
                return <UnsupportedRow key={index} name={item.name} type={item.type} />;
              }
            })}
          </tbody>
        </table>
      ) : (
        <h2 className="status-text">No view model found</h2>
      )}

  <h3 className="status-text">Note if the animation will not play - please ensure it's default state machine is called 'State Machine 1'</h3>
    </div>
  );
}