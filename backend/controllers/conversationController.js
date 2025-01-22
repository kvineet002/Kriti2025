const Chat = require("../models/chat");
const UserChat = require("../models/userChat");

const newChat = async (req, res) => {
  const { text, email } = req.body;

  try {
    // CREATE A NEW CHAT
    const newChat = new Chat({
      email: email,
      history: [{ role: "user", parts: [{ text }] }],
    });

    const savedChat = await newChat.save();

    // CHECK IF THE USERCHATS EXISTS
    const userChats = await UserChat.findOne({ email: email });

    if (!userChats) {
      // IF DOESN'T EXIST, CREATE A NEW ONE AND ADD THE CHAT IN THE CHATS ARRAY
      const newUserChats = new UserChat({
        email: email,
        chats: [
          {
            _id: savedChat._id,
            title: text.substring(0, 40),
          },
        ],
      });

      await newUserChats.save();
    } else {
      // IF EXISTS, PUSH THE CHAT TO THE EXISTING ARRAY
      await UserChat.updateOne(
        { email: email },
        {
          $push: {
            chats: {
              _id: savedChat._id,
              title: text.substring(0, 40),
            },
          },
        }
      );
    }

    // SEND THE RESPONSE WITH THE CHAT ID
    res.status(201).send(savedChat._id);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error creating chat!");
  }
};
const getChatsHistory = async (req, res) => {
  const { email } = req.params;

  try {
    const userChats = await UserChat.find({ email: email });

    if (!userChats) {

      res.status(404).send("No chats found!");
    }
    // console.log(userChats[0].chats);
    res.status(200).send(userChats[0]);
  }
  catch (err) {
    console.error(err);
    res.status(500).send("Error getting chats!");
  }
}


const getChat = async (req, res) => {
  const { email } = req.query;
  const { id } = req.params;

  try {
    const chat = await Chat.findOne({ _id: id,email:email });
   
    res.status(200).send(chat);
  } catch (err) {
    console.error(err);
    res.status(500).send("Error fetching chat!");
  }
};

const updateChat= async (req, res) => {
  const {email} = req.query;

  const { question, answer } = req.body;

  const newItems = [
    ...(question
      ? [{ role: "user", parts: [{ text: question }] }]
      : []),
    { role: "model", parts: [{ text: answer }] },
  ];

  try {
    const updatedChat = await Chat.updateOne(
      { _id: req.params.id, email: email },
      {
        $push: {
          history: {
            $each: newItems,
          },
        },
      }
    );
    res.status(200).send(updatedChat);
  } catch (err) {
    console.log(err);
    res.status(500).send("Error adding conversation!");
  }
}

module.exports = { newChat, getChatsHistory, getChat, updateChat };
