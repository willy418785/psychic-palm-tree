import { Presenter } from "./presenter";

export class View {
  down_time = 0;
  up_time = 0;
  presenter: Presenter;
  constructor(presenter: Presenter) {
    this.presenter = presenter;
    this.init_listener();
    this.initGameEventRelatedListener();
  }

  init_listener() {
    document.addEventListener("keydown", keydown_event_handler);
    document.addEventListener("keyup", keyup_event_handler);

    let self = this;
    function keydown_event_handler() {
      let now: number = new Date().getTime();

      if (self.up_time > self.down_time) {
        self.down_time = now;
      }
    }
    function keyup_event_handler() {
      let now: number = new Date().getTime();
      self.up_time = now;

      self.presenter.UserInput(self.down_time, self.up_time);
    }
  }

  initGameEventRelatedListener() {
    document.getElementById("enter-button").addEventListener("click", formPlayer);
    document.getElementById("request-button").addEventListener("click", requestForGameEvent);

    let self = this;
    function requestForGameEvent(): void {
      self.presenter.requestForGameEvent();
    }
    function formPlayer(): void {
      self.presenter.formPlayer();
    }
  }
}
