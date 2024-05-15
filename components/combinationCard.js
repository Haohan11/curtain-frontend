import Image from "next/image";
import { Col, Row } from "react-bootstrap";

import TrashCan from "@/icon/trashcan";
import ProductCard from "@/components/productCard";
import SubmitButton from "@/components/input/submitButton";
import ModalWrapper from "./modalWrapper";
import PopUp from "./popUp";
import useModals from "@/hook/useModals";

import { transImageUrl } from "@/tool/lib";

const CombinationCard = ({
  data: { env_image, name, create_time, environment_name, stockList },
  onDelete,
  onOpen,
}) => {
  
  const { handleShowModal, handleCloseModal, isModalOpen } = useModals();
  
  return (
    <div className="px-5 mt-12 pb-8">
      <Row className="g-10 border-bottom pb-12">
        <Col sm={"auto"} className="ps-0">
          <Image
            alt="combination image"
            src={transImageUrl(env_image)}
            className="rounded-3"
            width={120}
            height={120}
          />
        </Col>
        <Col className="pe-0">
          <div className="d-flex mb-4 mt-4">
            <div>
              <span className="fs-5 fw-bold text-darkblue">{name}</span>
              <div className="text-textgrey fs-6-sm mt-1 mb-2">
                <span className="d-inline-block" style={{ width: "90px" }}>
                  建立日期
                </span>
                <span>{create_time}</span>
              </div>
              <div className="text-textgrey">
                <span className="d-inline-block" style={{ width: "90px" }}>
                  組合場景
                </span>
                <span className="text-darkblue fw-bold">
                  {environment_name}
                </span>
              </div>
            </div>
            <div className="ms-auto flex-center align-self-start">
              <SubmitButton
                type="button"
                className="px-9"
                {...(typeof onOpen === "function" && { onClick: onOpen })}
              >
                開啟組合
              </SubmitButton>
              <div
                className="ms-6 me-4 text-red cursor-pointer"
                {...(typeof onDelete === "function" && { onClick:()=>{handleShowModal('wantDelete')}})}
              >
                <TrashCan />
              </div>
            </div>
          </div>
          <div className="vstack">
            {stockList.map((stock, index) => (
              <div key={index} className="mb-4 border rounded-3">
                <ProductCard data={stock} dynamic colorCheckable={false} />
              </div>
            ))}
          </div>
        </Col>
      </Row>

      {/*是否刪除*/}
      <ModalWrapper
        key="wantDelete"
        show={isModalOpen("wantDelete")}
        size="lg"
        onHide={() => handleCloseModal("wantDelete")}
      >
        <PopUp
          imageSrc={"/icon/warning.svg"}
          title={"是否要刪除該組合?"}
          describe="刪除該組合後，無法復原"
          describeClass='fs-5 text-red'
          denyOnClick={() => handleCloseModal("wantDelete")}
          confirmOnClick={() => {
            typeof onDelete === "function" && onDelete();
           handleCloseModal("wantDelete")
          }}
        />
      </ModalWrapper>
    </div>
  );
};

export default CombinationCard;
