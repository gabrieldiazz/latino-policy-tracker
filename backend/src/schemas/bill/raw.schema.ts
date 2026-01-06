import * as z from "zod";

export const RawBillSchema = z.object({
	congress: z.number().int().nonnegative(),
	latestAction: z
		.object({
			actionDate: z.string(),
			text: z.string(),
		})
		.nullable(),
	number: z.string(),
	originChamber: z.string(),
	originChamberCode: z.string(),
	title: z.string(),
	type: z.string(),
	updateDate: z.string(),
	updateDateIncludingText: z.string(),
	url: z.string(),
});

export const RawBillResponseSchema = z.object({
	bills: z.array(RawBillSchema),
	pagination: z.object({
		count: z.number().int().nonnegative(),
		next: z.string().optional(),
		prev: z.string().optional(),
	}),
	request: z.unknown(),
});

export type RawBill = z.infer<typeof RawBillSchema>;
