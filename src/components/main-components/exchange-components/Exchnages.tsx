import { ExchangeSimpleInterface } from "./interfaces/ExchnageSImpleInterFace";
import ExhcnagesItems from "./ExhcnagesItems";

export default function Exchanges({
  setIsCreating,
  exchages,
  setExchangeDetail,
  setOpen,
  setExchanges,
}: {
  setIsCreating: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  exchages: ExchangeSimpleInterface[] | undefined;
  setOpen: React.Dispatch<
    React.SetStateAction<{
      showOpenBoxForm: boolean;
      exchnageId: number;
      userId: number;
    }>
  >;
  setExchangeDetail: React.Dispatch<
    React.SetStateAction<
      | {
          activeExchangeId: number;
          seeDetail: boolean;
        }
      | undefined
    >
  >;

  setExchanges: React.Dispatch<
    React.SetStateAction<ExchangeSimpleInterface[] | undefined>
  >;
}) {
  return (
    <div className="flex flex-wrap  m-2">
      <div className="w-full h-28  flex justify-around  flex-col">
        <h1 className="font-semibold ml-8">Exchanges</h1>
        <button
          onClick={() => {
            setIsCreating(true);
          }}
          type="button"
          className="rounded bg-blue-500 ml-8 w-40 h-7 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
        >
          Create Exchange
        </button>
      </div>
      <ExhcnagesItems
        setExchanges={setExchanges}
        setOpen={setOpen}
        setExchangeDetail={setExchangeDetail}
        exchages={exchages}
      />
    </div>
  );
}
