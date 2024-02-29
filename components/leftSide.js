import ProductCard from "./productCard";

import productData from "@/data/productData";

const LeftSide = ({ isLogin }) => {
  return (
    <div className="vstack">
      <p className="fs-6 fw-bold text-darkblue p-4 m-0 border-2 border-bottom border-linegrey position-sticky top-0 bg-white z-2">
        {isLogin ? "組合列表" : "商品資訊"}
      </p>
      {productData.map(({ data, id }, index) => (
        <ProductCard key={id} data={{...data, id, index}} dynamic={isLogin} />
      ))}
    </div>
  );
};

export default LeftSide;
