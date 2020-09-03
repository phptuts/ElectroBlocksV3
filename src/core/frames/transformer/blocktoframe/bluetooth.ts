import { BluetoothSensor } from "../../../blockly/dto/sensors.type";
import { BluetoothState } from "../../arduino-components.state";
import { ArduinoComponentType } from "../../arduino.frame";
import { arduinoFrameByComponent } from "../frame-transformer.helpers";
import { findFieldValue } from "../../../blockly/helpers/block-data.helper";
import { getInputValue } from "../get-values";
import _ from "lodash";
import { BlockToFrameTransformer } from "../block-to-frame.interface";

export const bluetoothSetup: BlockToFrameTransformer = (
  blocks,
  block,
  variables,
  timeline,
  previousState
) => {
  const btSensorDatum = JSON.parse(block.metaData) as BluetoothSensor[];
  const btSensor = btSensorDatum.find((d) => d.loop === 1);

  const bluetoothComponent: BluetoothState = {
    pins: block.pins,
    type: ArduinoComponentType.BLUE_TOOTH,
    rxPin: findFieldValue(block, "RX"),
    txPin: findFieldValue(block, "TX"),
    hasMessage: btSensor.receiving_message,
    message: btSensor.message,
    sendMessage: "",
  };

  return [
    arduinoFrameByComponent(
      block.id,
      block.blockName,
      timeline,
      bluetoothComponent,
      "Setting up Bluetooth.",
      previousState
    ),
  ];
};

export const bluetoothMessage: BlockToFrameTransformer = (
  blocks,
  block,
  variables,
  timeline,
  previousState
) => {
  const message = getInputValue(
    blocks,
    block,
    variables,
    timeline,
    "MESSAGE",
    "",
    previousState
  );
  const btComponent = previousState.components.find(
    (c) => c.type === ArduinoComponentType.BLUE_TOOTH
  ) as BluetoothState;
  const newComponent = _.cloneDeep(btComponent);
  newComponent.sendMessage = message;

  return [
    arduinoFrameByComponent(
      block.id,
      block.blockName,
      timeline,
      newComponent,
      `Sending "${message}" from bluetooth to computer.`,
      previousState
    ),
  ];
};
