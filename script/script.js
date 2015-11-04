/*global L, input, prullenbakData, area, console, d3, $*/


/* -------------------------------------------------------------------
---------------------- INFORMOTION CMD AMSTERDAM ---------------------
------------------------------ TEAM 4 --------------------------------
--------------------- SCRIPTED BY: EMIEL ZUURBIER --------------------
----------------------------- 500661361 ------------------------------
------------------------------------------------------------------- */


/*-------------------------------------------------------------- D3 */

// VARIABLES FOR D3
var dataArray = [],
    margin = {top: 20, right: 30, bottom: 7, left: 30},
    height = 400,
    width = 500,
    barOffset = 5,
    color = "ff000f",
    colorArray = ['#0fea68', '#16a085', '#e9d460', '#e98b39', '#a53232', '#ff3333'];

// CREATE D3 GRAPH
var graph = d3.selectAll('#chart').append('svg')
    .attr('width', 500)
    .attr('height', 400)
    .attr('class', 'chart')
    .style('background', '#e7e7e7');


// UPDATE AND DATA CREATION FUNCTION FOR D3
function updateData() {
    "use strict";

    var yScale = d3.scale.linear()
        .domain([0, d3.max(dataArray)])
        .range([0, height]),

        xScale = d3.scale.ordinal()
        .domain(d3.range(0, dataArray.length))
        .rangeBands([0, width]),

        colors = d3.scale.linear()
        .domain([0, dataArray.length])
        .range(['#0fea68', '#16a085', '#e9d460', '#e98b39', '#a53232', '#ff3333']);

    graph.selectAll('rect')
        .data(dataArray)
        .enter()
        .append('rect')
            .style('fill', function (d, i) { return colorArray[i]; })
            .attr('class', 'bars')
            .attr('width', xScale.rangeBand() - 10)
            .attr('x', function (d, i) {  return xScale(i); })
            .attr('height', 0)
            .attr('y', height)
            .attr('transform', 'translate(' + barOffset + ', 0)');

    graph.selectAll('rect').transition().duration(1200)
        .attr('height', function (d) { return yScale(d); })
        .attr('y', function (d) { return height - yScale(d); })
        .ease('elastic');

}

/*------------------------------------------------------------LEAFLET */


// CREATE MAP AND SETTINGS
var map = L.map('map', {
    center: [52.3722096, 4.8986314],
    zoom: 14,
    dragging: true,
    touchZoom: true,
    scrollWheelZoom: true,
    zoomControl: true
});


// ADD MAP LAYER
L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token={accessToken}', {
    attribution: 'Gemeente Amsterdam',
    maxZoom: 18,
    id: 'milosaurus.o0k2140n',
    accessToken: 'pk.eyJ1IjoibWlsb3NhdXJ1cyIsImEiOiJjaWc5N3I4bnAwOWJvdGFsdDIxZDZkYnE4In0.Ke7TOrRQQU0eBVRuv9YvZQ'
}).addTo(map);


// CREATE MARKERCLUSTER
var markers = L.markerClusterGroup({
    maxClusterRadius: 80,
    polygonOptions: {
        fillColor: '#ff000f',
        color: '#ff000f',
        weight: 2,
        opacity: 1,
        fillOpacity: 0.5
    },
    iconCreateFunction: function (cluster) {
        "use strict";

        var markers = cluster.getAllChildMarkers(),
            markersCount = markers.length,
            total = 0,
            sum,
            xSum,
            i = 0;

        for (i in markers) {
            if (markers.hasOwnProperty(i)) {
                total += parseInt(markers[i].feature.properties.Units, 10);
            }
        }
        sum = total / markersCount;
        xSum = Math.round(sum);

        if (xSum === 0) {
            dataArray.push(0);
            return L.divIcon({ html: "", className: "_0icon", iconSize: L.point(45, 45) });
        } else if (xSum <= 25) {
            dataArray.push(25);
            return L.divIcon({ html: "", className: "_25icon", iconSize: L.point(45, 45) });
        } else if (xSum <= 50) {
            dataArray.push(50);
            return L.divIcon({ html: "", className: "_50icon", iconSize: L.point(45, 45) });
        } else if (xSum <= 75) {
            dataArray.push(75);
            return L.divIcon({ html: "", className: "_75icon", iconSize: L.point(45, 45) });
        } else if (xSum <= 100) {
            dataArray.push(100);
            return L.divIcon({ html: "", className: "_100icon", iconSize: L.point(45, 45) });
        } else if (xSum <= 125) {
            dataArray.push(125);
            return L.divIcon({ html: "", className: "_125icon", iconSize: L.point(45, 45) });
        }

    }

});


// ENTER PRULLENBAK DATA POINTS AND ICONS
var prullenData = L.geoJson(prullenbakData, {
    onEachFeature: function (feature, layer) {
        "use strict";
        layer.bindPopup("<h3>" + feature.properties.Street + " " + feature.properties.HouseNr.toString() + "</h3>" + "De prullenbak van " + feature.properties.Street + " " + feature.properties.HouseNr.toString() + "<br> is voor " + "<strong>" + feature.properties.Units + "%" + "</strong>" + " vol <br><br>" + "Volume: " + "<strong>" + feature.properties.Volume.toString() + "</strong> <br>" + "ID: " + "<strong>" + feature.properties.ID.toString() + "</strong> <br>" + "Remarks: <strong>" + feature.properties.Remarks + "</strong> <br>" + "Terminal: <strong>" + feature.properties.TerminalId.toString() + "</strong> <br>" + "Regdate: <strong>" + feature.properties.RegistrationDate + "</strong>");
    },
    pointToLayer: function (feature, latlng) {
        "use strict";
        var Icon = L.icon({
            iconSize: [45, 45],
            iconAnchor: [13, 27],
            popupAnchor:  [1, -24],
            iconUrl: 'media/' + feature.properties.Units.toString() + '.svg',
            className: '_' + feature.properties.Units + 'icon'
        });

        return L.marker(latlng, {icon: Icon});
    }
});


// AREA DATA
var areaStyle = {
    "stroke": "#1a1a1a",
    "fillColor": "transparent",
    "color": "#212121",
    "opacity": 0.5
};

var areaData = L.geoJson(area, {
    style: areaStyle,
    onEachFeature: function (feature, layer) {
        "use strict";
        layer.bindPopup("Dit is gebied: " + "<h3>" + feature.properties.Meetgebied + "</h3>" + "<i>" + feature.properties.id + "</i>");
    }
});


// AREACOLOR DATA
var areaDataColor = L.geoJson(area, {
    style: function (feature) {
        "use strict";
        switch (feature.properties.id) {
        case 'A1':
        case 'A9':
        case 'A17':
        case 'A25':
        case 'A33':
        case 'A41':
        case 'A49':
            return { color: "#ff000f", fillcolor: "#ff000f" };
        case 'A2':
        case 'A10':
        case 'A18':
        case 'A26':
        case 'A34':
        case 'A42':
            return { color: "#14ff00", fillcolor: "#ffa700" };
        case 'A3':
        case 'A11':
        case 'A19':
        case 'A27':
        case 'A35':
        case 'A43':
            return { color: "#0014ff", fillcolor: "#f5ff00" };
        case 'A4':
        case 'A12':
        case 'A20':
        case 'A28':
        case 'A36':
        case 'A44':
            return { color: "#00f5ff", fillcolor: "#1dff00" };
        case 'A5':
        case 'A13':
        case 'A21':
        case 'A29':
        case 'A37':
        case 'A45':
            return { color: "#ffe200", fillcolor: "#00ffff" };
        case 'A6':
        case 'A14':
        case 'A22':
        case 'A30':
        case 'A38':
        case 'A46':
            return { color: "#00ff9d", fillcolor: "#0027ff" };
        case 'A7':
        case 'A15':
        case 'A23':
        case 'A31':
        case 'A39':
        case 'A47':
            return { color: "#c400ff", fillcolor: "#c400ff" };
        case 'A8':
        case 'A16':
        case 'A24':
        case 'A32':
        case 'A40':
        case 'A48':
            return { color: "#004eff", fillcolor: "#ff00a7" };
        default:
            return { color: "#ff000f" };
        }
    },
    onEachFeature: function (feature, layer) {
        "use strict";
        layer.bindPopup("Dit is gebied: " + "<h3>" + feature.properties.Meetgebied + "</h3>");
    }
});


// INZET DATASET
var inzetStyle = {
    "color": "#ff000f"
};

var inzetData = L.geoJson(input, {
    style: inzetStyle
});


// CONTROL LAYERS
var overlay = {
        "Pullenbakken": markers,
        "Inzet": inzetData,
        "Gebieden": areaData,
        "Gebieden Kleur": areaDataColor
    };

L.control.layers(null, overlay, {
    position: 'topleft'
}).addTo(map);

L.control.scale({
    imperial: false
}).addTo(map);


// ADDING LAYERS AND MARKERCLUSTER TO MAP
markers.addLayer(prullenData);
map.addLayer(markers);
map.addLayer(areaData);
//map.addLayer(inzetData);
map.fitBounds(markers.getBounds());


// UPDATE GRAPH ON MOVE
map.on('moveend', function () {
    "use strict";
    setTimeout(function () {

        var aLength = $("._0icon").length,
            bLength = $("._25icon").length,
            cLength = $("._50icon").length,
            dLength = $("._75icon").length,
            eLength = $("._100icon").length,
            fLength = $("._125icon").length;

        dataArray = [];
        dataArray.push(aLength, bLength, cLength, dLength, eLength, fLength);
        updateData();
        console.log(dataArray);

    }, 1000);
});
