import CalendarContainer from "../calendar-components/CalendarContainer";
import ExchangeContainer from "../exchange-components/ExchangeContainer";
import FriendContainer from "../friend-components/FriendContainer";
import HomeContainer from "../home-components/HomeContainer";
import ItemContainer from "../item-components/ItemContainer";
import UserContainer from "../user-components/UserContainer";

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
