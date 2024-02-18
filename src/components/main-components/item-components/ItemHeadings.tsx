const ItemHeading = ({ heading }: { heading: string }) => {
  return (
    <div className="w-full h-10 p-5 flex items-center">
      <p className="text-2xl font-semibold">{heading}</p>
    </div>
  );
};

export default ItemHeading;
