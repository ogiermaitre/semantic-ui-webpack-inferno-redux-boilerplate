import {version} from 'inferno';

function showVersion() {
	alert(`The version is: ${ version }!`);
}

export default function VersionComponent() {
	return (
		<div class="ui container segment padded header">
			<p>This is an Inferno Boilerplate example using <em>Inferno { version }</em>.</p>
			<button onClick={ showVersion }>Show version</button>
			<div style='height:500px'></div>
		</div>
	);
}
