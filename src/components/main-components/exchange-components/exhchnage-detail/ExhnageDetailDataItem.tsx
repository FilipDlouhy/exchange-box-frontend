import React from "react";
import { ExchangeDetailDataItemProps } from "../Interfaces/ExhcnageDataItemPropsIterface";

const ExchangeDetailDataItem: React.FC<ExchangeDetailDataItemProps> = ({
  name,
  text,
  bgColor,
  initials,
}) => {
  return (
    <div className="px-3 w-96 flex-none">
      <div className="flex rounded-md shadow-sm my-3">
        <div
          className={`${bgColor} flex w-16 flex-shrink-0 items-center justify-center rounded-l-md text-sm font-medium text-white`}
        >
          {initials}
        </div>
        <div className="flex flex-1 items-center justify-between truncate rounded-r-md border-b border-r border-t border-gray-200 bg-white">
          <div className="flex-1 truncate px-4 py-2 text-sm">
            <p className="font-medium text-gray-900 hover:text-gray-600">
              {name}
            </p>
            <p className="text-gray-500">{text} </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExchangeDetailDataItem;
