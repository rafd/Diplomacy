_=require("../../public/scripts/vendor/underscore.min");

//constants.

COUNTRY = ["Aus","Eng","Fra","Ger","Ita","Rus","Tur"];

//utility functions

function sameToFrom(x,y)
{
  return (x.order.from==y.order.from) && (x.order.to==y.order.to)
}

function validMove(unit,MAP)
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

//unique unit
function u_unit(prov,units)
{
  for(var x in units)
    if( (units[x].province==prov) 
      && (units[x].order.move=="m")
      && ( units[x].order.to!=prov) )
      return units[x];

  for(var x in units)
    if(units[x].province==prov)
      return units[x];
  return null;
}




function markInvalidMoves(units,MAP)
{
  for(var x in units)
  {
    //for moves and supports
    if(units[x].order.move=="m" || units[x].order.move=="s")
    {
      //make sure the unit can go there
      var v = validMove(units[x],MAP);

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
    var to = units[x].order.to;
    var existingUnit=unit(to,units);

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
  for(var x in units)
  {
    units[x].order.support=0;
  }
  //for all units
  for(var x in units)
  {
    //find supporting units
    if(units[x].order.move=="s")
    {
      //find who unit[x] is supporting
      var supported = unit(units[x].order.from,units)

      //if their orders match, increase support
      
      if(supported!=undefined && (supported.order.move=="m" || supported.order.move=="h")//attack move or hold
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

function resolveStrengths(units,MAP)
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
        //if(x=="Gal")
          //console.log(sup);
        //find max supply number
        var max = _.max(sup,function(s){ return s.sup; });
        //console.log("max")
        //console.log(max);
        //find all who have max
        var top = _.select(sup,function(s){ return s.sup==max.sup; });
        //console.log("top")
        //console.log(top)
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
              invalidateUnit(unit(p,units),"RETREAT");
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

  //assume everyone tied should be put on hold if they arent already
  for(var x in MAP)
  {
    var cl = MAP[x].combatlist;
    //if more than one entrant into a space
    if(cl.length>1)
    {
      for(var y in cl)
      {
        var prov = cl[y];
        //move onto its own list combat as hold
        //if it is a move
        if(unit(prov,units).order.move=="m")
        {
          MAP[prov].combatlist.push(prov);
          MAP[x].combatlist = _.reject(MAP[x].combatlist,function(p){return p==prov;});//not working?
        }
        //if it is a tie
        //mark the unit as hold
        invalidateUnit(unit(prov,units),"tied");
      }
    }
  }

}

function initialResolve(units,MAP)
{
  //for each unit
  for(var x in units)
  {
    //add it to the combat list of the space its trying to enter/hold
    if(units[x].order.move=="m")
      MAP[units[x].order.to].combatlist.push(units[x].province);
    else if(units[x].order.move=="s" || units[x].order.move=="h")
      MAP[units[x].province].combatlist.push(units[x].province);
  }
  cannotSwapSpaces(units);
  resolveStrengths(units,MAP);
}


function finalResolve(units,MAP)
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
          var sup=[];

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
          var top = _.select(sup,function(s){ return s.sup==max.sup; });
          /*console.log("max")
          console.log(max)
          console.log("cl");
          console.log(MAP[x].combatlist)
          console.log("sup")
          console.log(sup)
          console.log("top")
          console.log(top)*/
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
          //move onto its own list combat as hold, if it is a move
          if(unit(cl[y],units).order.move=="m")
          {
            MAP[cl[y]].combatlist.push(cl[y]);
          //remove from this combat list
            MAP[x].combatlist =_.reject(MAP[x].combatlist,function(p){return p==invalidate[y].prov;});
          }
          //mark the unit as hold
          invalidateUnit(unit(invalidate[y].prov,units),"tied");
        }
      }
    }
  }
}

function finalBoard(units,MAP)
{
  //find all the ones that say RETREAT
  //Finalize all people on the combatlist
  //Update owner of each province
  for(var x in MAP)
  {
    var cl = MAP[x].combatlist;
    if (cl.length==1)
    {
      var u = u_unit(cl[0],units)
      if(u.order.move=="m")
        u.province=u.order.to;

      MAP[x].belongsto=u.owner;
    }
    else if(MAP[x].combatlist.length>1)
    {
      alert("ERROR! combat list > 1");
    }
  }
}

function resetVars(units,MAP)
{
  //clear combatlist
  for(var x in MAP)
  {
    MAP[x].combatlist=[];
  }
  //do not clear support - we need this so retreating units cannot go into attacker's spaces
  /*for(var x in units)
  {
    if(units[x].order.move!="r")
      units[x].order={};
  }*/
}

function resolve(units,MAP)
{
  //sanity test: are orders legal?
  //1. unit can move there
  //2. order is from valid province
  markInvalidMoves(units,MAP);
  //for all moving units
  //check to see attacking support
  //and if the country attacked isn't the one trying to cut
  //if so, cut the support
  markCutSupport(units);
  //count support for each unit
  calcInitialStrengths(units);
  //map who wants to go where
  //see if people can go where they want
  initialResolve(units,MAP);
  //if people cannot go where they want
  //send them back to where they came from + hold. Resolve strengths again
  finalResolve(units,MAP);
  //deal with move and retreat
  finalBoard(units,MAP);
  //reset global variables for next turn
  resetVars(units,MAP);
  
  return {units:units,MAP:MAP};
}

function countSupply(units,MAP)
{
  var supply = {"Aus":0,"Eng":0,"Fra":0,"Ger":0,"Ita":0,"Rus":0,"Tur":0};

  //count how many supply center each have
  //console.log("Aus's supply centers")
  for (var x in MAP)
  {
    var mapOwner=MAP[x].belongsto;
    if(MAP[x].supply==1)
    {
      //if(MAP[x].belongsto=="Aus")
        //console.log(x);
      supply[MAP[x].belongsto]++;
    }
  }
  return supply;
}

function disbandUnits(units,disband)
{
  //u2 is list of units minus the ones disbanded
  var u2 = _.reject(units,function(u){
    //go through disband list
    for(var x in disband)
    {
      //if provinces and owners match
      if(disband[x].province == u.province
        && u.owner == disband[x].owner)
        return true;//return true to reject
    }
    return false;//return false to keep
  });
  return u2;
}

function addRemoveUnits(units,retreat,spawn,MAP)
{
  //are there existing units in retreat or spawn locations?
  retreat = _.reject(retreat,function(r){
    var found = _.find(units,function(u){
      if(u.province==r.move)
        return true;
      return false;
    });
    if(found!=undefined)
      return true;
    return false;
  });
  spawn = _.reject(spawn,function(s){
    var found = _.find(units,function(u){
      if(u.province==s.province)
        return true;
      return false;
    });
    if(found!=undefined)
      return true;
    return false;
  });
  //add each spawn and retreat to combatlist of map
  for(var x in retreat)
  {
    //TODO: make sure it's a legal move
      MAP[retreat[x].move].combatlist.push(retreat[x]);
  }
  for(var x in spawn)
  {
/*    console.error("spawn x")
    console.error(spawn[x]);*/
    //TODO: make sure it's a legal move
      MAP[spawn[x].province].combatlist.push(spawn[x]);
      /*console.error("cl")
      console.error(MAP[spawn[x].province].combatlist) */
  }

  //two or more units in combatlist: do not add
  var noSpawn=[];
  var noRetreat=[];
  for(var x in MAP)
  {
    var cl = MAP[x].combatlist
    if(cl.length>1)
    {
      for(var y in cl)
        //this was a spawn move
        if(cl[y].utype==undefined)
          noSpawn.push(cl[y]);
        else//if it was a retreat move
          noRetreat.push(cl[y]);
    }
    else if(cl.length==1)
    {
      MAP[x].belongsto = cl.owner;
    }
  }
  //these are the units we must add
  var endS=_.difference(spawn,noSpawn);
  var endR=_.difference(retreat,noRetreat);

  for(var x in endS)
  {
    var move = endS[x].move;
    if(move=="new army")
    {
      units.push({
        owner: endS[x].owner,
        province: endS[x].province,
        utype: "a",
        order: {}
      });
    }
    else if(move=="new fleet")
    {
      units.push({
        owner: endS[x].owner,
        province: endS[x].province,
        utype: "f",
        order: {}
      });
    }
    else
    {
      console.log("ERROR IN ADDING UNIT - TYPE DOES NOT EXIST");
    }
  }

  for(var x in endR)
  {
    units.push({
      owner: endR[x].owner,
      province: endR[x].move,
      utype: endR[x].utype,
      order: {}
    });
  }

  //clear combatlist
  for(var x in MAP)
  {
    MAP[x].combatlist=[];
  }

  //update belongsto of map

  return units;
}

function secondaryResolve(units,disband,retreat,spawn,MAP)
{
  /*console.log("secondary resolve")
  console.log(units)
  console.log(disband)
  console.log(retreat)
  console.log(spawn)*/

  //if tehre are units move=r, remove them from units
  units = _.reject(units,function(u){
    return u.order.move=="r";
  })

  var u = disbandUnits(units,disband);
  var v = addRemoveUnits(u,retreat,spawn,MAP);
  return {units:v,MAP:MAP};

  //disband units that try to retreat into occupied/illegal spaces
  //disband units that voluntarily disband
  //create combatlist for units trying to retreat
  //if there is only one player on the combatlist, player is allowed to move
  //if two players on combatlist, both are disbanded
  //clear orders
  //return new units list

}



DipResolve = {
  resolve: resolve,
  countSupply: countSupply,
  secondaryResolve: secondaryResolve
}

if (typeof module !== 'undefined' && module.exports) {
  module.exports = DipResolve;
} else if (typeof exports !== 'undefined') {
  exports.DipResolve = DipResolve;
}
