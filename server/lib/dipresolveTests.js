//everything passes


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

function testUndirectedMap()
{
  console.log("testUndirectedMap: The following countries are conflicting:")
  for (var x in MAP)//for each location
  {
    var am = MAP[x].army_moves;
    if(am.length>0)
    {
      for (var y in am)//for all of the army moves
      {
        if(MAP[am[y]]==undefined)
        {
          console.log("a " + x + " " + fm[y] + " does not exist")
        }
        var moves = MAP[am[y]].army_moves;
        if(moves.length > 0 && !_.contains(moves,x))//check if it points back
          console.log("a " + x + " " + am[y]);
      }
    }
    var fm = MAP[x].fleet_moves;
    if(fm.length>0)
    {  
      for (var y in fm)//for all of the fleet moves
      {
        if(MAP[fm[y]]==undefined)
        {
          console.log("f " + x + " " + fm[y] + " does not exist")
        }
        var moves = MAP[fm[y]].fleet_moves;
        if(moves.length > 0 && !_.contains(moves,x))//check if it points back
          console.log("f " + x + " " + fm[y]);
      }
    }
  }
}



//resolve(GAME1);
//resolve(GAME2);
//resolve(GAME3);
//resolve(GAME4);


function countSupplyCenters()
{
  for (var y in COUNTRY)
  {
    var sum = 0;
    var countries=[];
    for (var x in MAP)
    {
      if(MAP[x].belongsto==COUNTRY[y])
      {
        countries.push(x);
        if (MAP[x].supply==1)
          sum++;
      }
    }
    console.log(COUNTRY[y] + " supply: " + sum);
    console.log("countries: " + countries.length);
  }
}

function countBorders()
{
  for(x in MAP)
  {
    console.log(x + " - a: " + MAP[x].army_moves.length + " f: " + MAP[x].fleet_moves.length);
  }
}

function countNeutral()
{
  var neutral="";
  var water="";
  for (x in MAP)
  {
    if(MAP[x].army_moves.length==0)//if water
      water+=x + " "; //25 - 6 for the N/S coast
    else if (MAP[x].belongsto=="")//if neutral
      neutral+=x + " ";//14 + denmark
  }
  console.log("neutral: " + neutral);
  console.log(" water: " + water);
}

//everything passes
function testMap()
{
  testUndirectedMap();
  countSupplyCenters(); 
  countNeutral();
  countBorders();
}

testMap();

//Tests for map validity
//For both army and fleet,
  //if A goes to B, B must go to A ***
  //count how many countries are bordering it
//Supply centers should be 3 per country, and Russia has 4 ***
//Count how many ocean, inland, and coast provinces there are
