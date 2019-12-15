enum Form {
  default = '', // default form with 0 index
  Galarian = 'Galarian',
  Alolan = 'Alolan',
  LowKey = 'Low Key', // Toxtricity
  East = 'East', // Shellos - Gastrodon
  // ShieldForme = 'Shield Forme',
  // BladeForme = 'Blade Forme',
  GalarianZenMode = 'Galarian Zen Mode', // Darmanitan
  Female = 'Female', // Indeedee, Meowstic
  HeatRotom = 'Heat Rotom',
  WashRotom = 'Wash Rotom',
  FrostRotom = 'Frost Rotom',
  FanRotom = 'Fan Rotom',
  MowRotom = 'Mow Rotom',
  Crowned = 'Crowned', // Zacian - Zamazenta
  White = 'White', // Kyurem
  Black = 'Black', // Kyurem
  DawnWings = 'Dawn Wings', // Necrozma
  DuskMane = 'Dusk Mane', // Necrozma
}

export default Form;

/* TODO handle pokemon with dual form

double entry on pokemon list:
  - toxtricity
  - indeedee
  - meowth
  - mr.mime
  - rotom     : type
  - zacian - zamazenta
  - meowstic
  - necrozma  : type, stat, ability (for ultra necrozma)
  - kyuurem   : stat, ability, learnset
  
forms with stat / ability / type / learnset changes:
  - aegislash  : stat
  - silvally   : type
  - wishiwashi : stat
  - basculin   : ability
  - eiscue     : stat
  - pumpkaboo / gourgeist: stat
  
no changes on stat / type / ability / learnset
  - morpeko
  - cramorant
  - sinistea / polteageist
  - alcremie
  - marshadow
  - keldeo
*/
