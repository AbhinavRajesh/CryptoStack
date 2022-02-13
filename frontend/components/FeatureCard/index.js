const FeatureCard = ({ title, description }) => {
  return (
    <div className="p-[30px] shadow">
      <h2 className="font-semibold text-lg">{title}</h2>
      <p className="mt-[10px] text-gray-600">{description}</p>
    </div>
  );
};

export default FeatureCard;
