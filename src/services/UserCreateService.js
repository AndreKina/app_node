class UserCreateService {
  constructor(userRepository) {
    // global context
    this.userRepository = userRepository
  }

  async execute({ name, email, password }) {
    // uses instantiated repository and its methods
    // dependency inversion => service does not know what database is in use, only knowns it must call findByEmail to get an user by its email

    this.userRepository.findByEmail
  }
}

module.exports = UserCreateService
