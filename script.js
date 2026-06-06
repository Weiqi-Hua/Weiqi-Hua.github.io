const body = document.body;
const nav = document.querySelector("[data-nav]");
const navToggle = document.querySelector("[data-nav-toggle]");
const header = document.querySelector("[data-header]");
const pageLinks = Array.from(document.querySelectorAll("[data-page-link]"));
const navLinks = Array.from(document.querySelectorAll(".site-nav [data-page-link]"));
const panels = Array.from(document.querySelectorAll("[data-page-panel]"));
const validPages = new Set(panels.map((panel) => panel.dataset.pagePanel));
const countryButtons = Array.from(document.querySelectorAll("[data-country]"));
const countryPanel = document.querySelector("#country-panel");
const countryPanelTitle = document.querySelector("[data-country-panel-title]");
const countryPanelSummary = document.querySelector("[data-country-panel-summary]");
const countryPartnerList = document.querySelector("[data-country-partner-list]");
const partnerDetail = document.querySelector("#partner-detail");
const partnerProfileList = document.querySelector("[data-partner-profile-list]");
const partnerLogo = document.querySelector("[data-partner-detail-logo]");
const partnerName = document.querySelector("[data-partner-detail-name]");
const partnerMeta = document.querySelector("[data-partner-detail-meta]");
const partnerIntro = document.querySelector("[data-partner-detail-intro]");
const partnerContribution = document.querySelector("[data-partner-detail-contribution]");
const partnerFocus = document.querySelector("[data-partner-detail-focus]");
const peopleGrid = document.querySelector("[data-people-grid]");
const trafficVisits = document.querySelector("[data-traffic-visits]");
const trafficClicks = document.querySelector("[data-traffic-clicks]");
const trafficRate = document.querySelector("[data-traffic-rate]");
let selectedCountry = "uk";
let selectedPartner = "uob";

const partnerOrder = [
  "uob",
  "ucd",
  "t4s",
  "unizg",
  "cu",
  "udur",
  "evp",
  "mbp",
  "unipd",
  "bpsb",
  "potu",
  "usyd",
  "uoa",
  "nus",
  "uor",
];

const partnerProfiles = {
  uob: {
    logo: "UoB",
    logoClass: "logo-blue",
    name: "The University of Birmingham",
    meta: "UoB - United Kingdom - Coordinator",
    intro:
      "The University of Birmingham is a Russell Group civic research university and a founding member of Universitas 21. Its COHERENT team connects energy systems, storage, urban planning, economics, and stakeholder engagement through the Birmingham Energy Institute and related net-zero research activity.",
    contribution:
      "UoB coordinates the project, leads management and knowledge sharing, supports stakeholder mapping, and integrates technical, social, and policy perspectives across the Staff Exchanges network.",
    focus: ["Project coordination and quality assurance", "Energy systems, storage, and community digital twins", "Stakeholder engagement and inclusive net-zero strategy"],
  },
  ucd: {
    logo: "UCD",
    logoClass: "logo-teal",
    name: "University College Dublin",
    meta: "UCD - Ireland - Beneficiary",
    intro:
      "University College Dublin contributes through its School of Computer Science, with strengths in machine learning, cybersecurity, privacy-preserving systems, edge computing, and industry-linked research and innovation infrastructure.",
    contribution:
      "UCD supports AI, data analytics, explainable decision support, and privacy-aware digital methods so COHERENT models, trading mechanisms, and policy evidence can be trusted by operators, regulators, and communities.",
    focus: ["Explainable AI and machine learning", "Privacy-aware and edge-computing methods", "Decision-support dashboards and visualisation"],
  },
  t4s: {
    logo: "T4S",
    logoClass: "logo-amber",
    name: "Tech4Society A.M.K.E.",
    meta: "T4S - Greece - Beneficiary",
    intro:
      "Tech4Society is an SME focused on technology for social good, using AI, IoT, communications technologies, ethics, legal analysis, and standardisation to address societal and sustainability challenges.",
    contribution:
      "T4S leads inclusive policy and market framework activity, connecting AI-enabled evidence with regulatory analysis, ethics, standardisation, and stakeholder-centred governance.",
    focus: ["Policy, legal, and ethical frameworks", "AI and IoT for social good", "Standardisation and inclusive technology adoption"],
  },
  unizg: {
    logo: "UZG",
    logoClass: "logo-coral",
    name: "University of Zagreb FER",
    meta: "UNIZG - Croatia - Beneficiary",
    intro:
      "The University of Zagreb is the oldest and largest university in Southeast Europe. Its Faculty of Electrical Engineering and Computing brings expertise in energy and power systems, multi-energy planning, and hydrogen-related modelling.",
    contribution:
      "UNIZG bridges planning models with ancillary-service and zero-inertia grid testing, helping validate community hydrogen integration under realistic power-system conditions.",
    focus: ["Power-system and multi-energy planning", "Ancillary-service validation", "Hydrogen and fuel-cell modelling"],
  },
  cu: {
    logo: "CU",
    logoClass: "logo-green",
    name: "Cardiff University",
    meta: "CU - United Kingdom - Beneficiary",
    intro:
      "Cardiff University is a Russell Group research university with strong engineering expertise, including multi-vector energy systems, electricity market design, optimisation, and prosumer-centred energy mechanisms.",
    contribution:
      "CU leads the design of community energy and emissions trading with hydrogen certification, including market algorithms and auction-based mechanisms for fair participation.",
    focus: ["Community energy trading", "Hydrogen certification mechanisms", "Market design and optimisation"],
  },
  udur: {
    logo: "DUR",
    logoClass: "logo-slate",
    name: "Durham University",
    meta: "UDUR - United Kingdom - Beneficiary",
    intro:
      "Durham University is a collegiate research university and Russell Group member. Its COHERENT team contributes smart-grid laboratory capability, power-system modelling, wireless communications, and control engineering.",
    contribution:
      "UDUR leads energy-system impact evaluation and lab-based testbed validation, ensuring models and algorithms are tested against practical grid and hardware behaviour.",
    focus: ["Smart-grid laboratory validation", "RTDS and hardware testing", "Energy-system impact evaluation"],
  },
  evp: {
    logo: "EVP",
    logoClass: "logo-teal",
    name: "Eurovacuum Products Limited",
    meta: "EVP - United Kingdom - Beneficiary",
    intro:
      "Eurovacuum Products Limited supplies, repairs, and maintains vacuum pumps, blowers, and related systems for manufacturing, pharmaceutical, food-processing, and research applications, with a strong applied engineering base.",
    contribution:
      "EVP supports hydrogen business models, industrial feasibility, exploitation pathways, and practical engineering insight for translating COHERENT outputs into low-carbon market offerings.",
    focus: ["Industrial equipment and applied engineering", "Hydrogen business models", "Exploitation and commercial feasibility"],
  },
  mbp: {
    logo: "MBP",
    logoClass: "logo-blue",
    name: "MBP Network Technology Limited",
    meta: "MBP - Ireland - Beneficiary",
    intro:
      "MBP Network Technology is an SME delivering software development, system integration, consultancy, cybersecurity, blockchain, and privacy-preserving digital solutions, with experience in SDN, 5G, VR, and cloud-edge testbeds.",
    contribution:
      "MBP supports secure data management, blockchain-enabled community trading infrastructure, and privacy-preserving digital architectures for trusted energy and emissions transactions.",
    focus: ["Blockchain and smart digital platforms", "Cybersecurity and privacy", "Data management and cloud-edge infrastructure"],
  },
  unipd: {
    logo: "PD",
    logoClass: "logo-green",
    name: "Universita degli Studi di Padova",
    meta: "UNIPD - Italy - Beneficiary",
    intro:
      "The University of Padova, founded in 1222, is one of Italy's leading universities, with broad scientific capacity across engineering, physics, technology, life sciences, and interdisciplinary research centres.",
    contribution:
      "UNIPD leads community multi-energy system integration and place-based low-carbon pathways, connecting hydrogen production, utilisation, safety, LCA, and technical modelling with local deployment choices.",
    focus: ["Hydrogen production, storage, and utilisation", "Community multi-energy integration", "LCA and low-carbon pathway assessment"],
  },
  bpsb: {
    logo: "BP",
    logoClass: "logo-coral",
    name: "Broken Pot Societa Benefit S.r.l.",
    meta: "BPSB - Italy - Beneficiary",
    intro:
      "Broken Pot SB S.r.l. is an Energy Service Company certified under UNI CEI 11352, focused on reducing companies' environmental impact through energy management, carbon management, advanced process control, and AI-supported behavioural analysis.",
    contribution:
      "BPSB helps connect COHERENT methods to real-world industrial energy efficiency, low-carbon adoption, behavioural change, and exploitation routes for community and industrial settings.",
    focus: ["Carbon and energy management", "Advanced process control", "Behavioural and industrial efficiency"],
  },
  potu: {
    logo: "P1",
    logoClass: "logo-amber",
    name: "Potulice1 Prosta Spolka Akcyjna",
    meta: "POTU - Poland - Beneficiary",
    intro:
      "Potulice1 operates a 1 MW solar farm in Potulice, Poland, and plans further photovoltaic expansion, with a mission focused on renewable generation, sustainability, energy efficiency, and environmental protection.",
    contribution:
      "POTU provides local renewable generation data for scenario calibration and validation, helping COHERENT test community pathways against real resource conditions.",
    focus: ["Renewable generation data", "Solar-farm scenario calibration", "Real-world validation context"],
  },
  usyd: {
    logo: "SYD",
    logoClass: "logo-slate",
    name: "The University of Sydney",
    meta: "USYD - Australia - Associated partner",
    intro:
      "The University of Sydney, founded in 1850, is Australia's first university and a leading Group of Eight research institution with strengths across engineering, business, medicine, law, and international collaboration.",
    contribution:
      "USYD supports international knowledge exchange and validation perspectives, including RTDS-related expertise, strengthening transferability of community hydrogen and zero-inertia system findings.",
    focus: ["International testbed perspective", "RTDS and power-system validation", "Global knowledge exchange"],
  },
  uoa: {
    logo: "AKL",
    logoClass: "logo-green",
    name: "The University of Auckland",
    meta: "UOA - New Zealand - Associated partner",
    intro:
      "The University of Auckland is New Zealand's largest and highest-ranked university, with strengths in engineering, environmental studies, business, health sciences, and Pacific Rim academic collaboration.",
    contribution:
      "UOA contributes urban and transport planning insight for place-based pathways, helping COHERENT account for mobility, spatial, and community-level constraints in net-zero transitions.",
    focus: ["Urban and transport planning", "Place-based transition pathways", "International policy comparison"],
  },
  nus: {
    logo: "NUS",
    logoClass: "logo-teal",
    name: "National University of Singapore",
    meta: "NUS - Singapore - Associated partner",
    intro:
      "The National University of Singapore is Singapore's oldest and most prestigious university, with global strengths in engineering, computing, business, biomedical sciences, and digital building technologies.",
    contribution:
      "NUS supports cross-country AI knowledge exchange and methods for trustworthy, interpretable analytics in community energy, digital buildings, and policy decision-support tools.",
    focus: ["AI and machine learning", "Digital building technology", "Trustworthy analytics and research exchange"],
  },
  uor: {
    logo: "UoR",
    logoClass: "logo-coral",
    name: "University of Ruhuna",
    meta: "UoR - Sri Lanka - Associated partner",
    intro:
      "The University of Ruhuna is a major Sri Lankan university with 10 faculties. Its Faculty of Engineering offers undergraduate and postgraduate education and is active in community engagement, industry collaboration, and international research.",
    contribution:
      "UoR supports equitable benefit sharing by adapting COHERENT tools to emerging-market and resource-constrained contexts while feeding local operational constraints back into the consortium.",
    focus: ["Community and industry engagement", "Resource-constrained energy contexts", "Equitable international knowledge exchange"],
  },
};

const countryProfiles = {
  uk: {
    name: "United Kingdom",
    summary: "Four COHERENT partners are based in the United Kingdom, covering coordination, community markets, laboratory validation, and industrial exploitation.",
    partners: ["uob", "cu", "udur", "evp"],
  },
  ireland: {
    name: "Ireland",
    summary: "Ireland brings AI, privacy-aware digital methods, blockchain, secure data management, and platform engineering through two partners.",
    partners: ["ucd", "mbp"],
  },
  poland: {
    name: "Poland",
    summary: "Poland contributes renewable generation data and solar-farm validation context through Potulice1.",
    partners: ["potu"],
  },
  italy: {
    name: "Italy",
    summary: "Italy connects community multi-energy integration with industrial energy management, carbon management, and deployment pathways.",
    partners: ["unipd", "bpsb"],
  },
  croatia: {
    name: "Croatia",
    summary: "Croatia contributes power-system and multi-energy planning, hydrogen modelling, and ancillary-service validation through the University of Zagreb.",
    partners: ["unizg"],
  },
  greece: {
    name: "Greece",
    summary: "Greece contributes inclusive policy, legal and ethical frameworks, standardisation, and AI/IoT methods for social good through Tech4Society.",
    partners: ["t4s"],
  },
  australia: {
    name: "Australia",
    summary: "Australia provides international validation perspective, RTDS and power-system expertise, and global knowledge exchange through the University of Sydney.",
    partners: ["usyd"],
  },
  "new-zealand": {
    name: "New Zealand",
    summary: "New Zealand contributes urban, transport, spatial planning, and place-based transition knowledge through the University of Auckland.",
    partners: ["uoa"],
  },
  singapore: {
    name: "Singapore",
    summary: "Singapore supports AI knowledge exchange, digital building technology, trustworthy analytics, and decision-support methods through NUS.",
    partners: ["nus"],
  },
  "sri-lanka": {
    name: "Sri Lanka",
    summary: "Sri Lanka contributes emerging-market and resource-constrained energy perspectives through the University of Ruhuna.",
    partners: ["uor"],
  },
};

const partnerCountry = Object.fromEntries(
  Object.entries(countryProfiles).flatMap(([countryId, country]) =>
    country.partners.map((partnerId) => [partnerId, countryId])
  )
);

const partnerLogoShapes = {
  uob: "wide",
  ucd: "portrait",
  uor: "wide",
  nus: "wide",
  evp: "wide",
  mbp: "wide",
  t4s: "wide",
  potu: "wide",
  udur: "wide",
  uoa: "wide",
  usyd: "wide",
};

const peopleProfiles = [
  {
    partnerId: "uob",
    group: "Coordinator",
    areas: ["Coordination", "Power systems", "Energy economics", "Community engagement"],
    researchers: [
      { name: "Dr Weiqi Hua", focus: "Power-system modelling, market design, and project management", photo: "assets/people/weiqi-hua.jpeg" },
      { name: "Prof Sara Walker", focus: "Environment and energy economics", photo: "assets/people/sara-walker.jpg" },
      { name: "Prof Xiao-Ping Zhang", focus: "Whole-system and power-system modelling", photo: "assets/people/xiao-ping-zhang.jpg" },
      { name: "Prof Richard Boocock", focus: "Energy economics and community engagement", photo: "assets/people/richard-boocock.jpg" },
      { name: "Dr Sara Hassan", focus: "Community engagement, XAI, participatory methods, and dissemination impact", photo: "assets/people/sara-hassan.jpg" },
      { name: "Dr Liyun Zhang", focus: "Community engagement, XAI, and participatory methods", photo: "assets/people/liyun-zhang.jpg" },
      { name: "Dr Shan He", focus: "Community engagement, XAI, and participatory methods", photo: "assets/people/shan-he.jpg" },
      { name: "Dr Jian Song", focus: "Energy storage, multi-energy management, solar energy", photo: "assets/people/jian-song.jpg" },
    ],
  },
  {
    partnerId: "ucd",
    group: "Beneficiary",
    areas: ["AI", "XAI", "Privacy-aware systems"],
    researchers: [
      { name: "Dr Shen Wang", focus: "AI, data analytics, XAI, and technical management", photo: "assets/people/shen-wang-updated.jpg" },
      { name: "Dr Madhusanka Liyanage", focus: "AI, data analytics, XAI, and participatory methods", photo: "assets/people/madhusanka-liyanage.png" },
      { name: "Chamara Sandeepa", focus: "AI privacy, federated learning, IoT, and AI", photo: "assets/people/chamara-sandeepa.png" },
      { name: "Vidura Ravihansa", focus: "Open RAN, federated learning, secure and energy-efficient wireless networks", photo: "assets/people/vidura-ravihansa.jpg" },
      { name: "Farah Abed Zadeh", focus: "XAI, intrusion detection systems, cybersecurity, and machine learning", photo: "assets/people/farah-abed-zadeh.png" },
      { name: "Charuka Moremada", focus: "Generative AI security, B5G/6G networks, and O-RAN", photo: "assets/people/charuka-moremada.png" },
      { name: "Jiaming Xu", focus: "Federated learning, Internet of Things, and distributed AI", photo: "assets/people/jiaming-xu.jpg" },
      { name: "Pasika Ranaweera", focus: "5G/B5G security, MEC, federated-learning security, blockchain, and IoT security", photo: "assets/people/pasika-ranaweera.png" },
    ],
  },
  {
    partnerId: "t4s",
    group: "Beneficiary",
    areas: ["Policy", "XAI", "Digital platforms", "Standardisation"],
    researchers: [
      { name: "Dr Constantinos Angelopoulos", focus: "AI, data analytics, and XAI" },
      { name: "Prof Athanasios Iossifides", focus: "Algorithmic market design and optimisation" },
      { name: "Ms Eirini Kanaki", focus: "Emission trading and hydrogen certification" },
      { name: "Prof Periklis Chatzimisios", focus: "Blockchain platforms, smart-meter interfaces, and knowledge sharing", photo: "assets/people/periklis-chatzimisios.webp" },
      { name: "Dr Konstantinos Tsintotas", focus: "Community engagement, XAI, and participatory methods", photo: "assets/people/konstantinos-tsintotas.png" },
    ],
  },
  {
    partnerId: "unizg",
    group: "Beneficiary",
    areas: ["Power systems", "Hydrogen", "Ancillary services"],
    researchers: [
      { name: "Prof Ninoslav Holjevac", focus: "Power-system modelling, hydrogen utilisation, and project management", photo: "assets/people/ninoslav-holjevac.jpg" },
      { name: "Dr Tomislav Baškarad", focus: "Whole-system and power-system modelling", photo: "assets/people/tomislav-baskarad.jpg" },
      { name: "Prof Goran Grdenić", focus: "Whole-system and power-system modelling", photo: "assets/people/goran-grdenic.jpg" },
      { name: "Prof Mirna Gržanić Antić", focus: "Power-system modelling, hydrogen utilisation, and regulatory studies", photo: "assets/people/mirna-grzanic-antic.jpg" },
    ],
  },
  {
    partnerId: "cu",
    group: "Beneficiary",
    areas: ["Energy markets", "Power systems", "Hydrogen certification"],
    researchers: [
      { name: "Prof Jianzhong Wu", focus: "Whole-system modelling and algorithmic market design", photo: "assets/people/jianzhong-wu.jpg" },
      { name: "Dr Yue Zhou", focus: "Power-system modelling, market design, and hydrogen certification", photo: "assets/people/yue-zhou.jpg" },
    ],
  },
  {
    partnerId: "udur",
    group: "Beneficiary",
    areas: ["Power systems", "Smart-grid testbeds", "Validation"],
    researchers: [
      { name: "Prof Hongjian Sun", focus: "Whole-system and power-system modelling", photo: "assets/people/hongjian-sun.jpg" },
      { name: "Dr Yunfei Chen", focus: "Whole-system and power-system modelling", photo: "assets/people/yunfei-chen.jpg" },
    ],
  },
  {
    partnerId: "evp",
    group: "Beneficiary",
    areas: ["Industrial hydrogen", "Business models", "Knowledge sharing"],
    researchers: [
      { name: "Prof Adrienne Houston", focus: "Industrial hydrogen equipment, business models, and knowledge sharing", photo: "assets/people/adrienne-houston.jpg" },
    ],
  },
  {
    partnerId: "mbp",
    group: "Beneficiary",
    areas: ["Blockchain", "Cybersecurity", "Data management"],
    researchers: [
      { name: "Dr Bartłomiej Siniański", focus: "xAI, Network Security, Blockchain", photo: "assets/people/bartlomiej-sinianski.jpeg" },
      { name: "Dr Sangita Dhara", focus: "Socio-economic energy data management, blockchain, and dissemination impact", photo: "assets/people/sangita-dhara.jpeg" },
    ],
  },
  {
    partnerId: "unipd",
    group: "Beneficiary",
    areas: ["Hydrogen", "Multi-energy systems", "LCA"],
    researchers: [
      { name: "Prof Anna Stoppato", focus: "Hydrogen production, storage, utilisation, certification, and project management", photo: "assets/people/anna-stoppato.jpg" },
      { name: "Prof Antonella Glisenti", focus: "Hydrogen production, storage, and utilisation", photo: "assets/people/antonella-glisenti.png" },
      { name: "Prof Alberto Benato", focus: "Hydrogen production, storage, and utilisation", photo: "assets/people/alberto-benato.png" },
      { name: "Dr Andrea Trovò", focus: "Hydrogen production, storage, and utilisation" },
    ],
  },
  {
    partnerId: "bpsb",
    group: "Beneficiary",
    areas: ["Industrial implementation", "Energy management", "Carbon management"],
    researchers: [
      { name: "Mrs Giorgia Farella", focus: "Industrial hydrogen equipment and business models", photo: "assets/people/giorgia-farella.png" },
      { name: "Iman Mortazavi", focus: "Sustainability & Circular Economy, LCA & Carbon Footprint, Net-Zero Pathways", photo: "assets/people/iman-mortazavi.jpeg" },
      { name: "Stefano Casarin", focus: "Industrial Energy Efficiency, Energy audit, Energy transition incentives", photo: "assets/people/stefano-casarin.jpeg" },
    ],
  },
  {
    partnerId: "usyd",
    group: "Associated partner",
    areas: ["International validation", "Power-system testbeds"],
    researchers: [
      { name: "Dr Cuo Zhang", focus: "Urban and transport planning support", photo: "assets/people/cuo-zhang.webp" },
    ],
  },
  {
    partnerId: "uoa",
    group: "Associated partner",
    areas: ["Urban planning", "Transport planning", "Technical management"],
    researchers: [
      { name: "Dr Prakash Ranjitkar", focus: "Urban and transport planning", photo: "assets/people/prakash-ranjitkar.jpg" },
      { name: "Dr Selena Sheng", focus: "Urban and transport planning and technical management", photo: "assets/people/selena-sheng.jpg" },
    ],
  },
  {
    partnerId: "nus",
    group: "Associated partner",
    areas: ["AI", "Data analytics", "XAI"],
    researchers: [
      { name: "Dr Maomao Hu", focus: "AI, data analytics, and XAI", photo: "assets/people/maomao-hu.jpg" },
      { name: "Dr Liangcai Xu", focus: "AI, data analytics, and XAI", photo: "assets/people/liangcai-xu.jpg" },
      { name: "Mr Connor Aucermanne", focus: "AI, data analytics, and XAI", photo: "assets/people/connor-aucermanne.jpeg" },
      { name: "Mr Rezky Mahesa Nanda", focus: "AI, data analytics, and XAI", photo: "assets/people/rezky-mahesa-nanda.jpg" },
    ],
  },
  {
    partnerId: "uor",
    group: "Associated partner",
    areas: ["Community engagement", "Participatory methods", "Equitable benefit sharing"],
    researchers: [
      { name: "Dr Chatura Seneviratne", focus: "Blockchain, Signal Processing, Machine Learning", photo: "assets/people/chatura-seneviratne.png" },
      { name: "Dr Thilina Weerasinghe", focus: "Community engagement, XAI, and participatory methods", photo: "assets/people/thilina-weerasinghe.jpg" },
      { name: "Dr Geeth Priyankara", focus: "Community engagement, XAI, and participatory methods", photo: "assets/people/geeth-priyankara.jpg" },
    ],
  },
];

function pageFromHash() {
  const page = window.location.hash.replace("#", "") || "home";
  if (page === "project") return "home";
  return validPages.has(page) ? page : "home";
}

function resetPageScroll() {
  window.scrollTo(0, 0);
  document.documentElement.scrollTop = 0;
  document.body.scrollTop = 0;

  window.requestAnimationFrame(() => {
    window.scrollTo(0, 0);
    document.documentElement.scrollTop = 0;
    document.body.scrollTop = 0;
  });
}

function setActivePage(page, shouldScroll) {
  panels.forEach((panel) => {
    panel.hidden = panel.dataset.pagePanel !== page;
  });

  pageLinks.forEach((link) => {
    const isActive = link.dataset.pageLink === page;
    link.classList.toggle("is-active", isActive);

    if (link.closest(".site-nav")) {
      if (isActive) {
        link.setAttribute("aria-current", "page");
      } else {
        link.removeAttribute("aria-current");
      }
    }
  });

  body.classList.toggle("is-home", page === "home");

  if (page === "consortium") {
    selectPartner(selectedPartner, false);
  }

  if (shouldScroll) {
    resetPageScroll();
  }
}

function partnerLogoExtension(partnerId) {
  return ["bpsb", "t4s", "ucd", "uoa", "unizg"].includes(partnerId) ? "svg" : "png";
}

function partnerLogoSource(partnerId) {
  const source = `assets/partners/${partnerId}.${partnerLogoExtension(partnerId)}`;
  if (partnerId === "unipd") return `${source}?v=unipd2`;
  if (partnerId === "udur") return `${source}?v=udur2`;
  if (partnerId === "bpsb") return `${source}?v=bpsb3`;
  if (partnerId === "ucd") return `${source}?v=ucd2`;
  if (partnerId === "uoa") return `${source}?v=uoa2`;
  if (partnerId === "unizg") return `${source}?v=unizg2`;
  if (partnerId === "nus") return `${source}?v=nus2`;
  if (partnerId === "uor") return `${source}?v=uor2`;
  if (partnerId === "mbp") return `${source}?v=mbp3`;
  if (partnerId === "usyd") return `${source}?v=usyd2`;
  return partnerId === "uob" ? `${source}?v=uob6` : source;
}

function partnerLogoShape(partnerId) {
  return partnerLogoShapes[partnerId] || "square";
}

function setLogoFrameShape(frame, partnerId) {
  if (!frame || !partnerId) return;
  frame.classList.remove("logo-frame-wide", "logo-frame-portrait", "logo-frame-square");
  Array.from(frame.classList)
    .filter((className) => className.startsWith("logo-frame-partner-"))
    .forEach((className) => frame.classList.remove(className));
  frame.classList.add(`logo-frame-${partnerLogoShape(partnerId)}`);
  frame.classList.add(`logo-frame-partner-${partnerId}`);
}

function partnerIdFromLogoSource(source) {
  const match = source ? source.match(/partners\/([^./?]+)/) : null;
  return match ? match[1] : "";
}

function applyLogoFrameShapes(root = document) {
  root.querySelectorAll(".partner-logo-frame, .partner-detail-logo-frame").forEach((frame) => {
    const logo = frame.querySelector("img");
    setLogoFrameShape(frame, partnerIdFromLogoSource(logo?.getAttribute("src") || ""));
  });
}

const trafficStorageKey = "coherentTrafficStats";

function readTrafficStats() {
  try {
    const storedStats = window.localStorage.getItem(trafficStorageKey);
    if (!storedStats) return { visits: 0, clicks: 0 };

    const stats = JSON.parse(storedStats);
    if (!stats || typeof stats !== "object") return { visits: 0, clicks: 0 };

    return {
      visits: Number.isFinite(stats.visits) ? stats.visits : 0,
      clicks: Number.isFinite(stats.clicks) ? stats.clicks : 0,
    };
  } catch {
    return { visits: 0, clicks: 0 };
  }
}

function writeTrafficStats(stats) {
  try {
    window.localStorage.setItem(trafficStorageKey, JSON.stringify(stats));
  } catch {
    return;
  }
}

function renderTrafficStats(stats) {
  if (trafficVisits) trafficVisits.textContent = stats.visits.toLocaleString("en-GB");
  if (trafficClicks) trafficClicks.textContent = stats.clicks.toLocaleString("en-GB");
  if (trafficRate) {
    const rate = stats.visits > 0 ? stats.clicks / stats.visits : 0;
    trafficRate.textContent = rate.toFixed(1);
  }
}

function initialiseTrafficStats() {
  if (!trafficVisits || !trafficClicks || !trafficRate) return;

  const stats = readTrafficStats();
  stats.visits += 1;
  writeTrafficStats(stats);
  renderTrafficStats(stats);

  document.addEventListener(
    "click",
    () => {
      const updatedStats = readTrafficStats();
      updatedStats.clicks += 1;
      writeTrafficStats(updatedStats);
      renderTrafficStats(updatedStats);
    },
    { passive: true }
  );
}

function createPartnerProfileCard(partnerId) {
  const profile = partnerProfiles[partnerId];
  const article = document.createElement("article");
  const heading = document.createElement("div");
  const logoFrame = document.createElement("span");
  const logo = document.createElement("img");
  const copy = document.createElement("div");
  const eyebrow = document.createElement("p");
  const title = document.createElement("h3");
  const meta = document.createElement("p");
  const detailGrid = document.createElement("div");
  const introSection = document.createElement("section");
  const introTitle = document.createElement("h4");
  const intro = document.createElement("p");
  const contributionSection = document.createElement("section");
  const contributionTitle = document.createElement("h4");
  const contribution = document.createElement("p");
  const focusBlock = document.createElement("div");
  const focusTitle = document.createElement("h4");
  const focusList = document.createElement("ul");
  const titleId = `partner-profile-heading-${partnerId}`;

  article.className = "partner-detail partner-profile-card";
  article.id = `partner-profile-${partnerId}`;
  article.dataset.partnerProfile = partnerId;
  article.tabIndex = -1;
  article.setAttribute("aria-labelledby", titleId);

  heading.className = "partner-detail-heading";
  logoFrame.className = "partner-detail-logo-frame";
  setLogoFrameShape(logoFrame, partnerId);
  logo.className = "partner-detail-logo-img";
  logo.src = partnerLogoSource(partnerId);
  logo.alt = `${profile.name} logo`;
  logoFrame.append(logo);

  eyebrow.className = "eyebrow";
  eyebrow.textContent = "Partner profile";
  title.id = titleId;
  title.textContent = profile.name;
  meta.textContent = profile.meta;
  copy.append(eyebrow, title, meta);
  heading.append(logoFrame, copy);

  detailGrid.className = "partner-detail-grid";
  introSection.setAttribute("aria-label", `${profile.name} introduction`);
  introTitle.textContent = "Institute profile";
  intro.textContent = profile.intro;
  introSection.append(introTitle, intro);

  contributionSection.setAttribute("aria-label", `${profile.name} contribution to COHERENT`);
  contributionTitle.textContent = "Contribution to COHERENT";
  contribution.textContent = profile.contribution;
  contributionSection.append(contributionTitle, contribution);
  detailGrid.append(introSection, contributionSection);

  focusBlock.className = "partner-focus";
  focusTitle.textContent = "Key focus areas";
  focusList.replaceChildren(
    ...profile.focus.map((item) => {
      const listItem = document.createElement("li");
      listItem.textContent = item;
      return listItem;
    })
  );
  focusBlock.append(focusTitle, focusList);

  article.append(heading, detailGrid, focusBlock);
  return article;
}

function renderPartnerProfiles() {
  if (!partnerProfileList) return;

  partnerProfileList.replaceChildren(
    ...partnerOrder
      .filter((partnerId) => partnerProfiles[partnerId])
      .map((partnerId) => createPartnerProfileCard(partnerId))
  );
}

function focusPartnerProfile(partnerId, shouldMoveDetail) {
  const selectedProfile = document.querySelector(`[data-partner-profile="${partnerId}"]`);

  document.querySelectorAll("[data-partner-profile]").forEach((profileCard) => {
    profileCard.classList.toggle("is-selected", profileCard.dataset.partnerProfile === partnerId);
  });

  if (!shouldMoveDetail) return;

  const target = selectedProfile || partnerDetail;
  if (!target) return;

  target.scrollIntoView({ behavior: "smooth", block: "start" });
  target.focus({ preventScroll: true });
}

function renderPeople() {
  if (!peopleGrid) return;

  peopleGrid.replaceChildren(
    ...peopleProfiles.map((peopleProfile) => {
      const partner = partnerProfiles[peopleProfile.partnerId];
      const article = document.createElement("article");
      const heading = document.createElement("div");
      const logoFrame = document.createElement("span");
      const logo = document.createElement("img");
      const copy = document.createElement("div");
      const eyebrow = document.createElement("p");
      const title = document.createElement("h3");
      const meta = document.createElement("p");
      const tags = document.createElement("div");
      const list = document.createElement("ul");

      article.className = "people-card";
      heading.className = "people-card-heading";
      logoFrame.className = "partner-logo-frame";
      setLogoFrameShape(logoFrame, peopleProfile.partnerId);
      logo.className = "partner-logo-img";
      logo.src = partnerLogoSource(peopleProfile.partnerId);
      logo.alt = `${partner.name} logo`;
      logoFrame.append(logo);

      eyebrow.className = "eyebrow";
      eyebrow.textContent = peopleProfile.group;
      title.textContent = partner.name;
      meta.className = "people-meta";
      meta.textContent = partner.meta;
      copy.append(eyebrow, title, meta);
      heading.append(logoFrame, copy);

      tags.className = "people-tags";
      tags.replaceChildren(
        ...peopleProfile.areas.map((area) => {
          const tag = document.createElement("span");
          tag.textContent = area;
          return tag;
        })
      );

      list.className = "researcher-list";
      list.replaceChildren(
        ...peopleProfile.researchers.map((researcher) => {
          const item = document.createElement("li");
          const photoSlot = document.createElement("span");
          const content = document.createElement("span");
          const name = document.createElement("strong");
          const focus = document.createElement("span");

          if (researcher.isTeam) item.className = "researcher-team";
          photoSlot.className = "researcher-photo-slot";
          content.className = "researcher-copy";
          name.textContent = researcher.name;
          if (researcher.photo) {
            const photo = document.createElement("img");
            photo.className = "researcher-photo";
            photo.src = researcher.photo;
            photo.alt = `${researcher.name} portrait`;
            photoSlot.append(photo);
          } else {
            photoSlot.setAttribute("aria-hidden", "true");
            photoSlot.textContent = "Photo";
          }
          focus.textContent = researcher.focus;
          focus.className = "researcher-focus";
          content.append(name, focus);
          item.append(photoSlot, content);
          return item;
        })
      );

      article.append(heading, tags, list);
      return article;
    })
  );
}

function renderCountry(countryId, shouldMovePanel) {
  const country = countryProfiles[countryId];
  if (!country) return;

  selectedCountry = countryId;

  countryButtons.forEach((button) => {
    const isSelected = button.dataset.country === countryId;
    button.classList.toggle("is-selected", isSelected);
    button.setAttribute("aria-expanded", String(isSelected));
  });

  if (countryPanelTitle) countryPanelTitle.textContent = country.name;
  if (countryPanelSummary) countryPanelSummary.textContent = country.summary;

  if (countryPartnerList) {
    countryPartnerList.replaceChildren(
      ...country.partners.map((partnerId) => {
        const profile = partnerProfiles[partnerId];
        const button = document.createElement("button");
        const logoFrame = document.createElement("span");
        const logo = document.createElement("img");
        const copy = document.createElement("span");
        const name = document.createElement("strong");
        const meta = document.createElement("span");

        button.type = "button";
        button.className = "country-partner";
        button.dataset.partner = partnerId;
        button.setAttribute("aria-controls", "partner-detail");
        button.setAttribute("aria-expanded", "false");

        logoFrame.className = "partner-logo-frame";
        setLogoFrameShape(logoFrame, partnerId);
        logo.className = "partner-logo-img";
        logo.src = partnerLogoSource(partnerId);
        logo.alt = `${profile.name} logo`;
        logoFrame.append(logo);

        copy.className = "partner-copy";
        name.textContent = profile.name;
        meta.textContent = profile.meta;
        copy.append(name, meta);

        button.append(logoFrame, copy);
        return button;
      })
    );
  }

  if (shouldMovePanel && countryPanel) {
    countryPanel.scrollIntoView({ behavior: "smooth", block: "start" });
  }
}

function selectCountry(countryId, shouldMovePanel) {
  const country = countryProfiles[countryId];
  if (!country) return;

  renderCountry(countryId, shouldMovePanel);

  const partnerToShow = country.partners.includes(selectedPartner)
    ? selectedPartner
    : country.partners[0];
  selectPartner(partnerToShow, false, false);
}

function selectPartner(partnerId, shouldMoveDetail, shouldSyncCountry = true) {
  const profile = partnerProfiles[partnerId];
  if (!profile) return;

  const countryId = partnerCountry[partnerId];
  if (shouldSyncCountry && countryId) {
    renderCountry(countryId, false);
  }

  selectedPartner = partnerId;

  document.querySelectorAll("[data-partner]").forEach((card) => {
    const isSelected = card.dataset.partner === partnerId;
    card.classList.toggle("is-selected", isSelected);
    card.setAttribute("aria-expanded", String(isSelected));
  });

  if (partnerLogo) {
    partnerLogo.src = partnerLogoSource(partnerId);
    partnerLogo.alt = `${profile.name} logo`;
    setLogoFrameShape(partnerLogo.closest(".partner-detail-logo-frame"), partnerId);
  }
  if (partnerName) partnerName.textContent = profile.name;
  if (partnerMeta) partnerMeta.textContent = profile.meta;
  if (partnerIntro) partnerIntro.textContent = profile.intro;
  if (partnerContribution) partnerContribution.textContent = profile.contribution;
  if (partnerFocus) {
    partnerFocus.replaceChildren(
      ...profile.focus.map((item) => {
        const listItem = document.createElement("li");
        listItem.textContent = item;
        return listItem;
      })
    );
  }

  focusPartnerProfile(partnerId, shouldMoveDetail);
}

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const isOpen = navToggle.getAttribute("aria-expanded") === "true";
    navToggle.setAttribute("aria-expanded", String(!isOpen));
    body.classList.toggle("nav-open", !isOpen);
  });

  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      navToggle.setAttribute("aria-expanded", "false");
      body.classList.remove("nav-open");
    });
  });
}

pageLinks.forEach((link) => {
  link.addEventListener("click", (event) => {
    const page = link.dataset.pageLink;
    if (!validPages.has(page)) return;

    event.preventDefault();

    if (window.location.hash !== `#${page}`) {
      window.location.hash = page;
    } else {
      setActivePage(page, true);
    }
  });
});

countryButtons.forEach((button) => {
  button.addEventListener("click", (event) => {
    event.preventDefault();
    selectCountry(button.dataset.country, true);
  });
});

document.addEventListener("click", (event) => {
  const target = event.target instanceof Element ? event.target : null;
  const partnerControl = target ? target.closest("[data-partner]") : null;
  if (!partnerControl) return;

  event.preventDefault();
  selectPartner(partnerControl.dataset.partner, true);
});

window.addEventListener("hashchange", () => {
  setActivePage(pageFromHash(), true);
});

renderPartnerProfiles();
setActivePage(pageFromHash(), false);
renderPeople();
applyLogoFrameShapes();
initialiseTrafficStats();

if (header) {
  window.addEventListener(
    "scroll",
    () => {
      header.classList.toggle("is-scrolled", window.scrollY > 8);
    },
    { passive: true }
  );
}
