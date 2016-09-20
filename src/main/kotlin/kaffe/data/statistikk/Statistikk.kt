package kaffe.data.statistikk

import kaffe.data.Bruker

data class Statistikk(var bruker: Bruker,
                      var bryggeStatistikk: BryggeStatistikk = BryggeStatistikk(),
                      var gjetteStatistikk: GjetteStatistikk = GjetteStatistikk())