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
  const [expandedIndices, setExpandedIndices] = useState<number | number[]>();

  const refreshData = async () => {
    const response = await fetch("/api/Monitor/GetHardware");
    const data = await response.json();
    setHardwareData(data);
  };

  const getSettings = async () => {
    const response = await fetch("/api/Monitor/GetSettings?userName=Default");
    const data: { filteredTypes: string[]; pinnedKeys: string[] } =
      await response.json();
    setFilteredTypes(data.filteredTypes);
    setPinnedKeys(data.pinnedKeys);
  };

  useEffect(() => {
    refreshData();
    getSettings();
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

  const resetSelections = () => {
    setFilteredTypes([]);
    setPinnedKeys([]);
    setExpandedIndices([]);
  };

  const saveSelections = async () => {
    await fetch("/api/Monitor/SaveSettings", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        userName: "Default",
        filteredTypes,
        pinnedKeys,
      }),
    });
  };

  return (
    <Stack>
      <Heading as="h6" size="xl">
        Hardware Monitor
      </Heading>
      <SimpleGrid columns={[2, null, 3]}>
        {hardwareData.length > 0 &&
          pinnedKeys.map((pk) => {
            const keyParts = pk.split("-");
            const hardwareIndex = Number(keyParts[0].split("_")[1]);
            const sensorIndex = Number(keyParts[1].split("_")[1]);
            const currentSensor =
              hardwareData[hardwareIndex].sensors[sensorIndex];

            return <SensorPin key={pk} sensor={currentSensor} />;
          })}
      </SimpleGrid>
      <Filter
        filteredTypes={filteredTypes}
        addFilteredType={addFilteredType}
        removeFilteredType={removeFilteredType}
        resetSelections={resetSelections}
        saveSelections={saveSelections}
      />
      <Accordion
        allowMultiple
        onChange={(expandedIndex) => setExpandedIndices(expandedIndex)}
        index={expandedIndices}
      >
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
