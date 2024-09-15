import React from "react";
import App from "./App";
import { render, cleanup, fireEvent } from "@testing-library/react";

import "@testing-library/jest-dom/extend-expect";

//import userEvent
import userEvent from "@testing-library/user-event";

const testIds = {
  instructionInput: "instruction-input",
  addInstructionButton: "add-instruction-button",
  swapDown: "swap-down",
  swapUp: "swap-up",
  instruction: "instruction",
  instructions: "instructions",
};

describe("Instructions Board", () => {
  let getByTestId;
  let queryByTestId;
  let instructionInput;
  let addInstructionButton;
  let instructions;
  let app;
  let getByText;

  const sampleInstructions = [
    "Sample Instruction 1",
    "Sample Instruction 2",
    "Sample Instruction 3",
    "Sample Instruction 4",
  ];

  beforeEach(() => {
    app = render(<App />);
    queryByTestId = app.queryByTestId;
    queryByTestId = app.queryByTestId;
    getByText = app.getByText;
    instructionInput = queryByTestId(testIds.instructionInput);
    addInstructionButton = queryByTestId(testIds.addInstructionButton);
    instructions = queryByTestId(testIds.instructions);
  });

  afterEach(() => {
    cleanup();
  });

  const addInstruction = (instruction) => {
    fireEvent.change(instructionInput, { target: { value: instruction } });
    fireEvent.click(addInstructionButton, { button: "0" });
  };

  const addInstructionsGroup = () => {
    for (let i in sampleInstructions) {
      addInstruction(sampleInstructions[i]);
    }
  };
  it("Initially no instructions should be present in the list", () => {
    expect(instructions.children.length).toBe(0);
  });
  it("Add new instruction to the list and clear input field after input", () => {
    addInstruction(sampleInstructions[0]);
    expect(instructions.children.length).toBe(1);
    expect(instructionInput.value).toBeFalsy();
  });

  it("Add Multiple Instructions and check their existance", () => {
    addInstructionsGroup();
    for (let i = 0; i < sampleInstructions.length; i++) {
      const instructionId = instructions.children[i];
      expect(instructions).toContainElement(instructionId);
    }
    expect(instructions.children[0].children[0].children[1].textContent).toBe(
      sampleInstructions[0]
    );
    expect(instructions.children.length).toBe(4);
  });

  it("Check disabled buttons for first and last tasks", () => {
    addInstructionsGroup();
    let bottomSwapDownButton =
      instructions.children[instructions.children.length - 1].children[0]
        .children[2].children[0];
    console.log(bottomSwapDownButton.textContent);
    let topSwapUpButton =
      instructions.children[0].children[0].children[2].children[1];
    expect(bottomSwapDownButton).toBeDisabled();
    expect(topSwapUpButton).toBeDisabled();
  });

  it("Bring bottommost instruction to top, then disable swap-up button", () => {
    addInstructionsGroup();
    expect(
      instructions.children[instructions.children.length - 1].children[0]
        .children[1].textContent
    ).toBe(sampleInstructions[sampleInstructions.length - 1]);
    let moveUpButton =
      instructions.children[instructions.children.length - 1].children[0]
        .children[2].children[1];
    userEvent.click(moveUpButton);
    let iMoved =
      instructions.children[instructions.children.length - 2].children[0]
        .children[1];
    expect(iMoved.textContent).toBe(
      sampleInstructions[sampleInstructions.length - 1]
    );
    moveUpButton =
      instructions.children[instructions.children.length - 2].children[0]
        .children[2].children[1];
    userEvent.click(moveUpButton);
    iMoved =
      instructions.children[instructions.children.length - 3].children[0]
        .children[1];
    expect(iMoved.textContent).toBe(
      sampleInstructions[sampleInstructions.length - 1]
    );
    moveUpButton =
      instructions.children[instructions.children.length - 3].children[0]
        .children[2].children[1];
    userEvent.click(moveUpButton);
    iMoved =
      instructions.children[instructions.children.length - 4].children[0]
        .children[1];
    expect(iMoved.textContent).toBe(
      sampleInstructions[sampleInstructions.length - 1]
    );
    moveUpButton =
      instructions.children[instructions.children.length - 4].children[0]
        .children[2].children[1];
    expect(moveUpButton).toBeDisabled();
  });

  it("Bring topmost instruction to bottom, then disable swap-down button", () => {
    addInstructionsGroup();
    expect(instructions.children[0].children[0].children[1].textContent).toBe(
      sampleInstructions[0]
    );
    let moveDownButton =
      instructions.children[0].children[0].children[2].children[0];
    userEvent.click(moveDownButton);
    let iMoved = instructions.children[1].children[0].children[1];
    expect(iMoved.textContent).toBe(sampleInstructions[0]);
    moveDownButton =
      instructions.children[1].children[0].children[2].children[0];
    userEvent.click(moveDownButton);
    iMoved = instructions.children[2].children[0].children[1];
    expect(iMoved.textContent).toBe(sampleInstructions[0]);
    moveDownButton =
      instructions.children[2].children[0].children[2].children[0];
    userEvent.click(moveDownButton);
    iMoved = instructions.children[3].children[0].children[1];
    expect(iMoved.textContent).toBe(sampleInstructions[0]);
    moveDownButton =
      instructions.children[3].children[0].children[2].children[0];
    expect(moveDownButton).toBeDisabled();
  });

  it("Show error message if no instructions is entered", () => {
    addInstruction("");
    expect(getByText("Please enter an instruction.")).toBeTruthy();
  });
});
