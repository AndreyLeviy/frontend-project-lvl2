install:
	npm install
gendiff filePath1 filePath2:
	node bin/gendiff.js filePath1 filePath2
link:
	npm link
publish:
	npm publish --dry-runlint
lint:
	npx eslint .
test:
	npm test
test-coverage:
	npm test -- --coverage --coverageProvider=v8
