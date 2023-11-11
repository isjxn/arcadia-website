import { Dropdown, DropdownTrigger, Avatar, DropdownMenu, DropdownItem } from "@nextui-org/react";
import { signOut, useSession } from "next-auth/react";

export default function NavbarAvatar() {
  const { data: sessionData } = useSession();
  
  return (
    <Dropdown placement="bottom-end">
      <DropdownTrigger>
        <Avatar
          as="button"
          className="transition-transform"
          name={sessionData?.user?.name ?? "unknown"}
          size="sm"
          src={sessionData?.user?.image ?? "/default.jpg"}
        />
      </DropdownTrigger>
      <DropdownMenu aria-label="Profile Actions" variant="flat">
        <DropdownItem key="profile" className="h-14 gap-2">
          <p className="font-semibold">Signed in as</p>
          <p className="font-semibold">{sessionData?.user?.name}</p>
        </DropdownItem>
        <DropdownItem key="settings">Settings</DropdownItem>
        <DropdownItem key="logout" color="danger" onClick={() => void signOut()}>
          Log Out
        </DropdownItem>
      </DropdownMenu>
    </Dropdown>
  )
}