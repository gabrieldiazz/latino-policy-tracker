import * as z from "zod";

export const SummarizedBillSchema = z.object({
	actionDate: z.string(),
	actionDesc: z.string(),
	text: z.string(),
	updateDate: z.string(),
	versionCode: z.string(),
});

export const SummarizedBillResponseSchema = z.object({
	summaries: z.array(SummarizedBillSchema),
	pagination: z.object({
		count: z.number().int().nonnegative(),
		next: z.string().optional(),
		prev: z.string().optional(),
	}),
	request: z.unknown(),
});
