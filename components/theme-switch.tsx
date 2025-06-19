import React, { FC } from "react";
import { Button, Tooltip } from "@heroui/react";
import { Icon } from "@iconify/react";
import { useTheme } from "next-themes";

const ThemeSwitch: FC = () => {
	const { theme, setTheme } = useTheme();
	const isDark = theme === "dark";

	const handleToggle = () => {
		setTheme(isDark ? "light" : "dark");
	};

	return (
		<Tooltip content={`Switch to ${isDark ? "light" : "dark"} mode`} placement="bottom">
			<Button isIconOnly color="primary" size="sm" onPress={handleToggle}>
				<Icon height={20} icon={isDark ? "lucide:sun" : "lucide:moon"} width={20} />
			</Button>
		</Tooltip>
	);
};

export default ThemeSwitch;
