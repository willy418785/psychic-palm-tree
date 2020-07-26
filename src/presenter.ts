import { View } from "./view";

export class Presenter {
  view: View;
  constructor() {
    this.view = new View(this);
  }

  UserInput(start, end): never {
    throw new Error("not Implemented");
  }
}
