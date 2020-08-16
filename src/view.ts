import { Presenter } from "./presenter";

export class View {
  downTime = 0;
  upTime = 0;
  presenter: Presenter;

  constructor(presenter: Presenter) {
    this.presenter = presenter;
    this.initListener();
    this.initGameEventRelatedListener();
  }

  initListener() {
    document.addEventListener("keydown", keydown_event_handler);
    document.addEventListener("keyup", keyup_event_handler);

    let self = this;
    function keydown_event_handler() {
      let now: number = new Date().getTime();

      if (self.upTime > self.downTime) {
        self.downTime = now;
      }
    }
    function keyup_event_handler() {
      let now: number = new Date().getTime();
      self.upTime = now;

      self.presenter.keystrokeInputed(self.downTime, self.upTime);
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
