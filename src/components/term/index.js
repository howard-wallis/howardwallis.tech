import { h, Component } from 'preact';
import 'xterm/dist/xterm.css';
import Terminal from 'xterm';
import 'xterm/dist/addons/fullscreen/fullscreen.js';
import 'xterm/dist/addons/fullscreen/fullscreen.css';

export default class Term extends Component {
	render() {
		return (
			<div id='terminal' />
		);
	};
			
	componentDidMount() {
		Terminal.loadAddon('fullscreen');
		var xterm = new Terminal();
		xterm.open(document.getElementById('terminal'), true);
		xterm.write('Hello Wordl');

		xterm.toggleFullscreen();
	};
}
