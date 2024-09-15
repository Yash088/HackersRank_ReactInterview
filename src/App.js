import React, { useState } from "react";

const App = () => {
  const [instructions, setInstructions] = useState([]);
  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const handleAddInstruction = () => {
    if (input.trim() === "") {
      setError("Please enter an instruction.");
      setTimeout(() => setError(""), 3000); // Clear error after 3 seconds
      return;
    }
    setInstructions([...instructions, input]);
    setInput("");
  };

  const handleMoveUp = (index) => {
    if (index === 0) return;
    const updatedInstructions = [...instructions];
    [updatedInstructions[index], updatedInstructions[index - 1]] = [
      updatedInstructions[index - 1],
      updatedInstructions[index],
    ];
    setInstructions(updatedInstructions);
  };

  const handleMoveDown = (index) => {
    if (index === instructions.length - 1) return;
    const updatedInstructions = [...instructions];
    [updatedInstructions[index], updatedInstructions[index + 1]] = [
      updatedInstructions[index + 1],
      updatedInstructions[index],
    ];
    setInstructions(updatedInstructions);
  };

  return (
    <div>
      <input
        data-testid="instruction-input"
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <button
        data-testid="add-instruction-button"
        onClick={handleAddInstruction}
      >
        Add Instruction
      </button>
      {error && <div>{error}</div>}
      <ul data-testid="instructions">
        {instructions.map((val, index) => (
          <li key={index}>
            <div className="li-content layout-row justify-content-between align-items-center">
              <span>{index + 1}</span>
              <span>{val}</span>
              <div className="icons">
                <button
                  className="icon-only x-medium mx-2"
                  data-testid={`swap-down-${index}`}
                  onClick={() => handleMoveDown(index)}
                  disabled={index === instructions.length - 1}
                >
                  <i className="material-icons">arrow_drop_down</i>
                </button>
                <button
                  className="icon-only x-medium mx-2"
                  data-testid={`swap-up-${index}`}
                  onClick={() => handleMoveUp(index)}
                  disabled={index === 0}
                >
                  <i className="material-icons">arrow_drop_up</i>
                </button>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;
