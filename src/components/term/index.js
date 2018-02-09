import { h, Component } from 'preact';
import 'xterm/dist/xterm.css';
import Terminal from 'xterm';
import 'xterm/dist/addons/fullscreen/fullscreen.js';
import 'xterm/dist/addons/fullscreen/fullscreen.css';
import { init, keyHandler } from './termUtils';

export default class Term extends Component {
	componentDidMount() {
		Terminal.loadAddon('fullscreen');
		let term = new Terminal();
		term.open(document.getElementById('terminal'), true);
		term.toggleFullscreen();
		
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
