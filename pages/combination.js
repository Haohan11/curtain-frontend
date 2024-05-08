import { Row, Col } from "react-bootstrap";
import FormInput from "@/components/input/formInput";
import Image from "next/image";

import Logo from "@/icon/logoWhiteSvg";
import ReturnButton from "@/components/returnButton";
import CombinationCard from "@/components/combinationCard";
import Pagination from "@/components/pagination";
import Search from "@/icon/search";

import { getCombinations } from "@/tool/request";
import { getSession } from "next-auth/react";

import copyrightText from "@/data/copyrightText";

export default function CombinationPage({ combinationData }) {
  return (
    <Row className="g-0">
      <Col sm={"auto"} className="d-none d-md-block">
        <div className="vh-100 position-relative p-6">
          <Image
            alt="curtain image"
            sizes="120px"
            priority
            fill
            src={"/image/curtain.jpg"}
          />
          <Logo className="position-relative" />
        </div>
      </Col>
      <Col>
        <div className="vh-100 position-relative d-flex flex-column overflow-y-auto">
          <div className="position-sticky top-0 z-2 p-6 flex-center justify-content-between border-bottom bg-white">
            <ReturnButton href={"/"} />
          </div>
          <div className="pt-12 pb-10 px-8 px-lg-12 px-xl-16">
            <div className="hstack justify-content-between">
              <span className="fs-1-sm fw-bold text-darkblue">我的組合</span>
              <div style={{ width: "300px" }} className="position-relative">
                <FormInput placeholder="搜尋" className="pe-8" />
                <div className="position-absolute top-0 end-0 text-linegrey p-2">
                  <Search />
                </div>
              </div>
            </div>
            {combinationData.list.map((comb) => (
              <div key={comb.id} className="mx-auto" style={{maxWidth: "1200px"}}>
                <CombinationCard data={comb} />
              </div>
            ))}
            <div className="mt-12">
              <Pagination totalPage={combinationData.totalPages}/>
              <div className="mt-10 flex-center text-textgrey">
                {copyrightText}
              </div>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
}

export const getServerSideProps = async (context) => {
  const session = await getSession(context);
  const accessToken = session?.user?.accessToken;
  if (!session || !accessToken)
    return {
      redirect: { desitination: "/login", permanent: false },
    };

  const result = (await getCombinations(accessToken)) || {
    total: 0,
    totalPages: 0,
    list: [],
  };

  return {
    props: {
      combinationData: result,
    },
  };
};
