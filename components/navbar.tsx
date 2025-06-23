import React, { FC, FormEvent, useRef } from "react";
import {
	Navbar as HeroUiNavbar,
	NavbarBrand,
	NavbarContent,
	Input,
	Button,
	Popover,
	PopoverTrigger,
	PopoverContent,
	Select,
	SelectItem,
	Switch,
} from "@heroui/react";
import { Icon } from "@iconify/react";
import ThemeSwitch from "./theme-switch";
import { useAppContext } from "@/context-providers/application-provider";
import { LanguageCodes } from "@/enums/languages-codes";
import { useWeatherContext } from "@/context-providers/weather-provider";
import { Units } from "@/enums/unit";

const Navbar: FC = () => {
	const searchRef = useRef<HTMLInputElement>(null);
	const { languageConfig, changeLanguage, changeUnitSystem, unit } = useAppContext();
	const { changeLocation } = useWeatherContext();

	const handleSubmit = (event: FormEvent) => {
		event.preventDefault();
		changeLocation(searchRef.current?.value ?? "");
	};

	return (
		<HeroUiNavbar isBordered maxWidth="xl">
			<NavbarBrand>
				<Icon className="text-primary mr-2" height={28} icon="lucide:cloud-sun" width={28} />
				<p className="font-semibold text-inherit">{languageConfig.displayTexts.title}</p>
			</NavbarBrand>

			<NavbarContent className="flex w-full gap-2" justify="center">
				<form className="flex w-full items-center gap-2 lg:justify-end" onSubmit={handleSubmit}>
					<Input
						ref={searchRef}
						className="md:w-full lg:w-[360px]"
						placeholder={languageConfig.displayTexts.searchPlaceholder}
						startContent={<Icon className="text-default-400" icon="lucide:search" width={18} />}
					/>
					<Button isIconOnly aria-label="Search" color="primary" type="submit">
						<Icon icon="lucide:search" width={18} />
					</Button>
				</form>
				<Popover>
					<PopoverTrigger>
						<Button isIconOnly color="primary">
							<Icon icon="lucide:settings" width={18} />
						</Button>
					</PopoverTrigger>
					<PopoverContent aria-label="Static Actions" className="w-[360px]">
						<div className="flex w-full items-center gap-2 justify-between p-2">
							<span className="text-sm font-medium">{languageConfig.displayTexts.toggleDarkMode}</span>
							<ThemeSwitch />
						</div>
						<div className="flex w-full items-center gap-2 justify-between p-2">
							<span className="text-sm font-medium">{languageConfig.displayTexts.languageLabel}</span>
							<Select
								aria-label="Language Select"
								className="w-[120px]"
								defaultSelectedKeys={[languageConfig.languageCode]}
								size="sm"
								value={languageConfig.languageName}
								onChange={(event) => {
									const selectedLanguage = event.target.value as LanguageCodes;

									changeLanguage(selectedLanguage);
								}}
							>
								{languageConfig.languageOptions.map((option) => (
									<SelectItem key={option.value}>{option.label}</SelectItem>
								))}
							</Select>
						</div>
						<div className="flex w-full item-center gap-2 justify-between p-2">
							<span className="text-sm font-medium">{languageConfig.displayTexts.imperial}</span>
							<Switch
								isSelected={unit === Units.Imperial}
								onChange={(e) => {
									changeUnitSystem(e.target.checked ? Units.Imperial : Units.Metric);
								}}
							/>
						</div>
					</PopoverContent>
				</Popover>
			</NavbarContent>
		</HeroUiNavbar>
	);
};

export default Navbar;
