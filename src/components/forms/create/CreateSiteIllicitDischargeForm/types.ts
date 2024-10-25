// Types
import { UseFormSetValue, UseFormWatch, UseFormTrigger } from "react-hook-form"
import { NavigateFunction } from "react-router-dom"
import { Site } from "../../../../context/App/types"

export interface CreateSiteIllicitDischargeFormProps { // CreateSiteIllicitDischargeForm props
  site: Site | { name: string, siteId: string, xCoordinate: number, yCoordinate: number, inspectorId: string | null, uuid: string } | undefined
  date: string
  resetState?: () => void
}

export interface CreateSiteIllicitDischargeFormUseForm { // CreateSiteIllicitDischargeForm useForm state
  readonly siteId: string
  date: string | undefined
  readonly xCoordinate: number | undefined
  readonly yCoordinate: number | undefined
  inspectorId: string | null
  details: string
  volumeLost: string | null
  streamWatershed: StreamWatershed | string | null
  otherStreamWatershed: string | null
  enforcementAction: string | null
  penaltyDate: string | undefined
  penaltyAmount: number | null
  penaltyDueDate: string | undefined
  paymentReceived: string | undefined
  compliance: boolean | string | null
  closed: boolean | string | null
  followUpDate: string | undefined
}

export interface UseCreateSiteIllicitDischargeFormProps { // useCreateSiteIllicitDischargeForm hook props
  site: Site | { name: string, siteId: string, xCoordinate: number, yCoordinate: number, inspectorId: string | null, uuid: string } | undefined
  date: string
}

export interface UseHandleMapChangeProps { // useHandleMapChange hook props
  coordinates: { xCoordinate: number | undefined, yCoordinate: number | undefined }
  options: {
    setValue: UseFormSetValue<CreateSiteIllicitDischargeFormUseForm>
  }
}

export interface HandleCreateSiteIllicitDischargeFormSubmitProps { // handleCreateSiteIllicitDischargeFormSubmit fn props
  formData: CreateSiteIllicitDischargeFormUseForm
  siteUUID: string
  options: {
    invalidateQuery: () => Promise<void>
    navigate: NavigateFunction
    resetState?: () => void
  }
}

export interface HandleRequiredFieldValidationProps {
  field: keyof CreateSiteIllicitDischargeFormUseForm
  options: {
    watch: UseFormWatch<CreateSiteIllicitDischargeFormUseForm>
    trigger: UseFormTrigger<CreateSiteIllicitDischargeFormUseForm>
  }
}

export enum StreamWatershed {
  AenonCreek = "Aenon Creek",
  Carothers = "Carothers",
  CarriagePark = "Carriage Park",
  DelRio = "Del Rio",
  DonelsonCreek = "Donelson Creek",
  DryBranch = "Dry Branch",
  Ewingville = "Ewingville",
  FiveMileCreek = "Five Mile Creek",
  ForrestCrossing = "Forrest Crossing",
  GlassSpring = "Glass Spring",
  GooseCreek = "Goose Creek",
  GreenHill = "Green Hill",
  Harpeth = "Harpeth",
  HatcherSpring = "Hatcher Spring",
  KellyBranch = "Kelly Branch",
  LibertyCreek = "Liberty Creek",
  LittleHarpeth = "Little Harpeth",
  LongLane = "Long Lane",
  LynwoodBranch = "Lynwood Branch",
  MayesCreek = "Mayes Creek",
  McGavockCreek = "McGavock Creek",
  MonticelloWest = "Monticello West",
  NolenCemetery = "Nolen Cemetery",
  PolkCreek = "Polk Creek",
  RalstonBranch = "Ralston Branch",
  ReeseCreek = "Reese Creek",
  RobinsonLake = "Robinson Lake",
  SawMillCreek = "Saw Mill Creek",
  SewardHills = "Seward Hills",
  SharpsBranch = "Sharps Branch",
  SouthEwingvilleCreek = "South Ewingville Creek",
  SpencerCreek = "Spencer Creek",
  WatsonBranch = "Watson Branch",
  WestHarpeth = "West Harpeth",
  WillowPlunge = "Willow Plunge",
  BaughBranch = "Baugh Branch",
  BeechCreek = "Beech Creek",
  BerrysChapelBranch = "Berry's Chapel Branch",
  BishopBranch = "Bishop Branch",
  BoydBranch = "Boyd Branch",
  BoydMillBranch = "Boyd Mill Branch",
  BuchananBranch = "Buchanan Branch",
  CameronSpring = "Cameron Spring",
  CarlisleBranch = "Carlisle Branch",
  CarothersBranch = "Carothers Branch",
  CloverdaleCreek = "Cloverdale Creek",
  CottonGinBranch = "Cotton Gin Branch",
  CowellBranch = "Cowell Branch",
  CurdBranch = "Curd Branch",
  DeerfieldBranch = "Deerfield Branch",
  DelRioCreek = "Del Rio Creek",
  EastSewardHillsBranch = "East Seward Hills Branch",
  EastWilsonPikeCreek = "East Wilson Pike Creek",
  EdgmonBranch = "Edgmon Branch",
  FivemileCreek = "Fivemile Creek",
  GermanBranch = "German Branch",
  GlassBranch = "Glass Branch",
  GreenBranch = "Green Branch",
  GuffeeBranch = "Guffee Branch",
  HalfacreBranch = "Halfacre Branch",
  HamiltonBrownBranch = "Hamilton-Brown Branch",
  HarlinsdaleSpring = "Harlinsdale Spring",
  HarveyBranch = "Harvey Branch",
  HarveySpring = "Harvey Spring",
  HeadwaterCreek = "Headwater Creek",
  HerbertBranch = "Herbert Branch",
  HerbertCreek = "Herbert Creek",
  HillCemeteryBranch = "Hill Cemetery Branch",
  HodgeBranch = "Hodge Branch",
  HuffineSpringBranch = "Huffine Spring Branch",
  HurricaneCreek = "Hurricane Creek",
  JewellBranch = "Jewell Branch",
  LaddBranch = "Ladd Branch",
  LittleHarpethRiver = "Little Harpeth River",
  LookoutHillBranch = "Lookout Hill Branch",
  MalloryBranch = "Mallory Branch",
  McKaysBranch = "McKays Branch",
  MonticelloCreek = "Monticello Creek",
  NolenBranch = "Nolen Branch",
  NorthEwingvilleCreek = "North Ewingville Creek",
  NorthProng = "North Prong",
  ParishBranch = "Parish Branch",
  PewittBranch = "Pewitt Branch",
  PickeringBranch = "Pickering Branch",
  PrattCreek = "Pratt Creek",
  QuarryBranch = "Quarry Branch",
  ReidHillBranch = "Reid Hill Branch",
  RobertsBranch = "Roberts Branch",
  RobinsonSpringBranch = "Robinson Spring Branch",
  RogersBurn = "Rogers Burn",
  RoyalBranch = "Royal Branch",
  SappingtonBranch = "Sappington Branch",
  ShuemateBranch = "Shuemate Branch",
  SouthProng = "South Prong",
  SouthSewardHillsBranch = "South Seward Hills Branch",
  SplitlogCreek = "Splitlog Creek",
  StramblerCreek = "Strambler Creek",
  SwansonBranch = "Swanson Branch",
  ThomsonSheltonBranch = "Thomson-Shelton Branch",
  TollHouseBranch = "Toll House Branch",
  WestHarpethRiver = "West Harpeth River",
  WestMainBranch = "West Main Branch",
  WestSewardHillsBranch = "West Seward Hills Branch",
  WestSlidersBranch = "West Sliders Branch",
  WidowNeelyBranch = "Widow Neely Branch",
  WilliamsBranch = "Williams Branch",
  WillowPlungeCreek = "Willow Plunge Creek",
  WilloughbyBranch = "Willoughby Branch",
  WilsonPikeCreek = "Wilson Pike Creek",
  WilsonSpringBranch = "Wilson Spring Branch",
  Other = "Other"
}