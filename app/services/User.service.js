class UserService {
  constructor(client) {
    this.User = client.db().collection("users");
  }

  extractUserData(payload) {
    const user = {
      username: payload.username,
      password: payload.password,
    };
    // Remove undefined fields
    Object.keys(user).forEach(
      (key) => user[key] === undefined && delete user[key],
    );
    return user;
  }

  async create(payload) {
    const user = this.extractUserData(payload);
    const result = await this.User.insertOne(user);
    return { _id: result.insertedId, username: user.username };
  }

  async findByUsername(username) {
    return await this.User.findOne({ username });
  }
}

module.exports = UserService;