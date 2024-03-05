import { useState } from "react";
import CreateExchange from "./CreateExchange";
import Exchanges from "./Exchnages";

function ExchangeContainer() {
  const [isCreating, setIsCreating] = useState<boolean>();
  return (
    <div>
      {isCreating ? (
        <CreateExchange setIsCreating={setIsCreating} />
      ) : (
        <Exchanges setIsCreating={setIsCreating} />
      )}
    </div>
  );
}

export default ExchangeContainer;
