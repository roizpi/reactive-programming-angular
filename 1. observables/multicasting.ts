
// function receiving an observer.
const sequence = function(obs) {
    const values = ['a', 'b', 'c'];
    let timeoutId;

    // delayed sequence.
    function doSequence(arr, index) {
        timeoutId = setTimeout( () => {
                obs.next(arr[index]);
                if (index === arr.length -1)
                    obs.complete();
                else
                    doSequence(arr, index++);
            }, 100
        );
    }

    doSequence(values, 0);

    // unsubscribe must clear the timeout to stop execution.
    return {
        unsubscribe() { clearTimeout(timeoutId); }
    }

};

// create new observable to publish the sequence.
const myObservable = new Observable(sequence);

// subscribe to the observable
myObservable.subscribe({
    next(x) { console.log('Subscriptor #1: ' + x); },
    complete() { console.log('Sequence Subscriptor #1 finished'); }
});

// 0.5 sec later second flow is started (second subscriptor)
setTimeout(() => {
    myObservable.subscribe({
        next(x) { console.log('Subscriptor #2: ' + x); },
        complete() { console.log('Sequence Subscriptor #2 finished'); }
    });
}, 500);

