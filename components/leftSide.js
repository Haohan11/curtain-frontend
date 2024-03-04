import ProductCard from "./productCard";

const LeftSide = ({ isLogin, data: productData }) => {
  return (
    <div className="vstack">
      <p className="fs-6 fw-bold text-darkblue p-4 m-0 border-2 border-bottom border-linegrey position-sticky top-0 bg-white z-2">
        {isLogin ? "組合列表" : "商品資訊"}
      </p>
      {productData.map(({ data, id }, index) => (
        <div key={id} className="border-bottom">
          <ProductCard data={{ ...data, id, index }} dynamic={isLogin} deletable={isLogin} checkable={isLogin} sticky />
        </div>
      ))}
    </div>
  );
};

export default LeftSide;
