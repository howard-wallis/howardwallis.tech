import { h, Component } from 'preact';

import { Terminal } from 'xterm';
import 'xterm/dist/xterm.css';
import * as fullscreen from 'xterm/lib/addons/fullscreen/fullscreen';
import 'xterm/lib/addons/fullscreen/fullscreen.css';

import './style.css';
import { init, keyHandler } from './termUtils';

export default class Term extends Component {
	componentDidMount() {
		Terminal.applyAddon(fullscreen);
		let term = new Terminal({
			cursorBlink: true,
			cursorStyle: 'underline',
			screenReaderMode: true,
			fontWeight: 600,
			fontWeightBold: 800,
			fontSize: 16
		});
		term.open(document.getElementById('terminal'));
		term.focus();
		term.toggleFullScreen();

		// Hide scrollbar
		var viewport = document.querySelector('.xterm-viewport');
		viewport.setAttribute('style', 'overflow: hidden');

		init(term);

		term.on('key', keyHandler);
	}

	render() {
		return (
			<div id="terminal" />
		);
	}
}
