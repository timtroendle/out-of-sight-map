const COLOR_LOW_POTENTIAL = 'hsla(2, 78%, 35%, 0.5)';
const COLOR_MEDIUM_LOW_POTENTIAL = 'hsla(2, 78%, 85%, 0.5)';
const COLOR_NEUTRAL = 'white';
const COLOR_MEDIUM_HIGH_POTENTIAL = 'hsla(223, 57%, 85%, 0.5)';
const COLOR_HIGH_POTENTIAL = 'hsla(223, 57%, 35%, 0.5)';
const COLOR_MISSING = 'hsla(0, 0%, 70%, 0.5)'
const COLOR_OUTLINE = 'hsla(0, 0%, 100%, 1)'
const COLOR_HOVER = 'white';

const CHOROPLETH_COLORING = [
    "interpolate",
    ["linear"],
    ["case",
        ["has", "relative_onshore_wind"],
        ["get", "relative_onshore_wind"],
        101
    ],
    0,
    COLOR_LOW_POTENTIAL,
    0.35,
    COLOR_MEDIUM_LOW_POTENTIAL,
    0.5,
    COLOR_NEUTRAL,
    0.65,
    COLOR_MEDIUM_HIGH_POTENTIAL,
    1,
    COLOR_HIGH_POTENTIAL,
    101,
    COLOR_MISSING,
  ]

const CONDITIONAL_BORDER = ["case",
    ["boolean", ["feature-state", "hover"], false],
    3,
    0.0
]

function styleMap(map) {
    var layers = map.getStyle().layers;
    // Find the index of the first symbol layer in the map style
    var firstSymbolId;
    for (var i = 0; i < layers.length; i++) {
        if (layers[i].type === 'symbol') {
            firstSymbolId = layers[i].id;
            break;
        }
    }
    map.addSource("national", {
        "type": "vector",
        "url": "mapbox://timtroendle.0mooqazd"
    });
    map.addSource("regional", {
        "type": "vector",
        "url": "mapbox://timtroendle.0spyaxzb"
    });
    map.addSource("municipal", {
        "type": "vector",
        "url": "mapbox://timtroendle.7i1efddx"
    });

    map.addLayer({
        "id": "national",
        "type": "fill",
        "source": "national",
        "source-layer": "nationaltechnicalpotentialenvprotection1000",
        "maxzoom": 6,
        "layout": {},
        "paint": {
            "fill-color": CHOROPLETH_COLORING,
            "fill-opacity": 1,
            "fill-outline-color": COLOR_OUTLINE
        }
    }, firstSymbolId);
    map.addLayer({
        "id": "national-borders",
        "type": "line",
        "source": 'national',
        "source-layer": "nationaltechnicalpotentialenvprotection1000",
        "maxzoom": 6,
        "layout": {},
        "paint": {
            "line-color": COLOR_HOVER,
            "line-width": CONDITIONAL_BORDER
        }
    }, firstSymbolId);
    map.addLayer({
        "id": "regional",
        "type": "fill",
        "source": "regional",
        "source-layer": "regionaltechnicalpotentialenvprotection1000",
        "minzoom": 6,
        "maxzoom": 9,
        "layout": {},
        "paint": {
            "fill-outline-color": COLOR_OUTLINE,
            "fill-color": CHOROPLETH_COLORING
        }
    }, firstSymbolId);
    map.addLayer({
        "id": "regional-borders",
        "type": "line",
        "source": 'regional',
        "source-layer": "regionaltechnicalpotentialenvprotection1000",
        "minzoom": 6,
        "maxzoom": 9,
        "layout": {},
        "paint": {
            "line-color": COLOR_HOVER,
            "line-width": CONDITIONAL_BORDER
        }
    }, firstSymbolId);
    map.addLayer({
        "id": "municipal",
        "type": "fill",
        "source": "municipal",
        "source-layer": "municipaltechnicalpotentialenvprotection1000",
        "minzoom": 9,
        "layout": {},
        "paint": {
            "fill-color": CHOROPLETH_COLORING,
            "fill-outline-color": COLOR_OUTLINE
        }
    }, firstSymbolId);
    map.addLayer({
        "id": "municipal-borders",
        "type": "line",
        "source": 'municipal',
        "source-layer": "municipaltechnicalpotentialenvprotection1000",
        "minzoom": 9,
        "layout": {},
        "paint": {
            "line-color": COLOR_HOVER,
            "line-width": CONDITIONAL_BORDER
        }
    }, firstSymbolId);
    map.addLayer({ // different country outlines necessary because levels do not match exactly
        "id": "country-thick-outline-country",
        "type": "line",
        "source": {
            type: 'vector',
            url: 'mapbox://timtroendle.0u8aumaa'
        },
        "source-layer": "national-boundaries-national--5fk3kj",
        "minzoom": 4,
        "maxzoom": 6,
        "layout": {},
        "paint": {
            "line-color": COLOR_OUTLINE,
            "line-width": ["interpolate", ["linear"], ["zoom"], 4, 0.5, 6, 1, 9, 2]
        }
    }, firstSymbolId);
    map.addLayer({ // different country outlines necessary because levels do not match exactly
        "id": "country-thick-outline-regional",
        "type": "line",
        "source": {
            type: 'vector',
            url: 'mapbox://timtroendle.djc7n2y2'
        },
        "source-layer": "national-boundaries-regional--0omid4",
        "minzoom": 6,
        "maxzoom": 9,
        "layout": {},
        "paint": {
            "line-color": COLOR_OUTLINE,
            "line-width": ["interpolate", ["linear"], ["zoom"], 4, 0.5, 6, 1, 9, 2]
        }
    }, firstSymbolId);
    map.addLayer({ // different country outlines necessary because levels do not match exactly
        "id": "country-thick-outline-municipal",
        "type": "line",
        "source": {
            type: 'vector',
            url: 'mapbox://timtroendle.b0f7q184'
        },
        "source-layer": "national-boundaries-municipal-5xb816",
        "minzoom": 9,
        "layout": {},
        "paint": {
            "line-color": COLOR_OUTLINE,
            "line-width": ["interpolate", ["linear"], ["zoom"], 4, 0.5, 6, 1, 9, 2]
        }
    }, firstSymbolId);
}
