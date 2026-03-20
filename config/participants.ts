/**
 * Participants Configuration  -  AWS Community GameDay Europe
 *
 * TEST SCENARIO B — Minimal config:
 *   - Jerome as host
 *   - Anda as sole co-organizer
 *   - Arnaud as sole gamemaster
 *   - 10 user groups
 */

// ── User Group Interface ──
export interface UserGroup {
  flag: string;
  name: string;
  location: string; // "City, Country"
  logo?: string;
}

// ── 10 Participating User Groups (minimal test) ──
export const USER_GROUPS = [
  { flag: "🇧🇪", name: "AWS User Group Belgium",    location: "Brussels, Belgium",     logo: "https://secure.meetupstatic.com/photos/event/7/d/7/b/clean_523472123.webp" },
  { flag: "🇨🇭", name: "AWS Swiss UG - Geneva",     location: "Geneva, Switzerland",   logo: "https://secure.meetupstatic.com/photos/event/6/f/2/1/clean_512908449.webp" },
  { flag: "🇦🇹", name: "AWS User Group Vienna",     location: "Vienna, Austria",       logo: "https://secure.meetupstatic.com/photos/event/9/8/d/5/highres_523779125.jpeg" },
  { flag: "🇩🇪", name: "AWS UG Münsterland",        location: "Münster, Germany",      logo: "https://secure.meetupstatic.com/photos/event/3/b/c/2/clean_530115298.webp" },
  { flag: "🇩🇪", name: "Frankfurt AWS User Group",  location: "Frankfurt, Germany",    logo: "https://secure.meetupstatic.com/photos/event/b/4/5/f/clean_495406175.webp" },
  { flag: "🇩🇪", name: "AWS User Group Bonn",       location: "Bonn, Germany",         logo: "https://secure.meetupstatic.com/photos/event/3/f/5/2/clean_513136210.webp" },
  { flag: "🇷🇴", name: "AWS UG Timisoara",          location: "Timisoara, Romania",    logo: "https://secure.meetupstatic.com/photos/event/8/9/a/8/clean_513815240.webp" },
  { flag: "🇭🇺", name: "AWS User Group Budapest",   location: "Budapest, Hungary",     logo: "https://secure.meetupstatic.com/photos/event/7/3/e/5/clean_524189669.webp" },
  { flag: "🇫🇷", name: "AWS UG France - Paris",     location: "Paris, France",         logo: "https://secure.meetupstatic.com/photos/event/c/5/1/5/clean_497630453.webp" },
  { flag: "🇵🇱", name: "AWS UG Warsaw",             location: "Warsaw, Poland",        logo: "https://secure.meetupstatic.com/photos/event/6/1/e/5/clean_516145061.webp" },
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
// Iteration 1 — Scenario B: Jerome as host, Anda as sole co-organizer, 10 UGs
export const ORGANIZERS: Organizer[] = [
  {
    name: "Jerome", fullName: "Jerome Hayen", streamRole: "host",
    programs: [
      { program: "ug-leader", userGroup: "AWS User Group Belgium" },
      { program: "aws-community-builder" },
    ],
    location: "Brussels, Belgium", flag: "🇧🇪", face: "assets/faces/jerome.jpg", type: "community",
    title: "AWS Community Builder",
    subtitle: "AWS User Group Belgium",
    bio: [
      "Your host for today's GameDay Europe stream",
      "AWS User Group Leader — AWS User Group Belgium",
      "Co-founder of AWS Community GameDay Europe",
    ],
  },
  {
    name: "Anda", streamRole: "co-organizer",
    programs: [
      { program: "ug-leader", userGroup: "AWS Swiss UG - Geneva" },
      { program: "aws-community-builder" },
    ],
    location: "Geneva, Switzerland", flag: "🇨🇭", face: "assets/faces/anda.jpg", type: "community",
    bio: ["AWS User Group Leader and initiator of this GameDay."],
  },
];

// ── AWS Supporters (Gamemasters & Community Team) ──
export const AWS_SUPPORTERS: Organizer[] = [
  { name: "Arnaud", streamRole: "gamemaster", jobTitle: "Sr. Developer Advocate, AWS", flag: "🇫🇷", face: "assets/faces/arnaud.jpg", type: "aws",
    bio: ["Sr. Developer Advocate at AWS. Delivers the official GameDay instructions."] },
];
