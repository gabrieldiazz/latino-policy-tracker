import z from "zod";

export const ActivitesSchema = z.object({
	date: z.string(),
	name: z.string(),
});

export const BillCommitteesSchema = z.object({
	activities: z.array(ActivitesSchema),
	chamber: z.string(),
	name: z.string(),
	systemCode: z.string(),
	type: z.string(),
	url: z.string(),
});

export const BillCommitteesResponseSchema = z.object({
	committees: z.array(BillCommitteesSchema),
	pagination: z.object({
		count: z.number().int().nonnegative(),
		next: z.string().optional(),
	}),
});

export type BillCommittee = z.infer<typeof BillCommitteesSchema>;
