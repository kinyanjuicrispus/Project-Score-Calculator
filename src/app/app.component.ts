import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'project-score';
  scores: any = [];
  //Inputs
  nrStuds: number = 0;
  psIOwt: number = 0;
  wlkThruWt: number = 0;
  essenMdlWt: number = 0;
  impMdlWt: number = 0;
  codeWt: number = 0;
  studId: number = 0;
  psIOScr: number = 0;
  wlkThruScr: number = 0;
  essenMdlScr: number = 0;
  impMdlScr: number = 0;
  codeScr: number = 0;

  //Outputs
  classAvg: number = 0;
  highScore: number = 0;
  highStud: number = 0;
  lowScore: number = 0;
  lowStud: number = 0;

  getGrade(average: number) {
    if (average > 0 && average <= 59.5) {
      return 'F';
    }

    if (average > 59.5 && average <= 69.5) {
      return 'D';
    }
    if (average > 69.5 && average <= 79.5) {
      return 'C';
    }
    if (average > 79.5 && average <= 89.5) {
      return 'B';
    }
    if (average > 89.5) {
      return 'A';
    }
    return;
  }

  save() {
    let total =
      this.psIO() +
      this.wlkThru() +
      this.essenMdl() +
      this.impMdl() +
      this.code();

    let grade = this.getGrade(total);

    this.scores.push({
      studentId: this.studId,
      weight: total,
      grade: grade,
    });

    if (this.scores.length == this.nrStuds) {
      this.computeSummary();
    }
    this.studId = 0;
    this.psIOScr = 0;
    this.impMdlScr = 0;
    this.wlkThruScr = 0;
    this.essenMdlScr = 0;
    this.impMdlScr = 0;
    this.codeScr = 0;
  }

  computeSummary() {
    let totalAv = 0;

    this.scores.forEach((score: any) => {
      totalAv += score.weight;
    });

    this.classAvg = totalAv / this.nrStuds;
    this.lowScore = this.getMin();
    this.highScore = this.getMax();
    this.lowStud = this.scores.filter(
      (x: any) => x.weight == this.lowScore
    )[0].studentId;
    this.highStud = this.scores.filter(
      (x: any) => x.weight == this.highScore
    )[0].studentId;
  }

  getMax() {
    var max = Math.max.apply(
      Math,
      this.scores.map(function (o: any) {
        return o.weight;
      })
    );

    return max;
  }

  getMin() {
    var min = Math.min.apply(
      Math,
      this.scores.map(function (o: any) {
        return o.weight;
      })
    );

    return min;
  }

  psIO() {
    return this.psIOScr * (this.psIOwt / 100);
  }

  wlkThru() {
    return this.wlkThruScr * (this.wlkThruWt / 100);
  }

  essenMdl() {
    return this.essenMdlScr * (this.essenMdlWt / 100);
  }

  impMdl() {
    return this.impMdlScr * (this.impMdlWt / 100);
  }
  code() {
    return this.codeScr * (this.codeWt / 100);
  }
}
