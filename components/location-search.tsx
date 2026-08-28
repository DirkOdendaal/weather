"use client";

import { useAppContext } from "@/context-providers/application-provider";
import { useWeatherContext } from "@/context-providers/weather-provider";
import { searchLocations } from "@/services/weather-api";
import { Location } from "@/types/location";
import { Autocomplete, AutocompleteItem } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useQuery } from "@tanstack/react-query";
import { FC, Key, useState } from "react";
import { useDebounceValue } from "usehooks-ts";

const locationKey = (location: Location): string => `${location.lat},${location.lon}`;

const locationRegion = (location: Location): string => [location.state, location.country].filter(Boolean).join(", ");

const locationLabel = (location: Location): string => {
  const region = locationRegion(location);

  return region ? `${location.name}, ${region}` : location.name;
};

const LocationSearch: FC = () => {
  const { languageConfig } = useAppContext();
  const { changeLocation, selectLocation } = useWeatherContext();

  const [inputValue, setInputValue] = useState("");
  const [selectedLabel, setSelectedLabel] = useState<string | null>(null);
  const [debouncedQuery] = useDebounceValue(inputValue, 300);

  const query = debouncedQuery.trim();
  // Don't re-search for the label we just filled in after a selection.
  const isSearchEnabled = query.length >= 2 && query !== selectedLabel;

  const { data: results = [], isFetching } = useQuery({
    queryKey: ["geocode-search", query],
    queryFn: () => searchLocations(query),
    enabled: isSearchEnabled,
    staleTime: 60 * 60 * 1000,
  });

  const items = isSearchEnabled ? results : [];

  const handleInputChange = (value: string) => {
    setInputValue(value);

    if (value !== selectedLabel) {
      setSelectedLabel(null);
    }
  };

  const handleSelectionChange = (key: Key | null) => {
    if (key == null) return;

    const selected = results.find((location) => locationKey(location) === key);

    if (selected) {
      const label = locationLabel(selected);

      setSelectedLabel(label);
      setInputValue(label);
      selectLocation(selected);
    }
  };

  const handleKeyDown = (event: { key: string }) => {
    if (event.key === "Enter" && items.length === 0 && inputValue.trim().length > 0) {
      changeLocation(inputValue.trim());
    }
  };

  return (
    <Autocomplete
      allowsCustomValue
      aria-label={languageConfig.displayTexts.searchPlaceholder}
      className="md:w-full lg:w-[360px]"
      inputValue={inputValue}
      isLoading={isFetching}
      items={items}
      menuTrigger="input"
      placeholder={languageConfig.displayTexts.searchPlaceholder}
      startContent={<Icon className="text-default-400" icon="lucide:search" width={18} />}
      onInputChange={handleInputChange}
      onKeyDown={handleKeyDown}
      onSelectionChange={handleSelectionChange}
    >
      {(location: Location) => (
        <AutocompleteItem key={locationKey(location)} textValue={locationLabel(location)}>
          <div className="flex flex-col">
            <span className="text-small">{location.name}</span>
            {locationRegion(location) && <span className="text-tiny text-default-400">{locationRegion(location)}</span>}
          </div>
        </AutocompleteItem>
      )}
    </Autocomplete>
  );
};

export default LocationSearch;
