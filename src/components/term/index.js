import { h, Component } from 'preact';
import 'xterm/dist/xterm.css';
import Terminal from 'xterm';

export default class Term extends Component {
	render() {
		return (
			<div id='terminal'></div>
		);
	};
			
	componentDidMount() {
		console.log('in business');
		console.log(Terminal);
		var xterm = new Terminal();
		console.log(xterm);
		xterm.open(document.getElementById('terminal'), true);
		xterm.write('Hello Wordl');
	};
}
