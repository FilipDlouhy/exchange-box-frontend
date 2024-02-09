import {
  CalendarIcon,
  HomeIcon,
  UsersIcon,
  ArchiveBoxIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/20/solid";

export const initialNavigation = [
  { name: "Dashboard", href: "#", icon: HomeIcon, current: false },
  { name: "Friends", href: "#", icon: UsersIcon, current: false },
  { name: "Exchanges", href: "#", icon: ArchiveBoxIcon, current: false },
  { name: "Calendar", href: "#", icon: CalendarIcon, current: false },
  { name: "Items", href: "#", icon: ComputerDesktopIcon, current: false },
  { name: "User", href: "#", icon: UserIcon, current: false },
];

export const userNavigation = [
  { name: "Your profile" },
  {
    name: "Sign out",
  },
];

export function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
