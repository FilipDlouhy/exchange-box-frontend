import { useEffect, useState } from "react";
import CreateExchange from "./create-exchnage-components/CreateExchange";
import Exchanges from "./Exchnages";
import { ExchangeSimpleInterface } from "./interfaces/ExchnageSImpleInterFace";
import ExhcnageDetail from "./exhchnage-detail/ExhcnageDetail";
import OpenEchnageBoxDialog from "./OpenEchnageBoxDialog";
import generateUrl from "../../../contants/url";
import axios from "axios";

function ExchangeContainer() {
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

  const fetchData = async () => {
    try {
      const response = await axios.get(
        generateUrl("exchange/get-user-exchanges"),
        { withCredentials: true }
      );
      const dataWithDates = response.data.map(
        (exchage: ExchangeSimpleInterface) => ({
          ...exchage,
          pickUpDate: exchage.pickUpDate ? new Date(exchage.pickUpDate) : null,
        })
      );
      setExchanges(dataWithDates);
    } catch (error) {
      console.error("Error fetching data:", error);
      throw error;
    }
  };

  useEffect(() => {
    fetchData();
  }, []);
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
