import {Observable, interval, of} from 'rxjs';
import {startWith, filter, take, mergeMap, tap, map} from 'rxjs/operators';

/*     *     *
 * Operators *
 *     *     */


/* ------------ */
/* Combination */
const secondsCounter = interval(1000);

// Starts with -3, -2...
const example = secondsCounter.pipe(startWith(-3, -2));

// output: -3, -2, -1, 0, 1, 2, 3, 4...
example.subscribe(x => console.log(x));


/* ------------ */
/*  Filtering: filter() */
const src = of(1, 2, 3, 4, 5);

// Filters not even numbers.
const example2 = src.pipe(filter((num: number) => num % 2 === 0));
const subscribe = example2.subscribe(val => console.log(val));

/*  Filtering: take() */
const secondsCounter2 = interval(1000);

// Filters first 5 numbers.
const example3 = secondsCounter(take(5));
example3.subscribe(x => console.log(x));



/* ------------ */
/* Transformation */

const src2 = of('What\'s');

// Maps to the inner observable and flatten.
const example4 = src2.pipe(mergeMap(val => of('${val} up!')));

// output: "What's up!"
const subscriptor = example4.subscribe(val => console.log(val));




/* ------------ */
/* Utility */
const src3 = of(1,2,3);

const example5 = src3.pipe(
    tap(val => console.log('Before the map: ' + val)),
    map(val => val +10),
    tap(val => console.log('After the map: ' + val))
);

// output: Before the map: 1, After the map: 11, 11
const subscriptor2 = example5.subscribe(val => console.log(val));