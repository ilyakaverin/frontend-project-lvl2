install:
	npm ci

publish:
	npm publish --dry-run
	npm link
test-coverage:
	npm test -- --coverage --coverageProvider=v8

lint: 
	npx eslint .
jest:
	node --experimental-vm-modules node_modules/.bin/jest