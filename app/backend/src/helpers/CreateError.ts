export default class CreateError extends Error {
  constructor(public name: string, public message: string) {
    super(message);
    super.name = name;
  }
}
