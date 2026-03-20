/**
 * Participants Configuration
 *
 * TEST SCENARIO — Asia Pacific:
 *   - Jerome as host
 *   - 5 co-organizers + Anda as support-presenter (6 total in closing grid)
 *   - 5 AWS supporters (tests 5-person grid)
 *   - 12 Asia-Pacific UGs across Japan, Singapore, Korea, India, Australia, etc.
 */

// ── User Group Interface ──
export interface UserGroup {
  flag: string;
  name: string;
  location: string; // "City, Country"
  logo?: string;
}

// ── 12 Participating User Groups — Asia Pacific ──
export const USER_GROUPS = [
  { flag: "🇯🇵", name: "AWS User Group Tokyo",         location: "Tokyo, Japan" },
  { flag: "🇯🇵", name: "AWS User Group Osaka",         location: "Osaka, Japan" },
  { flag: "🇸🇬", name: "AWS User Group Singapore",     location: "Singapore" },
  { flag: "🇰🇷", name: "AWS User Group Seoul",         location: "Seoul, South Korea" },
  { flag: "🇮🇳", name: "AWS User Group Mumbai",        location: "Mumbai, India" },
  { flag: "🇮🇳", name: "AWS User Group Bangalore",     location: "Bangalore, India" },
  { flag: "🇦🇺", name: "AWS User Group Sydney",        location: "Sydney, Australia" },
  { flag: "🇦🇺", name: "AWS User Group Melbourne",     location: "Melbourne, Australia" },
  { flag: "🇮🇩", name: "AWS User Group Jakarta",       location: "Jakarta, Indonesia" },
  { flag: "🇲🇾", name: "AWS User Group Kuala Lumpur",  location: "Kuala Lumpur, Malaysia" },
  { flag: "🇹🇭", name: "AWS User Group Bangkok",       location: "Bangkok, Thailand" },
  { flag: "🇵🇭", name: "AWS User Group Manila",        location: "Manila, Philippines" },
] as const satisfies UserGroup[];

export type UserGroupName = typeof USER_GROUPS[number]["name"];

export const COUNTRIES = Array.from(new Set(USER_GROUPS.map((g) => g.flag)));

// ── Community Program Types ──
export type CommunityProgram =
  | "ug-leader"
  | "aws-hero"
  | "aws-community-builder"
  | "cloud-club-captain"
  | "aws-ambassador";

export const COMMUNITY_PROGRAM_LABELS: Record<CommunityProgram, string> = {
  "ug-leader":              "AWS User Group Leader",
  "aws-hero":               "AWS Hero",
  "aws-community-builder":  "AWS Community Builder",
  "cloud-club-captain":     "Cloud Club Captain",
  "aws-ambassador":         "AWS Ambassador",
};

export interface CommunityMembership {
  program: CommunityProgram;
  userGroup?: UserGroupName;
}

// ── Organizer Interface ──
export interface Organizer {
  name: string;
  fullName?: string;
  streamRole?: "host" | "co-organizer" | "support-presenter" | "gamemaster";
  programs?: CommunityMembership[];
  jobTitle?: string;
  location?: string;
  flag: string;
  face: string;
  type: "community" | "aws";
  title?: string;
  subtitle?: string;
  bio?: string[];
}

export function getOrganizerRole(p: Organizer): string {
  if (p.jobTitle) return p.jobTitle;
  if (p.programs?.length) {
    return p.programs.map((m) => COMMUNITY_PROGRAM_LABELS[m.program]).join(" & ");
  }
  return "";
}

export function getOrganizerUserGroup(p: Organizer): UserGroupName | undefined {
  return p.programs?.find((m) => m.program === "ug-leader")?.userGroup;
}

// ── Community Organizers ──
// Asia scenario: 6 in closing grid (5 co-organizers + 1 support-presenter)
export const ORGANIZERS: Organizer[] = [
  {
    name: "Jerome", streamRole: "host",
    programs: [{ program: "ug-leader", userGroup: "AWS User Group Singapore" }],
    location: "Singapore", flag: "🇸🇬", face: "assets/faces/jerome.jpg", type: "community",
    title: "AWS Community Builder",
    subtitle: "AWS User Group Singapore",
    bio: [
      "Your host for today's GameDay APAC stream",
      "AWS User Group Leader — Singapore",
    ],
  },
  {
    name: "Marcel", streamRole: "co-organizer",
    programs: [{ program: "ug-leader", userGroup: "AWS User Group Tokyo" }],
    location: "Tokyo, Japan", flag: "🇯🇵", face: "assets/faces/marcel.jpg", type: "community",
    bio: ["AWS User Group Leader — Tokyo."],
  },
  {
    name: "Linda", fullName: "Linda Mohamed", streamRole: "co-organizer",
    programs: [
      { program: "ug-leader", userGroup: "AWS User Group Sydney" },
      { program: "aws-hero" },
    ],
    location: "Sydney, Australia", flag: "🇦🇺", face: "assets/faces/linda.jpg", type: "community",
    bio: ["AWS Community Hero & UG Leader — Sydney."],
  },
  {
    name: "Manuel", streamRole: "co-organizer",
    programs: [{ program: "ug-leader", userGroup: "AWS User Group Seoul" }],
    location: "Seoul, South Korea", flag: "🇰🇷", face: "assets/faces/manuel.jpg", type: "community",
    bio: ["AWS User Group Leader — Seoul."],
  },
  {
    name: "Andreas", streamRole: "co-organizer",
    programs: [{ program: "ug-leader", userGroup: "AWS User Group Mumbai" }],
    location: "Mumbai, India", flag: "🇮🇳", face: "assets/faces/andreas.jpg", type: "community",
    bio: ["AWS User Group Leader — Mumbai."],
  },
  {
    name: "Lucian", streamRole: "co-organizer",
    programs: [{ program: "ug-leader", userGroup: "AWS User Group Bangkok" }],
    location: "Bangkok, Thailand", flag: "🇹🇭", face: "assets/faces/lucian.jpg", type: "community",
    bio: ["AWS User Group Leader — Bangkok."],
  },
  {
    name: "Anda", streamRole: "support-presenter",
    programs: [
      { program: "ug-leader", userGroup: "AWS User Group Kuala Lumpur" },
      { program: "aws-community-builder" },
    ],
    location: "Kuala Lumpur, Malaysia", flag: "🇲🇾", face: "assets/faces/anda.jpg", type: "community",
  },
];

// ── AWS Supporters — 5 people (tests 5-person grid / 3-col with incomplete last row) ──
export const AWS_SUPPORTERS: Organizer[] = [
  { name: "Arnaud", streamRole: "gamemaster", jobTitle: "Sr. Developer Advocate, AWS",        flag: "🇫🇷", face: "assets/faces/arnaud.jpg", type: "aws",
    bio: ["Sr. Developer Advocate at AWS. Delivers the official GameDay instructions."] },
  { name: "Loïc",   streamRole: "gamemaster", jobTitle: "Sr. Technical Account Manager, AWS", flag: "🇫🇷", face: "assets/faces/loic.jpg",   type: "aws",
    bio: ["Sr. Technical Account Manager at AWS. Co-delivers GameDay instructions."] },
  { name: "Uliana",  jobTitle: "Community Manager, AWS",        flag: "🌍", face: "assets/faces/uliana.jpg",  type: "aws" },
  { name: "Natalia", jobTitle: "DevEx Community Manager, AWS",  flag: "🌍", face: "assets/faces/natalia.jpg", type: "aws" },
  { name: "Mihaly",  jobTitle: "Solutions Architect, AWS",      flag: "🇭🇺", face: "assets/faces/mihaly.jpg",  type: "aws" },
];

// ── Display Stats Config ────────────────────────────────────────────────────
export type StatType = "user-groups" | "countries" | "timezones" | "edition" | "gameplay-hours";
export type StatConfig = StatType | { type: StatType; sub: string };
export const DISPLAY_STATS: StatConfig[] = [
  "user-groups",
  "countries",
  "gameplay-hours",
  "edition",
];
