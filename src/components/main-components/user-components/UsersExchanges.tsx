import { CurrentUserExchnageInterface } from "./Interfaces/CurrentUserExchnageInterface";
import UserExchange from "./UserExchange";

export default function UserExchanges({
  exhhanges,
}: {
  exhhanges: CurrentUserExchnageInterface[] | undefined;
}) {
  return (
    <div
      role="list"
      className="grid grid-cols-1 gap-x-6 gap-y-8 lg:grid-cols-3 xl:gap-x-8"
    >
      {exhhanges?.map((exchange) => (
        <UserExchange key={exchange.id} exchange={exchange} />
      ))}
    </div>
  );
}
