const photoTypes = [
  { name: "Devant de la voiture", value: "front" },
  { name: "Avant gauche de la voiture", value: "front_left" },
  { name: "Côté gauche de la voiture", value: "left_side" },
  { name: "Arrière gauche de la voiture", value: "rear_left" },
  { name: "Arrière de la voiture (coffre fermé)", value: "rear_boot_closed" },
  { name: "Arrière de la voiture (coffre ouvert)", value: "rear_boot_open" },
  { name: "Arrière droit de la voiture", value: "rear_right" },
  { name: "Côté droit de la voiture", value: "right_side" },
  { name: "Avant droit de la voiture", value: "front_right" },
  { name: "Moteur", value: "interior_front_cover" },
  { name: "Coffre", value: "trunk" },
  { name: "Tableau de bord", value: "interior_front" },
  { name: "Places arrières", value: "interior_rear" },
];

const inspectionInfos = [
  {
    name: "CONTROLES EXTERIEURS",
    options: [
      { title: "Eclairage extérieur", name: "exteriorLighting" },
      { title: "Etat des balais d'essuie-glace", name: "conditionWiperBlades" },
      { title: "Etat du pare-brise", name: "windshieldCondition" },
      { title: "Etat des plaques d'immatriculation", name: "stateLicensePlate" },
      { title: "Etat Carrosserie", name: "bodyCondition" },
    ]
  },
  {
    name: "CONTRÔLE LIQUIDES ( Sous Capot)",
    options: [
      { title: "Contrôle du liquide de lave-glace", name: "washerFulidCheck" },
      { title: "Contrôle du liquide de direction assistée", name: "powerSteeringFluidCheck" },
      { title: "Contrôle du liquide de refroidissement", name: "coolantCheck" },
      { title: "Contrôle du niveau liquide de frein", name: "brakeFluidLevel" },
    ]
  },
  {
    name: "CONTROLES MOTEUR (Sous Capot )",
    options: [
      { title: "Contrôle niveau d'huile moteur avant vidange", name: "engineOilLevel" },
      { title: "Contrôle étanchéité moteur", name: "engineTightnessCheck" },
      { title: "Contrôle bouchon de remplissage", name: "checkingFillerCap" },
      { title: "Contrôle joint de vidange", name: "drainSeal" },
      { title: "Contrôle jauge", name: "gaugeControl" },
    ]
  },
  {
    name: "CONTRÔLE ELECTRICITE",
    options: [
      { title: "Contrôle de la batterie ( Sous Capot)", name: "batteryCheck" },
      { title: "Contrôle avertisseur sonore (Int) ", name: "audibleWarning" },
      { title: "Contrôle courroies d'accessoires ( Sous Capot) ", name: "accessoryBelts" },
    ]
  },
  {
    name: "CONTRÔLE CLIMATISATION",
    options: [
      { title: "Fonctionnemment", name: "operation" },
      { title: "Contrôle filtre d'habitacle  (Int )", name: "cabinFilterCheck" },
    ]
  },
  {
    name: "CONTROLES PNEUS (Ext)",
    options: [
      { title: "Contrôle état et usure des pneus", name: "tireCondition" },
      { title: "Contrôle dimensions, indices des pneus", name: "checkDimention" },
      { title: "Contrôle de la pression des pneus", name: "tirePressureCheck" },
    ]
  },
  {
    name: "CONTRÔLE FREINAGE ( At)",
    options: [
      { title: "Contrôle course de frein de parking", name: "parkingBrakeStorkeControl" },
      { title: "Contrôle de course de pédale de frein", name: "brakePedalStrokeControl" },
      { title: "Contrôle de feux de stop", name: "brakeLightControl" },
      { title: "Contrôle étanchéité du circuit de freinage", name: "leakCheck" },
      { title: "Contrôle étanchéité du maître cylindre", name: "masterCylinder" },
      { title: "Contrôle disques de frein", name: "brakeDiscCheck" },
      { title: "Contrôle plaquettes de frein", name: "checkBrakePads" },
    ]
  },
  {
    name: "CONTRÔLE ECHAPPEMENT (At)",
    options: [
      { title: "Contrôle ligne d'échappement complète", name: "exhaustLineCheck" },
    ]
  },
  {
    name: "CONTRÔLE AMORTISSEURS (At)",
    options: [
      { title: "Contrôle fuites amortisseurs", name: "shockAbsorber" },
      { title: "Contrôle silentblocs", name: "silentblockControl" },
      { title: "Contrôle tige/soufflet", name: "rodBellowsControl" },
      { title: "Contrôle efficacité", name: "efficiencyControl" },
    ]
  },
  {
    name: "CONTRÔLE PIECES VEHICULE (Int)",
    options: [
      { title: "Contrôle validité Certificat d'assurance", name: "validityCheck" },
      { title: "Contrôle validité Certificat Contrôle technique", name: "validityControl" },
      { title: "Contrôle validité Certificat de Vignette admin", name: "certificateValidityCheckAdmin" },
    ]
  },
];
export {
  photoTypes,
  inspectionInfos,
}