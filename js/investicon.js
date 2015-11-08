$( function() {
    var asMap = false;

    var retsly = new Retsly('ZTjKUKq7oC8dTZfoqsTx', '2a002a31fd25a57ffbf2ca241d6eaec2');
      retsly.ready(function(){
        $("#main").show();
        $("#loading").hide();
      });

    var data;

    var bsTable;

    var map;

    var markers = new L.FeatureGroup();

    function search(address) {
      retsly.get('/api/v1/armls/listings.json', {limit: 50, near: address}, function(res){
        if (!res.success) throw new Error(res);
        data = res.bundle;
        console.log(res);
        showData(true);


      });
    }

    function showData(refresh) {
      if(asMap) {
        $('#listing').hide();
        $('#map').show();
      }
      else {
        $('#listing').show();
        $('#map').hide();
      }

        loadAsMap(refresh);
        loadAsList(refresh);
    }

    function screenInfo(w, h) {
      // var dualScreenLeft = window.screenLeft != undefined ? window.screenLeft : screen.left;
      // var dualScreenTop = window.screenTop != undefined ? window.screenTop : screen.top;
      // console.log({dl: dualScreenLeft, dt: dualScreenTop});

      // var width = window.innerWidth ? window.innerWidth : document.documentElement.clientWidth ? document.documentElement.clientWidth : screen.width;
      // var height = window.innerHeight ? window.innerHeight : document.documentElement.clientHeight ? document.documentElement.clientHeight : screen.height;
      var width = screen.width;
      var height = screen.height;

      var left = ((width / 2) - (w / 2));
      var top = ((height / 2) - (h / 2));

      return {left: left, top: top};
    }


    function loadAsMap(refresh) {

      if(!map && $('#map').is(":visible")) {
          map = L.map('map').setView([34.36, -110.53], 13);
          L.tileLayer('https://api.tiles.mapbox.com/v4/{id}/{z}/{x}/{y}.png?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6IjZjNmRjNzk3ZmE2MTcwOTEwMGY0MzU3YjUzOWFmNWZhIn0.Y8bhBaUMqFiPrDRW9hieoQ', {
    			maxZoom: 18,
    			attribution: 'Map data &copy; <a href="http://openstreetmap.org">OpenStreetMap</a> contributors, ' +
    				'<a href="http://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
    				'Imagery © <a href="http://mapbox.com">Mapbox</a>',
    			id: 'mapbox.streets'
    		}).addTo(map);
        map.addLayer(markers);
        refresh = true;
      }

      if(refresh  && map) {
        console.log(markers);
        markers.clearLayers();
                for (var i = 0; i < data.length; i++) {
                    var marker = L.marker([data[i].coordinates[1], data[i].coordinates[0]]);
                    var linkdigsUrl = "http://admin.linkdigs.com/calc?address="+data[i].address;
                    var si = screenInfo(500, 800);
                    var popup = "<a href='#' onclick=\"window.open(\'"+linkdigsUrl+"\', \'calculator\', \'height=800, width=500, location=no,"+
                              +" resizable=no, status=no, titlebar=no, top="+si.top+", left="+si.left+"\'); return false;\">Calculator</a>";
                    marker.bindPopup("<p><b>Address:</b>"+data[i].address+"<br/><b>Price:</b>"+data[i].price+"<br/><b>Year Built:</b>"+data[i].yearBuilt+"<br/>"+popup+"</p>", {
                    showOnMouseOver: true
                    });
                    markers.addLayer(marker);
                }
                if(markers.getLayers().length>0) map.fitBounds(markers.getBounds());
      }

    }

    function calculateFormatter(value, row, index) {
        return [
            '<a class="calculate btn btn-primary" href="javascript:void(0)" title="Calculate">',
            'Calculate',
            '</a> ',
            '<a class="galery btn btn-success" href="javascript:void(0)" title="Galery">',
            '&nbsp;Galery&nbsp;',
            '</a> '
        ].join('');
    }

    function loadImages(gal, media) {
      var tryLoad = function () {
        if(!gal.loadImages) {
            setTimeout(tryLoad,1000);
        } else { gal.loadImages(media); }
      };
      tryLoad();
    }

    window.calculateEvents = {
        'click .calculate': function (e, value, row, index) {

            var linkdigsUrl = "http://admin.linkdigs.com/calc?address="+row.address;
            var si = screenInfo(500, 800);
            window.open(linkdigsUrl, 'calculator', "height=800, width=500, location=no, resizable=no, status=no, titlebar=no, top="+si.top+", left="+si.left);
        },
        'click .galery': function (e, value, row, index) {
            var si = screenInfo(800, 600);
            var gal = window.open('/gallery.html', 'galery', "height=600, width=800, location=no, resizable=no, status=no, titlebar=no, top="+si.top+", left="+si.left);

            loadImages(gal, row.media);
        }
    };

    function loadAsList(refresh) {
      if(bsTable) {
        if(refresh) bsTable.bootstrapTable("load", data);
      }
      else {
      bsTable = $('#listing table').bootstrapTable({
          columns: [{
              field: 'address',
              title: 'Address',
              sortable: true
          }, {
              field: 'price',
              title: 'Price',
              sortable: true
          }, {
              field: 'listDate',
              title: 'List Date',
              sortable: true
          }, {
              field: 'yearBuilt',
              title: 'Year Built',
              sortable: true
          }, {
              field: 'publicRemarks',
              title: 'Remarks',
              visible: false
          }, {
              field: 'calculate',
              title: 'Calculate',
              align: 'center',
              events: calculateEvents,
              formatter: calculateFormatter
          }],
          search: true,
          showRefresh: true,
          showColumns: true,
          showExport: true,
          data: data
        });
      }
    }


    $("#search").click(
      function() {
        search($("#address").val());
      }
    );

    $("#asmap").click(
      function() {
        asMap=!asMap;
        $('#asmap').text(asMap?"View as List":"View as Map");
        showData(false);
      }
    );


  }
);
