import CalendarContainer from "../calendar-components/main/CalendarContainer";
import CalendarSidebar from "../calendar-components/sidebar/CalendarSidebar";
import ExchangeContainer from "../exchange-components/main/ExchangeContainer";
import ExchangeSidebar from "../exchange-components/sidebar/ExchangeSidebar";
import FriendContainer from "../friend-components/main/FriendContainer";
import FriendSidebar from "../friend-components/sidebar/FriendSidebar";
import HomeContainer from "../home-components/main/HomeContainer";
import HomeSidebar from "../home-components/sidebar/HomeSidebar";
import ItemContainer from "../item-components/main/ItemContainer";
import ItemSidebar from "../item-components/sidebar/ItemSidebar";
import UserContainer from "../user-components/main/UserContainer";
import UserSidebar from "../user-components/sidebar/UserSidebar";

export const getMainComponentByName = (name: string) => {
  switch (name) {
    case "Dashboard":
      return <HomeContainer />;
    case "Friends":
      return <FriendContainer />;
    case "Exchanges":
      return <ExchangeContainer />;
    case "Calendar":
      return <CalendarContainer />;
    case "Items":
      return <ItemContainer />;
    case "User":
      return <UserContainer />;
    default:
      return null;
  }
};

export const getSideComponentByName = (name: string) => {
  switch (name) {
    case "Dashboard":
      return <HomeSidebar />;
    case "Friends":
      return <FriendSidebar />;
    case "Exchanges":
      return <ExchangeSidebar />;
    case "Calendar":
      return <CalendarSidebar />;
    case "Items":
      return <ItemSidebar />;
    case "User":
      return <UserSidebar />;
    default:
      return null;
  }
};
