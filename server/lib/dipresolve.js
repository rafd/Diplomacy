_=require("../../public/scripts/vendor/underscore.min");


var GAME1={
  units : [  
    {owner: "Eng", province: "NAt", utype: "F", order: {move: "m", from: "NAt", to: "Nrg", tag: "", support: 0} },
    {owner: "Aus", province: "Cly", utype: "F", order: {move: "s", from: "NAt", to: "Nrg", tag: "", support: 0} },
    {owner: "Fra", province: "Nth", utype: "F", order: {move: "m", from: "Nth", to: "Nrg", tag: "", support: 0} },
    {owner: "Eng", province: "Edi", utype: "A", order: {move: "m", from: "Edi", to: "Lvp", tag: "", support: 0} },
    {owner: "Ger", province: "Wal", utype: "A", order: {move: "m", from: "Wal", to: "Lvp", tag: "", support: 0} }
  ]
}

var GAME2={
  units : [  
    {owner: "Eng", province: "NAt", utype: "F", order: {move: "m", from: "NAt", to: "Nrg", tag: "", support: 0} },
    {owner: "Aus", province: "Edi", utype: "F", order: {move: "s", from: "NAt", to: "Nrg", tag: "", support: 0} },
    {owner: "Fra", province: "Nth", utype: "F", order: {move: "m", from: "Nth", to: "Nrg", tag: "", support: 0} },
    {owner: "Eng", province: "Cly", utype: "F", order: {move: "m", from: "Cly", to: "NAt", tag: "", support: 0} },
    {owner: "Ger", province: "Lvp", utype: "A", order: {move: "m", from: "Lvp", to: "Cly", tag: "", support: 0} },
    {owner: "Ger", province: "Yor", utype: "A", order: {move: "m", from: "Yor", to: "Lvp", tag: "", support: 0} },
    {owner: "Eng", province: "Wal", utype: "A", order: {move: "m", from: "Wal", to: "Lvp", tag: "", support: 0} },
    {owner: "Ger", province: "Iri", utype: "F", order: {move: "m", from: "Iri", to: "Wal", tag: "", support: 0} }
  ]
}

var GAME3={
  units : [  
    {owner: "Eng", province: "NAt", utype: "F", order: {move: "m", from: "NAt", to: "Nrg", tag: "", support: 0} },
    {owner: "Aus", province: "Edi", utype: "F", order: {move: "s", from: "NAt", to: "Nrg", tag: "", support: 0} },
    {owner: "Fra", province: "Nth", utype: "F", order: {move: "s", from: "Nrg", to: "Nrg", tag: "", support: 0} },
    {owner: "Fra", province: "Nrg", utype: "F", order: {move: "h", from: "Nrg", to: "Nrg", tag: "", support: 0} },
    {owner: "Ger", province: "Lvp", utype: "A", order: {move: "h", from: "Lvp", to: "Lvp", tag: "", support: 0} },
    {owner: "Ger", province: "Lon", utype: "A", order: {move: "s", from: "Wal", to: "Lvp", tag: "", support: 0} },
    {owner: "Eng", province: "Wal", utype: "A", order: {move: "m", from: "Wal", to: "Lvp", tag: "", support: 0} },
    {owner: "Ger", province: "Iri", utype: "F", order: {move: "m", from: "Iri", to: "Cly", tag: "", support: 0} }
  ]
}

var GAME4={
  units : [  
    {owner: "Eng", province: "NAt", utype: "F", order: {move: "m", from: "NAt", to: "Nrg", tag: "", support: 0} },
    {owner: "Fra", province: "Nth", utype: "F", order: {move: "s", from: "NAt", to: "Nrg", tag: "", support: 0} },
    {owner: "Aus", province: "Nrg", utype: "F", order: {move: "h", from: "Nrg", to: "Nrg", tag: "", support: 0} },
  ]
}

var GAME5={
  units : [  
    {owner: "Eng", province: "NAt", utype: "F", order: {move: "m", from: "NAt", to: "Nrg", tag: "", support: 0} },
    {owner: "Fra", province: "Nth", utype: "F", order: {move: "s", from: "NAt", to: "Nrg", tag: "", support: 0} },
    {owner: "Fra", province: "Nrg", utype: "F", order: {move: "h", from: "Nrg", to: "Nrg", tag: "", support: 0} },
  ]
}
//constants.
MAP = {
  NAt : {fullname: "North Atlantic",
        army_moves: [],
        fleet_moves: ["Cly","Lvp","Iri","Mid","Nrg"],
        belongsto: "",
        supply: 0,
      },
  Nrg : {fullname: "Norwegian Sea",
        army_moves: [],
        fleet_moves: ["Edi","Nth","Nwy","Bar","NAt","Cly"],
        belongsto: "",
        supply: 0
      },
  Nth : {fullname: "North Sea",
        army_moves: [],
        fleet_moves: ["Edi","Nrg","Nwy","Ska","Den","Hel","Hol","Bel","Eng","Lon","Yor"],
        belongsto: "",
        supply: 0
      },
  Cly : {fullname: "Clyde",
        army_moves: ["Edi","Lvp"],
        fleet_moves: ["Edi","Lvp","Nrg","NAt"],
        belongsto: "Eng",
        supply: 0
      },
  Edi : {fullname: "Edinburgh",
        army_moves: ["Cly","Lvp","Yor",],
        fleet_moves: ["Cly","Nth","Yor","Nrg"],
        belongsto: "Eng",
        supply: 1
      },
  Lvp: {fullname: "Liverpool",
        army_moves: ["Edi","Cly","Yor","Wal"],
        fleet_moves: ["Cly","Atl","Wal","Iri"],
        belongsto: "Eng",
        supply: 1
      },
  Yor:  {fullname: "York",
        army_moves: ["Edi","Lvp","Lon","Wal"],
        fleet_moves: ["Edi","Lon","Nth"],
        belongsto: "Eng",
        supply: 0
      },
  Wal:  {fullname: "Wales",
        army_moves: ["Yor","Lvp","Lon"],
        fleet_moves: ["Lvp","Lon","Iri","Eng"],
        belongsto: "Eng",
        supply: 0
      },
  Lon:  {fullname: "London",
        army_moves: ["Yor","Wal"],
        fleet_moves: ["Yor","Wal","Nth","Eng"],
        belongsto: "Eng",
        supply: 1
      },
  Iri:  {fullname: "Irish Sea",
        army_moves: [],
        fleet_moves: ["NAt","Eng","Wal","Lvp"],
        belongsto: "",
        supply: 0
      },
  Eng:  {fullname: "English Channel",
        army_moves: [],
        fleet_moves: ["Iri","Mid","Bre","Pic","Bel","Nth","Lon","Wal"],
        belongsto: "",
        supply: 0
      },
  Mid:  {fullname: "Mid-Atlantic Ocean",
        army_moves: [],
        fleet_moves: ["NAt","Eng","Iri","Bre","Gas","SpaN","Por"],
        belongsto: "",
        supply: 0
      },
  Por:  {fullname: "Portugal",
        army_moves: ["Spa"],
        fleet_moves: ["Mid","SpaN","SpaS"],
        belongsto: "",
        supply: 0
      },
  Bre:  {fullname: "Brest",
        army_moves: ["Pic","Par","Gas"],
        fleet_moves: ["Pic","Gas","Mid","Eng"],
        belongsto: "Fra",
        supply: 0
      },
  Pic:  {fullname: "Picardy",
        army_moves: ["Bel","Par","Bur","Bre"],
        fleet_moves: ["Bel","Bre","Eng"],
        belongsto: "Fra",
        supply: 0
      },
  Bel:  {fullname: "Belguim",
        army_moves: ["Hol","Ruh","Bur","Pic"],
        fleet_moves: ["Nth","Eng","Hol","Pic"],
        belongsto: "",
        supply: 1
      },
  Hol:  {fullname: "Holland",
        army_moves: ["Bel","Ruh","Kie"],
        fleet_moves: ["Nth","Hel","Bel","Kie"],
        belongsto: "",
        supply: 1
      },
  Hel:  {fullname: "Helgoland Bight",
        army_moves: [],
        fleet_moves: ["Nth","Den","Hol","Kie"],
        belongsto: "",
        supply: 0
      },
  Den:  {fullname: "Denmark",
        army_moves: ["Kie","Swe"],
        fleet_moves: ["Swe","Kie","Hel","Nth","Ska","Bal"],
        belongsto: "",
        supply: 1
      },
  Ska:  {fullname: "Skagerrak",
        army_moves: [],
        fleet_moves: ["Nwy","Nth","Den","Swe"],
        belongsto: "",
        supply: 0
      },
  Nwy:  {fullname: "Norway",
        army_moves: ["Swe","Fin","StP"],
        fleet_moves: ["StP","Bar","Nrg","Nth","Ska","Swe"],
        belongsto: "",
        supply: 0
      },
  SpaN:  {fullname: "Spain North Coast",
        army_moves: ["Por","Gas","Mar"],
        fleet_moves: ["Mid","Por","Gas"],
        belongsto: "",
        supply: 1
      },
  SpaS:  {fullname: "Spain South Coast",
        army_moves: ["Por","Gas","Mar"],
        fleet_moves: ["Mid","Wes","GoL","Mar","Por"],
        belongsto: "",
        supply: 1
      },
  Spa:  {fullname: "Spain",
        army_moves: ["Por","Gas","Mar"],
        fleet_moves: ["Mid","Por","Gas"],
        belongsto: "",
        supply: 1
      },
  Gas:  {fullname: "Gascony",
        army_moves: ["Spa","Mar","Bur","Par","Bre"],
        fleet_moves: ["Mid","SpaN","Bre"],
        belongsto: "Fra",
        supply: 0
      },
  Mar:  {fullname: "Marsellilles",
        army_moves: ["Spa","Gas","Bur","Par","Pie"],
        fleet_moves: ["GoL","SpaS","Pie"],
        belongsto: "Fra",
        supply: 1
      },
  Pie:  {fullname: "Piedmont",
        army_moves: ["Mar","Tyr","Ven","Tus"],
        fleet_moves: ["Tus","Mar","GoL"],
        belongsto: "Fra",
        supply: 0
      },
  Par:  {fullname: "Paris",
        army_moves: ["Pic","Bre","Gas","Bur"],
        fleet_moves: [],
        belongsto: "Fra",
        supply: 1
      },
  GoL:  {fullname: "Gulf of Lyon",
        army_moves: [],
        fleet_moves: ["SpaS","Wes","Tyn","Tus","Pie","Mar"],
        belongsto: "",
        supply: 0
      },
  Wes:  {fullname: "Western Mediterranean",
        army_moves: [],
        fleet_moves: ["SpaS","GoL","Mid","NAf","Tun","Tyn"],
        belongsto: "",
        supply: 0
      },
  NAf:  {fullname: "North Africa",
        army_moves: ["Tun"],
        fleet_moves: ["Wes","Mid","Tun"],
        belongsto: "",
        supply: 0
      },
  Tun:  {fullname: "Tunis",
        army_moves: ["NAf"],
        fleet_moves: ["NAf","Wes","Tyn","Ion"],
        belongsto: "",
        supply: 1
      },
  Tyn:  {fullname: "Tyrrhenian Sea",
        army_moves: [],
        fleet_moves: ["Tun","Wes","GoL","Tus","Rom","Nap","Ion"],
        belongsto: "",
        supply: 0
      },
  Ion:  {fullname: "Ionian Sea",
        army_moves: [],
        fleet_moves: ["Tun","Tyn","Nap","Apu","Adr","Alb","Gre","Aeg","Eas"],
        belongsto: "",
        supply: 0
      },
  Bur:  {fullname: "Burgundy",
        army_moves: ["Par","Gas","Mar","Mun","Ruh","Bel","Pic"],
        fleet_moves: [],
        belongsto: "Fra",
        supply: 0
      },
  Kie:  {fullname: "Kiel",
        army_moves: ["Hol","Ruh","Mun","Kie","Den"],
        fleet_moves: ["Hol","Ber","Hel","Bal"],
        belongsto: "Ger",
        supply: 1
      },
  Ruh:  {fullname: "Ruhr",
        army_moves: ["Hol","Bel","Bur","Mun","Kie"],
        fleet_moves: [],
        belongsto: "Ger",
        supply: 0
      },
  Swe:  {fullname: "Sweden",
        army_moves: ["Nwy","Fin","Den"],
        fleet_moves: ["Nwy","Fin","Bot","Bal","Den","Ska"],
        belongsto: "",
        supply: 1
      },
  Bal:  {fullname: "Baltic Sea",
        army_moves: [],
        fleet_moves: ["Bot","Lvn","Swe","Den","Kie","Ber","Pru"],
        belongsto: "",
        supply: 0
      },
  Ber:  {fullname: "Berlin",
        army_moves: ["Kie","Pru","Sil","Mun"],
        fleet_moves: ["Kie","Pru","Bal"],
        belongsto: "Ger",
        supply: 1
      },
  Mun:  {fullname: "Munich",
        army_moves: ["Sil","Ber","Kie","Ruh","Bur","Tyr","Boh"],
        fleet_moves: [],
        belongsto: "Ger",
        supply: 1
      },
  Tyr:  {fullname: "Tyrolia",
        army_moves: ["Pie","Ven","Tri","Vie","Boh","Mun"],
        fleet_moves: [],
        belongsto: "Aus",
        supply: 0
      },
  Ven:  {fullname: "Venice",
        army_moves: ["Tri","Tyr","Pie","Tus","Rom","Apu"],
        fleet_moves: ["Tri","Apu","Adr"],
        belongsto: "Ita",
        supply: 1
      },
  Tus:  {fullname: "Tuscany",
        army_moves: ["Pie","Ven","Rom"],
        fleet_moves: ["Pie","Rom","GoL","Tyn"],
        belongsto: "Ita",
        supply: 0
      },
  Rom:  {fullname: "Rome",
        army_moves: ["Tus","Ven","Apu","Nap"],
        fleet_moves: ["Tus","Nap","Tyn"],
        belongsto: "Ita",
        supply: 1
      },
  Nap:  {fullname: "Naples",
        army_moves: ["Rom","Apu"],
        fleet_moves: ["Rom","Apu","Tyn","Ion"],
        belongsto: "Ita",
        supply: 0
      },
  Apu:  {fullname: "Apulia",
        army_moves: ["Nap","Rom","Ven"],
        fleet_moves: ["Adr","Ven","Ion","Nap"],
        belongsto: "Ita",
        supply: 0
      },
  Adr:  {fullname: "Adriatic Sea",
        army_moves: [],
        fleet_moves: ["Alb","Tri","Ven","Apu","Ion"],
        belongsto: "",
        supply: 0
      },
  Tri:  {fullname: "Trieste",
        army_moves: ["Alb","Ser","Bud","Vie","Tyr","Ven"],
        fleet_moves: ["Ven","Adr","Alb"],
        belongsto: "Aus",
        supply: 1
      },
  Vie:  {fullname: "Vienna",
        army_moves: ["Boh","Gal","Bud","Tri","Tyr"],
        fleet_moves: [],
        belongsto: "Aus",
        supply: 1
      },
  Boh:  {fullname: "Bohemia",
        army_moves: ["Mun","Tyr","Vie","Gal","Sil"],
        fleet_moves: [],
        belongsto: "Aus",
        supply: 0
      },
  Sil:  {fullname: "Silesia",
        army_moves: ["Ber","Pru","Mun","Boh","Gal","War"],
        fleet_moves: [],
        belongsto: "Ger",
        supply: 0
      },
  Pru:  {fullname: "Prussia",
        army_moves: ["Ber","Sil","War","Lvn"],
        fleet_moves: ["Ber","Lvn","Bal"],
        belongsto: "Ger",
        supply: 0
      },
  Bot:  {fullname: "Gulf of Botnia",
        army_moves: [],
        fleet_moves: ["Swe","Fin","StPS","Lvn","Bal"],
        belongsto: "",
        supply: 0
      },
  Fin:  {fullname: "Finland",
        army_moves: ["StP","Nwy","Swe"],
        fleet_moves: ["StPS","Swe","Bot"],
        belongsto: "Rus",
        supply: 0
      },
  Bar:  {fullname: "Barents Sea",
        army_moves: [],
        fleet_moves: ["StPN","Nwy","Nrg"],
        belongsto: "",
        supply: 0
      },
  StP:  {fullname: "St. Petersburg",
        army_moves: ["Nwy","Fin","Lvn","Mos"],
        fleet_moves: [],
        belongsto: "Rus",
        supply: 1
      },
  StPN:  {fullname: "St. Petersburg North Coast",
        army_moves: [],
        fleet_moves: ["Bar","Nwy"],
        belongsto: "Rus",
        supply: 1
      },
  StPS:  {fullname: "St. Petersburg South Coast",
        army_moves: [],
        fleet_moves: ["Lvn","Fin","Bot"],
        belongsto: "Rus",
        supply: 1
      },
  Lvn:  {fullname: "Livonia",
        army_moves: ["StP","Mos","War","Pru"],
        fleet_moves: ["Pru","StP","Bot","Bal"],
        belongsto: "Rus",
        supply: 0
      },
  Mos:  {fullname: "Moscow",
        army_moves: ["StP","Lvn","War","Ukr","Sev"],
        fleet_moves: [],
        belongsto: "Rus",
        supply: 1
      },
  War:  {fullname: "Warsaw",
        army_moves: ["Lvn","Pru","Sil","Gal","Ukr","Mos"],
        fleet_moves: [],
        belongsto: "Rus",
        supply: 1
      },
  Ukr:  {fullname: "Ukraine",
        army_moves: ["Mos","Sev","Rum","Gal","War"],
        fleet_moves: [],
        belongsto: "Rus",
        supply: 0
      },
  Sev:  {fullname: "Sevastopol",
        army_moves: ["Mos","Ukr","Rum","Arm"],
        fleet_moves: ["Bla","Rum","Arm"],
        belongsto: "Rus",
        supply: 0
      },
  Gal:  {fullname: "Galicia",
        army_moves: ["War","Sil","Boh","Vie","Bud","Rum","Ukr"],
        fleet_moves: [],
        belongsto: "Aus",
        supply: 0
      },
  Bud:  {fullname: "Budapest",
        army_moves: ["Gal","Rum","Ser","Tri","Vie"],
        fleet_moves: [],
        belongsto: "xxx",
        supply: 1
      },
  Rum:  {fullname: "Rumania",
        army_moves: ["Sev","Ukr","Gal","Bud","Ser","Bul"],
        fleet_moves: ["Sev","Bul","Bla"],
        belongsto: "",
        supply: 1
      },
  Ser:  {fullname: "Serbia",
        army_moves: ["Tri","Bud","Rum","Bul","Gre","Alb"],
        fleet_moves: [],
        belongsto: "",
        supply: 1
      },
  Alb:  {fullname: "Albania",
        army_moves: ["Tri","Ser","Gre"],
        fleet_moves: ["Adr","Tri","Gre","Ion"],
        belongsto: "",
        supply: 0
      },
  Bul:  {fullname: "Bulgaria",
        army_moves: ["Con","Rum","Ser","Gre"],
        fleet_moves: [],
        belongsto: "",
        supply: 1
      },
  BulN:  {fullname: "Bulgaria North Coast",
        army_moves: [],
        fleet_moves: ["Rum","Con","Bla"],
        belongsto: "",
        supply: 1
      },
  BulS:  {fullname: "Bulgaria South Coast",
        army_moves: [],
        fleet_moves: ["Con","Aeg","Gre"],
        belongsto: "",
        supply: 1
      },
  Gre:  {fullname: "Greece",
        army_moves: ["Bul","Ser","Alb"],
        fleet_moves: ["Aeg","Ion","BulS","Alb"],
        belongsto: "",
        supply: 0
      },
  Aeg:  {fullname: "Aegean Sea",
        army_moves: [],
        fleet_moves: ["Ion","Eas","Con","BulS","Gre"],
        belongsto: "",
        supply: 0
      },
  Eas:  {fullname: "Eastern Mediterranean",
        army_moves: [],
        fleet_moves: ["Aeg","Ion","Smy","Syr"],
        belongsto: "",
        supply: 0
      },
  Bla:  {fullname: "Black Sea",
        army_moves: [],
        fleet_moves: ["Sev","Arm","Ank","Con","Bul","Rum"],
        belongsto: "",
        supply: 0
      },
  Con:  {fullname: "Constantinople",
        army_moves: ["Bul","Smy","Ank"],
        fleet_moves: ["Aeg","BulN","BulS","Bla","Ank","Smy"],
        belongsto: "Tur",
        supply: 1
      },
  Ank:  {fullname: "Ankara",
        army_moves: ["Con","Smy","Arm"],
        fleet_moves: ["Con","Bla","Arm"],
        belongsto: "Tur",
        supply: 1
      },
  Smy:  {fullname: "Smyrna",
        army_moves: ["Con","Ank","Arm","Syr"],
        fleet_moves: ["Aeg","Eas","Con","Syr"],
        belongsto: "Tur",
        supply: 1
      },
  Arm:  {fullname: "Armenia",
        army_moves: ["Sev","Ank","Smy","Syr"],
        fleet_moves: ["Bla","Ank","Sev"],
        belongsto: "Tur",
        supply: 0
      },
  Syr:  {fullname: "Syria",
        army_moves: ["Arm","Smy"],
        fleet_moves: ["Smy","Eas"],
        belongsto: "Tur",
        supply: 0
      }
};

COUNTRY = ["Aus","Eng","Fra","Ger","Ita","Rus","Tur"];



//utility functions



function sameToFrom(x,y)
{
  return (x.order.from==y.order.from) && (x.order.to==y.order.to)
}


function validMove(unit)
{
  var from=unit.province;
  var goal=unit.order.to;
  var type=unit.utype;

  if (type=="a" || type=="A")
    return _.contains(MAP[from].army_moves,goal)
  else if(type=="f" || type=="F")
    return _.contains(MAP[from].fleet_moves,goal)

  console.log("invalid army type encountered in validMove");
  return false;
}

function invalidateUnit(unit,t)
{
  unit.order.tag=t;
  unit.order.move="h";
  unit.order.from=unit.province;
  unit.order.to=unit.province;
  unit.order.support=0;
}

//given the name of a province (p) and a list of units
//return the "unit" object of province p
function unit(prov,units)
{
  for(var x in units)
    if(units[x].province==prov)
      return units[x];
  return null;
}







function markInvalidMoves(units)
{
  for(var x in units)
  {
    //for moves and supports
    if(units[x].order.move=="m" || units[x].order.move=="s")
    {
      //make sure the unit can go there
      var v = validMove(units[x]);

      //if moving, order must be from original province
      if(units[x].order.move=="m"
      && units[x].province!=units[x].order.from)
        v=false;

      //if supporting, order must for different province
      else if(units[x].order.move=="s"
      && units[x].province==units[x].order.from)
        v=false;
    }
    if(v==false)
      invalidateUnit(units[x],"invalid");
  }
}

function markCutSupport(units)
{
  //for all units
  for(var x in units)
  {
    var existingUnit=unit(units[x].order.to,units);

    //there is no existing unit
    if(existingUnit==null)
      return;
    
    //assuming existingUnit is support, who is it supporting?
    var supportedUnit=unit(existingUnit.order.from,units);

    //if the space occupied by a unit offering support
    if(existingUnit.order.move=="s")
      //cannot cut support when you are the one bring attacked
      if(supportedUnit.order.to!=unit[x].province)
        //then cut support
        invalidateUnit(existingUnit,"sup_cut");
  }
}


function calcInitialStrengths(units)
{
  //for all units
  for(var x in units)
  {
    //find supporting units
    if(units[x].order.move=="s")
    {
      //find who unit[x] is supporting
      var supported = unit(units[x].order.from,units)
      //if their orders match, increase support
      if((supported.order.move=="m" || supported.order.move=="h")//attack move or hold
        && sameToFrom(supported,units[x]) )//same to, from
        //increase support count
        supported.order.support+=1;
      invalidateUnit(units[x],"supporter")
    }
  }

}

function cannotSwapSpaces(units)
{
  for(var x in units)
  {
    if(units[x].order.move=="m" && unit(units[x].order.to,units) != undefined)
    {
      //where is the unit that you are going to going?
      var exunit = unit(units[x].order.to,units).order.to;
      //if the ex-unit is going to my sqare
      //and we have the same support: standoff
      if ( exunit==units[x].order.from 
        && (unit(units[x].order.to,units).order.support==units[x].order.support) )
      {
        invalidateUnit(units[x],"cant_swap");
        invalidateUnit(unit(units[x].order.to,units),"cant_swap");
      }
    }
  }
}

function resolveStrengths(units)
{
  var again=true;
  while(again)
  {
    again=false;
    //for each space
    for(var x in MAP)
    {
      //if more than one entrant into a space
      if(MAP[x].combatlist.length>1)
      {
        var sup=[];
        //count each prov's supply
        for(var y in MAP[x].combatlist)
        {
          sup[y]={ prov: MAP[x].combatlist[y],
            sup: unit(MAP[x].combatlist[y], units).order.support };
        }
        //find max supply number
        var max = _.max(sup,function(s){ return s.sup; });
        //find all who have max
        var top = _.select(sup,function(s){ return s.sup==max.sup; });

        if(top.length!=sup.length)//if not all the same number
        {
          //all units less than max should be invalidated
          var invalidate = _.difference(sup,top);
          //for all losing units
          for(var y in invalidate)
          {
            var p = invalidate[y].prov;
            //remove from this combat list
            MAP[x].combatlist = _.reject(MAP[x].combatlist,function(prov){return prov==p;});

            if(unit(p,units).order.move=="m")
            {  //put onto its own combat list
              MAP[p].combatlist.push(invalidate[y].prov);
              //mark the unit as hold
              invalidateUnit(unit(p,units),"lost");
            }
            else if (unit(p,units).order.move=="h")
            {
              //mark the unit as retreat
              invalidateUnit(unit(p,units),units,"RETREAT");
              unit(p,units).order.move='r';
              //TODO: Check if disband (no space to move)
              //TODO: Check if self-dislodge, no help list
            }
          }
          again=true;
        }
      }
    }
  }

  //assume everyone tied should be put on hold
  for(var x in MAP)
  {
    var cl = MAP[x].combatlist;
    //if more than one entrant into a space
    if(cl.length>1)
    {
      MAP[x].combatlist=[];
      for(var y in cl)
      {
        var prov = cl[y];
        //move onto its own list combat as hold
        MAP[prov].combatlist.push(prov);
        //mark the unit as hold
        invalidateUnit(unit(prov,units),"tied");
      }
    }
  }

}

function initialResolve(units)
{
  //for each unit
  for(var x in units)
  {
    //add it to the combat list of the space its trying to enter/hold
    if(units[x].order.move=="m" || units[x].order.move=="h")
      MAP[units[x].order.to].combatlist.push(units[x].province);
    else if(units[x].order.move=="s")
      MAP[units[x].province].combatlist.push(units[x].province);
  }

  cannotSwapSpaces(units);
  resolveStrengths(units);
}


function finalResolve(units)
{
  //while there are some combatlists with >= than 2 entrants
  while(_.some(MAP,function(m){return m.combatlist.length>=2;}))
  {
    var again=true;
    while(again)
    {
      again=false;
      //for each space
      for(var x in MAP)
      {
        //if more than one entrant into a space
        if(MAP[x].combatlist.length>1)
        {
          var sup;
          //count each prov's supply
          for(var y in MAP[x].combatlist)
          {
            sup[y]={ 
              prov: MAP[x].combatlist[y],
              sup: unit(MAP[x].combatlist[y],units).order.support
            };
          }
          //find max supply number
          var max = _.max(sup,function(s){ return s.sup; });
          //find all who have max
          var top = _.select(sup,function(s){ return s.sup==max; });

          if(top.length!=sup.length)//if not all the same number
          {
            //all units less than max should be invalidated
            var invalidate = _.difference(sup,top);
            //for all losing units
            for(var y in invalidate)
            {
              //assert(MAP[invalidate[y].prov]==MAP[x]); //should only be non-successful ones that lose now

              //remove from this combat list
              MAP[x].combatlist = _.reject(MAP[x].combatlist,function(prov){return prov==invalidate[y].prov;});
              //mark the unit as hold
              invalidateUnit(unit(invalidate[y].prov,units),"RETREAT");
              unit(invalidate[y].prov,units).order.move="r";
              //TODO: check self-dislodgement
              //TODO: check disbandment
            }
            again=true;
          }
        }
      }
    }

    //assume everyone tied should be put on hold
    for(var x in MAP)
    {
      var cl = MAP[x].combatlist;
      //if more than one entrant into a space
      if(cl.length>1)
      {
        for(var y in cl)
        {
          //move onto its own list combat as hold
          MAP[cl[y]].combatlist.push(cl[y]);
          //remove from this combat list
          _.reject(MAP[x].combatlist,function(p){return p==invalidate[y].prov;});
          //mark the unit as hold
          invalidateUnit(unit(invalidate[y].prov,units),"tied");
        }
      }
    }
  }
}

function finalBoard(units)
{
  //find all the ones that say RETREAT
  //Finalize all people on the combatlist
}

function resetVars()
{
  
}

function DipResolve(units)
{

  return "RESOLVED"

  var units = game.units;//TODO: magic

  //sanity test: are orders legal?
  //1. unit can move there
  //2. order is from valid province
  markInvalidMoves(units);
  //for all moving units
  //check to see attacking support
  //and if the country attacked isn't the one trying to cut
  //if so, cut the support
  markCutSupport(units);
  //count support for each unit
  calcInitialStrengths(units);
  //map who wants to go where
  //see if people can go where they want
  initialResolve(units);
  //if people cannot go where they want
  //send them back to where they came from + hold. Resolve strengths again
  finalResolve(units);
  //deal with move and retreat
  finalBoard(units);

  //reset global variables for next turn
  resetVars();

}




//resolve(GAME1);
//resolve(GAME2);
//resolve(GAME3);
//resolve(GAME4);


if (typeof module !== 'undefined' && module.exports) {
  module.exports = DipResolve;
} else if (typeof exports !== 'undefined') {
  exports.DipResolve = DipResolve;
}