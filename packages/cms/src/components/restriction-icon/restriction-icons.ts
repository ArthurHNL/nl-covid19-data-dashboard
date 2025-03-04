import * as Icons from '@corona-dashboard/icons';

export type RestrictionIconKey = keyof typeof restrictionIcons;

export const restrictionIcons = {
  '41_er_op_uit_1': null,
  '41_er_op_uit_2': null,
  '41_samenkomst_3': null,
  '41_horeca_4': null,
  '41_horeca_5': null,
  '41_horeca_6': null,
  '41_bezoek_7': null,
  '41_bezoek_8': null,
  '41_winkels_9': null,
  '41_winkels_10': null,
  '41_winkels_11': null,
  '41_ov_12': null,
  '41_ov_13': null,
  '41_sport_14': null,
  '41_sport_15': null,
  '41_sport_16': null,
  '41_sport_17': null,
  '0_algemeen_18': Icons.OnderwijsEnKinderopvangOpAfstand,
  '0_algemeen_19': Icons.BasisregelsAfstand,
  '0_algemeen_20': Icons.BasisregelsDrukte,
  '0_algemeen_21': Icons.BasisregelsHandenwassen,
  '0_algemeen_22': Icons.BasisregelsElleboog,
  '0_algemeen_23': Icons.BasisregelsMondkapje,
  '0_algemeen_42': Icons.BasisregelsBlijfThuis,
  '0_algemeen_43': Icons.BasisregelsTesten,
  '0_algemeen_44': Icons.BasisregelsGeenBezoek,
  '41_bezoek_24': Icons.Thuis,
  '41_er_op_uit_25': Icons.Groepen,
  '41_samenkomst_26': Icons.PubliekToegankelijkeLocaties,
  '41_horeca_27': Icons.HorecaEnEvenementenEtendrinken,
  '41_horeca_28': Icons.HorecaEnEvenementenBestellen,
  '41_horeca_29': Icons.HorecaEnEvenementenEvenementen,
  '41_winkels_30': Icons.PubliekToegankelijkeLocaties,
  '41_winkels_31': Icons.WinkelenEnBoodschappenOpen,
  '41_winkels_32': Icons.WinkelenEnBoodschappenAlcohol,
  '41_contactberoep_33': Icons.Contactberoepen,
  '41_sport_34': Icons.SportBuiten,
  '41_sport_35': Icons.SportBinnensportlocaties,
  '41_sport_36': Icons.SportWedstrijden,
  '41_ov_37': Icons.VervoerEnReizenBlijfthuis,
  '41_ov_38': Icons.VervoerEnReizenBuitenland,
  '41_ov_45': Icons.VervoerEnReizenOv,
  '41_onderwijs_39': Icons.OnderwijsEnKinderopvangOpAfstand,
  '41_onderwijs_40': Icons.OnderwijsEnKinderopvangKinderopvang,
  '41_onderwijs_41': Icons.OnderwijsEnKinderopvangNoodopvang,
  avondklok: Icons.Avondklok,
  bezoek: Icons.Bezoek,
  lopend: Icons.Lopend,
  eenPersoonDoorgestreept: Icons.EenPersoonDoorgestreept,
  gedeeltelijkOpenRugzak: Icons.GedeeltelijkOpenRugzak,
  geenWedstrijden: Icons.GeenWedstrijden,
  sporterMetZweetband: Icons.SporterMetZweetband,
  'stap_1-horeca_max': Icons.Stap1HorecaMax,
  'stap_1-horeca_per_tafel': Icons.Stap1HorecaPertafel,
  'stap_1-horeca_reserveren': Icons.Stap1HorecaReserveren,
  'stap_1-horeca_sportaccomodaties': Icons.Stap1HorecaSportaccomodaties,
  'stap_1-horeca_terras': Icons.Stap1HorecaTerras,
  'stap_1-horeca_verplaatsen': Icons.Stap1HorecaVerplaatsen,
  'stap_1-onderwijs_bibliotheek': Icons.Stap1OnderwijsBibliotheek,
  'stap_1-onderwijs_open': Icons.Stap1OnderwijsOpen,
  'stap_1-theorie': Icons.Stap1Theorie,
  'stap_1-thuisbezoek': Icons.Stap1Thuisbezoek,
  'stap_1-uitvaarten': Icons.Stap1Uitvaarten,
  'stap_1-winkels_alleen': Icons.Stap1WinkelsAlleen,
  'stap_1-winkels_markten': Icons.Stap1WinkelsMarkten,
  'stap_1-winkels_max': Icons.Stap1WinkelsMax,
  'stap_1-winkels_open': Icons.Stap1WinkelsOpen,
  'stap-1_avondklok': Icons.Stap1Avondklok,
  testbewijs: Icons.Testbewijs,
  reizen: Icons.Reizen,
  recreatie: Icons.Recreatie,
  binnensporten: Icons.Binnensporten,
  bibliotheken: Icons.Bibliotheken,
  horeca_evenementen: Icons.HorecaEvenementen,
  kunstcultuur_musea: Icons.KunstcultuurMusea,
  ontmoetingen_bezoek: Icons.OntmoetingenBezoek,
  alcohol_verkoop: Icons.AlcoholVerkoop,
  max_aantal_bezoekers: Icons.MaxAantalBezoekers,
  meerdaagse_evenementen: Icons.MeerdaagseEvenementen,
  openingstijden: Icons.Openingstijden,
  toegangsbewijzen: Icons.Toegangsbewijzen,
  klok_2100: Icons.Klok2100,
  geen_entertainment: Icons.GeenEntertainment,
  frisse_lucht: Icons.FrisseLucht,
  binnen_met_zitplaats: Icons.BinnenMetZitplaats,
  binnen_zonder_zitplaats: Icons.BinnenZonderZitplaats,
  geen_max_aantal_bezoekers: Icons.GeenMaxAantalBezoekers,
  kunst_cultuur: Icons.KunstCultuur,
  taxi: Icons.Taxi,
  vliegen: Icons.Vliegen,
  doorstroomevenementen: Icons.Doorstroomevenementen,
  afstand_sporten: Icons.AfstandSporten,
  georganiseerdeKunstEnCultuurbeoefeningen:
    Icons.GeorganiseerdeKunstEnCultuurbeoefening,
  openbaarVervoer: Icons.OpenbaarVervoer,
  binnensportlocaties: Icons.Binnensportlocaties,
} as const;
