import { filter, map } from 'rxjs/operators';
import { Observable, pipe } from 'rxjs';

// usage of pipe() on the observable object.
const squareOdds = new Observable.of(1, 2, 3, 4, 5).pipe(
    filter((n: number) => n % 2 !== 0),
    map((n: number) => n * n)
);

// subscribe to trigger the sequence.
squareOdds.subscribe(x => console.log(x));


// merge two flows
const flowX = new Observable((obs) => {
    const values = [1, 2, 3, 4, 5, 6];
    let timeoutId;
    function doSequence(list, index) {
        timeoutId = setTimeout(() => {
            obs.next(list[index]);
            if (index === list.length -1) {
                obs.complete();
            } else {
                doSequence(list, index + 1);
            }
        }, 500);
    }
    doSequence(values, 0);

    return {
        unsubscribe() {
            clearTimeout(timeoutId);
        }
    }
});

const flowY = new Observable((obs) => {
    const values = ['a', 'b', 'c'];
    let timeoutId;
    function doSequence(list, index) {
        timeoutId = setTimeout(() => {
            obs.next(list[index]);
            if ( index === list.length -1) {
                obs.complete();
            } else {
                doSequence(list, index + 1);
            }
        }, 1000);
    }
    doSequence(values, 0);

    return {
        unsubscribe() {
            clearTimeout(timeoutId);
        }
    }
});

// outputs: 1,a,2,3,b,4,5,c,6
let observableMerge = flowX.merge(flowY);
observableMerge.subscribe(x => console.log(x));