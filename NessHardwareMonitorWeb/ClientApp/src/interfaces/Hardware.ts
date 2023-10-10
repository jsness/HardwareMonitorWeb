import { Sensor } from "./Sensor";

export interface Hardware {
  name: string;
  subHardware: Hardware[];
  sensors: Sensor[];
}
