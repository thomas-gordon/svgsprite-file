/**
 * Utility method to create an XML document object with a jQuery-like
 * interface for node manipulation.
 */

'use strict';

import cheerio from 'cheerio';

function loadXml(text) {
	return cheerio.load(text, {
		xmlMode: true
	});
}

export default  loadXml;
