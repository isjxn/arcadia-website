import { Switch } from "@nextui-org/react";
import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { FaSun } from 'react-icons/fa6';
import { FaMoon } from "react-icons/fa6";

export const ThemeSwitcher = () => {
  const [mounted, setMounted] = useState(false);
  const { theme, setTheme } = useTheme();

  useEffect(() => {
    setMounted(true)
  }, [])

  if(!mounted) return null

  return (
    <div className="hidden sm:block">
      <Switch
      defaultSelected={ theme === 'light' ? true : false }
      size="lg"
      startContent={<FaSun />}
      endContent={<FaMoon />}
      onChange={() => setTheme(theme === "dark" ? "light" : "dark")}
    >
    </Switch>
    </div>
  )
};