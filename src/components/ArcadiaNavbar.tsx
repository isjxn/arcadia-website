import React from "react";
import { Navbar, NavbarBrand, NavbarContent, NavbarItem, Link, Button, DropdownTrigger, Dropdown, DropdownMenu, DropdownItem, Chip } from "@nextui-org/react";
import navbarConfig from "~/utils/navbarConfig";
import { usePathname, useRouter } from "next/navigation";
import { signIn, useSession } from "next-auth/react";
import { ThemeSwitcher } from "./ThemeSwitcher";
import NavbarAvatar from "./NavbarAvatar";
import icons from "./Icons";
import { FaCopy } from "react-icons/fa6";

export default function ArcadiaNavbar() {
  const pathname = usePathname();
  const router = useRouter();
  const { data: sessionData } = useSession();

  return (
    <Navbar>
      <NavbarBrand>
        <p className="font-bold text-inherit">Arcadia 1.19.2</p>
      </NavbarBrand>
      <NavbarContent className="hidden sm:flex gap-4" justify="center">
        {navbarConfig.map((link, index) => {
          return (
            link.dropdown ? (
              <Dropdown key={index}>
                <NavbarItem>
                  <DropdownTrigger>
                    <Button
                      disableRipple
                      className="text-medium bg-transparent data-[hover=true]:bg-transparent min-w-fit pl-2 pr-1 py-1"
                      endContent={icons.chevronDown}
                      radius="sm"
                      variant="light"
                    >
                      {link.text}
                    </Button>
                  </DropdownTrigger>
                </NavbarItem>
                <DropdownMenu
                  aria-label={link.text}
                  className=""
                  itemClasses={{
                    base: "gap-4"
                  }}
                >
                  {link.dropdown.map((dropdownLink, dropdownIndex) => (
                    <DropdownItem
                      key={dropdownIndex}
                      onClick={() => void router.push(dropdownLink.url)}
                    >
                      {dropdownLink.text}
                    </DropdownItem>
                  ))}
                </DropdownMenu>
              </Dropdown>
            ) : (
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
            )
          )
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
          onClick={() => void navigator.clipboard.writeText("???")}
        >
          IP: ???
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
    </Navbar>
  );
}
