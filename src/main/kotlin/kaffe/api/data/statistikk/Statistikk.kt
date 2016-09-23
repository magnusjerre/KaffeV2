package kaffe.api.data.statistikk

data class Statistikk(var bruker: String,
                      var bryggeStatistikk: BryggeStatistikk = BryggeStatistikk(),
                      var gjetteStatistikk: GjetteStatistikk = GjetteStatistikk())