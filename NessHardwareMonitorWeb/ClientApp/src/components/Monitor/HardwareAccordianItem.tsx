import {
  AccordionItem,
  AccordionButton,
  AccordionIcon,
  AccordionPanel,
  Box,
  UnorderedList,
  ListItem,
  Checkbox,
  Flex,
  Spacer,
} from "@chakra-ui/react";
import { Hardware } from "../../interfaces/Hardware";

interface HardwareAccordianItemProps {
  hardware: Hardware;
  hardwareKey: string;
  filteredTypes: string[];
  pinnedKeys: string[];
  addPinnedKey: (value: string) => void;
  removePinnedKey: (value: string) => void;
}

const HardwareAccordianItem = ({
  hardware,
  hardwareKey,
  filteredTypes,
  pinnedKeys,
  addPinnedKey,
  removePinnedKey,
}: HardwareAccordianItemProps) => (
  <AccordionItem key={hardwareKey}>
    <h2>
      <AccordionButton>
        <Box as="span" flex="1" textAlign="left">
          {hardware.name}
        </Box>
        <AccordionIcon />
      </AccordionButton>
    </h2>
    <AccordionPanel pb={4}>
      <UnorderedList>
        {hardware.sensors
          .map((s, index) => ({ sensor: s, index }))
          .filter(
            (s) =>
              filteredTypes.length === 0 ||
              filteredTypes.includes(s.sensor.sensorType),
          )
          .map((s) => {
            const sensorKey = `${hardwareKey}-sensor_${s.index}`;
            return (
              <ListItem key={sensorKey}>
                <Flex>
                  {s.sensor.name}: {s.sensor.displayValue}
                  <Spacer />
                  <Checkbox
                    isChecked={pinnedKeys.includes(sensorKey)}
                    variant="pinned"
                    onChange={(e) => {
                      if (e.target.checked) {
                        addPinnedKey(sensorKey);
                      } else {
                        removePinnedKey(sensorKey);
                      }
                    }}
                  >
                    Pin
                  </Checkbox>
                </Flex>
              </ListItem>
            );
          })}
      </UnorderedList>
    </AccordionPanel>
  </AccordionItem>
);

export default HardwareAccordianItem;
