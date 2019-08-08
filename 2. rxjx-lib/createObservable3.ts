/**
 * Create observable using an AJAX request.
 */
import { ajax } from 'rxjx/ajax';

const apiData = ajax('/api/data');

// subscribes and receives the data.
apiData.subscribe(res => console.log(res.status, res.response));