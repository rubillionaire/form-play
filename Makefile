all: clean site.js

site.js: src/index.js
	npm run build

clean:
	rm -f site.js