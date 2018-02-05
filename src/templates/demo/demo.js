/**
 * Amaranth Skeleton (http://github.com/amaranth-framework/aurelia-skeleton/)
 *
 * @link      http://github.com/amaranth-framework/aurelia-skeleton/ for the canonical source repository
 * @copyright Copyright (c) 2007-2016 IT Media Connect (http://itmediaconnect.ro)
 * @license   http://github.com/amaranth-framework/aurelia-skeleton/LICENSE MIT License
 */

import 'highlight.js/styles/github.css';
import hljs from 'highlight.js/lib/highlight';
import * as xml from 'highlight.js/lib/languages/xml';
import * as js from 'highlight.js/lib/languages/javascript';


import { Template } from 'features/view/template';

/**
 * Home Template (Demo)
 */
export class TDemo extends Template {
    /**
     * @see View::attached()
     */
    attached() {
        hljs.registerLanguage('xml', xml);
        hljs.registerLanguage('javascript', js);
        setTimeout(() => {
            $('pre code').each(function(i, block) {
                hljs.highlightBlock(block);
            });
        }, 200);
    }
}
