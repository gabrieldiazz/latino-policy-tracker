export enum Status {
	INTRODUCED = "INTRODUCED",
	IN_COMMITTEE = "IN_COMMITTEE",
	PASSED_HOUSE = "PASSED_HOUSE",
	PASSED_SENATE = "PASSED_SENATE",
	TO_PRESIDENT = "TO_PRESIDENT",
	VETOED = "VETOED",
	OVERRIDE_VETO = "OVERRIDE_VETO",
	RESOLVING_DIFFERENCES = "RESOLVING_DIFFERENCES",
	BECAME_LAW = "BECAME_LAW",
	FAILED = "FAILED",
}

export enum SponsorRole {
	SPONSOR = "SPONSOR",
	COSPONSOR = "COSPONSOR",
}

export interface Bill {
	billNumber: number;
	billType: string;
	congress: number;
	title: string;
	status: Status;
	introducedDate: Date;
	summary?: string;
	updateDate?: Date;
	policyArea: string;
	legislativeSubjects: Subject[];
	relevancy?: number;

	actions: Action[];
	billSponsors: Sponsor[];
	committees: Committee[];
}

export interface Action {
	text: string;
	type: string;
	actionDate: Date;
}

export interface Sponsor {
	fullName: string;
	firstName: string;
	lastName: string;
	party: string;
	state: string;
	district?: string;
	role: SponsorRole;
}

export interface Committee {
	name: string;
	chamber: string;
}

export interface Subject {
	name: string;
}
