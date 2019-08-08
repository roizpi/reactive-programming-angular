import { filter, map } from 'rxjs/operators';
import { Observable, pipe } from 'rxjs';

// usage of pipe() on the observable object.
const squareOdds = new Observable.of(1, 2, 3, 4, 5).pipe(
    filter((n: number) => n % 2 !== 0),
    map((n: number) => n * n)
);

// subscribe to trigger the sequence.
squareOdds.subscribe(x => console.log(x));