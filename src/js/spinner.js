import { refs } from './refs';
import { Spinner } from 'spin.js';
const opts = {
  lines: 25, // The number of lines to draw
  length: 70, // The length of each line
  width: 20, // The line thickness
  radius: 45, // The radius of the inner circle
  scale: 1.35, // Scales overall size of the spinner
  corners: 1, // Corner roundness (0..1)
  speed: 0.7, // Rounds per second
  rotate: 10, // The rotation offset
  animation: 'spinner-line-shrink', // The CSS animation name for the lines
  direction: 1, // 1: clockwise, -1: counterclockwise
  color: '#fb6d3a', // CSS color or array of colors
  fadeColor: 'transparent', // CSS color or array of colors
  top: '48%', // Top position relative to parent
  left: '50%', // Left position relative to parent
  shadow: '0 0 1px transparent', // Box-shadow for the lines
  zIndex: 2000000000, // The z-index (defaults to 2e9)
  className: 'spinner', // The CSS class to assign to the spinner
  position: 'absolute', // Element positioning
};
const spinner = new Spinner(opts);

export function spinnerPlay() {
  spinner.spin(refs.spinner);
  refs.backdrop.classList.remove('hidden');
}
export function spinnerStop() {
  refs.backdrop.classList.add('hidden');
  spinner.stop();
}
