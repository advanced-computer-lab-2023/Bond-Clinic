import React from "react";

import styles from "@chatscope/chat-ui-kit-styles/dist/default/styles.min.css";
import {
  MainContainer,
  ChatContainer,
  MessageList,
  Message,
  MessageInput,
  Avatar,
  ConversationHeader,
  VideoCallButton,
  InfoButton,
  TypingIndicator,
  ConversationList,
  Conversation,
  Sidebar,
  Search,
} from "@chatscope/chat-ui-kit-react";

import photo from "../../images/avatar.jpg";

export default function Chat() {
  const inputRef = React.useRef();
  const [msgInputValue, setMsgInputValue] = React.useState("");
  const [messages, setMessages] = React.useState([]);

  const handleSend = (message) => {
    setMessages([
      ...messages,
      {
        message,
        direction: "outgoing",
      },
    ]);
    setMsgInputValue("");
    inputRef.current.focus();
  };

  return (
    <div
      style={{
        height: "500px",
      }}
    >
      <MainContainer responsive>
        <Sidebar position="left" scrollable={false}>
          <Search placeholder="Search..." />
          <ConversationList>
            <Conversation
              name="Doctor 1"
              lastSenderName="Doctor 1"
              info="I hope you get well soon!"
            >
              <Avatar src={photo} name="Doctor 1" status="available" />
            </Conversation>

            <Conversation
              name="Doctor 2"
              lastSenderName="Doctor 2"
              info="Please follow your prescriptions"
            >
              <Avatar src={photo} name="Doctor 1" status="dnd" />
            </Conversation>

            <Conversation
              name="Doctor 3"
              lastSenderName="Doctor 3"
              info="Yes i can do it for you"
              unreadCnt={3}
            >
              <Avatar src={photo} name="Doctor 1" status="available" />
            </Conversation>
          </ConversationList>
        </Sidebar>
        <ChatContainer>
          <ConversationHeader>
            <Avatar src={photo} name="Doctor" />
            <ConversationHeader.Content userName="Doctor" />
            <ConversationHeader.Actions>
              <VideoCallButton />
              <InfoButton />
            </ConversationHeader.Actions>
          </ConversationHeader>
          <MessageList
            scrollBehavior="smooth"
            typingIndicator={<TypingIndicator content="Doctor is typing" />}
          >
            {messages.map((m, i) => (
              <Message key={i} model={m} />
            ))}
          </MessageList>
          <MessageInput
            placeholder="Type message here"
            onSend={handleSend}
            onChange={setMsgInputValue}
            value={msgInputValue}
            ref={inputRef}
          />
        </ChatContainer>
      </MainContainer>
    </div>
  );
}
