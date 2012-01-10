



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
    return _.contains(MAP[from].army_moves),goal)
  else if(type=="f" || type=="F")
    return _.contains(MAP[from].fleet_moves),goal)

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
  for(x in units)
    if(units[x].province==prov)
      return units[x];
  return null;
}







function markInvalidMoves(units)
{
  for(x in units)
  {
    //for moves and supports
    if(units[x].order.move=="m" || units[x].order.move=="s")
    {
      //make sure the unit can go there
      var v = validMove(unit[x]);

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
      invalidateUnit(unit[x],"invalid");
  }
}

function markCutSupport(units)
{
  //for all units
  for(x in units)
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
  for(x in units)
  {
    //find supporting units
    if(units[x].move=="s")
    {
      //find who unit[x] is supporting
      var supported = unit(units[x].order.from,units)
      //if their orders match, increase support
      if(supported.order.move=="m" //attack move
        && sameToFrom(supported,units[x]) )//same to, from
        //increase support count
        supported.order.support+=1;
    }
  }

}

function cannotSwapSpaces(units)
{
  for(x in units)
  {
    if(unit[x].order.move=="m")
    {
      //where is the unit that you are going to going?
      var ex-unit = unit(unit[x].order.to).order.to;
      //if the ex-unit is going to my sqare
      //and we have the same support: standoff
      if ( ex-unit==unit[x].order.from 
        && (unit(unit[x].order.to).order.support==unit[x].order.support) )
      {
        invalidateUnit(unit[x],"cant_swap");
        invalidateUnit(unit(unit[x].order.to),"cant_swap");
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
    for(x in MAP)
    {
      //if more than one entrant into a space
      if(MAP[x].combatlist.length>1)
      {
        var sup;
        //count each prov's supply
        for(y in MAP[x].combatlist)
        {
          sup[y]={ prov: MAP[x].combatlist[y],
            sup: unit(MAP[x].combatlist[y]).order.support };
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
          for(y in invalidate)
          {
            //put onto its own combat list
            MAP[invalidate[y].prov].combatlist.push(invalidate[y].prov);
            //remove from this combat list
            MAP[x].combatlist = _.reject(MAP[x].combatlist,function(p){return p==invalidate[y].prov;});
            //mark the unit as hold
            invalidateUnit(unit(invalidate[y].prov),"lost");
          }
          again=true;
        }
      }
    }
  }

  //assume everyone tied should be put on hold
  for(x in MAP)
  {
    var cl = MAP[x].combatlist;
    //if more than one entrant into a space
    if(cl.length>1)
    {
      for(y in cl)
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

function initialResolve(units)
{
  //for each unit
  for(x in units)
  {
    //add it to the combat list of the space its trying to enter/hold
    if(units[x].order.move=="m" || units[x].order.move=="h")
      MAP[units[x].order.to].combatlist.push(unit[x].province);
    else if(units[x].order.move=="s")
      MAP[units[x].province].combatlist.push(unit[x].province);
  }

  cannotSwapSpaces(units);
  resolveStrengths(units);
}


function finalResolve(units)
{
  //while there are some combatlists with >= than 2 entrants
  while(_.some(MAP),function(m){return m.combatlist.length>=2;})
  {
    var again=true;
    while(again)
    {
      again=false;
      //for each space
      for(x in MAP)
      {
        //if more than one entrant into a space
        if(MAP[x].combatlist.length>1)
        {
          var sup;
          //count each prov's supply
          for(y in MAP[x].combatlist)
          {
            sup[y]={ prov: MAP[x].combatlist[y],
              sup: unit(MAP[x].combatlist[y]).order.support };
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
            for(y in invalidate)
            {
              //assert(MAP[invalidate[y].prov]==MAP[x]); //should only be non-successful ones that lose now

              //remove from this combat list
              MAP[x].combatlist = _.reject(MAP[x].combatlist,function(p){return p==invalidate[y].prov;});
              //mark the unit as hold
              invalidateUnit(unit(invalidate[y].prov),"RETREAT");
            }
            again=true;
          }
        }
      }
    }

    //assume everyone tied should be put on hold
    for(x in MAP)
    {
      var cl = MAP[x].combatlist;
      //if more than one entrant into a space
      if(cl.length>1)
      {
        for(y in cl)
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
  //can they retreat or are they dislodged?
  finalResolve(units);

}









