import dynamic from "next/dynamic";
import * as React from "react";
import Navbar from "./navbar";

const Footer = dynamic(() => import("./footer"), { ssr: false });

export class Layout extends React.Component {
	render() {
		return (
			<div className="relative min-h-screen h-full">
				<Navbar pageProps={""} />
				{this.props.children}
				<Footer />
			</div>
		);
	}
}
