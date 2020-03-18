import { PIN_TYPE } from './arduino-components.state';
import { ARDUINO_UNO_PINS } from '../../constants/arduino';

export interface SensorData {
  loop: number;
}

export interface BluetoothData extends SensorData {
  receiving_message: boolean;
  message: string;
}

export interface ButtonData extends SensorData {
  is_pressed: boolean;
  pin: ARDUINO_UNO_PINS;
}

export interface IRRemoteData extends SensorData {
  scanned_new_code: boolean;
  code: string;
}

export interface MotionSensorData extends SensorData {
  cm: number;
}

export interface PinData extends SensorData {
  pinType: PIN_TYPE;
  state: number;
  pin: ARDUINO_UNO_PINS;
}

export interface RFIDData extends SensorData {
  scanned_card: boolean;
  card_number: string;
  tag: string;
}

export interface TempData extends SensorData {
  temp: number;
  humidity: number;
  loop: number;
}

export interface TimeData extends SensorData {
  time_in_seconds: number;
}