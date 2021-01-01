import { Component, OnInit, ViewChild, AfterViewInit } from '@angular/core';

import { fromEvent, interval, of } from 'rxjs';
import { switchMap, map, mapTo, scan, takeUntil, mergeMap, delay, take} from 'rxjs/operators';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
  title = 'angular-rxjs';


  @ViewChild('btn') btn;

  ngOnInit(): void {

  }

  ngAfterViewInit(): void {

    this.func004();
  }


  func001(): void {
    fromEvent(document, 'click')
      .pipe(
        mapTo(2), // eventオブジェクトを1に変換
        scan((count, click) => count + 2 * click, 0) // countに1を加算する。countの初期値は0
      )
      .subscribe(count => console.log(`Clicked ${count} times`));
  }

  func002(): void {
    interval(1000)
      .pipe(takeUntil(fromEvent(document, "click")))
      .subscribe((x) => console.log(x))
  }

  func003(): void {
    fromEvent(this.btn.nativeElement, 'click')
      .pipe(
        mapTo(1),
        scan((acc, click) => acc + click, 0))
      .subscribe(acc => console.log(`Clicked ${acc} times`));
  }

  func004(): void {

    let mouseDown$ = fromEvent(this.btn.nativeElement, 'mousedown');
    let mouseMove$ = fromEvent(this.btn.nativeElement, 'mousemove');
    let mouseUp$ = fromEvent(this.btn.nativeElement, 'mouseup');

    const select$ = mouseDown$.pipe(
      mergeMap(down => mouseMove$.pipe(takeUntil(mouseUp$))));

    select$.subscribe((x) => console.log(x.type))

  }

}
