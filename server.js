var express = require("express"),
    app = express(),
    MBTiles = require('mbtiles'),
    tileMap = require('./tilemap.json'),
    port = 3000;

if (process.argv.length === 3) {
    port = parseInt(process.argv[2]);
}

for (var tileServerName in tileMap) {
    (function (tileFile, name) {
        var mbtilesLocation = tileFile.replace(/\.mbtiles/, '') + '.mbtiles';

        new MBTiles(mbtilesLocation, function (err, mbtiles) {
            if (err) {
                throw err;
            }
            app.get('/' + name + '/:z/:x/:y.*', function (request, response) {
                var extension = request.param(0);
                switch (extension) {
                    case "png":
                    {
                        mbtiles.getTile(request.param('z'), request.param('x'), request.param('y'), function (err, tile, headers) {
                            if (err) {
                                response.status(404).send('Tile rendering error: ' + err + '\n');
                            } else {
                                response.header("Content-Type", "image/png")
                                response.send(tile);
                            }
                        });
                        break;
                    }
                    case "grid.json":
                    {
                        mbtiles.getGrid(request.param('z'), request.param('x'), request.param('y'), function (err, grid, headers) {
                            if (err) {
                                response.status(404).send('Grid rendering error: ' + err + '\n');
                            } else {
                                response.header("Content-Type", "text/json")
                                response.send(grid);
                            }
                        });
                        break;
                    }
                }
            });

        });
    })(tileMap[tileServerName], tileServerName)
}

app.listen(port);
