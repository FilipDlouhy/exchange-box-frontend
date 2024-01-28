import { MenuItem } from "./ComonInterfaces";

export const DynamicComponentRenderer = (
  activeMenu: string,
  items: MenuItem[]
) => {
  const menuItem = items.find((item) => item.name === activeMenu);

  if (menuItem && menuItem.component) {
    const Component = menuItem.component;
    return <Component />;
  }

  return <div></div>;
};
