import * as z from "zod";

export const BillActionsSchema = z.object({
	actionCode: z.string().optional(),
	actionDate: z.string(),
	committees: z
		.array(
			z.object({
				name: z.string(),
				systemCode: z.string(),
				url: z.string(),
			}),
		)
		.optional(),
	sourceSystem: z.object({
		code: z.number().int().nonnegative().optional(),
		name: z.string(),
	}),
	text: z.string(),
	type: z.string(),
});

export const BillActionsResponseSchema = z.object({
	actions: z.array(BillActionsSchema),
	pagination: z.object({
		count: z.number().int().nonnegative(),
		next: z.string().optional(),
	}),
});

export type BillAction = z.infer<typeof BillActionsSchema>;
