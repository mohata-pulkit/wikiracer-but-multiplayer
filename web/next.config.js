/** @type {import('next').NextConfig} */
const nextConfig = {
	reactStrictMode: true,
	experimental: {
		esmExternals: false,
	},
	target: "serverless",
	async rewrites() {
		return [
			// Rewrite everything to `pages/index`
			{
				source: "/:any*",
				destination: "/",
			},
		];
	},
};

module.exports = nextConfig;
