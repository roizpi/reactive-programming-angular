/**
 * Observable with constructor.
 */

// function receiving an observer. will send it three values.
const sequence = function(obs) {

    // will send three values in a synced manner.
    obs.next('a');
    obs.next('b');
    obs.next('c');
    obs.complete();

    return {
        unsubscribe() {}
    };
};

// create observable.
const myObservable = new Observable(sequence);

// triggers the observable, passing the handlers.
myObservable.subscribe(
    x => console.log('Observer gets: ' + x),
    err => console.error('Observer gets error: ' + err),
    () => console.log('Observer work completed')
);

