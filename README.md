mutiple-mbtiles-nodejs-server
==============

Wow. It's really easy to serve mbtiles files without having to host them with Mapbox, just serve them yourself.

First, just create an mbtiles file (via Tilemill probably cause it's freaking amazing), then:

1. run `npm install`
2. edit the tilemap.json like
```js
{
 "layername": "path/to/file.mbtiles",
 "another_layer": "path/to/another_file.mbtiles"
}
```
3. run `node server.js [PORT]`

Default port is 3000

Tiles will be available on http://localhost:[PORT]/layername/{z}/{x}/{y}