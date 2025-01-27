import Sidebar from "../../components/Home/Sidebar";
import FirstChatSection from "../../components/Home/firstChat";

const FirstChat = () => {
  return (
    <div className="flex flex-col md:flex-row h-screen w-full border-r-[0.2px] border-white">
      {/* Sidebar */}
      <div className="md:w-[20%] ">
        <Sidebar />
      </div>

      {/* Content Section */}
      <div className="w-full md:w-[80%] flex flex-col items-center justify-center h-full gap-5">
        <div className="text-white text-3xl font-bold text-center">
          What do you want to create today?
        </div>
        <FirstChatSection />
      </div>
    </div>
  );
};

export default FirstChat;
