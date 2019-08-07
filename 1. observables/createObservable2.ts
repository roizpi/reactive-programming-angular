/**
 * Observable with static method. Omitting observer object.
 */

// observable (publisher) with 3 values.
const myObservable = Observable.of('a', 'b', 'c');

// triggers the observable, passing the three callback methods directly.
myObservable.subscribe(
    x => console.log('Observer gets: ' + x),
    err => console.error('Observer gets error: ' + err),
    () => console.log('Observer work completed')
);