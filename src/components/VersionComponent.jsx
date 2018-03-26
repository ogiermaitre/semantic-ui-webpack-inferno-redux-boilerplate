import { version } from 'inferno';

const showVersion = () => {
	alert(`The version is: ${version}!`);
}

export default () =>
	<div class='ui container segment padded header'>
		<p>This is an Inferno Boilerplate example using <em>Inferno {version}</em>.</p>
		<button onClick={showVersion}>Show version</button>
		<div style='height:1000px'></div>
	</div>

