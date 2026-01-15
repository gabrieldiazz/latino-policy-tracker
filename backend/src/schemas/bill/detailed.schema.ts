import * as z from "zod";

export const DetailedBillSchema = z.object({
	actions: z
		.object({
			count: z.number().int().nonnegative(),
			url: z.string(),
		})
		.optional(),
	cboCostEstimates: z
		.array(
			z.object({
				description: z.string(),
				pubDate: z.string(),
				title: z.string(),
				url: z.string(),
			}),
		)
		.optional(),
	committees: z
		.object({
			count: z.number().int().nonnegative(),
			url: z.string(),
		})
		.optional(),
	congress: z.number().int().nonnegative(),
	constitutionalAuthorityStatementText: z.string().optional(),
	cosponsors: z
		.object({
			count: z.number().int().nonnegative(),
			countIncludingWithdrawnCosponsors: z.number().int().nonnegative(),
			url: z.string(),
		})
		.optional(),
	introducedDate: z.string(),
	latestAction: z
		.object({
			actionDate: z.string(),
			text: z.string(),
		})
		.nullable(),
	legislationUrl: z.string(),
	number: z.string(),
	originChamber: z.string(),
	originChamberCode: z.string(),
	policyArea: z.object({
		name: z.string(),
	}),
	relatedBills: z
		.object({
			count: z.number().int().nonnegative(),
			url: z.string(),
		})
		.optional(),
	title: z.string(),
	sponsors: z.array(
		z.object({
			bioguideId: z.string(),
			district: z.number().int().nonnegative().optional(),
			firstName: z.string(),
			fullName: z.string(),
			isByRequest: z.string(),
			lastName: z.string(),
			middleName: z.string().optional(),
			party: z.string(),
			state: z.string(),
			url: z.string(),
		}),
	),
	subjects: z
		.object({
			count: z.number().int().nonnegative(),
			url: z.string(),
		})
		.optional(),
	summaries: z
		.object({
			count: z.number().int().nonnegative(),
			url: z.string(),
		})
		.optional(),
	type: z.string(),
	updateDate: z.string(),
	updateDateIncludingText: z.string(),
});

export const DetailedBillResponseSchema = z.object({
	bill: DetailedBillSchema,
});

export type DetailedBill = z.infer<typeof DetailedBillSchema>;
