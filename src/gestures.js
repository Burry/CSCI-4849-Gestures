// Import jQuery
import $ from 'jquery';

// Import stylesheets
import 'systematize';
import './style.scss';

// Variables
const mousePosition = {};
let clicks = 0;

// Result functions
const setResult = result => $('#gestureResult').text(result);
const setSwipeResult = result => setResult(`Swipe ${result}`);

// Function that returns a function which sets the pointer position
// from the event object and handles a callback to set the result
const setPointerPosition = (direction, next) => event => {
    const { changedTouches } = event;
    const resolve = () =>
        setResult(`${changedTouches ? 'Touch' : 'Mouse'} ${direction}`);
    const { pageX, pageY } = changedTouches ? changedTouches[0] : event;
    mousePosition[direction] = { x: pageX, y: pageY };
    return typeof next === 'function' ? next(resolve) : resolve();
};

// Functions for handling pointer up/down events
const pointerDown = setPointerPosition('down');
const pointerUp = setPointerPosition('up', resolve => {
    const { down, up } = mousePosition;
    if (up.x < down.x) setSwipeResult('left ←');
    else if (up.x > down.x) setSwipeResult('right →');
    else resolve();
});

// Functions for handling repeated clicks
const resetClicks = () => {
    clicks -= 1;
};
const click = () => {
    clicks += 1;
    setTimeout(resetClicks, 500);
    switch (clicks) {
        case 3:
            return setResult('Triple click');
        case 4:
            return setResult('Quadruple click');
        case 5:
            return setResult('Quintuple click');
        case 6:
            return setResult('Sextuple click');
        case 7:
            return setResult('Septuple click');
        case 8:
            return setResult('Octuple click');
        default:
            return null;
    }
};
const dblClick = () => setResult('Double click');

// Attach event handlers to gesture area
$('#gestureArea')
    .mousedown(pointerDown)
    .mouseup(pointerUp)
    .bind('touchstart', pointerDown)
    .bind('touchend', pointerUp)
    .click(click)
    .dblclick(dblClick);
