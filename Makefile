BROWSERIFY=node_modules/.bin/browserify

all: clean site.js

site.js: src/index.js
	browserify src/index.js > site.js

clean:
	rm -f site.js