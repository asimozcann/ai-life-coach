import { Fragment, Suspense } from "react";
import ChatAI from "../components/Chat/ChatAI";

const ChatPage = () => {
  return (
    <Fragment>
      <Suspense fallback={<div>Yükleniyor...</div>}>
        <ChatAI />
      </Suspense>
    </Fragment>
  );
};

export default ChatPage;
