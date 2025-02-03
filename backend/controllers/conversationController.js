const { model } = require("../llm/gemini");
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

    const result = await model.generateContent(text);
    const response = await result.response;
    const generateTitle = response.text();
    
    console.log(generateTitle);
    if (!userChats) {
      const newUserChats = new UserChat({
        email: email,
        chats: [
          {
            _id: savedChat._id,
            title: generateTitle,
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
              title: generateTitle,
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
const deleteChat = async (req, res) => {
  const { email } = req.query;
  const { id } = req.params;

  try {
    
    const deletedChat = await Chat.findOneAndDelete({ _id: id,email:email });
    console.log(deletedChat);

    // REMOVE CHAT REFERENCE FROM USERCHATS
    await UserChat.updateOne(
      { email: email },
      { $pull: { chats: { _id: id } } }
    );

    res.status(200).send("Chat deleted successfully!");
  } catch (err) {
    console.error(err);
    res.status(500).send("Error deleting chat!");
  }
};

const shareChat = async (req, res) => {
  const { email } = req.body;
  const { id } = req.params;
  const { isPublic } = req.body;

  try {
    const chat = await Chat.findOne({ _id: id,email:email });
    if (!chat) {
      res.status(404).send("Chat not found!");
    }

    chat.isPublic =isPublic;
    await chat.save();
    console.log("Chat status changed to", chat.isPublic);
    res.status(200).send("Chat shared successfully!");
  }
  catch (err) {
    console.error(err);
    res.status(500).send("Error sharing chat!");
  }

}
const checkPublic=  async (req, res) => {
  try {
      const chat = await Chat.findOne({ _id: req.params.id });
      if (!chat) {
          res.status(404).send("Chat not found!");
      }
      res.status(200).send(chat.isPublic);
  }
  catch (err) {
      console.error(err);
      res.status(500).send("Error checking chat share!");
  }
}

const toggleFavourites = async (req, res) => {
  const { email } = req.body; // User's email
  const { chatId } = req.params; // Chat ID to be toggled

  try {
      // Find the user and update the chat's `isFavorite` field
      const userChats = await UserChat.findOne({ email });

      if (!userChats) {
          return res.status(404).json({ message: "User not found!" });
      }

      // Find the chat within the user's chats
      const chatIndex = userChats.chats.findIndex(chat => chat._id.toString() === chatId);

      if (chatIndex === -1) {
          return res.status(404).json({ message: "Chat not found!" });
      }

      // Toggle the `isFavorite` field
      userChats.chats[chatIndex].isFavorite = !userChats.chats[chatIndex].isFavorite;

      await userChats.save(); // Save changes

      return res.status(200).send(userChats.chats[chatIndex].isFavorite);
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error toggling chat in favourites!" });
  }
};
const checkFavourite = async (req, res) => {
  const { email } = req.body; // User's email
  const { chatId } = req.params; // Chat ID to check

  try {
      // Find the user
      const userChats = await UserChat.findOne({ email });

      if (!userChats) {
          return res.status(404).json({ message: "User not found!" });
      }

      // Find the chat within the user's chats
      const chat = userChats.chats.find(chat => chat._id.toString() === chatId);

      if (!chat) {
          return res.status(404).json({ message: "Chat not found!" });
      }

      // Return the favourite status
      return res.status(200).send( chat.isFavorite );
  } catch (err) {
      console.error(err);
      res.status(500).json({ message: "Error checking favourite status!" });
  }
};






module.exports = { newChat, getChatsHistory, getChat, updateChat, deleteChat, shareChat ,checkPublic,toggleFavourites,checkFavourite};
