define([], function(){

  powers = { 
    Aus: 'Austria',
    Eng: 'England',
    Fra: 'France',
    Ger: 'Germany',
    Ita: 'Italy',
    Rus: 'Russia',
    Tur: 'Turkey' 
  }

  starting_locations = [ 
    { owner: 'Aus', province: 'Vie', utype: 'army' },
    { owner: 'Aus', province: 'Bud', utype: 'army' },
    { owner: 'Aus', province: 'Tri', utype: 'fleet' },
    { owner: 'Eng', province: 'Lon', utype: 'fleet' },
    { owner: 'Eng', province: 'Edi', utype: 'fleet' },
    { owner: 'Eng', province: 'Lvp', utype: 'army' },
    { owner: 'Fra', province: 'Par', utype: 'army' },
    { owner: 'Fra', province: 'Mar', utype: 'army' },
    { owner: 'Fra', province: 'Bre', utype: 'fleet' },
    { owner: 'Ger', province: 'Ber', utype: 'army' },
    { owner: 'Ger', province: 'Mun', utype: 'army' },
    { owner: 'Ger', province: 'Kie', utype: 'fleet' },
    { owner: 'Ita', province: 'Rom', utype: 'army' },
    { owner: 'Ita', province: 'Ven', utype: 'army' },
    { owner: 'Ita', province: 'Nap', utype: 'fleet' },
    { owner: 'Rus', province: 'Mos', utype: 'army' },
    { owner: 'Rus', province: 'Sev', utype: 'fleet' },
    { owner: 'Rus', province: 'War', utype: 'army' },
    { owner: 'Rus', province: 'StP', utype: 'fleet' },
    { owner: 'Tur', province: 'Ank', utype: 'fleet' },
    { owner: 'Tur', province: 'Con', utype: 'army' },
    { owner: 'Tur', province: 'Smy', utype: 'army' }
  ]

  all_locations = {
    Austria: { 
      Boh: { name: 'Bohemia' },
      Bud: { name: null },
      Gal: { name: null },
      Tri: { name: null },
      Tyr: { name: null },
      Vie: { name: null },
      Cly: { name: null } 
    },
    England: {
      Cly: { name: 'Clyde' },
      Edi: { name: 'Edinburgh' },
      Lvp: { name: 'Liverpool' },
      Lon: { name: 'London' },
      Wal: { name: 'Wales' },
      Yor: { name: 'Yorkshire' } 
    },
    France: { 
      Bre: { name: 'Brest' },
      Bur: { name: 'Burgundy' },
      Gas: { name: 'Gascony' },
      Mar: { name: 'Marseilles' },
      Par: { name: 'Paris' },
      Pic: { name: 'Picardy' } 
    },
    Germany: { 
      Ber: { name: 'Berlin' },
      Kie: null,
      Mun: null,
      Pru: null,
      Sil: null 
    },
    Italy: { 
      Apu: null,
      Nap: null,
      Pie: null,
      Rom: null,
      Tus: null,
      Ven: null 
    },
    Russia: { 
      Fin: null,
      Lvn: null,
      Mos: null,
      Sev: null,
      StP: null,
      Ukr: null,
      War: null 
    },
    Turkey: { 
      Ank: null, 
      Arm: null, 
      Con: null, 
      Smy: null, 
      Syr: null 
    },
    Neutrals: { 
      Alb: null,
      Bel: null,
      Bul: null,
      Den: null,
      Gre: null,
      Hol: null,
      Nwy: null,
      NAf: null,
      Por: null,
      Rum: null,
      Ser: null,
      Spa: null,
      Swe: null,
      Tun: null 
    },
    Water: { 
      Adr: null,
      Aeg: null,
      Bal: null,
      Bar: null,
      Bla: null,
      Eas: null,
      Eng: null,
      Bot: null,
      GoL: null,
      Hel: null,
      Ion: null,
      Iri: null,
      Mod: null,
      NAt: null,
      Nth: null,
      Nrg: null,
      Ska: null,
      Tyn: null,
      Wes: null 
    }
  }

});