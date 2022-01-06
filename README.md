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


```
git clone https://github.com/unvt/marble
cd marble
npm install
node app.js
```
(ctrl+c to stop)

If you want to use https, please store keys in certain place and edit app.js and config/default.hjson.

# Example
* Vectortile 
* 
* 
* Tilemap http://localhost:8836/esriIF/ne-test/VectorTileServer/tilemap/1/0/0/32/32

# Functions


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
 
