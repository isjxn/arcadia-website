import React, { useState } from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem, Chip, NavbarMenuItem, NavbarMenu, NavbarMenuToggle } from "@nextui-org/react";
import navbarConfig from "~/utils/navbarConfig";
import { usePathname, useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import NavbarAvatar from "./NavbarAvatar";
import { FaCopy } from "react-icons/fa6";

export default function ArcadiaNavbar() {
  const pathname = usePathname();
  const { data: sessionData } = useSession();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <Navbar onMenuOpenChange={setIsMenuOpen}>
      <NavbarMenuToggle
        aria-label={isMenuOpen ? "Close menu" : "Open menu"}
        className="md:hidden"
      />
      <NavbarBrand>
        <p className="font-bold text-inherit">Arcadia 1.19.2</p>
      </NavbarBrand>
      <NavbarContent className="hidden md:flex gap-4" justify="center">
        {navbarConfig.map((link, index) => {
          return (
            <NavbarItem key={index} isActive={link.url === pathname ? true : false}>
              <Link
                isBlock
                showAnchorIcon={link.externalLink ? true : false}
                color={link.url === pathname ? undefined : "foreground"}
                href={link.url}
                aria-current={link.url === pathname ? "page" : undefined}
                target={link.externalLink ? "_blank" : undefined}>
                {link.text}
              </Link>
            </NavbarItem>
          );
        })}
      </NavbarContent>
      <NavbarContent justify="end">
        <Chip
          variant="shadow"
          classNames={{
            base: "bg-gradient-to-br from-indigo-500 to-pink-500 border-small border-white/50 shadow-pink-500/30 hover:shadow-pink-500/50 hover:from-indigo-600 hover:to-pink-600 hover:border-white/50 hover:cursor-pointer",
            content: "drop-shadow shadow-black text-white",
          }}
          endContent={<FaCopy stroke="white" fill="white" />}
          onClick={() => void navigator.clipboard.writeText("mc-arcadia.de")}
        >
          IP: mc-arcadia.de
        </Chip>
        <ThemeSwitcher />
        {sessionData ? (
          <NavbarAvatar />
        ) : (
          <NavbarItem>
            <Button
              as={Link}
              color="primary"
              variant="flat"
              onClick={() => void signIn()}
            >
              Einloggen
            </Button>
          </NavbarItem>
        )}
      </NavbarContent>
      <NavbarMenu>
        {navbarConfig.map((link, index) => {
          return (
            <NavbarMenuItem key={index}>
              <Link
                color={link.url === pathname ? undefined : "foreground"}
                className="w-full"
                href={link.url}
                showAnchorIcon={link.externalLink ? true : false}
                size="lg"
              >
                {link.text}
              </Link>
            </NavbarMenuItem>
          );
        })}
      </NavbarMenu>
    </Navbar>
  );
}
