export class KeystrokeHandler {
  minimal_valid_duration: number;
  max_offset: number;
  previous_stroke: string;
  max_multiplier: number;
  classes = [".", "_"];

  constructor() {
    this.minimal_valid_duration = 300;
    this.max_offset = 80;
    this.previous_stroke = "";
    this.max_multiplier = 2;
  }

  newStroke(duration: number): string {
    const classIndex: number = this.strokeClassifier(duration);
    let strokeClass: string;
    if (isNaN(classIndex)) {
      this.previous_stroke = "";
      strokeClass = "";
    } else {
      strokeClass = this.classes[classIndex - 1];
    }

    const stroke_array: string = this.previous_stroke + strokeClass;
    this.previous_stroke = stroke_array;
    return stroke_array;
  }

  strokeClassifier(duration): number {
    let class_: number = NaN;
    for (let multiplier = 1; multiplier <= this.max_multiplier; multiplier++) {
      const base = multiplier * this.minimal_valid_duration;
      const lower_bound = base - this.max_offset;
      const upper_bound = base + this.max_offset;

      if (duration > lower_bound && duration < upper_bound) {
        class_ = multiplier;
        break;
      }
    }

    return class_;
  }
}
