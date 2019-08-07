/**
 * Observable with static method.
 */

// observable with 3 values (publisher).
const myObservable = Observable.of('a', 'b', 'c');


// observer object (subscriber).
const myObserver = {
    next: x => console.log('Observer gets: ' + x),
    error: err => console.error('Observer gets error: ' + err),
    complete: () => console.log('Observer work completed')
};

// subscribes to the observable, and executes the code.
myObservable.subscribe(myObserver);