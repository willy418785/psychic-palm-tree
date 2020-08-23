export class KeystrokeHandler {
  minimal_valid_duration: number;
  previous_stroke: string;
  classes = [".", "_"];

  constructor() {
    this.minimal_valid_duration = 300;
    this.previous_stroke = "";
  }

  newStroke(duration: number): string {
    const classIndex: number = this.strokeClassifier(duration);
    let strokeClass: string;
    if (isNaN(classIndex)) {
      this.previous_stroke = "";
      strokeClass = "";
    } else {
      strokeClass = this.classes[classIndex];
    }

    const stroke_array: string = this.previous_stroke + strokeClass;
    this.previous_stroke = stroke_array;
    return stroke_array;
  }

  strokeClassifier(duration): number {
    let class_: number = NaN;
    if (duration < this.minimal_valid_duration) {
      class_ = 0;
    } else {
      class_ = 1;
    }

    return class_;
  }
}
