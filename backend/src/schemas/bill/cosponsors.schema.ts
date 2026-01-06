import * as z from "zod";

export const BillCosponsorsSchema = z.object({
	bioguideId: z.string(),
	firstName: z.string(),
	fullName: z.string(),
	isOriginalCosponsor: z.boolean(),
	lastName: z.string(),
	middleName: z.string().optional(),
	party: z.string(),
	sponsorshipDate: z.string(),
	state: z.string(),
	url: z.string(),
});

export const BillCosponsorsResponseSchema = z.object({
	cosponsors: z.array(BillCosponsorsSchema),
	pagination: z.object({
		count: z.number().int().nonnegative(),
		countIncludingWithdrawnCosponsors: z.number().int().nonnegative(),
		next: z.string().optional(),
		prev: z.string().optional(),
	}),
	request: z.unknown(),
});
