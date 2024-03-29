# Welcome to Open Graph Image Project

This project is based on "vercel/og-image" system

There are two pieces to this that are worth noting before you begin development.

1. The backend image generator located in ../api/index.ts
2. The frontend inputs located in ../web/index.ts

The Now 2.0 platform handles [routing](https://github.com/hackumclub/open-graph-images/blob/master/now.json#L6) in an elegate way for us so deployment is easy.

To start hacking, do the following:

1. Clone this repo with `git clone https://github.com/hackumclub/open-graph-images
2. Change directory with `cd og-image`
3. Run `yarn` or `npm install` to install all dependencies
4. Run locally with `now dev` and visit [localhost:3000](http://localhost:3000) (if nothing happens, run `npm install -g now`)
5. If necessary, edit the `exePath` in [options.ts](https://github.com/hackumclub/open-graph-images/blob/master/api/_lib/options.ts) to point to your local Chrome executable

Now you're ready to start local development!

You can set an environment variable to assist with debugging `export OG_HTML_DEBUG=1`. This will render the image as HTML so you can play around with your browser's dev tools before committing changes to the template.
