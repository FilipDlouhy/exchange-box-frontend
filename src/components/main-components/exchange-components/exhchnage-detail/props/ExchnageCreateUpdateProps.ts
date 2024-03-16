import { CenterInterface } from "../../interfaces/CenterInterFace";
import { ExchangeFriend } from "../../interfaces/ExchangeFriendInterface";
import { ExchangeItemInterface } from "../../interfaces/ExchnageItem";
import { ExchangeSimpleInterface } from "../../interfaces/ExchnageSImpleInterFace";
import { FullExchangeInterafce } from "../../interfaces/FullExchangeInterface";
import { ItemInExchnageInterface } from "../../interfaces/ItemInExchnageInterface";

export interface ItemsForExchangeProps {
  itemsSimple?: ExchangeItemInterface[];
  handleItemsInExchangeChange: (item: ItemInExchnageInterface) => void;
  itemsInExchnage: ItemInExchnageInterface[];
}

export interface CreateUpdateExchangeMapProps {
  handleCoordinatesChange: (center: CenterInterface | undefined) => void;
  centers?: CenterInterface[];
  size: string;
  centerLong: number;
  centerLat: number;
  isUpdating: boolean;
}

export interface CreateUpdateExchangeFormProps {
  setSelectedFriend: React.Dispatch<
    React.SetStateAction<ExchangeFriend | undefined>
  >;
  handleCoordinatesChange: (center: CenterInterface | undefined) => void;
  setSize: React.Dispatch<React.SetStateAction<string>>;
  setName: React.Dispatch<React.SetStateAction<string>>;
  setPickUpDate: React.Dispatch<React.SetStateAction<Date | undefined>>;
  size: string;
  pickUpDate: Date | undefined;
  name: string;
  selectedFriend: ExchangeFriend | undefined;
  centerLong: number;
  centerLat: number;
  isUpdating: boolean;
}

export interface CreateUpdateExchangeProps {
  setIsCreating?: React.Dispatch<React.SetStateAction<boolean | undefined>>;
  setExchanges: React.Dispatch<
    React.SetStateAction<ExchangeSimpleInterface[] | undefined>
  >;
  isUpdating?: boolean;
  fullExchange?: FullExchangeInterafce | undefined;
  setIsUpdatingExhcnage: React.Dispatch<React.SetStateAction<boolean>>;
}
