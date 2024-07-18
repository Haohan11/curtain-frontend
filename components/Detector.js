import React, { useEffect, Fragment } from "react";
import { useSession, signOut } from "next-auth/react";
import { checkExpires } from "@/tool/lib";
import ModalWrapper from "./ModalWrapper";
import PopUp from "./PopUp";

import { useRouter } from "next/router";

import useModals from "@/hook/useModals";

const Detector = ({ children }) => {
  const session = useSession();
  const { route } = useRouter();

  const { handleShowModal, handleCloseModal, isModalOpen } = useModals();

  useEffect(() => {
    let timeId;
    if (
      session.status === "authenticated" &&
      !checkExpires(session?.data?._exp)
    ) {
      const limitTime = session?.data?._exp * 1000 - Date.now();
      if (!limitTime) return;
      timeId = setTimeout(() => {
        handleShowModal("popup");
      }, limitTime);
    } else {
      if (session.status === "unauthenticated" && route !== "/login") {
        handleShowModal("popup");
      }
      clearTimeout(timeId);
    }
    return () => {
      clearTimeout(timeId);
    };
  }, [session.status]);

  return (
    <Fragment>
      {children}

      <ModalWrapper
        key="popup"
        show={isModalOpen("popup")}
        size="lg"
        onHide={() => signOut({ callbackUrl: "/login" })}
      >
        <PopUp
          imageSrc={"/icon/circle-error.svg"}
          title={"網頁已過期，請重新登入"}
          confirmOnClick={() => signOut({ callbackUrl: "/login" })}
        />
      </ModalWrapper>
    </Fragment>
  );
};

export default Detector;
