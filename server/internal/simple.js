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
var MAP = {
  NAt : {fullname: "North Atlantic",
        army_moves: [],
        fleet_moves: ["Cly","Lvp","Iri","Mid","Nrg"],
        belongsto: "",
        supply: 0,
        combatlist: []},
  Nrg : {fullname: "Norwegian Sea",
        army_moves: [],
        fleet_moves: ["Edi","Nth","Nwy","Bar","NAt","Cly"],
        belongsto: "",
        supply: 0,
        combatlist: []},
  Nth : {fullname: "North Sea",
        army_moves: [],
        fleet_moves: ["Edi","Nrg","Nwy","Ska","Den","Hel","Hol","Bel","Eng","Lon","Yor"],
        belongsto: "",
        supply: 0,
        combatlist: []},
  Cly : {fullname: "Clyde",
        army_moves: ["Edi","Lvp"],
        fleet_moves: ["Edi","Lvp","Nrg","NAt"],
        belongsto: "Eng",
        supply: 0,
        combatlist: []},
  Edi : {fullname: "Edinburgh",
        army_moves: ["Cly","Lvp","Yor",],
        fleet_moves: ["Cly","Nth","Yor","Nrg"],
        belongsto: "Eng",
        supply: 1,
        combatlist: []},
  Lvp : {fullname: "Liverpool",
        army_moves: ["Edi","Cly","Yor","Wal"],
        fleet_moves: ["Cly","Atl","Wal","Iri"],
        belongsto: "Eng",
        supply: 1,
        combatlist: []},
  Yor:  {fullname: "York",
        army_moves: ["Edi","Lvp","Lon","Wal"],
        fleet_moves: ["Edi","Lon","Nth"],
        belongsto: "Eng",
        supply: 0,
        combatlist: []},
  Wal:  {fullname: "Wales",
        army_moves: ["Yor","Lvp","Lon"],
        fleet_moves: ["Lvp","Lon","Iri","Eng"],
        belongsto: "Eng",
        supply: 0,
        combatlist: []},
  Lon:  {fullname: "London",
        army_moves: ["Yor","Wal"],
        fleet_moves: ["Yor","Wal","Nth","Eng"],
        belongsto: "Eng",
        supply: 1,
        combatlist: []},
  Iri:  {fullname: "Irish Sea",
        army_moves: [],
        fleet_moves: ["NAt","Eng","Wal","Lvp"],
        belongsto: "",
        supply: 0,
        combatlist: []}
};

var COUNTRY = ["Aus","Eng","Fra","Ger","Ita","Rus","Tur"];








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
    if(units[x].order.move=="m" && unit(units[x].order.to) != undefined)
    {
      //where is the unit that you are going to going?
      var exunit = unit(units[x].order.to).order.to;
      //if the ex-unit is going to my sqare
      //and we have the same support: standoff
      if ( exunit==units[x].order.from 
        && (unit(units[x].order.to).order.support==units[x].order.support) )
      {
        invalidateUnit(units[x],"cant_swap");
        invalidateUnit(unit(units[x].order.to),"cant_swap");
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
            MAP[x].combatlist = _.reject(MAP[x].combatlist,function(p){return p==invalidate[y].prov;});

            if(unit(p).order.move=="m")
            {  //put onto its own combat list
              MAP[invalidate[y].prov].combatlist.push(invalidate[y].prov);
              //mark the unit as hold
              invalidateUnit(unit(invalidate[y].prov,units),"lost");
            }
            else if (unit(p).order.move=="h")
            {
              //mark the unit as retreat
              //TODO: Check if disband
              //TODO: 
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
              sup: unit(MAP[x].combatlist[y]).order.support
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
              MAP[x].combatlist = _.reject(MAP[x].combatlist,function(p){return p==invalidate[y].prov;});
              //mark the unit as hold
              invalidateUnit(unit(invalidate[y].prov),"RETREAT");
              unit(invalidate[y].prov).order.move="r";
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
          invalidateUnit(unit(invalidate[y].prov),"tied");
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

function resolve(game)
{

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
resolve(GAME4);



