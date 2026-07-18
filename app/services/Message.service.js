class MessageService {
  constructor(client) {
    this.Message = client.db().collection("messages");
  }

  async create(payload) {
    const message = {
      text: payload.text,
      sender: payload.sender,
      senderName: payload.senderName,
      createdAt: new Date(),
    };
    const result = await this.Message.insertOne(message);
    return { _id: result.insertedId, ...message };
  }

  async findAll() {
    const cursor = await this.Message.find({}).sort({ createdAt: 1 });
    return await cursor.toArray();
  }
}

module.exports = MessageService;