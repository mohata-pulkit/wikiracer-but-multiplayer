import * as React from "react";
import Footer from "./footer";
import Navbar from "./navbar";

export class Layout extends React.Component {
	render() {
		return (
			<div>
				<Navbar />
				{this.props.children}
				<Footer />
			</div>
		);
	}
}
