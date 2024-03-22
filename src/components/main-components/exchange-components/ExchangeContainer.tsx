import { useEffect, useState } from "react";
import Exchanges from "./Exchnages";
import { ExchangeSimpleInterface } from "./interfaces/ExchnageSImpleInterFace";
import ExhcnageDetail from "./exhchnage-detail/ExhcnageDetail";
import OpenEchnageBoxDialog from "./OpenEchnageBoxDialog";
import CreateUpdateExchange from "./exhchnage-detail/create-update-exchnage-components/CreateUpdateExchange";
import { useSelector } from "react-redux";
import { useFetchDataSearch } from "../../common-components/hooks/FetchSearchDataHook";

function ExchangeContainer() {
  const isCreatingFromItems = useSelector(
    (state) => state.createExchangeFromItem.isCreatingFromItems
  );

  const [isCreating, setIsCreating] = useState<boolean>();
  const [exchages, setExchanges] = useState<ExchangeSimpleInterface[]>();
  const [open, setOpen] = useState<{
    showOpenBoxForm: boolean;
    exchnageId: number;
    userId: number;
  }>({ showOpenBoxForm: false, exchnageId: 0, userId: 0 });
  const [exchnageDetail, setExchangeDetail] = useState<{
    activeExchangeId: number;
    seeDetail: boolean;
  }>();
  const exchangeIdFromItem = useSelector(
    (state) => state.exchangeIdFromItem.exchangeIdFromItem
  );

  useFetchDataSearch<ExchangeSimpleInterface[]>(
    "exchange/get-user-exchanges",
    setExchanges,
    exchages,
    "name"
  );

  useEffect(() => {
    if (exchangeIdFromItem == null) {
      return;
    }

    setExchangeDetail({
      activeExchangeId: exchangeIdFromItem,
      seeDetail: true,
    });
  }, [exchangeIdFromItem]);

  useEffect(() => {
    if (isCreatingFromItems) {
      setIsCreating(true);
    }
  }, [isCreatingFromItems]);

  return (
    <div>
      {exchnageDetail?.seeDetail ? (
        <ExhcnageDetail
          setExchanges={setExchanges}
          exchangeDetail={exchnageDetail}
          setExchangeDetail={setExchangeDetail}
        />
      ) : isCreating ? (
        <CreateUpdateExchange
          setExchanges={setExchanges}
          setIsCreating={setIsCreating}
        />
      ) : (
        <Exchanges
          setExchanges={setExchanges}
          setOpen={setOpen}
          setExchangeDetail={setExchangeDetail}
          exchages={exchages}
          setIsCreating={setIsCreating}
        />
      )}

      <OpenEchnageBoxDialog
        setExchanges={setExchanges}
        exchages={exchages}
        open={open}
        setOpen={setOpen}
      />
    </div>
  );
}

export default ExchangeContainer;
