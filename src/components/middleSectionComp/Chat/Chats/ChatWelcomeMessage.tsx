const ChatWelcomeMessage = () => {
  return (
    <div className="w-full">
      <div className="w-full self-center max-w-[400px] my-8 px-8 mx-auto">
        <div className="flex flex-col">
          <span className="mb-2 leading-9 font-extrabold text-[31px] text-left">
            Welcome to your inbox!
          </span>
          <span className="mb-7 text-left">
            Drop a line, share Tweets and more with private conversations
            between you and others on Twitter.
          </span>
          <a
            href="/messages/compose"
            className="flex items-center w-fit px-8 min-w-52px min-h-52px bg-primary-base rounded-full hover:bg-primary-dark duration-200"
          >
            <span className="text-white font-bold">Write a message</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default ChatWelcomeMessage;
