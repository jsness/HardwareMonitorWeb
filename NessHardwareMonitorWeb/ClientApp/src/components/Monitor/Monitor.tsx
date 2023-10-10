import {
  Heading,
  Stack,
  Accordion,
  useInterval,
  SimpleGrid,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Hardware } from "../../interfaces/Hardware";
import Filter from "./Filter";
import HardwareAccordianItem from "./HardwareAccordianItem";
import SensorPin from "./SensorPin";

const Monitor = () => {
  const [hardwareData, setHardwareData] = useState<Hardware[]>([]);
  const [filteredTypes, setFilteredTypes] = useState<string[]>([]);
  const [pinnedKeys, setPinnedKeys] = useState<string[]>([]);

  const refreshData = async () => {
    const response = await fetch("/api/Monitor/GetHardware");
    const data = await response.json();
    setHardwareData(data);
  };

  useEffect(() => {
    refreshData();
  }, []);

  useInterval(() => {
    refreshData();
  }, 2000);

  const addFilteredType = (value: string) => {
    setFilteredTypes([...filteredTypes, value]);
  };

  const removeFilteredType = (value: string) => {
    setFilteredTypes([...filteredTypes.filter((nf) => nf !== value)]);
  };

  const addPinnedKey = (value: string) => {
    setPinnedKeys([...pinnedKeys, value]);
  };

  const removePinnedKey = (value: string) => {
    setPinnedKeys([...pinnedKeys.filter((pk) => pk !== value)]);
  };

  return (
    <Stack>
      <Heading as="h6" size="xl">
        Hardware Monitor
      </Heading>
      <SimpleGrid columns={[2, null, 3]}>
        {pinnedKeys.map((pk) => {
          const keyParts = pk.split("-");
          const hardwareIndex = Number(keyParts[0].split("_")[1]);
          const sensorIndex = Number(keyParts[1].split("_")[1]);
          const currentSensor =
            hardwareData[hardwareIndex].sensors[sensorIndex];

          return <SensorPin key={pk} sensor={currentSensor} />;
        })}
      </SimpleGrid>
      <Filter
        addFilteredType={addFilteredType}
        removeFilteredType={removeFilteredType}
      />
      <Accordion allowMultiple>
        {hardwareData.map((hd, index) => {
          return (
            <HardwareAccordianItem
              hardware={hd}
              key={`hardware_${index}`}
              hardwareKey={`hardware_${index}`}
              filteredTypes={filteredTypes}
              pinnedKeys={pinnedKeys}
              addPinnedKey={addPinnedKey}
              removePinnedKey={removePinnedKey}
            />
          );
        })}
      </Accordion>
    </Stack>
  );
};

export default Monitor;
