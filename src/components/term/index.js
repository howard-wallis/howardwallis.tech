import { h, Component } from 'preact';
import 'xterm/dist/xterm.css';
import { Terminal } from 'xterm';
import 'xterm/dist/addons/fullscreen/fullscreen.js';
import * as fullscreen from 'xterm/lib/addons/fullscreen/fullscreen';
import 'xterm/dist/addons/fullscreen/fullscreen.css';
import { init, keyHandler } from './termUtils';

export default class Term extends Component {
	componentDidMount() {
		console.log(Terminal);
		Terminal.applyAddon(fullscreen);
		let term = new Terminal();
		term.open(document.getElementById('terminal'));
		term.focus();
		term.toggleFullScreen();
		
		init(term);
		
		term.on('key', keyHandler);
		term.on('lineFeed', () => {});
	}

	render() {
		return (
			<div id="terminal" />
		);
	}
}
