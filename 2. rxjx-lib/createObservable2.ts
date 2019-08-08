/**
 * Create observable using an event.
 */
import { fromEvent } from 'rxjs';

const element = document.getElementById('elementid');

// create observable to publish events when hovering over the element
const mouseMoves = fromEvent(element, 'mousemove');

mouseMoves.subscribe(
    (evt: MouseEvent) => console.log('Coordenadas: ${evt.clientX} x ${evt.clientY')
);