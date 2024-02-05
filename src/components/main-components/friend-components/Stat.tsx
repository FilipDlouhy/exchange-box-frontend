import { IStat } from "./Interfaces/StatInterface";

function Stat({ stat }: { stat: IStat }) {
  return (
    <div
      key={stat.name}
      className="flex flex-wrap items-baseline justify-between gap-x-4 gap-y-2 bg-white px-4 py-10 sm:px-6 xl:px-8"
    >
      <dt className="text-sm font-medium leading-6 text-gray-500">
        {stat.name}
      </dt>

      <dd className="w-full flex-none text-3xl font-medium leading-10 tracking-tight text-gray-900">
        {stat.value}
      </dd>
    </div>
  );
}

export default Stat;
