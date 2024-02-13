import {
  CalendarIcon,
  HomeIcon,
  UsersIcon,
  ArchiveBoxIcon,
  ComputerDesktopIcon,
} from "@heroicons/react/24/outline";
import { UserIcon } from "@heroicons/react/20/solid";

export type ModuleMenuItem = {
  name: string;
  icon: React.ForwardRefExoticComponent<
    Omit<React.SVGProps<SVGSVGElement>, "ref"> & {
      title?: string | undefined;
      titleId?: string | undefined;
    } & React.RefAttributes<SVGSVGElement>
  >;
  current: boolean;
};
export const initialNavigation: ModuleMenuItem[] = [
  { name: "Dashboard", icon: HomeIcon, current: false },
  { name: "Friends", icon: UsersIcon, current: false },
  { name: "Exchanges", icon: ArchiveBoxIcon, current: false },
  { name: "Calendar", icon: CalendarIcon, current: false },
  { name: "Items", icon: ComputerDesktopIcon, current: false },
  { name: "User", icon: UserIcon, current: false },
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
