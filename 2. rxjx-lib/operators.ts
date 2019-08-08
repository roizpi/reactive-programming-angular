import { filter, map } from 'rxjs/operators';
import { Observable, pipe } from 'rxjs';


// create the observable.
const numbers = new Observable.of(1, 2, 3, 4, 5);

// transforms the old flow into a new one, two times consecutively.
const squareValuesOdd = pipe(
    filter((n: number) => n % 2 !== 0),
    map((n: number) => n * n)
);

const squaresOdd = squareValuesOdd(numbers);

// will outout the odd squares of each number of the first flow.
// output: 1, 9, 25
squaresOdd.subscribe(x => console.log(x));
