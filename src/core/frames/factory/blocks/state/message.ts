import { StateGenerator } from '../../state.factories';
import { ArduinoMessageState } from '../../../state/arduino-components.state';
import { BluetoothSensor } from '../../../../blockly/state/sensors.state';
import { arduinoStateByComponent } from '../../factory.helpers';
import { ArduinoComponentType } from '../../../state/arduino.state';
import { getInputValue } from '../../value.factories';
import _ from 'lodash';

export const messageSetup: StateGenerator = (
  blocks,
  block,
  variables,
  timeline,
  previousState
) => {
  const messageDatum = JSON.parse(block.metaData) as BluetoothSensor[];
  const messbtnData = messageDatum.find((d) => d.loop == 1);

  const messageComponent: ArduinoMessageState = {
    pins: block.pins,
    hasMessage: messbtnData.receiving_message,
    message: messbtnData.message,
    sendMessage: '',
    type: ArduinoComponentType.MESSAGE
  };

  return [
    arduinoStateByComponent(
      block.id,
      timeline,
      messageComponent,
      'Setting up Arduino messages.',
      previousState
    )
  ];
};

export const arduinoSendMessage: StateGenerator = (
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
    'MESSAGE',
    '',
    previousState
  );

  const components = previousState ? _.cloneDeep(previousState.components) : [];

  const replaceVariables = previousState ? { ...previousState.variables } : {};

  return [
    {
      blockId: block.id,
      sendMessage: message,
      timeLine: { ...timeline },
      variables: replaceVariables,
      txLedOn: true,
      rxLedOn: false,
      components,
      explanation: `Arduino sending message: "${message}".`,
      delay: 0,
      powerLedOn: true
    }
  ];
};