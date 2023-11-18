const {UserModel} = require("../schemas/user.schema")
class UserService{
    static #instance = null;

  static getInstance() {
    if (!UserService.#instance) {
      UserService.#instance = new UserService();
    }
    return UserService.#instance;
  }
    async updateOrInsertUser(userData, interaction) {
        try {
        console.log(userData);
          // Find the user by userId
          const existingUser = await UserModel.findOne({ userId: userData.userId });
      
          if (existingUser) {
            // If the user exists, update their information
            await User.updateOne({ userId: userData.userId }, userData);
            const userEmbed = createUserEmbed(userData.erName, userData.characters, userData.rank);
            return interaction.reply({embeds: [userEmbed]})
          } else {
            // If the user doesn't exist, insert a new user
            const newUser = new UserModel(userData);
            await newUser.save();
            const userEmbed = createUserEmbed(userData.erName, userData.characters, userData.rank);
            return interaction.reply({embeds: [userEmbed]})
          }
        } catch (err) {
          console.error("Error updating/inserting user:", err);
          // Handle the error accordingly
        }
      }
      async findUserById(userId, interaction) {
        try {
          // Assuming UserModel is your Mongoose model
          const foundUser = await UserModel.findOne({ userId: userId });
      
          if (foundUser) {
            console.log("Found user:", foundUser);
            const userEmbed = createUserEmbed(
              foundUser.erName,
              foundUser.characters,
              foundUser.rank
            );
            await interaction.reply({ embeds: [userEmbed] });
          } else {
            console.log("User not found");
            await interaction.reply(
              "내전 정보없음\n /내전정보 를 이용해 정보를 먼저 입력해주세요!"
            );
          }
        } catch (err) {
          console.error("Error finding user:", err);
          // Handle the error accordingly, like replying with an error message
          await interaction.reply(
            "An error occurred while fetching user information."
          );
        }
      }
}

module.exports = UserService.getInstance();