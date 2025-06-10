import React from "react";
import {
  Navbar as HeroUiNavbar,
  NavbarBrand,
  NavbarContent,
  Input,
  Button,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import { ThemeSwitch } from "./theme-switch";

interface WeatherNavbarProps {
  onSearch: (query: string) => void;
}

export const Navbar: React.FC<WeatherNavbarProps> = ({ onSearch }) => {
  const [searchValue, setSearchValue] = React.useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  return (
    <HeroUiNavbar isBordered maxWidth="xl">
      <NavbarBrand>
        <Icon
          className="text-primary mr-2"
          height={28}
          icon="lucide:cloud-sun"
          width={28}
        />
        <p className="font-semibold text-inherit">WeatherApp</p>
      </NavbarBrand>

      <NavbarContent className="flex-1" justify="end">
        <ThemeSwitch />
        <form
          className="flex w-full max-w-md items-center gap-2"
          onSubmit={handleSubmit}
        >
          <Input
            classNames={{
              base: "w-full",
              inputWrapper: "h-10",
            }}
            placeholder="Search for a city..."
            startContent={
              <Icon
                className="text-default-400"
                icon="lucide:search"
                width={18}
              />
            }
            value={searchValue}
            onValueChange={setSearchValue}
          />
          <Button isIconOnly aria-label="Search" color="primary" type="submit">
            <Icon icon="lucide:search" width={18} />
          </Button>
        </form>
      </NavbarContent>
    </HeroUiNavbar>
  );
};
