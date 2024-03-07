import { useState } from "react";
import CreateExchange from "./CreateExchange";
import Exchanges from "./Exchnages";
import { ExchangeSimpleInterface } from "./Interfaces/ExchnageSImpleInterFace";

function ExchangeContainer() {
  const [isCreating, setIsCreating] = useState<boolean>();
  const [exchages, setExchanges] = useState<ExchangeSimpleInterface[]>();

  return (
    <div>
      {isCreating ? (
        <CreateExchange
          setExchanges={setExchanges}
          setIsCreating={setIsCreating}
        />
      ) : (
        <Exchanges
          exchages={exchages}
          setExchanges={setExchanges}
          setIsCreating={setIsCreating}
        />
      )}
    </div>
  );
}

export default ExchangeContainer;
