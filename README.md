# ShareMyBooks

## Dev Process

We are using git flow for this project.

## Instructions

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



to compile css files, run the below command when in the FrontEnd folder in the terminal:

```bash
gulp build
```

--------

`seed.js` can be found in `server/tasks`,run

```bash
node seed.js
```

## Elasticsearch

### For Mac OS:


```bash
brew install elasticsearch
```

And start elasticsearch using command:

```bash
elasticsearch
```

### For Windows:

Install Java.

Download the .zip archive for Elasticsearch from: 

<https://artifacts.elastic.co/downloads/elasticsearch/elasticsearch-5.4.0.zip>

```bash
cd elasticsearch-version
```

Elasticsearch can be started from the command line as follows:


```bash
.\bin\elasticsearch
```

