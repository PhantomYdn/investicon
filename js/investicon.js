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
                    marker.bindPopup("<p><b>Address:</b>"+data[i].address+"<br/><b>Original Price:</b>"+data[i].originalPrice+"<br/><b>Year Built:</b>"+data[i].yearBuilt+"<br/></p>", {
                    showOnMouseOver: true
                    });
                    markers.addLayer(marker);
                }
                if(markers.getLayers().length>0) map.fitBounds(markers.getBounds());
      }

    }

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
              field: 'originalPrice',
              title: 'Original Price',
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
