import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
	render() {
		return (
			<Html>
				<Head>
					<link
						rel="apple-touch-icon"
						sizes="180x180"
						href="/favicons/apple-touch-icon.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="32x32"
						href="/favicons/favicon-32x32.png"
					/>
					<link
						rel="icon"
						type="image/png"
						sizes="16x16"
						href="/favicons/favicon-16x16.png"
					/>
					<link rel="manifest" href="/favicon/site.webmanifest" />
					<link
						rel="preconnect"
						href="https://fonts.googleapis.com"
					></link>
					<link
						rel="preconnect"
						href="https://fonts.gstatic.com"
					></link>
					<link
						href="https://fonts.googleapis.com/css2?family=Fira+Code:wght@400;500&display=swap"
						rel="stylesheet"
					></link>
					<link
						href="https://fonts.googleapis.com/css2?family=Fira+Sans:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400;1,500;1,600;1,700&family=Zilla+Slab:wght@300;400;500;900&display=swap"
						rel="stylesheet"
					></link>
				</Head>
				<body className="bg-grey-100 dark:bg-grey-900 text-grey-900 dark:text-grey-100 justify-center h-full w-full top-0 bottom-0 absolute scrollbar-thin scrollbar-thumb-amber-200-accent dark:scrollbar-thumb-amber-400-accent scrollbar-thumb-rounded-md scrollbar-track-transparent">
					<Main />
					<NextScript />
				</body>
			</Html>
		);
	}
}

export default MyDocument;
