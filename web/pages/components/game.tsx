import { NextPage } from "next";
import Link from "next/link";
import * as graphql from "../../generated/graphql";
import { Element } from "domhandler/lib/node";
import React, { useEffect, useState } from "react";
import parse, { HTMLReactParserOptions } from "html-react-parser";

const Game: React.FC = () => {
	function topFunction() {
		document.body.scrollTop = 0; // For Safari
		document.documentElement.scrollTop = 0; // For Chrome, Firefox, IE and Opera
	}
	window.addEventListener("keydown", (e) => {
		if (e.code === "KeyF" || (e.ctrlKey && e.code === "KeyF")) {
			e.preventDefault();
		}
	});

	const { data: lobby } = graphql.useLobbyFromTokenQuery();
	const [parseResponse, setParseResponse] = useState(null);
	const [parsed, setParsed] = useState(<div>hello</div>);
	const [article, setArticle] = useState("");
	const options = lobby?.lobbyFromToken?.options as string[];
	const parserOptions: HTMLReactParserOptions = {
		htmlparser2: {
			lowerCaseTags: true,
		},
		replace: (domNode) => {
			if (domNode instanceof Element && domNode.attribs) {
				if (options[1] == "true") {
					if (
						domNode.attribs.class !== "mw-parser-output" &&
						domNode.name !== "p" &&
						domNode.name !== "a" &&
						domNode.name !== "b" &&
						domNode.attribs.role !== "note"
					) {
						return <React.Fragment></React.Fragment>;
					}
				}
				if (domNode.attribs.style) {
					var data = domNode;
					data.attribs.style = data.attribs.style.replaceAll(
						/#[0-9a-f]{3,6}/gi,
						"transparent"
					);
				}
				if (
					domNode.attribs.class &&
					domNode.attribs.class.includes("ref")
				) {
					return <React.Fragment></React.Fragment>;
				}
				if (
					domNode.attribs.class &&
					domNode.attribs.class.includes("mw-editsection")
				) {
					return <React.Fragment></React.Fragment>;
				}
				if (
					domNode.attribs.class &&
					domNode.attribs.class.includes("toc")
				) {
					return <React.Fragment></React.Fragment>;
				}
				if (
					domNode.attribs.role &&
					domNode.attribs.role.includes("navigation")
				) {
					return <React.Fragment></React.Fragment>;
				}
				if (domNode.name === "style" && domNode.children.length > 0) {
					const data = domNode.children[0].data as string;
					console.log("original: " + data);
					console.log(/#[0-9a-f]{3,6}/gi.test(data));
					console.log(
						"changed: " +
							data.replaceAll(
								/background:#[0-9a-f]{3,6}/gi,
								"background:transparent"
							)
					);
					return (
						<style>
							{data
								.replaceAll(
									/background:#[0-9a-f]{3,6}/gi,
									"background:transparent"
								)
								.replaceAll(
									/background-color:#[0-9a-f]{3,6}/gi,
									"background-color:transparent"
								)}
						</style>
					);
				}
				if (domNode.name === "area") {
					delete domNode.attribs.href;
					return (
						<area
							className={
								domNode.attribs.class + " cursor-pointer"
							}
							{...domNode.attribs}
							onClick={() => setArticle(domNode.attribs.title)}
						/>
					);
				}
				if (domNode.name === "a") {
					delete domNode.attribs.href;
					if (
						domNode.attribs.class &&
						domNode.attribs.class === "image"
					) {
						return domNode;
					} else if (
						domNode.attribs.title &&
						domNode.children.length > 0
					) {
						return (
							<a
								{...domNode.attribs}
								className={
									domNode.attribs.class +
									" cursor-pointer text-amber-900 dark:text-amber-400-accent"
								}
								onClick={() =>
									setArticle(domNode.attribs.title)
								}
							>
								{domNode.children[0].data}
							</a>
						);
					} else if (domNode.children.length > 0) {
						return <span>{domNode.children[0].data}</span>;
					} else {
						return <span></span>;
					}
				}
			}
		},
	};
	async function getPageParsed(article: string) {
		if (article !== "") {
			setArticle(article);
			const parserUrlMain =
				"https://en.wikipedia.org/w/api.php?action=parse&origin=*&format=json&page=";
			fetch(parserUrlMain + article.replaceAll(" ", "_"), {
				method: "get",
				headers: {
					"Content-Type": "application/json",
				},
			}).then((res) => {
				res.json().then((data) => {
					setParseResponse(data.parse);
					topFunction();
					const innerHTML: string = Object.values(
						data.parse.text
					)[0] as string;
					const parsedArticle = parse(innerHTML, parserOptions);
					setParsed(parsedArticle);
				});
			});
		}
	}

	useEffect(() => {
		if (article === "") {
			setArticle(
				lobby?.lobbyFromToken ? lobby.lobbyFromToken.startArticle : ""
			);
		}
		if (parseResponse?.title !== article) {
			getPageParsed(article);
		} else {
		}
		// console.log(parseResponse?.title);
		// console.log(article);
		// console.log(parseResponse?.title !== article);
	});

	return (
		<div>
			<div className="font-serif font-bold text-4xl">{article}</div>
			<hr />
			{parsed}
		</div>
	);
};

export default Game;
