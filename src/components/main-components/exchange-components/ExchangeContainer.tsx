import { useState } from "react";
import CreateExchange from "./create-exchnage-components/CreateExchange";
import Exchanges from "./Exchnages";
import { ExchangeSimpleInterface } from "./interfaces/ExchnageSImpleInterFace";
import ExhcnageDetail from "./exhchnage-detail/ExhcnageDetail";
import OpenEchnageBoxDialog from "./OpenEchnageBoxDialog";

function ExchangeContainer() {
  const [isCreating, setIsCreating] = useState<boolean>();
  const [exchages, setExchanges] = useState<ExchangeSimpleInterface[]>();
  const [exchnageDetail, setExchangeDetail] = useState<{
    activeExchangeId: number;
    seeDetail: boolean;
  }>();

  return (
    <div>
      {exchnageDetail?.seeDetail ? (
        <ExhcnageDetail
          exchangeDetail={exchnageDetail}
          setExchangeDetail={setExchangeDetail}
        />
      ) : isCreating ? (
        <CreateExchange
          setExchanges={setExchanges}
          setIsCreating={setIsCreating}
        />
      ) : (
        <Exchanges
          setExchangeDetail={setExchangeDetail}
          exchages={exchages}
          setExchanges={setExchanges}
          setIsCreating={setIsCreating}
        />
      )}

      <OpenEchnageBoxDialog />
    </div>
  );
}

export default ExchangeContainer;
