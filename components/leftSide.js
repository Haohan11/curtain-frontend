import ProductCard from "./productCard";

const LeftSide = ({ isLogin, data: stockList }) => {
  return (
    <div className="vstack h-100">
      <div className="d-flex fs-6 fw-bold text-darkblue p-4 m-0 border-2 border-bottom border-linegrey position-sticky top-0 bg-white z-2">
        <span style={{ letterSpacing: "1.5px" }}>
          {isLogin ? "商品列表" : "商品資訊"}
        </span>
      </div>
      {!stockList || !Array.isArray(stockList) || stockList.length === 0 ? (
        <div className="flex-grow-1 flex-center">
          <span className="text-textgrey">組合內沒有商品</span>
        </div>
      ) : (
        stockList.map(({ data, id }, index) => (
          <div key={id} className="border-bottom">
            <ProductCard
              data={{ ...data, id, index }}
              dynamic={isLogin}
              deletable={isLogin}
              checkable={isLogin}
              sticky
            />
          </div>
        ))
      )}
    </div>
  );
};

export default LeftSide;
