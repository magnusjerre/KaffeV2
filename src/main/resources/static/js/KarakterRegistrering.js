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
        self.visKarakterRegistrering = ko.observable(false);
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

        self.visNyttBrygg = ko.observable();
        self.visNyttBrygg.subscribe(function(newValue) {
            if (newValue) {
                self.showNyttBrygg();
            } else {
                self.hideNyttBrygg();
            }
        });
        self.nyttBrygg = ko.observable(new Brygg());
        self.malthet = ko.observableArray(["FINMALT", "MEDIUM", "GROV"]);
        self.toggleBryggRegistrering = function() {
            self.visNyttBrygg(!self.visNyttBrygg());
        };
        self.showNyttBrygg = function() {
            $('[name="hideableBrygg"]').show();
            var toggleButton = $('button#toggleBryggButton');
            toggleButton.removeClass("pointLeft");
            toggleButton.addClass("pointDown");
        };
        self.hideNyttBrygg = function() {
            $('[name="hideableBrygg"]').hide();
            var toggleButton = $('button#toggleBryggButton');
            toggleButton.removeClass("pointDown");
            toggleButton.addClass("pointLeft");
        };

        self.registrerBrygg = function() {
            if (gyldigBrygg(self.nyttBrygg)) {
                self.nyttBrygg().dato = new Date();
                if (!self.nyttBrygg().kommentar()) {
                    self.nyttBrygg().kommentar("");
                }
                $.ajax("api/brygg", {
                    contentType: 'application/json; charset=UTF-8',
                    data: ko.toJSON(self.nyttBrygg),
                    dataType: 'json',
                    error: function(jqXHR, textStatus, errorThrown){
                        console.log("error thrown")
                        console.log(errorThrown)
                    },
                    method: 'POST',
                    success: function(data, textStatus, jqXHR){
                        clearNyttBrygg();
                        self.bryggListe.push(data);
                        if (self.bryggListe().length == 1) {
                            self.visKarakterRegistrering(true);
                        }
                    }
                });
            } else {
                alert("Brygg mangler verdier");
            }
        }
        function clearNyttBrygg() {
            self.visNyttBrygg(false);
            self.nyttBrygg().navn(undefined);
            self.nyttBrygg().kaffeId(undefined);
            self.nyttBrygg().brygger(undefined);
            self.nyttBrygg().liter(undefined);
            self.nyttBrygg().skjeer(undefined);
            self.nyttBrygg().kommentar(undefined);
            self.nyttBrygg().malthet(undefined);
        }
        self.visNyttBrygg(false);
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
        }
        if (data.length == 0) {
            viewModel.visNyttBrygg(true);
            viewModel.visKarakterRegistrering(false);
        } else {
            viewModel.visNyttBrygg(false);
            viewModel.valgtBrygg(data[data.length - 1]);
            viewModel.visKarakterRegistrering(true);
        }
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

function Brygg() {
    this.navn = ko.observable();
    this.kaffeId = ko.observable();
    this.brygger = ko.observable();
    this.dato = null;
    this.liter = ko.observable();
    this.skjeer = ko.observable();
    this.vis = true;
    this.kommentar = ko.observable();
    this.malthet = ko.observable("FINMALT");
    this.karakterer = [];
}

function gyldigBrygg(brygg) {
    if (!brygg().navn()) {
        return false;
    }
    if (!brygg().kaffeId()) {
        return false;
    }
    if (!brygg().brygger()) {
        return false;
    }
    if (!brygg().liter()) {
        return false;
    }
    if (!brygg().skjeer()) {
        return false;
    }
    if (!brygg().malthet()) {
        return false;
    }
    return true;
}
