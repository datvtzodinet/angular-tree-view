import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class AppTreeService {
  private selectedUnit$: BehaviorSubject<string | undefined> = new BehaviorSubject<string | undefined>(undefined);

  constructor() {
  }

  setSelectedUnit(unit: string | undefined): void {
    this.selectedUnit$.next(unit);
  }

  getSelectedUnit(): Observable<string | undefined> {
    return this.selectedUnit$.asObservable();
  }
}
