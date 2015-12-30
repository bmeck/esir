.PHONY: doc compile coverage polyfilled scaffold watch test

all: doc compile

doc:
	@esdoc -c esdoc.json 
		 
scaffold:
	@node scaffold_dir.js lib/routes > lib/routes/index.js

compile: scaffold
	@mkdir -p out/routes
	@babel lib\
		--optional runtime\
		--out-dir out\
	 	--source-maps true
		 
polyfilled: scaffold
	babel-node lib/bin/compile.js "$(value SRC)"

watch:
	watch-run -i -p "lib/**.js" -- make compile

clean:
	rm -rf out/ doc/