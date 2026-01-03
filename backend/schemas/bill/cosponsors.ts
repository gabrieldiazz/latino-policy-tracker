import * as z from "zod";

export const BillCosponsorsSchema = z.looseObject({
	cosponsors: z.array(
		z.looseObject({
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
		}),
	),
});
