$(document).ready(function(){
    function RegistreringViewModel() {
        var self = this;
        self.bryggListe = ko.observableArray([]);
        self.muligeKaffer = ko.observableArray([]);

        self.valgtBrygg = ko.observable();
        self.karakter = ko.observable(new Karakter());
        self.valgtBrygg.subscribe(function(newValue){
            clearKarakterVerdier();
        });
        self.registrerKarakter = function() {
            if (!gyldigKarakter(self.karakter)) {
                alert("Karakteren er ugyldig.");
            } else {
                $.ajax("api/brygg/" + self.valgtBrygg()._id + "/karakter", {
                    contentType: 'application/json; charset=UTF-8',
                    data: ko.toJSON(self.karakter),
                    dataType: 'json',
                    error: function(jqXHR, textStatus, errorThrown){
                        console.log("error thrown")
                        console.log(errorThrown)
                    },
                    method: 'POST',
                    success: function(data, textStatus, jqXHR){
                        console.log("Successfully sent the object to the servcer")
                        clearKarakterVerdier()
                    }
                });
            }
        };

        self.hoverBeans = function(data, event) {
            $(event.target).parent().children().addClass("gray");
            $(event.target).removeClass("gray");
            $(event.target).prevAll().removeClass("gray");
        };

        self.setKarakter = function(verdi) {
            self.karakter().karakter(parseInt(verdi));
        };

        self.finalizeBeansColor = function() {
            var karaktererDiv = $("div.karakterBeansDiv");
            karaktererDiv.children().addClass("gray");
            var child = $(event.target).parent().children().first();
            var counter = 0;
            while (counter < self.karakter().karakter()) {
                child.removeClass("gray");
                counter++;
                child = child.next();
            }
        };

        self.karakter().karakter.subscribe(function(newValeue){
            self.finalizeBeansColor();
        });

        function clearKarakterVerdier() {
            self.karakter().bruker(null);
            self.karakter().kaffeId(null);
            self.karakter().karakter(0);
            self.karakter().kommentar("");
        }
    }

    var viewModel = new RegistreringViewModel();
    ko.applyBindings(viewModel);

    $.get("api/kaffe/synlige", function(data){
        for (var i = 0; i < data.length; i++) {
            viewModel.muligeKaffer.push(data[i]);
        }
    });


    $.get("api/brygg", function(data){
        for (var i = 0; i < data.length; i++) {
            viewModel.bryggListe.push(data[i]);
            var element = $("p:contains(" + data[i]._id + ")").parent().siblings('div[name="hideable"]')[0];
            var arrow = $("p:contains(" + data[i]._id + ")").siblings('button')[0];
            if (data[i].vis) {
                $(element).show();
                $(arrow).addClass("pointDown");
                $(arrow).removeClass("pointLeft");
            } else {
                $(element).hide();
                $(arrow).addClass("pointLeft");
                $(arrow).removeClass("pointDown");
            }
        }
        viewModel.valgtBrygg(data[data.length - 1]);
    });

});

function Karakter() {
    this.bruker = ko.observable();
    this.kaffeId = ko.observable();
    this.karakter = ko.observable(0);
    this.kommentar = ko.observable("");
}

function gyldigKarakter(karakter) {
    if (!karakter().bruker()) {
        return false;
    }
    if (!karakter().kaffeId()) {
        return false;
    }
    if (karakter().karakter() != null && !(0 < karakter().karakter() && karakter().karakter() < 6)) {
        return false;
    }
    if (!karakter().kommentar()) {
        return false;
    }
    return true;
}
