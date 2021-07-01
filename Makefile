install:
	npm ci

publish:
	npm publish --dry-run
	npm link

lint: 
	npx eslint .