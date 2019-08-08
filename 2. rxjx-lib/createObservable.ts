/**
 * Create observable using a counter.
 */
import {interval} from 'rxjs';


// emit value in sequence every 1 second
const counter = interval(1000);

// subscribed to emit the values every second
// output: 0,1,2,3,4,5....
counter.subscribe(
    s => console.log('s{n} seconds elapsed')
);