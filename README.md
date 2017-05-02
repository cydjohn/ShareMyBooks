# ShareMyBooks

to run:
install ImageMagick CLI with homebrew on Mac OSX: 

```bash
brew install imagemagick
```
run redis server with the command 

```bash
redis-server
```

if gulp is not globally installed on your computer use the below command:

```bash
sudo npm install -g gulp
```

```

to compile css files, run the below command when in the FrontEnd folder in the terminal:

```bash
gulp build
```

--------

`seed.js` can be found in `server/tasks`,run

```bash
node seed.js
```

## elasticsearch

Goto `server/elasticsearch-5.3.0`,run

```bash
bin/elasticsearch
```

I've done all the config file, and there is **no need** to run elasticsearch for development(except for the search functionality)~
