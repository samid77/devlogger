import { Injectable } from '@angular/core';
import { Log } from '../models/Log';
import { BehaviorSubject, Observable, of } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class LogService {
  logs: Log[];

  private logSource = new BehaviorSubject<Log>({id: null, text: null, date: null});
  public selectedLog = this.logSource.asObservable();

  private stateSource = new BehaviorSubject<Boolean>(true);
  public stateClear = this.stateSource.asObservable();

  constructor() {
    this.logs = [
      // {id: '1', text: 'Generated components', date: new Date('01/20/2019 14:21:53')},
      // {id: '2', text: 'Added Bootstrap', date: new Date('02/20/2019 14:21:53')},
      // {id: '3', text: 'Construct services', date: new Date('03/20/2019 14:21:53')}
    ];
  }

  getLogs(): Observable<Log[]> {
    if (localStorage.getItem('logs') === null) {
      this.logs = [];
    } else {
      this.logs = JSON.parse(localStorage.getItem('logs'));
    }
    return of(this.logs.sort((a,b) => {
      return b.date - a.date;
    }));
  }

  setFormLog(log: Log) {
    this.logSource.next(log);
  }

  addLog(log: Log) {
    this.logs.unshift(log);
    // console.log(`New Log ${log}`);

    /** Add to local storage */
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  updateLog(log: Log) {
    this.logs.forEach((curr, index) => {
      if (log.id === curr.id) {
        this.logs.splice(index, 1);
      }
    });
    this.logs.unshift(log);

    /** Update Local Storage */
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  deleteLog(log: Log) {
    this.logs.forEach((curr, index) => {
      if (log.id === curr.id) {
        this.logs.splice(index, 1);
      }
    });

    /** Delete from Local Storage */
    localStorage.setItem('logs', JSON.stringify(this.logs));
  }

  clearState() {
    this.stateSource.next(true);
  }
}
