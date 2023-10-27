import { Checkbox, SimpleGrid, Stack, Button } from "@chakra-ui/react";
import { useEffect, useState } from "react";

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
  filteredTypes: string[];
  addFilteredType: (value: string) => void;
  removeFilteredType: (value: string) => void;
  resetSelections: () => void;
  saveSelections: () => void;
}

const Filter = ({
  filteredTypes,
  addFilteredType,
  removeFilteredType,
  resetSelections,
  saveSelections,
}: FilterProps) => {
  const [checkedFilters, setCheckedFilters] = useState<{
    [x: string]: boolean;
  }>(
    allFilters.reduce(
      (result, curr) => ({
        ...result,
        [curr]: filteredTypes.indexOf(curr) > 0,
      }),
      {},
    ),
  );

  const handleResetButtonClick = () => {
    resetSelections();
    setCheckedFilters(
      allFilters.reduce((result, curr) => ({ ...result, [curr]: false }), {}),
    );
  };

  useEffect(() => {
    const updateCheckedFilters = checkedFilters;
    for (let i = 0; i < filteredTypes.length; i++) {
      const ft = filteredTypes[i];
      updateCheckedFilters[ft] = true;
    }
    setCheckedFilters({ ...updateCheckedFilters });
  }, [filteredTypes]);

  return (
    <>
      <Stack spacing={4} direction="row" align="center">
        <Button onClick={handleResetButtonClick}>Reset</Button>
        <Button onClick={saveSelections}>Save</Button>
      </Stack>
      <SimpleGrid columns={[2, null, 3]}>
        {allFilters.map((f, index) => {
          return (
            <Checkbox
              key={`filter_${index}`}
              name={`filter_${index}`}
              value={f}
              isChecked={checkedFilters[f]}
              onChange={(e) => {
                setCheckedFilters({
                  ...checkedFilters,
                  [e.target.value]: e.target.checked,
                });
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
    </>
  );
};

export default Filter;
