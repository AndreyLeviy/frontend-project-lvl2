install:
	npm install
gendiff:
	node bin/gendiff.js <filepath1> <filepath2>
link:
	npm link
publish:
	npm publish --dry-run
lint:
	npx eslint
jest:
	NODE_OPTIONS=--experimental-vm-modules npx jest
test:
	npm test
test-coverage:
	npm test -- --coverage --coverageProvider=v8
