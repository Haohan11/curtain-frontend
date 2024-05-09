import { Row, Col } from "react-bootstrap";

import Image from "next/image";
import { useRouter } from "next/router";

import FormInput from "@/components/input/formInput";
import ReturnButton from "@/components/input/returnButton";
import LinkButton from "@/components/input/linkButton";
import CombinationCard from "@/components/combinationCard";
import Pagination from "@/components/pagination";

import Logo from "@/icon/logoWhiteSvg";
import Search from "@/icon/search";

import { getCombinations, deleteCombination } from "@/tool/request";
import { checkExpires } from "@/tool/lib";

import { getSession, useSession } from "next-auth/react";

import { useCombination } from "@/hook/provider/combinationProvider";

import copyrightText from "@/data/copyrightText";

export default function CombinationPage({ combinationData }) {
  const { data, status } = useSession();
  const token = data?.user?.accessToken;

  const router = useRouter();

  const { loadCombination } = useCombination();

  return (
    <Row className="g-0">
      <Col sm={3} lg={2} className="d-none d-md-block">
        <div className="vh-100 position-relative pt-8 text-center">
          <Image
            alt="curtain image"
            sizes="120px"
            fill
            placeholder="blur"
            blurDataURL="/image/curtain.jpg"
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
            {
              {
                loading: (
                  <div className="p-12 mt-12 text-center rounded-2 bg-light">
                    <span className="fs-5 fw-bold text-textgrey">
                      驗證中...
                    </span>
                  </div>
                ),
                authenticated:
                  combinationData.list.length === 0 ? (
                    <div className="p-12 mt-12 text-center rounded-2 bg-light">
                      <span className="fs-5 fw-bold text-textgrey">
                        目前沒有組合資料
                      </span>
                    </div>
                  ) : (
                    combinationData.list.map((comb) => (
                      <div
                        key={comb.id}
                        className="mx-auto"
                        style={{ maxWidth: "1000px" }}
                      >
                        <CombinationCard
                          data={comb}
                          onDelete={async () => {
                            if (!token) return;
                            const result = await deleteCombination(token, {
                              id: comb.id,
                            });
                            if (!result) return;
                            router.push(router.asPath.split("?")[0]);
                          }}
                          onOpen={() => {
                            loadCombination(comb)
                            router.push("/")
                          }}
                        />
                      </div>
                    ))
                  ),
                unauthenticated: (
                  <div className="p-12 mt-12 text-center rounded-2 bg-light flex-center">
                    <span className="fs-5-lg fw-bold text-textgrey me-5">
                      權限不足
                    </span>
                    <LinkButton href="/login">返回登入</LinkButton>
                  </div>
                ),
              }[status]
            }
            <div className="mt-12">
              <Pagination totalPage={combinationData.totalPages} />
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
  if (!session || !accessToken || checkExpires(session._exp))
    return {
      redirect: { destination: "/login", permanent: false },
    };

  const combinationData = (await getCombinations(accessToken, {
    ...context.query,
  })) || {
    total: 0,
    totalPages: 0,
    list: [],
  };

  return {
    props: {
      combinationData,
    },
  };
};
