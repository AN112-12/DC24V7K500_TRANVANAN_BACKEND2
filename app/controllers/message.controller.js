const MongoDB = require("../utils/mongodb.util");
const MessageService = require("../services/message.service");
const ApiError = require("../api-error");

exports.findAll = async (req, res, next) => {
  try {
    const messageService = new MessageService(MongoDB.client);
    const messages = await messageService.findAll();

    const result = messages.map((m) => ({
      id: m._id,
      text: m.text,
      sender: String(m.sender) === String(req.userId) ? "me" : "them",
      senderName: m.senderName,
      createdAt: m.createdAt,
    }));

    return res.send(result);
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while retrieving messages"),
    );
  }
};

exports.create = async (req, res, next) => {
  if (!req.body?.text) {
    return next(new ApiError(400, "Message text can not be empty"));
  }

  try {
    const messageService = new MessageService(MongoDB.client);
    const message = await messageService.create({
      text: req.body.text,
      sender: req.userId,
      senderName: req.username,
    });

    return res.send({
      id: message._id,
      text: message.text,
      sender: "me",
      senderName: message.senderName,
      createdAt: message.createdAt,
    });
  } catch (error) {
    return next(
      new ApiError(500, "An error occurred while creating the message"),
    );
  }
};