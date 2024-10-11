import { clsx, type ClassValue } from "clsx"
import { Metadata } from "next";
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs))
}


export function absoluteUrl(path: string) {
	if (typeof window !== "undefined") return path;
	if (process.env.VERCEL_URL) return `https://${process.env.VERCEL_URL}${path}`;
	return `http://localhost:${process.env.PORT ?? 3000}${path}`;
}

export function constructMetadata({
	title = 'Summerize - the SaaS for students',
	description = "Quill is an open-source software to make chatting to your PDF files easy.",
	image = "/thumbnail.png",
	icons = "/favicon.ico",
	noindex = false,
}: {
	title?: string;
	description?: string;
	image?: string;
	icons?: string;
	noindex?: boolean;
} = {}): Metadata {
	return {
		title,
		description,
		openGraph: {
			title,
			description,
			images: [
				{ url: image }
			]
		},
		twitter: {
			card: "summary_large_image",
			title,
			description,
			images: [image],
			creator: "@abhis3k_"
		},
		icons,
		metadataBase: new URL('https://summerize-khaki.vercel.app'),
		themeColor: '#fff',
		...(noindex && {
			robots: {
				index: false,
				follow: false,
			}
		})
	}
}