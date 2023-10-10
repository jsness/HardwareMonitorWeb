import {
  CircularProgress,
  CircularProgressLabel,
  Text,
  VStack,
} from "@chakra-ui/react";
import { Sensor } from "../../interfaces/Sensor";

interface SensorPinProps {
  sensor: Sensor;
}

const SensorPin = ({ sensor }: SensorPinProps) => {
  let color = "blue.400";

  if (sensor.sensorType === "Temperature") {
    if (sensor.value > 75) {
      color = "red.400";
    } else if (sensor.value > 50) {
      color = "orange.400";
    }
  }

  return (
    <VStack>
      <div>
        <CircularProgress value={sensor.value} size="140px" color={color}>
          <CircularProgressLabel fontSize="x-large">
            {sensor.displayValue}
          </CircularProgressLabel>
        </CircularProgress>
      </div>
      <Text fontSize="md">{sensor.name}</Text>
    </VStack>
  );
};

export default SensorPin;
