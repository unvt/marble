# marble
A vector tile server expanded for ArcGIS online consumption.  

# Summary
* This server delivers vector tiles (pbf) from mbtiles using mapbox/mbtiles module.
* This server also delivers static htdocs contents in "htdocs" folder. (you can directly store your pbf tile there.)
* This server now has an interface with Esri ArcGIS online.
    * It returns the index.json of the vector tile service. 
    * It returns the style.json for the styling. 
    * It retuns the simplified tilemap informaiton. (see the explanation of the tilemap below)

# usage
* Preparation of the necessary files
   * Vector tile: store a mbtiles file in a folder with its data name in mbtiles folder (confirm the name in config)
   * ESRI interface: Prepare a folder of your data name in "esri" folder. 
       * Prepare an index.json in that(your data name) folder.
       * Prepare an style.json in that(your data name) folder.
       * For tilemap, add max/min of your vector tile in config to specify the existance of the tile.

Please be advised that the location of tiles, sprite, glyphs can be specified in index.json and style.json. You do not necessarily serve them from your server. 

```
git clone https://github.com/unvt/marble
cd marble
npm install
node app.js
```
(ctrl+c to stop)

If you want to use https, please store keys in certain place and edit app.js and config/default.hjson.

# Example
* Vectortile (coming soon)
* Vector Tile Service info (coming soon)
* Vectir Tile Map style (coming soon)
* Tilemap http://localhost:8836/esriIF/ne-test/VectorTileServer/tilemap/1/0/0/32/32

# Functions
## Vector Tile delivery
A mbtiles in the mbtiles directory will be delivered through the following URL.  
 http://localhost:8836/VT/zxy/(data_name)/(z)/(x)/(y).pbf

If you store pbf files in htdocs, they are hosted as static files.

## Vector Tile Service information
An index.json in esri/(data_name) will be delivered from:  
 http://localhost:8836/esriIF/(data_name)/VectorTileServer/  
Please refer to ArcGIS API to prepare index.json.

## Vector Tile Style
A style.json in esri/(data_name) will be delivered from:  
 http://localhost:8836/esriIF/(data_name)/VectorTileServer/resources/styles  
style.json should be concordant with the mapbox style specification and/or MapLibre style specification. However, from my presonal experiences, I think some advanced expression might not work for ArcGIS online.  

(note)
I found that ArcGIS REST API indicates the service path as ..../resources/style, however, if we look at the actual server by esri, it is using the path like .../resources/styles, so I decided to use "styles" not "style."  

[ArcGIS REST API](https://developers.arcgis.com/rest/services-reference/enterprise/vector-tile-style.htm)  
[Actual example](https://basemaps.arcgis.com/arcgis/rest/services/OpenStreetMap_v2/VectorTileServer/resources/styles/root.json)


## tilemap
* This server has a minimum tilemap function. This is a simple tilemap and does not fully cover ESRI's tilemap function. Thinking the tilemap function actually used in ArcGIS online, I have prepared a minimum function as below.  
    * Data in tilemaps at any zoomlevel are always 32 by 32 (width and height).
    * At zoom levels until 5, row and column are always 0.
    * At each zoom level, larger than zoom level 5, data in tilemaps at any row/column are the same. (if exist, it is all 1.) 

* Try to use tile map from: https"//(root dir name)/TM/ne-test/(zoom level)/(row)/(column)/(width)/(height)  
    * note1: "ne-test" is a name of dataset.  
    * note2: Both width and height should be 32.


# References
* ArcGIS REST API: https://developers.arcgis.com/rest/services-reference/enterprise/tile-map.htm
* Observation of ArcGIS Online tilemap function (in Japanese): https://qiita.com/T-ubu/items/6360252ece6c792732c7
* Traial of making static tilemap with GitHub page (in Japanese): https://qiita.com/T-ubu/items/317624fa7652aff9b9ed
 
