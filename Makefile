install:
		npm install
gendiff:
		node ./bin/gendiff.js <filepath1> <filepath2>
publish:
		npm publish --dry-run
lint:
	    npx eslint
jest:
		NODE_OPTIONS=--experimental-vm-modules npx jest