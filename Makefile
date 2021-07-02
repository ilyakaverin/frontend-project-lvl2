install:
	npm ci

publish:
	npm publish --dry-run
	npm link

lint: 
	npx eslint .
jest:
	node --experimental-vm-modules node_modules/.bin/jest