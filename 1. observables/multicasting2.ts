


// recursive call until the last element is retrieved.
const doSequence = (observer, arr, index) => {
    return setTimeout(() => {
        observer.next(arr[index]);
        if (index === arr.length -1)
            observer.complete();
        else
            doSequence(observer, arr, index++);
    }, 1000)
};


const sequenceMultisubscriber = () => {
    const values = ['a', 'b', 'c'];
    const observers = [];
    let timeoutId;

    return (observer) => {
        // insert observer to the pool.
        observers.push(observer);

        // if there are observers, it send messages.
        // the first observer is the main observer which is the controller of all.
        if (observers.length === 1)
            timeoutId = doSequence({
                next(val) {
                    // triggers next() method for each observer in the pool.
                    observers.forEach(obs => { if (obs !== null) { obs.next(val) }});
                },
                // triggers complete() method for each observer in the pool.
                complete() {
                    observers.forEach(obs => { if (obs !== null) { obs.complete() }});
                }
            }, values, 0);

        // to unsubscribe, it retrieves each observer from the pool to assign a null value.
        return {
            unsubscribe() {
                let index = observers.indexOf(observer);
                observers[index] = null;

                // if all observers are null, it can remove the timeout (which is giving values with a minimum of one observer).
                if (observers.every(v => v === null))
                    clearTimeout(timeoutId);
            }
        }
    }
};

// create observer instance with sequenceMultisubscriber(), will return a subscriptor to control the multicasting.
const multicastSequence = new Observable(sequenceMultisubscriber());

// subscribe the first observer.
multicastSequence.subscribe({
    next(val) { console.log('Subscriptor #1: ' + val)},
    complete() { console.log('Subscriptor #1 finished')}
});

// wait 1.5s to next subscription.
setTimeout(() => {
    multicastSequence.subscribe({
        next(val) { console.log('Subscriptor #2 ' + val)},
        complete() { console.log('Subscriptor #2 finished')}
    });
}, 1500);
