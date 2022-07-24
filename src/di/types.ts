export const TYPES = {
  PlainDb: Symbol.for("PlainDb"),
  SocketHandlerFactory: Symbol.for("SocketHandlerFactory"),
  SocketServer: Symbol.for("SocketServer"),
  MessageHandlerInterface: Symbol.for("MessageHandlerInterface"),
  MessagePersistenceInterface: Symbol.for("MessagePersistenceInterface"),
  MessageValidationInterface: Symbol.for("MessageValidationInterface"),
  SettingsInterface: Symbol.for("SettingsInterface"),
  UserIdentityPersistenceInterface: Symbol.for("UserIdentityPersistenceInterface"),
  UserIdentityValidationInterface: Symbol.for("UserIdentityValidationInterface"),
  UsersLimit: Symbol.for("UsersLimit"),
  MessageMinLength: Symbol.for("MessageMinLength"),
  MessageMaxLength: Symbol.for("MessageMaxLength"),
};
