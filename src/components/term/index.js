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
		let term = new Terminal();
		term.open(document.getElementById('terminal'));
		term.focus();
		term.toggleFullScreen();

		// Hide scrollbar
		var viewport = document.querySelector('.xterm-viewport');
		viewport.setAttribute('style', 'overflow: hidden');

		init(term);

		term.on('key', keyHandler);
		// term.on('lineFeed', () => { });
	}

	render() {
		return (
			<div id="terminal" />
		);
	}
}
