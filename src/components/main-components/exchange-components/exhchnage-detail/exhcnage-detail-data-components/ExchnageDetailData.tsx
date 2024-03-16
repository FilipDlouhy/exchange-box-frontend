import ExchangeDetailDataItem from "./ExhnageDetailDataItem";
import { FullExchangeInterafce } from "../../interfaces/FullExchangeInterface";

const bgColors = [
  "bg-red-500",
  "bg-green-500",
  "bg-blue-500",
  "bg-yellow-500",
  "bg-indigo-500",
  "bg-purple-500",
  "bg-pink-500",
  "bg-orange-500",
  "bg-teal-500",
  "bg-cyan-500",
  "bg-gray-500",
];

export default function ExchangeDetailData({
  fullExchange,
}: {
  fullExchange: FullExchangeInterafce | undefined;
}) {
  const getRandomBgColor = () => {
    const randomIndex = Math.floor(Math.random() * bgColors.length);
    return bgColors[randomIndex];
  };

  return (
    <div className="mt-3 px-3">
      <div className="flex flex-wrap justify-center sm:justify-start">
        {fullExchange && (
          <>
            <ExchangeDetailDataItem
              bgColor={getRandomBgColor()}
              initials="N"
              text={fullExchange.name}
              name="Name"
            />
            <ExchangeDetailDataItem
              bgColor={getRandomBgColor()}
              initials="P"
              text={fullExchange.price?.toString() ?? "N/A"}
              name="Price"
            />

            <ExchangeDetailDataItem
              bgColor={getRandomBgColor()}
              initials="CD"
              text={new Date(fullExchange.createdAt).toLocaleDateString()}
              name="Creation date"
            />

            <ExchangeDetailDataItem
              bgColor={getRandomBgColor()}
              initials="FN"
              text={fullExchange.friend.name}
              name="Friend name"
            />

            <ExchangeDetailDataItem
              bgColor={getRandomBgColor()}
              initials="SE"
              text={fullExchange.exchangeState}
              name="State of exchange"
            />

            <ExchangeDetailDataItem
              bgColor={getRandomBgColor()}
              initials="SB"
              text={fullExchange.boxSize}
              name="Size of box"
            />

            <ExchangeDetailDataItem
              bgColor={getRandomBgColor()}
              initials="NI"
              text={fullExchange.items?.length.toString() ?? "0"}
              name="Number of items"
            />

            <ExchangeDetailDataItem
              bgColor={getRandomBgColor()}
              initials="PD"
              text={
                fullExchange?.pickUpDate
                  ? new Date(fullExchange.pickUpDate).toLocaleDateString()
                  : "N/A"
              }
              name="Pick up date"
            />
          </>
        )}
      </div>
    </div>
  );
}
