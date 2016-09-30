$(document).ready(function(){
    console.log("docuement is now ready")

    function BryggViewModel() {
        this.bryggListe = ko.observableArray([]);
    }

    var bryggVM = new BryggViewModel();
    ko.applyBindings(bryggVM);
    hentBryggMedKaffe();

    function hentBryggMedKaffe() {
        $.get("api/brygg", function(data) {
            var kaffeIdMap = new Map();
            populerKaffeIder(data, kaffeIdMap);
            hentKafferForIder(kaffeIdMap, function(){
                leggTilBrygg(data, kaffeIdMap, bryggVM.bryggListe)
            });
        });
    }

    function hentKafferForIder(kaffeIdMap, callback) {
        var counter = 0;
        kaffeIdMap.foreach(function(key){
            $.get("api/kaffe/" + key, function(kaffeRespons){
                kaffeIdMap.put(key, kaffeRespons);
                counter++;  //Brukes for å vite når bryggene kan legges til
                if (kaffeIdMap.count() == counter) {
                    callback();
                }
            });
        });
    }

    function populerKaffeIder(bryggArray, map) {
        for (var i = 0; i < bryggArray.length; i++) {
            var brygg = bryggArray[i];
            map.put(brygg.kaffeId, null);
            for (var j = 0; j < brygg.karakterer.length; j++) {
                var karakter = brygg.karakterer[j];
                map.put(karakter.kaffeId, null);
            }
        }
    }

    function leggTilBrygg(bryggArray, kaffeMap, output) {
        for (var i = 0; i < bryggArray.length; i++) {
            var brygg = Brygg(bryggArray[i]);
            brygg.kaffe = kaffeMap.get(bryggArray[i].kaffeId);
            for (var j = 0; j < brygg.karakterer.length; j++) {
                var karakter = brygg.karakterer[j];
                karakter.kaffe = kaffeMap.get(bryggArray[i].karakterer[j].kaffeId);
            }
            output.push(brygg);
        }
    }

    function Brygg(brygg) {
        var output = {
            "_id": brygg._id,
            "navn": brygg.navn,
            "kaffe": null,
            "dato": brygg.date,
            "liter": brygg.liter,
            "skjeer": brygg.skjeer,
            "vis": brygg.vis,
            "kommentar": brygg.kommentar,
            "malthet": brygg.malthet,
            "karakterer": null
        };
        var karakterArray = [];
        for (var i = 0; i < brygg.karakterer.length; i++) {
            var karakter = brygg.karakterer[i];
            karakterArray.push({
                "bruker": karakter.bruker,
                "kaffe": null,
                "karakter": karakter.karakter,
                "kommentar": karakter.kommentar
            });
        }
        output.karakterer = karakterArray;
        return output;
    }
});