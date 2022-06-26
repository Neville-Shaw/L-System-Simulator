class Branch {
  constructor(begin, end) {
    this.end = end;
    this.begin = begin;

    // BranchLength is declared in genLsystem
    this.len = branchLength;

    // gives random RGB values in case rainbow is true
    this.r = random(255, 0);
    this.g = random(255, 0);
    this.b = random(255, 0);
  }

  show() {
    if (rainbow) {
      stroke(this.r, this.g, this.b);
    } else {
      stroke(0, 230, 0, 100);
    }
    line(this.begin.x, this.begin.y, this.end.x, this.end.y);
  }

  newBranch() {
    let straight = createVector(this.end.x, this.end.y - this.len);

    let dir = p5.Vector.sub(straight, this.end);
    dir.rotate(angle);

    let newEnd = p5.Vector.add(this.end, dir);
    let p = new Branch(this.end, newEnd, angle);

    return p;
  }
}
