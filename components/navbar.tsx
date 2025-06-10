import React, { FC, FormEvent, useState } from "react";
import { Navbar as HeroUiNavbar, NavbarBrand, NavbarContent, Input, Button } from "@heroui/react";
import { Icon } from "@iconify/react";

interface WeatherNavbarProps {
	onSearch: (query: string) => void;
}

const Navbar: FC<WeatherNavbarProps> = ({ onSearch }) => {
	const [searchValue, setSearchValue] = useState("");

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		onSearch(searchValue);
	};

	return (
		<HeroUiNavbar isBordered maxWidth="xl">
			<NavbarBrand>
				<Icon className="text-primary mr-2" height={28} icon="lucide:cloud-sun" width={28} />
				<p className="font-semibold text-inherit">Weather</p>
			</NavbarBrand>

			<NavbarContent className="w-full" justify="end">
				<form className="flex w-full items-center gap-2" onSubmit={handleSubmit}>
					<Input
						classNames={{
							base: "w-full",
							inputWrapper: "h-10",
						}}
						placeholder="Search for a city..."
						startContent={<Icon className="text-default-400" icon="lucide:search" width={18} />}
						value={searchValue}
						onValueChange={setSearchValue}
					/>
					<Button isIconOnly aria-label="Search" color="primary" type="submit">
						<Icon icon="lucide:search" width={18} />
					</Button>
				</form>
				<Button isIconOnly color="primary">
					<Icon icon="lucide:settings" width={18} />
				</Button>
			</NavbarContent>
		</HeroUiNavbar>
	);
};

export default Navbar;
