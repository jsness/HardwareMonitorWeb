import { Checkbox, SimpleGrid } from "@chakra-ui/react";

const allFilters = [
  "Voltage",
  "Current",
  "Power",
  "Clock",
  "Temperature",
  "Load",
  "Frequency",
  "Fan",
  "Flow",
  "Control",
  "Level",
  "Factor",
  "Data",
  "SmallData",
  "Throughput",
  "TimeSpan",
  "Energy",
  "Noise",
];

interface FilterProps {
  addFilteredType: (value: string) => void;
  removeFilteredType: (value: string) => void;
}

const Filter = ({ addFilteredType, removeFilteredType }: FilterProps) => (
  <SimpleGrid columns={[2, null, 3]}>
    {allFilters.map((f, index) => {
      return (
        <Checkbox
          key={`filter_${index}`}
          value={f}
          onChange={(e) => {
            if (e.target.checked) {
              addFilteredType(e.target.value);
            } else {
              removeFilteredType(e.target.value);
            }
          }}
        >
          {f}
        </Checkbox>
      );
    })}
  </SimpleGrid>
);

export default Filter;
