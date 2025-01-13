// import { JSDOM } from 'jsdom';
// import DOMPurify from 'dompurify';

// const window = new JSDOM('').window;
// // Create DOMPurify instance using createDOMPurify
// const purify = DOMPurify(window);

// purify.addHook('afterSanitizeAttributes', function (node) {
//   if ('target' in node) {
//     node.setAttribute('target', '_blank');
//     node.setAttribute('rel', 'noopener noreferrer');
//   }
// });

// export function cleanHtmlData(content: string) {
//   return purify.sanitize(content);
// }

import { JSDOM } from 'jsdom';
import { DOMWindow } from 'jsdom';

// eslint-disable-next-line @typescript-eslint/no-require-imports
const DOMPurify = require('dompurify');

const jsdom = new JSDOM('');
const window = jsdom.window as unknown as DOMWindow;
const purify = DOMPurify(window);

purify.addHook('afterSanitizeAttributes', function (node) {
  if ('target' in node) {
    node.setAttribute('target', '_blank');
    node.setAttribute('rel', 'noopener noreferrer');
  }
});

export function cleanHtmlData(content: string) {
  return purify.sanitize(content);
}
