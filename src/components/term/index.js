import { h, Component } from 'preact';
import 'xterm/dist/xterm.css';
import Terminal from 'xterm';
import 'xterm/dist/addons/fullscreen/fullscreen.js';
import 'xterm/dist/addons/fullscreen/fullscreen.css';
import { termUtils } from './termUtils';

export default class Term extends Component {
	render() {
		return (
			<div id='terminal' />
		);
	};
			
	componentDidMount() {
		Terminal.loadAddon('fullscreen');
		this.setState({
			term: new Terminal(),
			currentLine: ''
		});
		var term = this.state.term;
		term.open(document.getElementById('terminal'), true);
		term.toggleFullscreen();
		term.writeln('Hello Wordl');
		term.write(termUtils.printPrompt());

		console.log("test", termUtils, termUtils.keyHandler);


		term.on('refresh', data => {
			// this.forceUpdate();
			// console.log('refresh');
		});

		term.on('lineFeed', () => {
			console.log('lineFeed', this.state.currentLine);
			this.setState({
				currentLine: ''
			});
		});

		// term.on('key', (key, e) => {
		// 	console.log(e.key);
		// 	switch(e.key) {
		// 		case 'Enter':
		// 			term.writeln('');
		// 			break;
		// 		case 'Backspace':
		// 			term.refresh(0,999);
		// 			console.log("refresh");
		// 			this.setState({
		// 				currentLine: this.state.currentLine.slice(0, -1)
		// 			});
		// 			break;
		// 		default:
		// 			term.write(key);
		// 			this.setState({
		// 				currentLine: this.state.currentLine += key
		// 			});
		// 			break;
		// 	}
		// });

		term.on('key', (key, e) => termUtils.keyHandler(key, e, term));

		term.on('data', data => {
			// console.log('data', data);
		});
	};
}
